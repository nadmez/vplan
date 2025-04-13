// Define an interface for your User data
export interface IUser {
  id: string; // uuid is represented as a string
  name: string;
  last_name: string;
  userType: number;
  created_at: string; // Timestamps are typically strings in ISO format
  updated_at: string;
}

// Interface for creating a new user (id, created_at, updated_at are usually handled by Supabase)
export interface INewUser {
  name: string;
  last_name: string;
  userType: number;
}

// Interface for updating a user (you might update only a subset of fields)
export interface IUpdateUser {
  name?: string;
  last_name?: string;
  userType?: number;
  // updated_at is usually handled by Supabase automatically on update
}
