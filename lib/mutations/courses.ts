import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../supabase";


export const useStartChapter = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ courseId, chapterOrder }: { courseId: string; chapterOrder: number }) => {
      if (!user) throw new Error("User not authenticated");

      const { data: courseData } = await supabase
        .from("courses")
        .select("total_chapters")
        .eq("id", courseId)
        .single();

      if (!courseData) throw new Error("Course not found");

      const { data: courseChapters } = await supabase
        .from("chapters")
        .select("id")
        .eq("course_id", courseId);

      const courseChapterIds = courseChapters?.map(ch => ch.id) || [];
      const totalChapters = courseChapterIds.length || courseData.total_chapters;

      const { data: completedChaptersData } = await supabase
        .from("user_chapter_progress")
        .select("chapter_id")
        .eq("user_id", user.id)
        .eq("is_completed", true)
        .in("chapter_id", courseChapterIds);

      const completedCount = completedChaptersData?.length || 0;
      const progressPercentage = totalChapters > 0
        ? Math.round((completedCount / totalChapters) * 100)
        : 0;

      const { data, error } = await supabase
        .from("user_course_progress")
        .upsert({
          user_id: user.id,
          course_id: courseId,
          progress_percentage: progressPercentage,
          current_chapter_order: chapterOrder,
          last_accessed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      queryClient.invalidateQueries({ queryKey: ["course-content", courseId] });
      queryClient.invalidateQueries({ queryKey: ["path"] });
      queryClient.invalidateQueries({ queryKey: ["path-of-the-week"] });
      queryClient.invalidateQueries({ queryKey: ["continue-learning-paths"] });
      queryClient.invalidateQueries({ queryKey: ["explore-paths"] });
      queryClient.invalidateQueries({ queryKey: ["all-user-paths"] });
      queryClient.invalidateQueries({ queryKey: ["path-courses"] });
    },
  });
};

export const useCompleteChapter = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ courseId, chapterId }: { courseId: string; chapterId: string; chapterOrder: number; totalChapters: number }) => {
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("user_chapter_progress")
        .upsert({
          user_id: user.id,
          chapter_id: chapterId,
          is_completed: true,
          completed_at: new Date().toISOString(),
        });

      if (error) throw error;
    },
    onSuccess: (_, { courseId }) => {
      queryClient.refetchQueries({ queryKey: ["course", courseId] });
      queryClient.refetchQueries({ queryKey: ["featured-course"] });
      queryClient.invalidateQueries({ queryKey: ["course-content", courseId] });
      queryClient.invalidateQueries({ queryKey: ["path"] });
      queryClient.invalidateQueries({ queryKey: ["path-of-the-week"] });
      queryClient.invalidateQueries({ queryKey: ["continue-learning-paths"] });
      queryClient.invalidateQueries({ queryKey: ["explore-paths"] });
      queryClient.invalidateQueries({ queryKey: ["all-user-paths"] });
      queryClient.invalidateQueries({ queryKey: ["path-courses"] });
    },
  });
};

