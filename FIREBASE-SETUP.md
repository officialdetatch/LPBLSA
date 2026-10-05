# Comments + login: one-time setup (about 15 minutes)

The site stays on GitHub exactly as it is. The accounts and comments live in a
free Firebase project (Google). Nothing on the free plan needs a credit card, and
it cannot charge you: the free plan simply stops at its limits, which are far
above what 50 people will use.

Until you finish step 2, the news pages look exactly like before, so it is safe
to push the new files first.

Google changes the Firebase console's wording now and then. If a button is named
slightly differently, look for the closest one.

## 1. Create the project

1. Go to https://console.firebase.google.com and sign in with your Google account.
2. **Create a project** (or "Add project"). Name it `lpblsa`.
3. Turn **Google Analytics OFF** (you do not need it). Click **Create project**.
4. Stay on the free **Spark** plan. Never click "Upgrade".

## 2. Connect the website to the project

1. On the project's home page click the **web icon `</>`** ("Add app").
2. App nickname: `LPBLSA site`. Leave "Firebase Hosting" **unchecked**. Click **Register app**.
3. Firebase shows a block of code called `firebaseConfig`. Copy these four values
   into `FIREBASE_CONFIG` at the top of `assets/comments.js`:

   ```js
   var FIREBASE_CONFIG = {
     apiKey: 'AIza...',
     authDomain: 'lpblsa-xxxx.firebaseapp.com',
     projectId: 'lpblsa-xxxx',
     appId: '1:123456:web:abcdef'
   };
   ```

   These are not passwords. They only tell the page which project to talk to, so
   it is fine that they sit in a public GitHub repo. The rules in step 6 are what
   protect the data.

## 3. Turn on the two ways to log in

1. In the left menu: **Build > Authentication > Get started**.
2. **Sign-in method** tab:
   - **Google**: Enable. Pick your email as the "project support email". Save.
   - **Email/Password**: Enable the first switch only (not "Email link"). Save.

## 4. Allow your website's address

Still in Authentication: **Settings > Authorized domains > Add domain**. Add:

- `lpblsa.vip`
- `www.lpblsa.vip`

(`localhost` is already there, so testing on your computer works.) If you skip this,
Google login shows "this site is not authorized".

## 5. Create the database

1. Left menu: **Build > Firestore Database > Create database**.
2. Choose the **Standard** edition if it asks.
3. Location: pick one close to you, such as `nam5 (United States)`. **You cannot change this later.**
4. Start in **production mode**. Click **Create**.

## 6. Paste the safety rules, then make yourself the commissioner

1. In Firestore, open the **Rules** tab.
2. Delete what is there, paste the entire contents of `firestore.rules` exactly as it is, click **Publish**.
3. Now tell the database that you are the commissioner (this is what lets you delete or block anyone's comment):
   1. Push the site, open any news story, and log in once with your own account.
   2. In Firebase: **Authentication > Users**. Copy your **User UID** (a long string of letters and numbers).
   3. Go to **Firestore Database > Data > Start collection**. Collection ID: `admins`.
   4. Document ID: paste your UID. Add one field: name `role`, type string, value `commissioner`. **Save.**
   5. Reload the news story while logged in: **Eliminar** and **Bloquear** now show on every comment.

Until you do step 3, everyone can log in and comment normally; you just cannot delete other people's comments yet.
For a second commissioner, add another document to `admins` with their UID.

## 7. Try it

Testing on your computer: open the site through a local server, not by double-clicking the file
(logins do not work from `file://`). For example, in the site folder run `python3 -m http.server 8000`
and open http://localhost:8000/news.html.

Check: open a story, log in, post a comment, reply to it, delete it. Then log in with a second
account (or a friend) and make sure they can see and reply but cannot delete yours.

## Running it day to day

- **Delete a comment you do not like:** log in with your commissioner account. Every comment shows **Eliminar**.
- **Block someone:** the **Bloquear** button on their comment deletes it and stops them posting again.
  To unblock, open Firestore > Data > `banned` and delete their document.
- **See everyone who signed up:** Authentication > Users. You can disable or delete an account there too.
- **Someone forgot their password:** the login window has "¿Olvidaste tu contraseña?" and sends them a reset email.

## Good to know

- People who open the site from inside Instagram, Discord or WhatsApp's built-in browser cannot use
  Google login (Google blocks it there). The login window tells them to use their email instead.
- Comments are plain text (no links, no pictures), up to 1000 characters.
- Each comment keeps the name the person had when they posted it.
- Free limits, for reference: 50,000 reads and 20,000 writes per day. Fifty people will not come close.
- The commissioner buttons only appear for you, but what really protects the comments is the rules in
  Firebase, so keep them published.
