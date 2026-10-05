# Push notifications: one-time setup (about 15 minutes)

What you get: a bell in the header. People tap it, choose NFL and/or NBA, and press **Activar**. From then
on, every time you publish a NEW story, their phone or computer shows a notification, and tapping it opens
the story. The email alert keeps working next to it.

How it fits together:

- **The site** (this repo) shows the bell and saves each device's "address" in your Firebase database.
- **`firebase-messaging-sw.js`** (at the top of the site) is the small file the browser runs in the background so
  a notification can appear even when the site is closed.
- **A GitHub Action** (`push-alert.yml`) notices a new story when you push `assets/news.js` and sends the push
  through Firebase (free). It is the twin of your email alert and decides "is this story new?" the same way.

Until you finish steps 2 and 3, the bell is hidden and nothing changes on the live site, so it is safe to push
the files first.

Google changes the Firebase console's wording now and then. If a button is named slightly differently, look
for the closest one.

## 1. Update the database rules

1. Firebase console > **Build > Firestore Database > Rules**.
2. Replace everything with the new contents of `firestore.rules` (it now has a `pushTokens` section) and **Publish**.

## 2. Create the "web push key" and paste it into the site

1. Firebase console > the **gear icon > Project settings > Cloud Messaging** tab.
2. Check that **Firebase Cloud Messaging API (V1)** says **Enabled**. If it says disabled, use the three dots next to it >
   *Manage API in Google Cloud Console* > **Enable**.
3. Scroll to **Web configuration > Web Push certificates** and click **Generate key pair**.
4. Copy the long text under **Key pair** and paste it between the quotes of `vapidKey` in `assets/firebase-config.js`:

   ```js
   vapidKey: 'BLc3...your long key...'
   ```

   (It is a public key, like the rest of that file, so it is fine in a public repo.)

## 3. Give GitHub permission to send (the "service account")

1. Firebase console > gear icon > **Project settings > Service accounts**.
2. Click **Generate new private key** > **Generate key**. A `.json` file downloads.
3. On GitHub: your repo > **Settings > Secrets and variables > Actions > New repository secret**.
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Secret: open the downloaded `.json` in any text editor, select **everything** (from the first `{` to the last `}`), copy, paste.
4. **Delete the downloaded file afterwards and never put it in the repo.** It is a password to your Firebase project.
   (If it ever leaks, go back to Service accounts and generate a new key; the old one stops working.)

## 4. Push the site

Push all the new and changed files. `firebase-messaging-sw.js` **must** end up at the top level of the repo, next to
`index.html`, not inside a folder.

## 5. Turn notifications on for yourself

- **Android / computer:** open the site, tap the bell, choose your sports, press **Activar notificaciones**, and allow
  the browser's question. A welcome notification appears right away.
- **iPhone / iPad:** the bell shows the 4-step guide. Install the site to the Home Screen (Safari > Share > *Agregar a
  pantalla de inicio*), open it **from the new icon**, tap the bell, press **Activar**. Needs iOS 16.4 or newer.

## 6. Test the sending

GitHub > **Actions** tab > **News push notification** > **Run workflow**:

- `story_id`: the id of any story in `assets/news.js` (for example `resumen-de-la-semana`).
- `mode`: `dry-run` first (just prints how many devices would get it), then `test`.

`test` sends a `[PRUEBA]` notification to the **newest** device that turned notifications on, which is the one you
just enabled, and nobody else. `send` notifies everyone, and `force` sends again even if that story was already sent.

## Day to day

Nothing to do. Publish a new story as usual (push `assets/news.js`): the email alert and the push both go out
about a minute or two later, after the live site shows the story. Editing an old story sends nothing.

## Good to know

- **People choose their fantasy.** A football story only goes to people who ticked NFL, a basketball story to NBA.
- **iPhones need the install step.** That is Apple's rule, not ours. Anyone who will not install the site can keep using the email alert.
- **Instagram / Discord / WhatsApp browsers** cannot do notifications. The bell tells people to open the link in Safari or Chrome.
- **Devices clean themselves up.** If a phone is gone (uninstalled, data cleared), the sender removes it from the list the next time.
- **Turning off:** the bell > **Desactivar notificaciones** removes that device.
- **Cost:** free. Firebase Cloud Messaging has no charge, and the sender takes seconds of GitHub's free time.
- **Where the list lives:** Firestore > `pushTokens` (one record per device). You will see long random ids and no names; that is expected.
  A record named after a story in `pushSent` just remembers "this story was already announced".

## If something does not work

| What you see | What to check |
|---|---|
| No bell on the site | `vapidKey` is filled in and pushed; hard-refresh the page. |
| Press **Activar** and get "No se pudo activar" | The rules from step 1 are published; `firebase-messaging-sw.js` is at the site's top level; you are not in a private window; in **Brave**, turn on "Use Google services for push messaging" in Settings > Privacy. |
| Bell is there but no notification arrives | Run the Action in `test` mode and read the log lines. On iPhone, check Settings > Notifications > LPBLSA and any Focus mode. |
| The Action is red: "Google refused" | The secret came from this same Firebase project, and **Firebase Cloud Messaging API (V1)** is Enabled (step 2.2). |
| The Action says "not set up yet" | The `FIREBASE_SERVICE_ACCOUNT` secret is missing or misspelled (step 3). |
