#!/usr/bin/env python3
"""
INSTAGRAM FEED  --  run by .github/workflows/instagram-feed.yml. You never run it yourself.

Reads the newest posts of the Instagram account that the IG_TOKEN secret belongs to and
writes them into a folder (OUT_DIR), which the workflow then saves on the side branch
"instagram-feed" (never on main, so your own commit + push keeps working as always):

    instagram.json      the account (name, picture, counts) and its latest posts, newest first,
                        each with a small copy of its picture inside the file. (Instagram's own
                        picture links stop working after a few days; these copies never do, and
                        one file means one quick download for each visitor.)

The Socials section of the home page (assets/socials-view.js) reads it from that branch.
One-time setup: INSTAGRAM-SETUP.md.

Settings (environment variables, filled in by the workflow):
    IG_TOKEN    the Instagram access token (GitHub secret IG_TOKEN)           - required
    REFRESH     "true" = also renew the token (the workflow does it every Monday)
    GH_PAT      a GitHub token that may change this repo's secrets (secret GH_PAT). Only
                used to store the renewed token; without it the token is not renewed.
    OUT_DIR     the folder to write (default: feed-out)
    FEED_URL    where the saved feed is read from, to skip saving when nothing changed
                (default: the instagram-feed branch of this repo)
    POSTS       how many posts to keep (default 9, what the home page shows)

The token is never printed: GitHub hides the secret, and a renewed token is hidden with
::add-mask:: before it is used.
"""
import base64
import io
import json
import os
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone

API = os.environ.get('IG_API_BASE', 'https://graph.instagram.com').rstrip('/')
VERSION = os.environ.get('IG_API_VERSION', '').strip().strip('/')      # '' = the app's default version
TOKEN = os.environ.get('IG_TOKEN', '').strip()
PAT = os.environ.get('GH_PAT', '').strip()
REFRESH = os.environ.get('REFRESH', '').strip().lower() == 'true'
REPO = os.environ.get('GITHUB_REPOSITORY', 'officialdetatch/LPBLSA')
OUT = os.environ.get('OUT_DIR', 'feed-out')
FEED_URL = os.environ.get('FEED_URL') or ('https://raw.githubusercontent.com/%s/instagram-feed/' % REPO)
KEEP = max(1, min(18, int(os.environ.get('POSTS') or 9)))
PICTURE = (320, 400)          # px, 4:5 like the tiles on the site (shown about 120 px wide: sharp on any phone)
AVATAR = (96, 96)
SAVE_ANYWAY_DAYS = 3          # nothing new? save anyway after this many days, to refresh the counts
UA = 'LPBLSA-instagram-feed/1.0 (+https://github.com/%s)' % REPO

notes = []                    # lines for the run's summary page
attention = []                # problems you should know about: the run is marked as failed (GitHub emails you)


class ApiError(Exception):
    def __init__(self, status, code, message):
        Exception.__init__(self, message)
        self.status, self.code, self.message = status, code, message


def hide(text):
    """never let a token reach the log"""
    text = str(text)
    for secret in (TOKEN, PAT):
        if secret:
            text = text.replace(secret, '***')
    return text


def say(line):
    print(hide(line), flush=True)


def summary(line):
    notes.append(hide(line))


def output(name, value):
    path = os.environ.get('GITHUB_OUTPUT')
    value = hide(value).replace('\n', ' ')
    if path:
        with open(path, 'a', encoding='utf-8') as f:
            f.write('%s=%s\n' % (name, value))
    else:
        say('[output] %s=%s' % (name, value))


def get_json(url, params=None, timeout=30):
    if params:
        url += ('&' if '?' in url else '?') + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', 'replace')
        try:
            err = json.loads(body).get('error') or {}
        except ValueError:
            err = {}
        raise ApiError(e.code, err.get('code'), hide(err.get('message') or 'HTTP %d' % e.code))
    except urllib.error.URLError as e:
        raise ApiError(0, None, hide('no connection (%s)' % e.reason))


