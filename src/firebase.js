// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional: Only if using Analytics
const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Firebase Storage
export const GoogleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // The signed-in user info
    const user = result.user;
    const userDocRef = doc(db, "Users", user.uid); // Using user.uid as the document ID
    await setDoc(userDocRef, {
      username: user.displayName,
      email: user.email,
      uid: user.uid,
    });
    console.log("Google User Info:", user);

    return { user, accessToken };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.error("Google Login Error:", errorCode, errorMessage);

    return { errorCode, errorMessage, credential };
  }
};
export const FacebookAuth = async () => {
  try {
    const result = await signInWithPopup(auth, fbProvider);
    // This will give you a Facebook Access Token. You can use it to access Facebook API if needed
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // The signed-in user info
    const user = result.user;
    const userDocRef = doc(db, "Users", user.uid); // Using user.uid as the document ID
    await setDoc(userDocRef, {
      username: user.displayName,
      uid: user.uid,
    });
    console.log("Facebook User Info:", user);

    return { user, accessToken }; // Returning user and token if needed
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    const credential = FacebookAuthProvider.credentialFromError(error);

    console.error("Facebook Login Error:", errorCode, errorMessage);

    return { errorCode, errorMessage, credential }; // Returning error details
  }
};
