// Initialize Realtime Database and get a reference to the service
// const database = getDatabase(app);
// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

export const firebaseConfig = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  name: "Arzu Yılmaz Özkan",
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
