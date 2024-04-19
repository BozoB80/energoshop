import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlJUZj6Qzgr_sDTaLGNZnkHg9JLuqHGe4",
  authDomain: "energo-71137.firebaseapp.com",
  projectId: "energo-71137",
  storageBucket: "energo-71137.appspot.com",
  messagingSenderId: "1065352114874",
  appId: "1:1065352114874:web:3674bd7d165f433a4d0883"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app