def api(path, params):
    base = API + ('/' + VERSION if VERSION else '')
    q = dict(params)
    q['access_token'] = TOKEN
    return get_json(base + path, q)


def get_bytes(url, limit=20 * 1024 * 1024):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=45) as r:
        data = r.read(limit + 1)
    if len(data) > limit:
        raise ValueError('picture too big')
    return data


# ---------------------------------------------------------------- the token

def gh(args, stdin=None):
    env = dict(os.environ)
    env['GH_TOKEN'] = PAT
    try:
        return subprocess.run(['gh'] + args, input=stdin, text=True, capture_output=True, env=env, timeout=60)
    except (OSError, subprocess.TimeoutExpired) as e:
        return subprocess.CompletedProcess(args, 1, '', str(e))


def renew_token():
    """Ask Instagram for a fresh 60-day token and store it in the IG_TOKEN secret."""
    global TOKEN
    if not PAT:
        summary('- Token **not renewed**: there is no `GH_PAT` secret, so the new token could not be saved. '
                'Your token keeps working until 60 days after you made it. Add `GH_PAT` '
                '(INSTAGRAM-SETUP.md, step 6) and it renews itself every Monday.')
        say('::warning::Instagram token not renewed: add the GH_PAT secret (INSTAGRAM-SETUP.md, step 6).')
        return
    # first make sure GH_PAT really can save secrets, so a renewed token is never lost
    check = gh(['secret', 'list', '--repo', REPO])
    if check.returncode != 0:
        attention.append('GH_PAT cannot change the secrets of %s (expired, or missing the "Secrets: Read and write" '
                         'permission). Make a new one (INSTAGRAM-SETUP.md, step 6).' % REPO)
        say('gh says: ' + hide((check.stderr or check.stdout).strip()[:300]))
        return
    try:
        data = get_json(API + '/refresh_access_token', {'grant_type': 'ig_refresh_token', 'access_token': TOKEN})
    except ApiError as e:
        # e.g. a token made less than 24 hours ago cannot be renewed yet - the next Monday will do it
        summary('- Token not renewed this time: Instagram said "%s". The old token still works.' % e.message)
        say('::warning::Instagram token not renewed: %s' % e.message)
        return
    new = str(data.get('access_token') or '').strip()
    if not new:
        summary('- Token not renewed: Instagram sent no token back. The old token still works.')
        return
    print('::add-mask::' + new, flush=True)          # from here on GitHub hides it in the log
    days = int(data.get('expires_in') or 0) // 86400
    saved = gh(['secret', 'set', 'IG_TOKEN', '--repo', REPO], stdin=new)
    if saved.returncode != 0:
        attention.append('Instagram renewed the token, but saving it to the IG_TOKEN secret failed. '
                         'If the feed stops, make a new token (INSTAGRAM-SETUP.md, step 5).')
        say('gh says: ' + hide((saved.stderr or saved.stdout).strip()[:300]))
    else:
        summary('- Token renewed and saved: good for %d more days (it renews again next Monday).' % days)
    TOKEN = new


# ---------------------------------------------------------------- the posts

ACCOUNT_FIELDS = ['user_id,username,name,profile_picture_url,followers_count,media_count', 'user_id,username']
MEDIA_FIELDS = [
    'id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp,'
    'children{media_type,media_url,thumbnail_url}',
    'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp',
]


def first_that_works(path, field_sets, extra=None):
    """Try the full field list first; if Instagram refuses a field (#100), ask for less."""
    last = None
    for fields in field_sets:
        params = {'fields': fields}
        params.update(extra or {})
        try:
            return api(path, params)
        except ApiError as e:
            last = e
            if e.code != 100:
                raise
    raise last


