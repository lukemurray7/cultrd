import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';

interface SupabaseProfile {
  id: string;
  email: string;
}

export interface Profile {
  id: string;
  email: string;
}

export const useProfile = (userId: string | null) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async (): Promise<Profile | null> => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!userId,
  });
};

