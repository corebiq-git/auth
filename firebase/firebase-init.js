(function () {
  'use strict';
  window.CoreBIQ = window.CoreBIQ || {};
  CoreBIQ.firebaseReady = false;
  CoreBIQ.firebaseConfigured = false;

  function validConfig(c) {
    return c && c.apiKey && c.projectId && c.appId && !String(c.apiKey).startsWith('YOUR_') && !String(c.projectId).startsWith('YOUR_');
  }

  window.addEventListener('load', function () {
    if (!validConfig(window.COREBIQ_FIREBASE_CONFIG)) {
      console.warn('CoreBIQ Firebase is not configured. Add values in firebase/firebase-config.js.');
      document.documentElement.classList.add('firebase-not-configured');
      return;
    }
    if (!window.firebase) {
      console.error('Firebase SDK failed to load.');
      return;
    }
    try {
      if (!firebase.apps.length) firebase.initializeApp(window.COREBIQ_FIREBASE_CONFIG);
      CoreBIQ.auth = firebase.auth();
      // Login only loads Firebase Auth; the full app also loads Firestore/Storage.
      // Initialize these services only when their Compat SDKs are available.
      if (window.firebase.firestore) CoreBIQ.db = firebase.firestore();
      if (window.firebase.storage) CoreBIQ.storage = firebase.storage();
      CoreBIQ.firebaseReady = true;
      CoreBIQ.firebaseConfigured = true;
      window.dispatchEvent(new CustomEvent('corebiq:firebase-ready'));
    } catch (err) {
      console.error('Firebase initialization failed', err);
    }
  });
})();
