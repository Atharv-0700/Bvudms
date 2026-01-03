import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsUJYjyEiknudIm12nfPQXiSghJPFEGeg",
  authDomain: "athgo-5b01d.firebaseapp.com",
  databaseURL: "https://athgo-5b01d-default-rtdb.firebaseio.com",
  projectId: "athgo-5b01d",
  storageBucket: "athgo-5b01d.firebasestorage.app",
  messagingSenderId: "991007865844",
  appId: "1:991007865844:web:da47a8d0ef8be91e5317a1",
  measurementId: "G-NYYBK3JQ7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;
