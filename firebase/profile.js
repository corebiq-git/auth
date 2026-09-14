(function () {
  'use strict';
  window.CoreBIQ = window.CoreBIQ || {};
  CoreBIQ.loadProfile = async function (uid) {
    if (!CoreBIQ.db) return null;
    try {
      var snap = await CoreBIQ.db.collection('users').doc(uid).get();
      var profile = snap.exists ? snap.data() : { role: 'staff', status: 'active' };
      CoreBIQ.profile = profile;
      document.documentElement.dataset.role = profile.role || 'staff';
      document.documentElement.dataset.companyId = profile.companyId || '';
      window.dispatchEvent(new CustomEvent('corebiq:profile-ready', { detail: profile }));
      return profile;
    } catch (e) {
      console.error('Unable to load CoreBIQ user profile', e);
      return null;
    }
  };
})();
