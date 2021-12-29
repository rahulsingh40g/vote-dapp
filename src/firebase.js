import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC44P35nYE1BnvAJr84o4D-UJkFR32xFBM",
    authDomain: "vote-dapp.firebaseapp.com",
    projectId: "vote-dapp",
    storageBucket: "vote-dapp.appspot.com",
    messagingSenderId: "687454000213",
    appId: "1:687454000213:web:e64509621562dcc62370dc",
    measurementId: "G-QVY74C6HF2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;