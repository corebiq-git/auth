// CoreBIQ Fly
// Firebase Authentication
// Firebase JS SDK - Modular API

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc
} from "firebase/firestore";


// ============================================================
// FIREBASE CONFIG
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyDShAm9Nnj7sodlfzQFZ727pc9WhU-fc",
  authDomain: "corebic--inspirego.firebaseapp.com",
  projectId: "corebic--inspirego",
  storageBucket: "corebic--inspirego.firebasestorage.app",
  messagingSenderId: "1091888608027",
  appId: "1:1091888608027:web:6d4b56472871e3c48299be",
  measurementId: "G-FTT83137B0"
};


// ============================================================
// INITIALIZE FIREBASE
// ============================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


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

    const credential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    return credential.user;
  },


  // ----------------------------------------------------------
  // LOGOUT
  // ----------------------------------------------------------

  async logout() {

    await signOut(auth);

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

    await sendPasswordResetEmail(
      auth,
      email
    );

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

    await sendEmailVerification(user);

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

    await updateProfile(user, {
      displayName: String(displayName || "").trim()
    });

    return user;
  },


  // ----------------------------------------------------------
  // LOAD FIRESTORE USER PROFILE
  // ----------------------------------------------------------

  async getUserProfile(uid = null) {

    const user = auth.currentUser;

    const userId = uid || user?.uid;

    if (!userId) {
      return null;
    }

    const snap = await getDoc(
      doc(db, "users", userId)
    );

    if (!snap.exists()) {
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

    const profile =
      await this.getUserProfile();

    return profile?.role || null;
  },


  // ----------------------------------------------------------
  // COMPANY
  // ----------------------------------------------------------

  async getCompanyId() {

    const profile =
      await this.getUserProfile();

    return profile?.companyId || null;
  },


  // ----------------------------------------------------------
  // AUTH STATE
  // ----------------------------------------------------------

  onAuthChanged(callback) {

    return onAuthStateChanged(
      auth,
      callback
    );
  }

};


// ============================================================
// GLOBAL AUTH STATE
// ============================================================

window.CoreBIQAuth.onAuthChanged(
  async (user) => {

    if (!user) {

      document.documentElement.dataset.auth =
        "signed-out";

      return;
    }


    document.documentElement.dataset.auth =
      "signed-in";


    try {

      const profile =
        await window.CoreBIQAuth
          .getUserProfile(user.uid);

      if (profile) {

        document.documentElement.dataset.role =
          profile.role || "";

        document.documentElement.dataset.companyId =
          profile.companyId || "";

        window.CoreBIQAuth.profile =
          profile;
      }

    } catch (error) {

      console.error(
        "CoreBIQ profile load failed:",
        error
      );

    }

  }
);


// ============================================================
// EXPORTS
// ============================================================

export {
  app,
  auth,
  db
};