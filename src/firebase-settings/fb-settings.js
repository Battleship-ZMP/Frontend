 import firebase from 'firebase/app'
 import 'firebase/firestore'

 var firebaseConfig = {
    apiKey: "AIzaSyDL8y7NwSxsYvaNf8M7K_MwMoNMhgMSzow",
    authDomain: "coolrecipes-f4e21.firebaseapp.com",
    databaseURL: "https://coolrecipes-f4e21.firebaseio.com",
    projectId: "coolrecipes-f4e21",
    storageBucket: "coolrecipes-f4e21.appspot.com",
    messagingSenderId: "387025921582",
    appId: "1:387025921582:web:bffc515356a4005b79a1bf",
    measurementId: "G-4BK3297DFV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();


  export default db;