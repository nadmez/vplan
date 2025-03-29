# VPlan: Firebase and Database Implementation Steps

This document outlines the specific steps required to set up Firebase, design the database schema, integrate Firebase with the Expo React Native application, implement authentication, and handle data storage and fetching.

## Firebase and Database Implementation Steps

1.  **Firebase Setup (Focusing on Realtime Database):**

    - **1.1. Create a Firebase Project:**

      - Go to the Firebase console: [https://console.firebase.google.com/](https://console.firebase.google.com/)
      - Click on "Add project."
      - Enter a name for your project (e.g., "VPlan").
      - Follow the on-screen prompts to set up the project. You may or may not enable Google Analytics, its your choice.

    - **1.2. Enable Realtime Database:**

      - In the Firebase console, navigate to "Realtime Database" in the left-hand menu under "Build".
      - Click "Create database."
      - Choose a location for your database.
      - Select "Start in test mode" for now. This will give you open read/write access for 30 days, which is useful during development. **Important:** You must set up security rules before deploying to production. Click to "Enable".

    - **1.3. Enable Authentication Methods:**

      - In the Firebase console, navigate to "Authentication" in the left-hand menu under "Build".
      - Click on the "Sign-in method" tab.
      - Enable the authentication providers you want to use (e.g., Google, Facebook, GitHub, Yahoo).
      - For each provider, you'll need to:
        - Enable it.
        - Configure it (e.g., for Google, you'll need to provide your project's support email).
        - Follow any additional instructions provided by Firebase for each provider.

    - **1.4. Configure Your Android App:**

      - In your Firebase project's "Project overview," click on the Android icon to add an Android app.
      - Enter your app's package name (e.g., `com.yourname.vplan`).
      - Enter a nickname for your app (optional).
      - You may or may not provide a Debug signing certificate SHA-1.
      - Click "Register app."
      - Download the `google-services.json` file and place it in the root directory of your Expo React Native project. **Important:** It must be placed in the root directory.
      - Click Next and follow the instructions.
      - Click "Continue to console".

    - **1.5. Firebase Configuration:**
      - The `google-services.json` file contains your Firebase configuration. This will be used by the Firebase SDK to connect to your project.
    - **1.6 Configure Security Rules**
      - In the Firebase console, navigate to "Realtime Database" in the left-hand menu under "Build".
      - Click on the "Rules" tab.
      - Define your security rules.

2.  **Database Schema:**

    - Design the exact schema for your data.
    - Define the collections (or tables) for each data type (e.g., users, matches, venues, participation).
    - Define the documents (or rows) within each collection.
    - Define the fields (or columns) for each document, including data types (e.g., string, number, boolean, timestamp).
    - Consider relationships between collections (e.g., one-to-many, many-to-many).
    - Define indexes for efficient querying.
    - Define security rules to control data access.

3.  **Firebase Integration:**

    - Integrate the Firebase SDK into your Expo React Native project.
    - Install the necessary Firebase packages (e.g., `@react-native-firebase/app`, `@react-native-firebase/database`, `@react-native-firebase/auth`).
    - Initialize Firebase in your application's entry point.
    - Configure Firebase with your project's credentials.

4.  **Authentication Flow:**

    - Implement the authentication flow using `expo-auth-session` for OAuth 2.0 providers (Google, Facebook, GitHub, Yahoo).
    - Integrate `expo-auth-session` with Firebase Authentication.
    - Handle the authentication process, including redirecting the user to the provider's login page and handling the callback.
    - Store the user's authentication token securely using `expo-secure-store`.
    - Implement token refresh logic to maintain user sessions.
    - Implement sign-out functionality.

5.  **Data Storage:**

    - After successful authentication, start storing user data in the database.
    - Create new user documents in the "users" collection (or table) when a new user registers.
    - Store relevant user information (e.g., user ID, username, email, provider, creation date, last login date).
    - Implement the logic to store match, venue, and participation data.

6.  **Data Fetching:**

    - Implement the logic to fetch data from the database.
    - Retrieve user data, match data, venue data, and participation data as needed.
    - Use appropriate queries to efficiently retrieve the required data.
    - Handle real-time updates from the database.
    - Handle errors and loading states when fetching data.

7.  **Database Schema Design:**

    - Design the exact schema for your data, based on the requirements outlined in `vplan.md`.
    - **Collections:** Define the following collections (or tables):
      - **users:**
        - `userId` (string, unique identifier)
        - `username` (string)
        - `email` (string)
        - `provider` (string, e.g., "google," "facebook," "github")
        - `createdAt` (timestamp)
        - `lastLogin` (timestamp)
        - `profilePictureUrl` (string, optional)
        - `other relevant profile information` (string, optional)
      - **matches:**
        - `matchId` (string, unique identifier)
        - `organizerId` (string, reference to a user)
        - `dateTime` (timestamp)
        - `location` (string)
        - `capacity` (number)
        - `other relevant match details` (string, optional)
      - **venues:**
        - `venueId` (string, unique identifier)
        - `name` (string)
        - `address` (string)
        - `mapLocation` (object, e.g., { latitude: number, longitude: number })
        - `pictures` (array of strings, URLs)
        - `contactInformation` (string)
      - **participations:**
        - `participationId` (string, unique identifier)
        - `matchId` (string, reference to a match)
        - `userId` (string, reference to a user)
        - `status` (string, e.g., "pending," "approved," "rejected")
    - **Relationships:** Consider the following relationships:
      - One-to-many: One user can organize multiple matches.
      - Many-to-many: Many users can participate in many matches (through the `participations` collection).
    - Define indexes for efficient querying, especially for searching matches by location or date/time.
    - Define security rules to control data access, ensuring that only authorized users can modify specific data.
