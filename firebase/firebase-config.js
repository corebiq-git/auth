// CoreBIQ Fly
// Firebase Authentication
// Firebase JS SDK - Compat API
//
// IMPORTANT: This file intentionally keeps the public CoreBIQAuth API used by
// the existing application, while exposing the Web App configuration to the
// existing firebase-init.js compatibility layer.

// ============================================================
// FIREBASE CONFIG
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyDShAm9FNnIj7sodlfzQFZ727pc9WhU-fc",
  authDomain: "corebic--inspirego.firebaseapp.com",
  projectId: "corebic--inspirego",
  storageBucket: "corebic--inspirego.firebasestorage.app",
  messagingSenderId: "1091888608027",
  appId: "1:1091888608027:web:6d4b56472871e3c48299be",
  measurementId: "G-FTT83137B0"
};

// The existing firebase-init.js reads this global configuration.
window.COREBIQ_FIREBASE_CONFIG = firebaseConfig;

// ============================================================
// INITIALIZE FIREBASE
// ============================================================

(function () {
  'use strict';

  if (!window.firebase) {
    console.error('Firebase SDK failed to load before firebase-config.js.');
    return;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    return;
  }

  const app = firebase.app();
  const auth = firebase.auth();
  const db = firebase.firestore();

  // ============================================================
  // COREBIQ AUTH OBJECT
  // ============================================================

  window.CoreBIQAuth = {

    app,
    auth,
    db,

    // ----------------------------------------------------------
    // CURRENT USER
    // ----------------------------------------------------------

    getCurrentUser() {
      return auth.currentUser;
    },

    // ----------------------------------------------------------
    // LOGIN
    // ----------------------------------------------------------

    async login(email, password) {
      email = String(email || "").trim();

      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      const credential = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      return credential.user;
    },

    // ----------------------------------------------------------
    // LOGOUT
    // ----------------------------------------------------------

    async logout() {
      await auth.signOut();
      window.location.href = "auth/login.html";
    },

    // ----------------------------------------------------------
    // PASSWORD RESET
    // ----------------------------------------------------------

    async resetPassword(email) {
      email = String(email || "").trim();

      if (!email) {
        throw new Error("Enter your email address.");
      }

      await auth.sendPasswordResetEmail(email);
      return true;
    },

    // ----------------------------------------------------------
    // EMAIL VERIFICATION
    // ----------------------------------------------------------

    async verifyEmail() {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No signed-in user.");
      }

      if (user.emailVerified) {
        return true;
      }

      await user.sendEmailVerification();
      return true;
    },

    // ----------------------------------------------------------
    // UPDATE DISPLAY NAME
    // ----------------------------------------------------------

    async updateName(displayName) {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No signed-in user.");
      }

      await user.updateProfile({
        displayName: String(displayName || "").trim()
      });

      return user;
    },

    // ----------------------------------------------------------
    // LOAD FIRESTORE USER PROFILE
    // ----------------------------------------------------------

    async getUserProfile(uid = null) {
      const user = auth.currentUser;
      const userId = uid || (user && user.uid);

      if (!userId) {
        return null;
      }

      const snap = await db.collection("users").doc(userId).get();

      if (!snap.exists) {
        return null;
      }

      return {
        uid: userId,
        ...snap.data()
      };
    },

    // ----------------------------------------------------------
    // ROLE
    // ----------------------------------------------------------

    async getRole() {
      const profile = await this.getUserProfile();
      return profile && profile.role || null;
    },

    // ----------------------------------------------------------
    // COMPANY
    // ----------------------------------------------------------

    async getCompanyId() {
      const profile = await this.getUserProfile();
      return profile && profile.companyId || null;
    },

    // ----------------------------------------------------------
    // AUTH STATE
    // ----------------------------------------------------------

    onAuthChanged(callback) {
      return auth.onAuthStateChanged(callback);
    }
  };

  // Keep the existing global auth-state behavior.
  window.CoreBIQAuth.onAuthChanged(async (user) => {
    if (!user) {
      document.documentElement.dataset.auth = "signed-out";
      return;
    }

    document.documentElement.dataset.auth = "signed-in";

    try {
      const profile = await window.CoreBIQAuth.getUserProfile(user.uid);

      if (profile) {
        document.documentElement.dataset.role = profile.role || "";
        document.documentElement.dataset.companyId = profile.companyId || "";
        window.CoreBIQAuth.profile = profile;
      }
    } catch (error) {
      console.error("CoreBIQ profile load failed:", error);
    }
  });
})();