def picture_of(m):
    """The address of the picture to show for one post (a video or reel shows its cover)."""
    kind = m.get('media_type')
    if kind == 'IMAGE':
        return m.get('media_url')
    if kind == 'VIDEO':
        return m.get('thumbnail_url')
    if kind == 'CAROUSEL_ALBUM':
        for child in (m.get('children') or {}).get('data') or []:
            url = child.get('media_url') if child.get('media_type') == 'IMAGE' else child.get('thumbnail_url')
            if url:
                return url
        return m.get('thumbnail_url') or m.get('media_url')
    return m.get('thumbnail_url') or m.get('media_url')


def iso(ts):
    """Instagram's 2026-10-11T22:10:00+0000 -> 2026-10-11T22:10:00Z (every browser reads this one)"""
    try:
        return datetime.strptime(ts, '%Y-%m-%dT%H:%M:%S%z').astimezone(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    except (TypeError, ValueError):
        return ''


def clean_caption(text, limit=400):
    text = ' '.join(str(text or '').split())
    return text if len(text) <= limit else text[:limit - 1].rstrip() + '…'


def post_of(m):
    url = str(m.get('permalink') or '')
    if not url.startswith('https://www.instagram.com/'):
        return None
    return {
        'id': str(m.get('id')),
        'type': m.get('media_type') or 'IMAGE',
        'reel': m.get('media_product_type') == 'REELS' or '/reel/' in url,
        'url': url,
        'time': iso(m.get('timestamp')),
        'caption': clean_caption(m.get('caption')),
        '_pic': picture_of(m),
    }


def signature(feed):
    """What counts as 'something changed': new or removed posts, edited captions, a new name.
    (A picture that failed to download is tried again at the next new post, or after SAVE_ANYWAY_DAYS.)"""
    if not feed:
        return None
    acc = feed.get('account') or {}
    return json.dumps({
        'account': [acc.get('username'), acc.get('name'), acc.get('posts')],
        'posts': [[p.get('id'), p.get('url'), p.get('caption'), p.get('type')] for p in feed.get('posts') or []],
    }, sort_keys=True)


def read_saved_feed():
    try:
        return get_json(FEED_URL + 'instagram.json', timeout=20)
    except (ApiError, ValueError):
        return None                                   # first run, or not reachable: save


def picture_data(data, size):
    """a downloaded picture -> a small WebP (JPEG if WebP is not available), cut to `size` from the
    middle, as a data: address that goes straight into the file"""
    from PIL import Image, ImageOps                   # pip install pillow (the workflow does it)
    im = ImageOps.exif_transpose(Image.open(io.BytesIO(data))).convert('RGB')
    im = ImageOps.fit(im, size, Image.LANCZOS, centering=(0.5, 0.45))
    buf = io.BytesIO()
    try:
        im.save(buf, 'WEBP', quality=72, method=6)    # about 30% smaller than JPEG at the same look
        kind = 'webp'
    except (KeyError, OSError, ValueError):
        buf = io.BytesIO()
        im.save(buf, 'JPEG', quality=76, optimize=True)
        kind = 'jpeg'
    return 'data:image/%s;base64,%s' % (kind, base64.b64encode(buf.getvalue()).decode('ascii'))


def main():
    if not TOKEN:
        # not set up yet: a quiet note, not a failure, so GitHub does not email you every 4 hours
        say('::notice::The Instagram feed is not set up yet (there is no IG_TOKEN secret), so there is nothing to do. '
            'Follow INSTAGRAM-SETUP.md when you are ready; until then the site shows your Instagram post from the Socials writer.')
        summary('- Not set up yet: there is no `IG_TOKEN` secret (INSTAGRAM-SETUP.md). Nothing to do.')
        output('publish', 'false')
        return 0

    if REFRESH:
        renew_token()

    try:
        account = first_that_works('/me', ACCOUNT_FIELDS)
        media = first_that_works('/me/media', MEDIA_FIELDS, {'limit': KEEP})
    except ApiError as e:
        if e.code == 190 or (e.status in (400, 401) and 'token' in e.message.lower()):
            say('::error::Instagram does not accept the token any more (expired, or the app lost access): %s. '
                'Make a new token (INSTAGRAM-SETUP.md, step 5) and paste it over the IG_TOKEN secret. '
                'Until then the site keeps showing the last posts it saved.' % e.message)
        else:
            say('::error::Instagram answered with an error: %s (the site keeps showing the last posts it saved).' % e.message)
        output('publish', 'false')
        return 1

    posts = [p for p in (post_of(m) for m in (media.get('data') or [])) if p][:KEEP]
    username = account.get('username') or ''
    feed = {
        'version': 1,
        'updated': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
        'account': {
            'username': username,
            'name': account.get('name') or username,
            'followers': account.get('followers_count'),
            'posts': account.get('media_count'),
            'avatar': '',
        },
        'posts': [dict((k, v) for k, v in p.items() if not k.startswith('_')) for p in posts],
    }

    saved = read_saved_feed()
    changed = signature(saved) != signature(feed)
    stale = True
    try:
        stale = datetime.now(timezone.utc) - datetime.strptime(saved['updated'], '%Y-%m-%dT%H:%M:%SZ').replace(
            tzinfo=timezone.utc) > timedelta(days=SAVE_ANYWAY_DAYS)
    except (TypeError, KeyError, ValueError):
        pass
    if not changed and not stale:
        say('Nothing new on @%s since the last save - nothing to do.' % username)
        summary('- @%s: nothing new since the last save (%d posts checked).' % (username, len(posts)))
        output('publish', 'false')
        return 0

    # the pictures go inside the file, then the file goes in the folder
    os.makedirs(OUT, exist_ok=True)
    for p, full in zip(feed['posts'], posts):
        p['img'] = ''
        if not full.get('_pic'):
            continue
        try:
            p['img'] = picture_data(get_bytes(full['_pic']), PICTURE)
        except Exception as e:                        # one bad picture never stops the rest
            say('::warning::Could not save the picture of %s: %s' % (p['url'], hide(e)))
    pic = account.get('profile_picture_url')
    if pic:
        try:
            feed['account']['avatar'] = picture_data(get_bytes(pic), AVATAR)
        except Exception as e:
            say('::warning::Could not save the profile picture: %s' % hide(e))

    with open(os.path.join(OUT, 'instagram.json'), 'w', encoding='utf-8') as f:
        json.dump(feed, f, ensure_ascii=False, separators=(',', ':'))
    with open(os.path.join(OUT, 'README.md'), 'w', encoding='utf-8') as f:
        f.write('# Instagram feed (made automatically)\n\n'
                'This branch is written by the **Instagram feed** workflow '
                '(`.github/workflows/instagram-feed.yml`) and replaced every time it runs. '
                'Do not edit it by hand. The home page reads `instagram.json` (pictures included) from here.\n\n'
                'Setup and troubleshooting: `INSTAGRAM-SETUP.md` on the main branch.\n')

    with_pic = sum(1 for p in feed['posts'] if p['img'])
    newest = feed['posts'][0]['time'] if feed['posts'] else 'none'
    size = os.path.getsize(os.path.join(OUT, 'instagram.json')) // 1024
    say('Saved %d posts of @%s (%d with a picture, %d KB), newest %s.' % (len(posts), username, with_pic, size, newest))
    summary('- Saved **%d posts** of @%s (%d with a picture). Newest: %s.' % (len(posts), username, with_pic, newest))
    output('publish', 'true')
    return 0


if __name__ == '__main__':
    code = main()
    out = os.environ.get('GITHUB_STEP_SUMMARY')
    lines = ['## Instagram feed', ''] + notes + ['- **Needs you:** ' + a for a in attention]
    if out:
        with open(out, 'a', encoding='utf-8') as f:
            f.write('\n'.join(lines) + '\n')
    for a in attention:
        say('::error::' + a)
    output('attention', ' | '.join(attention))
    sys.exit(code)
