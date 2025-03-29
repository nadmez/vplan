# VPlan: Initial Setup for Firebase Realtime Database and Expo

This document outlines the initial steps required to set up Firebase Realtime Database and integrate it with your VPlan Expo application.

## Prerequisites

- A Firebase project is set up with Realtime Database enabled.
- At least one authentication method (e.g., Google, Facebook) is configured in Firebase.
- An Android app is added to the Firebase project with the package name `com.nadmez.vplan`.
- The `google-services.json` file is downloaded and placed in the root directory of the Expo project.

## Steps

1.  **Install Firebase Packages:**

    - Navigate to your Expo project's root directory in the terminal.
    - Run the following command to install the necessary packages:

      ```bash
      npx expo install firebase @react-native-firebase/app @react-native-firebase/database @react-native-firebase/auth expo-secure-store expo-auth-session
      ```

2.  **Initialize Firebase:**

    - Create a file named `firebase.js` in your project's root directory.
    - Add the following code:

      ```javascript
      // firebase.js
      import { initializeApp } from "firebase/app";
      import { getDatabase } from "firebase/database";
      import { getAuth } from "firebase/auth";
      import firebaseConfig from "./firebaseConfig"; // Import your config

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      // Initialize Realtime Database
      const database = getDatabase(app);

      // Initialize Authentication
      const auth = getAuth(app);

      export { database, auth };
      ```

    - Create a file named `firebaseConfig.js` in your project's root directory.
    - Add the following code:

      ```javascript
      // firebaseConfig.js
      // Import the functions you need from the SDKs you need
      import { getApps, initializeApp } from "firebase/app";
      import { getDatabase } from "firebase/database";
      import { getAuth } from "firebase/auth";

      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        databaseURL: "YOUR_DATABASE_URL",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
        measurementId: "YOUR_MEASUREMENT_ID",
      };

      // Initialize Firebase
      let app;
      if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApps()[0];
      }

      // Initialize Realtime Database
      const database = getDatabase(app);

      // Initialize Authentication
      const auth = getAuth(app);

      export { database, auth };
      ```

    - Replace the placeholders in `firebaseConfig.js` with your actual Firebase configuration values.

3.  **Implement Authentication:**

    - Create a file named `Auth.js` in your project.
    - Add the following code:

      ```javascript
      // Auth.js
      import * as React from "react";
      import * as WebBrowser from "expo-web-browser";
      import * as Google from "expo-auth-session/providers/google";
      import { auth } from "./firebase"; // Import your Firebase auth instance
      import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
      import { makeRedirectUri } from "expo-auth-session";

      WebBrowser.maybeCompleteAuthSession();

      export default function Auth() {
        const [request, response, promptAsync] = Google.useAuthRequest({
          expoClientId: "YOUR_EXPO_CLIENT_ID",
          androidClientId: "YOUR_ANDROID_CLIENT_ID",
          iosClientId: "YOUR_IOS_CLIENT_ID",
          webClientId: "YOUR_WEB_CLIENT_ID",
          redirectUri: makeRedirectUri({
            scheme: "myapp",
          }),
        });

        React.useEffect(() => {
          if (response?.type === "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
          }
        }, [response]);

        return (
          <Button
            disabled={!request}
            title="Login with Google"
            onPress={() => {
              promptAsync();
            }}
          />
        );
      }
      ```

    - Replace the placeholders in `Auth.js` with your actual client ID values.
    - Add `import Auth from './Auth';` to your main file.
    - Add `<Auth/>` to your main file.

4.  **Access Realtime Database:**

    - You can now access your Realtime Database from any component.
    - Example of reading and writing data (in `ExampleComponent.js`):

      ```javascript
      // ExampleComponent.js
      import React, { useEffect, useState } from "react";
      import { View, Text, Button } from "react-native";
      import { database } from "./firebase"; // Import your Firebase database instance
      import { ref, set, onValue } from "firebase/database";

      export default function ExampleComponent() {
        const [data, setData] = useState(null);

        useEffect(() => {
          // Read data from the database
          const usersRef = ref(database, "users/");
          onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            setData(data);
          });
        }, []);

        const writeData = () => {
          // Write data to the database
          const newUserRef = ref(database, "users/user1");
          set(newUserRef, {
            username: "newuser",
            email: "newuser@example.com",
          });
        };

        return (
          <View>
            <Text>Data from Firebase:</Text>
            {data &&
              Object.keys(data).map((key) => (
                <Text key={key}>
                  {key}: {JSON.stringify(data[key])}
                </Text>
              ))}
            <Button title="Write Data" onPress={writeData} />
          </View>
        );
      }
      ```

## Important Considerations

- **Security Rules:** Set up proper security rules in your Firebase console.
- **Error Handling:** Add error handling to your database interactions.
- **Data Structure:** Plan your data structure carefully.
- **Client IDs:** You must add your client IDs.
- **API Key:** You must add your API Key.
- **`app.json`:** You must have the correct package name in your `app.json` file.
- **`google-services.json`:** You must have the `google-services.json` file in the root directory.
