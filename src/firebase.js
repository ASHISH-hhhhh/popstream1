import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvQEgPg8qJ_UEmZL2X8ExlX37PNmg9Mf0",
  authDomain: "popstream-424620.firebaseapp.com",
  projectId: "popstream-424620",
  storageBucket: "popstream-424620.appspot.com",
  messagingSenderId: "897959937254",
  appId: "1:897959937254:web:03671955c200721f7ba727",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, provider, doc, setDoc };
