// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, get, set } from "firebase/database";

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
//   measurementId: "YOUR_MEASUREMENT_ID"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Realtime Database and get a reference to the service
// const database = getDatabase(app);
// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID // Optional
};

let appInstance: FirebaseApp | null = null;
let databaseInstance: Database | null = null;

/**
 * Initializes and/or returns the singleton Firebase App instance.
 * @returns {FirebaseApp} The initialized Firebase App instance.
 */
const getFirebaseApp = (): FirebaseApp => {
  console.log(firebaseConfig);
  if (!appInstance) {
    // Check if required config values are present (basic check)
    if (!firebaseConfig.apiKey) {
      console.warn(
        "Firebase API Key is missing or using placeholder. Please configure it properly."
      );
      // You might want to throw an error here in a real application
      throw new Error("Firebase configuration is incomplete.");
    }
    console.log("Initializing Firebase App..."); // Log initialization
    appInstance = initializeApp(firebaseConfig);
  }
  return appInstance;
};

/**
 * Initializes and/or returns the singleton Firebase Realtime Database instance.
 * @returns {Database} The initialized Firebase Realtime Database instance.
 */
export const getFirebaseDatabase = (): Database => {
  if (!databaseInstance) {
    const app = getFirebaseApp(); // Ensure app is initialized first
    databaseInstance = getDatabase(app);
  }
  return databaseInstance;
};

// You could also export the app getter if needed elsewhere, though often
// you only need specific services like the database.
// export { getFirebaseApp };

// Example of how to use it in another file:
/*
import { getFirebaseDatabase } from './firebase/firebaseConfig';
import { ref, get } from "firebase/database";

const db = getFirebaseDatabase();
const someRef = ref(db, 'users/someUserId');

get(someRef).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
*/
