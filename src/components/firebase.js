// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQbR-f0P2rf-PcCOd2Xbw0sNpdOvzv05E",
  authDomain: "website-fb2bd.firebaseapp.com",
  projectId: "website-fb2bd",
  storageBucket: "website-fb2bd.appspot.com",
  messagingSenderId: "831570417827",
  appId: "1:831570417827:web:9a87baf7bea3a9aa30c716"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth();
const db=getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

