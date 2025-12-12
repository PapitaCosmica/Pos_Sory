// firebase_init.js

// Nota: Hemos cambiado la ruta para que apunte correctamente a los módulos en el CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    doc, 
    query,
    where, 
    orderBy,
    limit,
    getDoc, 
    runTransaction

} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


// !!! TU CONFIGURACIÓN REAL !!!
const firebaseConfig = {
    apiKey: "AIzaSyB73BO4HgYzP8ln073t2ncYdOIjulOEt2s",
    authDomain: "posory-e88ac.firebaseapp.com",
    projectId: "posory-e88ac",
    storageBucket: "posory-e88ac.firebasestorage.app",
    messagingSenderId: "922384739378",
    appId: "1:922384739378:web:3ec78ceb480cf32ca2a02b",
    measurementId: "G-99KNXK07C4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener la instancia de Firestore
const db = getFirestore(app);

// Exportar 'db' y las funciones de Firestore que usaremos
export { 
    db,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where, 
    orderBy,
    limit,
    getDoc, 
    runTransaction
};