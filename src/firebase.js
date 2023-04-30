import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA55dkAX1tTnFV2mjlRx47B4Rst1YaZglI",
  authDomain: "chat-d1ffd.firebaseapp.com",
  databaseURL: "https://chat-d1ffd-default-rtdb.firebaseio.com",
  projectId: "chat-d1ffd",
  storageBucket: "chat-d1ffd.appspot.com",
  messagingSenderId: "877790563069",
  appId: "1:877790563069:web:d09bead9b15ec531628c94",
  measurementId: "G-W59LQLHXTJ"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getDatabase(app);
