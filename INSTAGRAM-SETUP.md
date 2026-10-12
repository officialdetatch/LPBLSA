# Instagram feed: one-time setup (about 15 minutes)

What you get: the **Instagram** card in the Socials section of the home page shows your profile (picture, name,
number of posts and followers) and a grid of your **9 latest posts**, newest first, with the caption of the newest
one underneath. Each picture opens that post on Instagram. Post on Instagram and it shows up on the site by itself
within about 4 hours. Nothing to save or upload.

X.com and TikTok need nothing: their cards already show your latest posts (`@lpblsa_onX` and `@lpblsa`).
Instagram is the only one that needs this setup, because Instagram has no "embed my profile" button. To read your
posts, Instagram wants a key (an **access token**) that only you can make, because it means logging in to the account.

How it fits together:

- **A GitHub Action** (`.github/workflows/instagram-feed.yml`, which runs `scripts/fetch-instagram.py`) asks Instagram
  for your latest posts every 4 hours. It saves them, small copies of the pictures included, in one file on a side
  branch of the repo called **`instagram-feed`**. It never touches `main`, so your own commit + push works exactly as before.
- **The site** (`assets/socials-view.js`) reads that file and draws the card.
- **Every Monday** the Action also renews the token, so it never runs out (step 6).

Until the setup is done (or if it ever stops working), the Instagram card shows your newest Instagram post from the
Socials writer instead, the same as today. So it is safe to push the files first and do the setup whenever you like.

**The token is a password to your Instagram account.** It goes in one place only: GitHub's **Secrets** (step 5).
Never paste it in a chat or an email (not even to Claude), and never put it in a file in the repo. The repo is
public, so anyone could read it there.

Meta changes the wording of its developer pages now and then. If a button is named slightly differently, look for
the closest one.

## 1. Check the Instagram account

`@lpblsa` must be a **professional** account (Business or Creator). It already is (category "Sport Club"), so
there is nothing to do here.

## 2. Create a Meta app (it is free)

1. Go to **https://developers.facebook.com/apps** and log in with your Facebook account. The first time, Meta asks you
   to register as a developer: accept the terms and confirm your email or phone.
2. Click **Create app**.
3. **App name:** `LPBLSA Website` (Meta refuses names containing "Instagram", "Insta", "IG" or "Facebook").
   **Contact email:** yours. Click **Next**.
4. **Use cases:** pick **Manage messaging & content on Instagram** (if you don't see it, filter by
   **Content management**). Click **Next**.
5. **Business:** choose **I don't want to connect a business portfolio yet**. Click **Next**.
6. Click through the last screens (**Next**, then **Create app**). Meta may ask for your Facebook password again.

You land on the app's **Dashboard**. Leave the app in **Development** mode. That is all this needs: the app only
reads your own account, so it never has to be "published" or reviewed by Meta.

## 3. Turn on the permissions

1. On the Dashboard, click **Customize the "Manage messaging & content on Instagram" use case**
   (or, in the left menu, **Use cases**, then **Customize** next to it).
2. Open **API setup with Instagram login**.
3. In step 1 of that page, click **Add all required permissions**.

## 4. Let `@lpblsa` use the app (the "Instagram Tester" invite)

1. In the left menu: **App roles > Roles** (step 2 of the API setup page also links to it).
2. Click **Add People**, choose **Instagram Tester**, type `lpblsa` and click **Add**. It shows as **Pending**.
3. On a computer, open **https://www.instagram.com/accounts/manage_access/** logged in as `@lpblsa`
   (that is Instagram > Settings > **Apps and websites**). Open the **Tester invites** tab and click **Accept**.
4. Back on **App roles > Roles**, "Pending" is gone.

## 5. Make the token and save it on GitHub

1. Back to **API setup with Instagram login**. In step 2, **Generate access tokens**, click **Add account** and log in
   as `@lpblsa`. Allow the access it asks for.
2. `lpblsa` now shows in the list. Click **Generate token** next to it.
3. The token shows **only once**. Tick the box and copy it.
4. On GitHub, open the repo and go to **Settings > Secrets and variables > Actions > New repository secret**.
   - Name: `IG_TOKEN`
   - Secret: paste the token
   - Click **Add secret**.

The token is good for 60 days. Step 6 makes it renew itself every Monday, so you never have to make it again.

## 6. Let the token renew itself (recommended)

To save the renewed token, the Action needs permission to change the repo's secrets. You give it that with a GitHub
token that can do only that, on this repo only:

1. GitHub: your picture (top right) > **Settings > Developer settings > Personal access tokens > Fine-grained tokens >
   Generate new token**.
2. **Token name:** `LPBLSA Instagram renewal`.
   **Expiration:** the longest it offers (1 year, or *No expiration* if you see it). Put a reminder in your calendar for that date.
3. **Repository access:** **Only select repositories** > `LPBLSA`.
4. **Permissions > Repository permissions > Secrets:** **Read and write**. Leave everything else as it is.
5. Click **Generate token** and copy it.
6. Repo **Settings > Secrets and variables > Actions > New repository secret**:
   - Name: `GH_PAT`
   - Secret: paste it
   - Click **Add secret**.

Without `GH_PAT` everything still works, but the Instagram token is not renewed. You would then need to repeat step 5
(and **Update** the `IG_TOKEN` secret) every 60 days. The Monday runs remind you with a yellow warning.

## 7. Push, then run it once

1. Push the site files as usual (the workflow file has to be on `main` for GitHub to see it).
2. On GitHub: **Actions** tab > **Instagram feed** (left list) > **Run workflow** > **Run workflow**.
3. About a minute later it shows a green check. Click the run: the summary says how many posts it saved.
4. Open the site. The Instagram card shows the grid. GitHub can take up to 5 minutes to hand out the new file, so if
   you still see the old card, wait a bit and reload.

From then on it runs by itself every 4 hours, plus the token renewal on Mondays.

## If something goes wrong

GitHub emails you when a run fails (a red X in the **Actions** tab). Click the run to read what it says. Meanwhile the
site keeps showing the last posts it saved, so visitors never see an empty card.

| The run says | What to do |
|---|---|
| *The Instagram feed is not set up yet* (a grey note, the run stays green) | Nothing is wrong: do steps 2 to 5 when you are ready. Until then the runs just skip. |
| *Instagram does not accept the token any more* | The token expired or was cut off (60 days without renewal, an Instagram password change, or the app removed under Instagram > Apps and websites). Do step 5 again, then open the `IG_TOKEN` secret and click **Update**. |
| *GH_PAT cannot change the secrets* | The GitHub token expired or is missing the Secrets permission. Do step 6 again and **Update** the `GH_PAT` secret. |
| *Token not renewed: there is no GH_PAT secret* (yellow) | Only a warning. Do step 6, or remember to remake the token every 60 days. |
| *Token not renewed this time ... 24 hours* (yellow) | Normal right after making a token. It renews next Monday. |

- **GitHub emailed that a scheduled workflow was disabled:** GitHub pauses timed Actions in a public repo that has not
  had a push in 60 days (the off-season, say). Actions > **Instagram feed** > **Enable workflow**.
- **To renew the token right now:** Actions > Instagram feed > Run workflow, tick **Also renew the Instagram token now**.
- **To stop the Instagram card:** in `assets/socials-view.js`, set `instagram: ''` in `LIVE`. The section then shows
  your Instagram posts from the Socials writer again. You can also disable the workflow in the Actions tab.
- **More or fewer posts:** `IG_SHOW` in `assets/socials-view.js` (how many the card shows), and add
  `POSTS: "12"` under `env:` in the workflow (how many it saves; it saves 9 unless you add that).
