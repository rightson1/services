import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCUylQmcAjZkHntFAaHktt69PUVH79x840",
    authDomain: "freelancer-b1b76.firebaseapp.com",
    projectId: "freelancer-b1b76",
    storageBucket: "freelancer-b1b76.appspot.com",
    messagingSenderId: "1008564955016",
    appId: "1:1008564955016:web:6ee2fa8ce27dcd35c27c3d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);