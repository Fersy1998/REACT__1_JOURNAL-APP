import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};
/*
const firebaseConfig = {
    apiKey: "AIzaSyC75IrzHavqA5qGB9iLIbZ9cq-NQEccF9A",
    authDomain: "react-curso-app-de441.firebaseapp.com",
    projectId: "react-curso-app-de441",
    storageBucket: "react-curso-app-de441.appspot.com",
    messagingSenderId: "1011425895933",
    appId: "1:1011425895933:web:33982b7d685d8633fc2594"
  };
const firebaseConfigTesting = {
    apiKey: "AIzaSyDAKHLI2za-ui-vkNQ3BoGgeHWaPxkf2JI",
    authDomain: "database-ce0a2.firebaseapp.com",
    projectId: "database-ce0a2",
    storageBucket: "database-ce0a2.appspot.com",
    messagingSenderId: "896716111699",
    appId: "1:896716111699:web:c3d9899b38902cdf0c6ba6"
  };
  // Initialize Firebase
if(process.env.NODE_ENV==='test'){
  //testing
  firebase.initializeApp(firebaseConfigTesting);
}else{
  //dev/productiom
  firebase.initializeApp(firebaseConfig);

}*/
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
const googleAuthProvider= new firebase.auth.GoogleAuthProvider();

export {
    db, googleAuthProvider, firebase
}