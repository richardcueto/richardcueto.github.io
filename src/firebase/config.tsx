import { initializeApp } from "firebase/app";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCxsKX-HVIzFvqYkj_whuTboCC6uNQgkaE",
    authDomain: "rcpython-dd005.firebaseapp.com",
    projectId: "rcpython-dd005",
    storageBucket: "rcpython-dd005.firebasestorage.app",
    messagingSenderId: "566343666438",
    appId: "1:566343666438:web:b25f8b1b1dca9d223cec87"
};

// Inicializamos la app de Firebase
const app = initializeApp(firebaseConfig);

export default app ;