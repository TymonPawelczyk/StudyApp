import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostgrestError } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

const PROFILE_STORAGE_KEY = "@StudyApp:localProfile";

export type Profile = {
  id: string;
  full_name?: string | null;
  username?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  website?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
} & Record<string, unknown>;

type ProfileState = {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  notFound: boolean;
  refresh: () => Promise<void>;
};

const isNotFoundError = (error: PostgrestError | null, status?: number) => {
  if (!error) return false;

  if (status === 406) return true;

  return (
    error.code === "PGRST116" ||
    error.message.toLowerCase().includes("row not found")
  );
};

export function useProfile(): ProfileState {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      setNotFound(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setNotFound(false);

    // Try to fetch from server first
    const { data, error: fetchError, status } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (fetchError) {
      if (isNotFoundError(fetchError, status)) {
        // Profile not found on server, try to load from local storage
        try {
          const localData = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
          if (localData) {
            const localProfile = JSON.parse(localData);
            // Merge local data with user id
            setProfile({
              id: user.id,
              ...localProfile,
            } as Profile);
            setNotFound(false);
          } else {
            setProfile(null);
            setNotFound(true);
          }
        } catch (localError) {
          console.error("Error loading local profile:", localError);
          setProfile(null);
          setNotFound(true);
        }
      } else {
        console.error("Error fetching profile", fetchError);
        setError("Could not load your profile. Please try again.");
        setProfile(null);
      }
    } else {
      // Server data found, merge with local data (local takes precedence for edited fields)
      try {
        const localData = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
        if (localData) {
          const localProfile = JSON.parse(localData);
          // Merge: server data as base, local data overrides
          setProfile({
            ...data,
            ...localProfile,
            id: user.id, // Ensure id is always from user
          } as Profile);
        } else {
          setProfile(data as Profile);
        }
      } catch (localError) {
        console.error("Error loading local profile:", localError);
        setProfile(data as Profile);
      }
    }

    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    error,
    notFound,
    refresh: fetchProfile,
  };
}
