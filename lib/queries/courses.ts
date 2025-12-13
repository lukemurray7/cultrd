import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';

export interface Course {
  id: string;
  title: string;
  image_url: string;
}

export interface Subtopic {
  id: string;
  title: string;
  subtitle: string;
  courses: Course[];
}

export interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

interface SupabaseCourse {
  id: string;
  title: string;
  image_url: string;
  display_order: number;
}

interface SupabaseSubtopic {
  id: string;
  title: string;
  subtitle: string;
  display_order: number;
  courses: SupabaseCourse[];
}

interface SupabaseTopic {
  id: string;
  name: string;
  slug: string;
  subtopics: SupabaseSubtopic[];
}

const formatTopicsData = (topics: SupabaseTopic[]): Topic[] => {
  return (topics || [])
    .map((topic: SupabaseTopic) => ({
      id: topic.id,
      title: topic.name,
      subtopics: (topic.subtopics || [])
        .sort((a: SupabaseSubtopic, b: SupabaseSubtopic) => a.display_order - b.display_order)
        .map((subtopic: SupabaseSubtopic) => ({
          id: subtopic.id,
          title: subtopic.title,
          subtitle: subtopic.subtitle,
          courses: (subtopic.courses || [])
            .sort((a: SupabaseCourse, b: SupabaseCourse) => a.display_order - b.display_order)
            .map((course: SupabaseCourse) => ({
              id: course.id,
              title: course.title,
              image_url: course.image_url,
            })),
        })),
    }))
    .filter((topic: Topic) => topic.subtopics.length > 0);
};

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async (): Promise<Topic[]> => {
      const { data, error } = await supabase
        .from("topics")
        .select(
          `
          id,
          name,
          slug,
          subtopics (
            id,
            title,
            subtitle,
            display_order,
            courses (
              id,
              title,
              image_url,
              display_order
            )
          )
        `
        )
        .order("display_order");

      if (error) throw error;
      return formatTopicsData((data || []) as SupabaseTopic[]);
    },
  });
};
