import { useQuery } from "@tanstack/react-query";
import { CourseContent } from "../../types/courseContent";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../supabase";
import { transformCourseContent } from "../utils/dbTransformers";

export const useCourseContent = (courseId: string) => {
  const { user } = useAuth();
  
  return useQuery<CourseContent | null>({
    queryKey: ["course-content", courseId, user?.id],
    queryFn: async () => {
      if (!courseId) return null;

      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          topic:topics!topic_id(*),
          chapters(
            *,
            slides(*),
            user_chapter_progress(*)
          ),
          user_course_progress(*)
        `)
        .eq("id", courseId)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null;
        throw error;
      }

      if (!data) return null;

      const progress = user && Array.isArray(data.user_course_progress)
        ? data.user_course_progress.find((p: { user_id: string }) => p.user_id === user.id)
        : undefined;

      return transformCourseContent(data, progress);
    },
    enabled: !!courseId,
  });
};

