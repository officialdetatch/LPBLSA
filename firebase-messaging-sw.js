/* Background half of the push notifications.
   The browser runs this small file by itself, even when the site is closed, so it can show a
   notification the moment one arrives. Firebase's own code does the work: when a push comes in
   and the site is not open on screen, it shows the notification, and tapping it opens the story.

   !! This file MUST stay at the very top of the site (next to index.html), not in a folder:
   a browser only lets it receive pushes for the folder it sits in.
   !! Keep the version number below the same as SDK_VERSION in assets/push.js.                  */
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
importScripts('assets/firebase-config.js');

(function () {
  var c = self.LPBSA_FIREBASE || {};
  if (!c.apiKey || !c.messagingSenderId) return;
  firebase.initializeApp({
    apiKey: c.apiKey,
    authDomain: c.authDomain,
    projectId: c.projectId,
    appId: c.appId,
    messagingSenderId: c.messagingSenderId
  });
  firebase.messaging();
})();
