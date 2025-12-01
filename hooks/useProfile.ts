import { useCallback, useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export type Profile = {
  id: string;
  full_name?: string | null;
  username?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
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

    const { data, error: fetchError, status } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (fetchError) {
      if (isNotFoundError(fetchError, status)) {
        setProfile(null);
        setNotFound(true);
      } else {
        console.error("Error fetching profile", fetchError);
        setError("Could not load your profile. Please try again.");
        setProfile(null);
      }
    } else {
      setProfile(data as Profile);
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
