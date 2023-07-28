// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const analytics = async () => {
  const result = (await isSupported()) ? getAnalytics(app) : null;
  return result;
};

const auth = getAuth(app);
const firestore = getFirestore(app);

// if (typeof window !== undefined) {
//   if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
//     connectAuthEmulator(auth, "http://localhost:9099");
//   }
// }

export { auth, firestore, app, analytics };
