import { useQuery } from "@tanstack/react-query";
import { Course } from "../../types/courses";
import { LearningPath, LearningPathProgress } from "../../types/paths";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../supabase";
import { transformCourse, transformPath } from "../utils/dbTransformers";

export const useLibraryCourses = () => {
  const { user } = useAuth();
  
  return useQuery<Course[]>({
    queryKey: ["library-courses", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data: libraryData, error: libraryError } = await supabase
        .from("user_library")
        .select("course_id")
        .eq("user_id", user.id)
        .not("course_id", "is", null)
        .order("created_at", { ascending: false });

      if (libraryError) throw libraryError;
      if (!libraryData || libraryData.length === 0) return [];

      const courseIds = libraryData.map((item) => item.course_id).filter((id): id is string => id !== null);

      const { data: coursesData, error: coursesError } = await supabase
        .from("courses")
        .select(`
          *,
          topic:topics!topic_id(*),
          chapters(*),
          user_course_progress(*)
        `)
        .in("id", courseIds);

      if (coursesError) throw coursesError;
      if (!coursesData) return [];

      return coursesData.map((course) => {
        const progress = Array.isArray(course.user_course_progress)
          ? course.user_course_progress.find((p: { user_id: string }) => p.user_id === user.id)
          : undefined;
        return transformCourse(course, progress);
      });
    },
    enabled: !!user,
  });
};

export const useLibraryPaths = () => {
  const { user } = useAuth();
  
  return useQuery<(LearningPath | LearningPathProgress)[]>({
    queryKey: ["library-paths", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data: libraryData, error: libraryError } = await supabase
        .from("user_library")
        .select("path_id")
        .eq("user_id", user.id)
        .not("path_id", "is", null)
        .order("created_at", { ascending: false });

      if (libraryError) throw libraryError;
      if (!libraryData || libraryData.length === 0) return [];

      const pathIds = libraryData.map((item) => item.path_id).filter((id): id is string => id !== null);

      const { data: pathsData, error: pathsError } = await supabase
        .from("learning_paths")
        .select(`
          *,
          topic:topics!topic_id(*),
          learning_path_courses(
            course_id,
            order
          ),
          user_path_progress(*)
        `)
        .in("id", pathIds);

      if (pathsError) throw pathsError;
      if (!pathsData) return [];

      return pathsData.map((path) => {
        const progress = Array.isArray(path.user_path_progress)
          ? path.user_path_progress.find((p: { user_id: string }) => p.user_id === user.id)
          : undefined;
        return transformPath(path, progress);
      });
    },
    enabled: !!user,
  });
};

