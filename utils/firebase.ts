import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  Auth,
  getReactNativePersistence,
  //TODO: This is a TS error, ignore for now
  browserLocalPersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { Platform } from "react-native";

let app: FirebaseApp, auth: Auth, db: Firestore, storage: FirebaseStorage;

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

//Firestore location is set at europe-west6 zurich

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence:
        Platform.OS === "web"
          ? browserLocalPersistence
          : getReactNativePersistence(ReactNativeAsyncStorage),
    });
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { db, auth, storage, app };
