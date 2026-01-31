import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "⚠️ Missing Supabase credentials!\n" +
    "Please create a .env file in the project root with:\n" +
    "EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\n" +
    "EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxx\n\n" +
    "Get these values from: https://app.supabase.com → Settings → API\n" +
    "- Project URL: found in API settings or General settings\n" +
    "- Publishable key: found in 'Publishable and secret API keys' section"
  );
}

// Create storage adapter that works for both web and native
const createStorageAdapter = () => {
  if (Platform.OS === "web") {
    // Use localStorage for web
    return {
      getItem: (key: string) => {
        if (typeof window !== "undefined") {
          return Promise.resolve(window.localStorage.getItem(key));
        }
        return Promise.resolve(null);
      },
      setItem: (key: string, value: string) => {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, value);
        }
        return Promise.resolve();
      },
      removeItem: (key: string) => {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(key);
        }
        return Promise.resolve();
      },
    };
  }
  // Use AsyncStorage for native platforms
  return AsyncStorage;
};

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
  {
    auth: {
      storage: createStorageAdapter(),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

