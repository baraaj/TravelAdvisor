import app from "firebase/compat/app";
import  "firebase/compat/auth";
//import initfirebase from './index';
import "firebase/compat/database";
import "firebase/compat/storage";
import Authentification from '../screens/Authentification';
import "firebase/compat/database";
import "firebase/compat/storage";

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";
const firebaseConfig = {
 
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  databaseURL:process.env.DATABASE_UR
};

// Initialize Firebase
const initfirebase = app.initializeApp(firebaseConfig);
export default initfirebase