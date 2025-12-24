import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { Profile } from "../../types/profiles";

export const useProfile = () => {
  return useQuery<Profile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return null;
        }
        throw error;
      }

      return data as Profile;
    },
  });
};

