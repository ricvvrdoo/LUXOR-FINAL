// firebaseConfig.ts
import firebase from 'firebase/compat/app';  // Importa Firebase
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';  // Si usas autenticación

const firebaseConfig = {
    apiKey: "AIzaSyBBMLcp-3tnPtgupoQZAMprNMAq44SNBK4",
    authDomain: "luxor-app-112a6.firebaseapp.com",
    projectId: "luxor-app-112a6",
    storageBucket: "luxor-app-112a6.firebasestorage.app",
    messagingSenderId: "50955784111",
    appId: "1:50955784111:web:7da6014651abf7c2b2a95a",
    measurementId: "G-X83Y7CNBGJ"
};

// Inicializa Firebase en tu app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();  // Si ya está inicializado, usa la instancia existente
}


export { firebase };  // Exporta la configuración para usarla en otras partes de tu app
