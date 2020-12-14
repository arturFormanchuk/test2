import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyA4yZRUWVhqg8nVP2V0YVz8Hp5jFX7-owQ",
  authDomain: "test-fast-rewards2.firebaseapp.com",
  projectId: "test-fast-rewards2",
  storageBucket: "test-fast-rewards2.appspot.com",
  messagingSenderId: "158330043660",
  appId: "1:158330043660:web:76a238f9973027f8d61d29",
  measurementId: "G-5876XE9MQY"
});

export default firebaseConfig;