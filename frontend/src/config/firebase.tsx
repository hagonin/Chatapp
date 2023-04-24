import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: 'AIzaSyBhzaqYfofzCQCPM0gt3Bw1FdQyUsLu77A',
    authDomain: "chat-app-4f3b0.firebaseapp.com",
    projectId: "chat-app-4f3b0",
    storageBucket: "chat-app-4f3b0.appspot.com",
    messagingSenderId: "346998801270",
    appId: "1:346998801270:web:31f4eb58d320588f4a3057",
    measurementId: "G-CRDR2R2NEY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);