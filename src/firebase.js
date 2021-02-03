import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBdJR6A2-xscc-nT2h0pR146xpYlmqWH50",
  authDomain: "drop-2b692.firebaseapp.com",
  projectId: "drop-2b692",
  storageBucket: "drop-2b692.appspot.com",
  messagingSenderId: "699894944847",
  appId: "1:699894944847:web:bc034416ba72b8d43ec63a",
  measurementId: "G-0PXWS1H1DY"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;