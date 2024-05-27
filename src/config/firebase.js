import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHKjnnlBTow8GtZfK0hvCTWDOsOk4qxx4",
  authDomain: "fir-starter-efa87.firebaseapp.com",
  projectId: "fir-starter-efa87",
  storageBucket: "fir-starter-efa87.appspot.com",
  messagingSenderId: "511800517175",
  appId: "1:511800517175:web:623569e26d36958accd5b2",
  measurementId: "G-0V308MT1D9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
