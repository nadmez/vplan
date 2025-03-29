# VPlan: Organize and Join Volleyball Matches!

VPlan is an application that allows volleyball enthusiasts to easily organize and join matches. Whether you are an organizer or a player, you can fully enjoy volleyball with VPlan.

## Purpose

The main purpose of VPlan is to organize volleyball matches at a specific time and place and to facilitate the participation of players in these matches. It aims to bring volleyball enthusiasts together and simplify match organization and participation.

## User Types

There are two main user types in VPlan:

1.  **Organizer:**
    - Creates and manages matches.
    - Determines the date, time, location, and other details of the match.
    - Tracks player participation.
    - Makes announcements about the match.
    - **Adds, edits, and manages venue information.**
2.  **Player:**
    - Can view available matches.
    - Can request to participate in matches they are interested in.
    - Can view the details of the matches they have joined.
    - Is informed of announcements about matches.
    - **Can view information about the venues where matches will be played.**

## Key Features (Planned)

- **Match Creation:** Organizers will be able to create matches by specifying the details of the match (date, time, location, capacity, etc.).
- **Match Search and View:** Players will be able to search for available matches and view their details.
- **Participation Request:** Players will be able to request to participate in matches they are interested in.
- **Participation Management:** Organizers will be able to approve or reject players' participation requests.
- **Announcements:** Organizers will be able to make announcements about matches.
- **User Profiles:** Users will be able to create and edit their profiles.
- **Map Integration:** Displaying the locations of matches and venues on the map.
- **Notifications:** Notifications for important updates about matches.
- **Venue Management:**
  - **Venue Addition:** Organizers will be able to add new venue information.
  - **Venue Editing:** Organizers will be able to edit existing venue information (address, map location, pictures, contact information, etc.).
  - **Venue Viewing:** Players and organizers will be able to view venue information.
  - **Venue Search:** Players and organizers will be able to search for venues.

## Database Requirements

- **Real-time Updates:** The application requires a database that supports real-time data synchronization. Changes made to the data should be reflected instantly in all connected clients.
- **User Data Storage:** The database must store user information, including:
  - User ID (unique identifier)
  - Username
  - Email
  - Authentication Provider (e.g., Google, Facebook, GitHub)
  - Creation Date
  - Last Login Date
  - Other relevant profile information
- **Match Data Storage:** The database must store match information, including:
  - Match ID (unique identifier)
  - Organizer ID
  - Date and Time
  - Location
  - Capacity
  - Participants
  - Other relevant match details
- **Venue Data Storage:** The database must store venue information, including:
  - Venue ID (unique identifier)
  - Name
  - Address
  - Map Location
  - Pictures
  - Contact Information
- **Participation Data Storage:** The database must store participation information, including:
  - Match ID
  - User ID
  - Status (pending, approved, rejected)
- **Scalability:** The database should be able to scale to accommodate a growing number of users and data.
- **Security:** The database must have robust security features to protect user data.
- **Offline Support:** The database should ideally provide offline support, allowing the app to function even when the user is offline.
- **Database Choice:** Firebase Realtime Database or Firestore are recommended due to their real-time capabilities, ease of integration with Expo React Native, scalability, and security features.

## Next Steps

1.  **Database Design:** Creating the database schema for users, matches, venues, and participation information.
2.  **User Interface (UI) Design:** Designing the user interface of the application.
3.  **API Development:** Developing the backend and APIs of the application.
4.  **Frontend Development:** Coding the user interface (UI).
5.  **Testing and Debugging:** Testing the application and fixing bugs.
6.  **Deployment:** Publishing the application.

## Contribution

If you would like to contribute to the development of VPlan, please contact us!

## Contact

[Your Email Address]

---

**Note:** This file is prepared for the initial stage of the VPlan project. This file will be updated as the project progresses. **All file, folder, and code naming will be in English.**

**Technology:** This project will be developed using the Expo React Native Framework.
