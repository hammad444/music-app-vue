import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAhU6UjAM6EjL3OhXqxBT0pX6vjH3DN8o0",
    authDomain: "myproject-13004.firebaseapp.com",
    projectId: "myproject-13004",
    storageBucket: "myproject-13004.appspot.com",
    appId: "1:655822564006:web:97d608c95fcfe57b082267",
    measurementId: "G-QW87T8DPY7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const Auth = firebase.auth();
  const Database = firebase.firestore()
  const storage = firebase.storage();
  const userCollection = Database.collection('users');
  const songsCollection = Database.collection('songs');

  export {Auth,Database,userCollection, storage,songsCollection}
