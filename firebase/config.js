// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
 import { getAuth } from "firebase/auth";
// import {initializeAuth, getReactNativePersistence} from 'firebase/auth' 
 //import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAZK_9cjR4_pZwCM30tHaWLvK-4FrPitEs",
    authDomain: "project-p-ff1d4.firebaseapp.com", 
    projectId: "project-p-ff1d4",   
    storageBucket: "project-p-ff1d4.appspot.com",   
    messagingSenderId: "88570516996",     
    appId: "1:88570516996:web:e9cade877847840d788751",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firebase.app

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
