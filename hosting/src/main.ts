import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  CollectionReference,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATnGOJTDgXe1hmwMY2lMEG-bsJGyUVxfU",
  authDomain: "tasteful-48763.firebaseapp.com",
  projectId: "tasteful-48763",
  storageBucket: "tasteful-48763.appspot.com",
  messagingSenderId: "347686408324",
  appId: "1:347686408324:web:190251749ae113d26bb2d1",
  measurementId: "G-BYQK03XM3E",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//auth
const auth = getAuth();
const button = document.querySelector("#signin");



button?.addEventListener("click", (clickEvent) => {
  signInWithRedirect(auth, new GoogleAuthProvider());
});
