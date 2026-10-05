/* Your Firebase project's address book, in ONE place.
   Read by:  assets/comments.js          (login + comments)
             assets/push.js              (the bell / push notifications)
             firebase-messaging-sw.js    (the background file that shows notifications)
   so a change here reaches all three. These values only say WHICH project to talk to;
   they are not passwords, so it is fine that they sit in a public repo.

   vapidKey is the one value you still have to add:
     Firebase console > Project settings (gear) > Cloud Messaging tab > "Web Push certificates"
     > Generate key pair > copy the long "Key pair" text and paste it between the quotes below.
   While vapidKey is empty, the bell is hidden and nothing about push shows on the site.   */
(function (root) {
  'use strict';
  root.LPBSA_FIREBASE = {
    apiKey: 'AIzaSyCa8_nANLmB2rHpY1ZEFoko6NPT-xdv3VQ',
    authDomain: 'lpblsa.firebaseapp.com',
    projectId: 'lpblsa',
    storageBucket: 'lpblsa.firebasestorage.app',
    messagingSenderId: '318390622492',
    appId: '1:318390622492:web:2de36d08a07004bf7302d9',
    vapidKey: 'BL2cyhlbL7wyHCTTVSb-_d2m2UoASKcs3UFkYMwZANMz0kKxvXjt4OMcaqNPKcZQgEfBkw08ghKf-gkkA9yuLuw'
  };
})(typeof self !== 'undefined' ? self : window);
