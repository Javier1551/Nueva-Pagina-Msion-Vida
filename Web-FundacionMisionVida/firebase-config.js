import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCsO5hXO3fprE66Wl1ubjtzXUUC-rOL5xA",
  authDomain: "fundacion-mision-vida.firebaseapp.com",
  databaseURL: "https://fundacion-mision-vida-default-rtdb.firebaseio.com",
  projectId: "fundacion-mision-vida",
  storageBucket: "fundacion-mision-vida.appspot.com",
  messagingSenderId: "883747728334",
  appId: "1:883747728334:web:323b9ab9ef308cb5eb599f",
  measurementId: "G-G34X3J5Q91"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore y Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Proveedores de autenticación
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const facebookProvider = new FacebookAuthProvider();

export { db, auth, googleProvider, facebookProvider };
