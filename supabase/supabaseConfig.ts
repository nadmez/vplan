import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// 2. Validate that the environment variables are loaded
if (!supabaseUrl) {
  console.error(
    "Error: Supabase URL is not defined. Make sure EXPO_PUBLIC_SUPABASE_URL is set in your .env file."
  );
  throw new Error("Supabase URL is not defined.");
}

if (!supabaseAnonKey) {
  console.error(
    "Error: Supabase Anon Key is not defined. Make sure EXPO_PUBLIC_SUPABASE_ANON_KEY is set in your .env file."
  );
  throw new Error("Supabase Anon Key is not defined.");
}

// 3. Create and export the Supabase client instance
// We use a type assertion here, assuming validation passed.
// You could also handle the potential null/undefined case more explicitly if preferred.
export const supabase: SupabaseClient = createClient(
  supabaseUrl!,
  supabaseAnonKey!
);

export const supabaseConfig = {
  supabaseUrl,
  supabaseAnonKey,
  name: "Nadir Özkan",
};

console.log("Supabase client initialized."); // Optional: Log success

// You can now import `supabase` from this file anywhere in your app
// to interact with your Supabase database and services.
