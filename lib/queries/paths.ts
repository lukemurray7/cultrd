import { useQuery } from "@tanstack/react-query";
import { Course } from "../../types/courses";
import {
    LearningPath,
    LearningPathProgress,
    PathOfTheWeek,
} from "../../types/paths";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../supabase";
import { transformCourse, transformPath, transformPathOfTheWeek } from "../utils/dbTransformers";

export const usePathOfTheWeek = () => {
  return useQuery<PathOfTheWeek>({
    queryKey: ["path-of-the-week"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("learning_paths")
        .select(`
          *,
          topic:topics!topic_id(*),
          learning_path_courses(
            course_id,
            order
          )
        `)
        .eq("is_path_of_the_week", true)
        .single();

      if (error) throw error;
      if (!data) throw new Error("No path of the week found");

      return transformPathOfTheWeek(data);
    },
  });
};

export const useContinueLearningPaths = () => {
  const { user } = useAuth();
  
  return useQuery<LearningPathProgress[]>({
    queryKey: ["continue-learning-paths", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("user_path_progress")
        .select(`
          *,
          learning_paths(
            *,
            topic:topics!topic_id(*),
            learning_path_courses(
              course_id,
              order
            )
          )
        `)
        .eq("user_id", user.id)
        .order("last_accessed_at", { ascending: false });

      if (error) throw error;
      if (!data) return [];

      return data
        .filter((progress) => progress.learning_paths)
        .map((progress) => {
          const path = progress.learning_paths as any;
          return transformPath(path, progress) as LearningPathProgress;
        });
    },
    enabled: !!user,
  });
};

export const useExplorePaths = () => {
  const { user } = useAuth();
  
  return useQuery<LearningPath[]>({
    queryKey: ["explore-paths", user?.id],
    queryFn: async () => {
      const { data: pathsData, error: pathsError } = await supabase
        .from("learning_paths")
        .select(`
          *,
          topic:topics!topic_id(*),
          learning_path_courses(
            course_id,
            order
          )
        `)
        .eq("is_path_of_the_week", false)
        .order("created_at", { ascending: false });

      if (pathsError) throw pathsError;
      if (!pathsData) return [];

      let userPathIds: string[] = [];
      if (user) {
        const { data: progressData } = await supabase
          .from("user_path_progress")
          .select("path_id")
          .eq("user_id", user.id);
        
        userPathIds = progressData?.map((p) => p.path_id) || [];
      }

      return pathsData
        .filter((path) => !userPathIds.includes(path.id))
        .map((path) => transformPath(path) as LearningPath);
    },
  });
};

export const usePath = (pathId: string) => {
  const { user } = useAuth();
  
  return useQuery<LearningPath | LearningPathProgress | null>({
    queryKey: ["path", pathId, user?.id],
    queryFn: async () => {
      if (!pathId) return null;

      const { data, error } = await supabase
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
        .eq("id", pathId)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null;
        throw error;
      }

      if (!data) return null;

      const progress = user && Array.isArray(data.user_path_progress)
        ? data.user_path_progress.find((p: { user_id: string }) => p.user_id === user.id)
        : undefined;

      return transformPath(data, progress);
    },
    enabled: !!pathId,
  });
};

export const useAllUserPaths = () => {
  const { user } = useAuth();
  
  return useQuery<LearningPathProgress[]>({
    queryKey: ["all-user-paths", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("user_path_progress")
        .select(`
          *,
          learning_paths(
            *,
            topic:topics!topic_id(*),
            learning_path_courses(
              course_id,
              order
            )
          )
        `)
        .eq("user_id", user.id)
        .order("last_accessed_at", { ascending: false });

      if (error) throw error;
      if (!data) return [];

      return data
        .filter((progress) => progress.learning_paths)
        .map((progress) => {
          const path = progress.learning_paths as any;
          return transformPath(path, progress) as LearningPathProgress;
        });
    },
    enabled: !!user,
  });
};

export const usePathCourses = (courseIds: string[]) => {
  const { user } = useAuth();
  
  return useQuery<Course[]>({
    queryKey: ["path-courses", courseIds.join(","), user?.id],
    queryFn: async () => {
      if (courseIds.length === 0) return [];

      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          topic:topics!topic_id(*),
          chapters(*),
          user_course_progress(*)
        `)
        .in("id", courseIds);

      if (error) throw error;
      if (!data) return [];

      const courseMap = new Map(data.map((c) => [c.id, c]));
      
      return courseIds
        .map((id) => {
          const course = courseMap.get(id);
          if (!course) return null;
          
          const progress = user && Array.isArray(course.user_course_progress)
            ? course.user_course_progress.find((p: { user_id: string }) => p.user_id === user.id)
            : undefined;
          
          return transformCourse(course, progress);
        })
        .filter((course): course is Course => course !== null);
    },
    enabled: courseIds.length > 0,
  });
};

