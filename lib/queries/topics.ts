import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';

export interface TopicListItem {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  display_order: number;
}

interface SupabaseTopic {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  display_order: number;
}

export const useTopics = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: async (): Promise<TopicListItem[]> => {
      const { data, error } = await supabase
        .from("topics")
        .select("id, name, slug, color, display_order")
        .order("display_order");

      if (error) throw error;
      return (data || []) as SupabaseTopic[];
    },
  });
};

