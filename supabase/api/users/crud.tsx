import { supabase } from "@/supabase/supabaseConfig"; // Assuming this path is correct
import { INewUser, IUser, IUpdateUser } from "./types";

// --- CRUD Operations ---

/**
 * CREATE: Adds a new user to the Users table.
 * @param userData - An object containing the new user's details (name, last_name, userType).
 * @returns The newly created user data or null if an error occurred.
 */
export const createUser = async (userData: INewUser): Promise<IUser | null> => {
  try {
    const { data, error } = await supabase
      .from("Users") // Make sure 'Users' matches your table name exactly
      .insert([
        {
          name: userData.name,
          last_name: userData.last_name,
          userType: userData.userType, // Using the provided userType
          // created_at and updated_at are usually handled automatically by Supabase
        },
      ])
      .select() // Select the newly inserted row
      .single(); // Expecting a single row back

    if (error) {
      console.error("Error creating user:", error.message);
      throw error; // Re-throw the error to be handled by the caller
    }

    console.log("User created successfully:", data);
    return data as IUser; // Type assertion, assuming data matches User interface
  } catch (error) {
    console.error("An unexpected error occurred during user creation:", error);
    return null;
  }
};

/**
 * READ: Fetches all users from the Users table.
 * @returns An array of User objects or null if an error occurred.
 */
export const getAllUsers = async (): Promise<IUser[] | null> => {
  try {
    const { data, error } = await supabase.from("Users").select("*"); // Select all columns

    if (error) {
      console.error("Error fetching users:", error.message);
      throw error;
    }

    console.log("Users fetched successfully:", data);
    return data as IUser[];
  } catch (error) {
    console.error("An unexpected error occurred while fetching users:", error);
    return null;
  }
};

/**
 * READ: Fetches a single user by their ID.
 * @param userId - The UUID of the user to fetch.
 * @returns The User object or null if not found or an error occurred.
 */
export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("id", userId) // Filter by the 'id' column
      .single(); // Expecting only one or zero results

    if (error) {
      // 'single()' throws an error if more than one row is found,
      // or if no rows are found (depending on Supabase version/config).
      // PGRU S016 is the code for "No rows found" which might not be an error in all cases.
      if (error.code === "PGRST116") {
        console.log(`User with ID ${userId} not found.`);
        return null;
      }
      console.error(`Error fetching user with ID ${userId}:`, error.message);
      throw error;
    }

    console.log(`User with ID ${userId} fetched successfully:`, data);
    return data as IUser;
  } catch (error) {
    console.error(
      `An unexpected error occurred while fetching user ${userId}:`,
      error
    );
    return null;
  }
};

/**
 * UPDATE: Updates an existing user's details by their ID.
 * @param userId - The UUID of the user to update.
 * @param updates - An object containing the fields to update.
 * @returns The updated IUser object or null if an error occurred.
 */
export const updateUser = async (
  userId: string,
  updates: IUpdateUser
): Promise<IUser | null> => {
  try {
    // Ensure we don't try to update with an empty object
    if (Object.keys(updates).length === 0) {
      console.warn("Update attempted with no changes provided.");
      return await getUserById(userId); // Return current data if no updates
    }

    const { data, error } = await supabase
      .from("Users")
      .update(updates) // Pass the updates object directly
      .eq("id", userId) // Specify which user to update
      .select() // Select the updated row
      .single(); // Expecting a single row back

    if (error) {
      console.error(`Error updating user with ID ${userId}:`, error.message);
      throw error;
    }

    console.log(`User with ID ${userId} updated successfully:`, data);
    return data as IUser;
  } catch (error) {
    console.error(
      `An unexpected error occurred while updating user ${userId}:`,
      error
    );
    return null;
  }
};

/**
 * DELETE: Deletes a user by their ID.
 * @param userId - The UUID of the user to delete.
 * @returns True if deletion was successful (or user didn't exist), false otherwise.
 */
export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    const { error, count } = await supabase
      .from("Users")
      .delete({ count: "exact" }) // Request the count of deleted rows
      .eq("id", userId); // Specify which user to delete

    if (error) {
      console.error(`Error deleting user with ID ${userId}:`, error.message);
      throw error;
    }

    if (count === 0) {
      console.log(`User with ID ${userId} not found for deletion.`);
      // Consider if not finding the user should be treated as success or failure
      // Returning true here means "the user is gone", which might be desired.
    } else {
      console.log(
        `User with ID ${userId} deleted successfully. Count: ${count}`
      );
    }
    return true; // Indicate success (or that the user is no longer present)
  } catch (error) {
    console.error(
      `An unexpected error occurred while deleting user ${userId}:`,
      error
    );
    return false; // Indicate failure
  }
};

// --- Example Usage (you would call these from your components/screens) ---

const exampleUsage = async () => {
  console.log("--- Starting CRUD Example ---");

  // CREATE
  const newUserInfo: INewUser = { name: "John", last_name: "Doe", userType: 1 };
  const createdUser = await createUser(newUserInfo);
  if (!createdUser) return; // Stop if creation failed

  const userId = createdUser.id; // Get the ID of the newly created user

  // READ (Single)
  await getUserById(userId);

  // READ (All)
  await getAllUsers();

  // UPDATE
  const updates: IUpdateUser = { name: "Johnny" };
  await updateUser(userId, updates);

  // READ (Single again to see update)
  await getUserById(userId);

  // DELETE
  await deleteUser(userId);

  // READ (All again to confirm deletion)
  await getAllUsers();

  console.log("--- CRUD Example Finished ---");
};

// You might call exampleUsage() somewhere during development to test,
// but in your app, you'll call individual functions like createUser, getUserById etc.
// based on user actions or component lifecycle.
// exampleUsage();
