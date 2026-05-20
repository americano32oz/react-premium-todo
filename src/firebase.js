import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 자동으로 생성된 Firebase 설정값입니다.
const firebaseConfig = {
  apiKey: "AIzaSyB4TjpQdKlYZdGe4odIYG1C8Cj-18ssurk",
  authDomain: "aiginue-todo-260516.firebaseapp.com",
  projectId: "aiginue-todo-260516",
  storageBucket: "aiginue-todo-260516.firebasestorage.app",
  messagingSenderId: "65148674522",
  appId: "1:65148674522:web:2e984ba1dd7bafd8bb60e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "default");

export { db };
