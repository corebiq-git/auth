(function () {
  'use strict';
  window.CoreBIQ = window.CoreBIQ || {};

  var protectedPath = location.pathname.indexOf('/auth/') !== 0 && !location.pathname.endsWith('/login.html');

  function showConfigNotice() {
    if (!protectedPath) return;
    var splash = document.getElementById('authGate');
    if (splash) {
      splash.innerHTML = '<div class="auth-gate-card"><div class="auth-gate-icon">!</div><h2>Firebase setup required</h2><p>Add your Firebase Web App configuration in <code>firebase/firebase-config.js</code>, then deploy the app from Firebase Hosting.</p></div>';
      splash.classList.add('show');
    }
  }

  function start() {
    if (!protectedPath) return;
    if (!CoreBIQ.firebaseReady) {
      showConfigNotice();
      return;
    }
    CoreBIQ.auth.onAuthStateChanged(function (user) {
      if (!user) {
        location.replace('auth/login.html');
        return;
      }
      CoreBIQ.currentUser = user;
      if (document.getElementById('authGate')) document.getElementById('authGate').classList.remove('show');
      CoreBIQ.loadProfile && CoreBIQ.loadProfile(user.uid);
    });
  }

  window.addEventListener('corebiq:firebase-ready', start);
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (!CoreBIQ.firebaseConfigured) showConfigNotice();
    }, 1200);
  });
})();
