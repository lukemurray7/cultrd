import { useQuery } from "@tanstack/react-query";
import { Course, FeaturedCourse, User } from "../../types/courses";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../supabase";
import { transformCourse, transformFeaturedCourse, transformSubtopic, transformTopicWithSubtopics } from "../utils/dbTransformers";

export const useFeaturedCourse = () => {
  const { user } = useAuth();
  
  return useQuery<FeaturedCourse>({
    queryKey: ["featured-course", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          topic:topics!topic_id(*),
          chapters(*),
          user_course_progress(*)
        `)
        .eq("is_featured", true)
        .limit(1)
        .single();

      if (error) throw error;
      if (!data) throw new Error("No featured course found");

      const progress = user && Array.isArray(data.user_course_progress)
        ? data.user_course_progress.find((p: { user_id: string }) => p.user_id === user.id)
        : undefined;

      return transformFeaturedCourse(data, progress);
    },
  });
};

export const useTrendingCourses = () => {
  const { user } = useAuth();
  
  return useQuery<Course[]>({
    queryKey: ["trending-courses", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          topic:topics!topic_id(*),
          chapters(*),
          user_course_progress(*)
        `)
        .eq("is_trending", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!data) return [];

      return data.map((course) => {
        const progress = user && Array.isArray(course.user_course_progress)
          ? course.user_course_progress.find((p: { user_id: string }) => p.user_id === user.id)
          : undefined;
        return transformCourse(course, progress);
      });
    },
  });
};

export const useRecommendedCourses = () => {
  const { user } = useAuth();
  
  return useQuery<Course[]>({
    queryKey: ["recommended-courses", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          topic:topics!topic_id(*),
          chapters(*),
          user_course_progress(*)
        `)
        .eq("is_recommended", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!data) return [];

      return data.map((course) => {
        const progress = user && Array.isArray(course.user_course_progress)
          ? course.user_course_progress.find((p: { user_id: string }) => p.user_id === user.id)
          : undefined;
        return transformCourse(course, progress);
      });
    },
  });
};

export const useUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const { mockUser } = await import("../../__mocks__/courses");
      return Promise.resolve(mockUser);
    },
  });
};

export const useCoursesByTopic = (topicId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["courses-by-topic", topicId, user?.id],
    queryFn: async () => {
      const { data: topicData, error: topicError } = await supabase
        .from("topics")
        .select("*")
        .eq("id", topicId)
        .single();

      if (topicError) throw topicError;
      if (!topicData) return null;

      const { data: subtopics, error: subtopicsError } = await supabase
        .from("subtopics")
        .select("*")
        .eq("topic_id", topicId)
        .order("order", { ascending: true });

      if (subtopicsError) throw subtopicsError;

      const subtopicIds = (subtopics || []).map((s) => s.id);

      const { data: courseSubtopics, error: csError } = await supabase
        .from("course_subtopics")
        .select(`
          course_id,
          subtopic_id,
          course:courses!inner(
            *,
            topic:topics!topic_id(*),
            chapters(*),
            user_course_progress(*)
          )
        `)
        .in("subtopic_id", subtopicIds);

      if (csError) throw csError;

      const coursesBySubtopic = new Map<string, Course[]>();
      
      (courseSubtopics || []).forEach((cs: any) => {
        const course = cs.course;
        const progress = user && Array.isArray(course.user_course_progress)
          ? course.user_course_progress.find((p: { user_id: string }) => p.user_id === user.id)
          : undefined;
        
        const transformedCourse = transformCourse(course, progress);
        const subtopicId = cs.subtopic_id;
        
        if (!coursesBySubtopic.has(subtopicId)) {
          coursesBySubtopic.set(subtopicId, []);
        }
        coursesBySubtopic.get(subtopicId)!.push(transformedCourse);
      });

      return transformTopicWithSubtopics(topicData, subtopics || [], coursesBySubtopic);
    },
    enabled: !!topicId,
  });
};

export const useAllCoursesByTopic = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["all-courses-by-topic", user?.id],
    queryFn: async () => {
      const { data: topics, error: topicsError } = await supabase
        .from("topics")
        .select("*")
        .order("id", { ascending: true });

      if (topicsError) throw topicsError;

      const { data: subtopics, error: subtopicsError } = await supabase
        .from("subtopics")
        .select("*")
        .order("topic_id, order", { ascending: true });

      if (subtopicsError) throw subtopicsError;

      const subtopicIds = (subtopics || []).map((s) => s.id);

      const { data: courseSubtopics, error: csError } = await supabase
        .from("course_subtopics")
        .select(`
          course_id,
          subtopic_id,
          course:courses!inner(
            *,
            topic:topics!topic_id(*),
            chapters(*),
            user_course_progress(*)
          )
        `)
        .in("subtopic_id", subtopicIds);

      if (csError) throw csError;

      const coursesBySubtopic = new Map<string, Course[]>();
      
      (courseSubtopics || []).forEach((cs: any) => {
        const course = cs.course;
        const progress = user && Array.isArray(course.user_course_progress)
          ? course.user_course_progress.find((p: { user_id: string }) => p.user_id === user.id)
          : undefined;
        
        const transformedCourse = transformCourse(course, progress);
        const subtopicId = cs.subtopic_id;
        
        if (!coursesBySubtopic.has(subtopicId)) {
          coursesBySubtopic.set(subtopicId, []);
        }
        coursesBySubtopic.get(subtopicId)!.push(transformedCourse);
      });

      return (topics || []).map((topic) => {
        const topicSubtopics = (subtopics || []).filter((s) => s.topic_id === topic.id);
        return transformTopicWithSubtopics(topic, topicSubtopics, coursesBySubtopic);
      });
    },
  });
};

export const useCoursesBySubtopic = (subtopicId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["courses-by-subtopic", subtopicId, user?.id],
    queryFn: async () => {
      if (subtopicId === "trending") {
        const { data, error } = await supabase
          .from("courses")
          .select(`
            *,
            topic:topics!topic_id(*),
            chapters(*),
            user_course_progress(*)
          `)
          .eq("is_trending", true)
          .order("created_at", { ascending: false });

        if (error) throw error;

        const courses = (data || []).map((course) => {
          const progress = user && Array.isArray(course.user_course_progress)
            ? course.user_course_progress.find((p: { user_id: string }) => p.user_id === user.id)
            : undefined;
          return transformCourse(course, progress);
        });

        return {
          subtopic: {
            id: "trending",
            title: "Trending Now",
            description: "Popular courses trending right now",
            courses,
          },
          topicId: "trending",
        };
      }

      const { data: subtopicData, error: subtopicError } = await supabase
        .from("subtopics")
        .select(`
          *,
          topic:topics!inner(*)
        `)
        .eq("id", subtopicId)
        .single();

      if (subtopicError) throw subtopicError;
      if (!subtopicData) return null;

      const { data: courseSubtopics, error: csError } = await supabase
        .from("course_subtopics")
        .select(`
          course_id,
          course:courses!inner(
            *,
            topic:topics!topic_id(*),
            chapters(*),
            user_course_progress(*)
          )
        `)
        .eq("subtopic_id", subtopicId);

      if (csError) throw csError;

      const courses = (courseSubtopics || []).map((cs: any) => {
        const course = cs.course;
        const progress = user && Array.isArray(course.user_course_progress)
          ? course.user_course_progress.find((p: { user_id: string }) => p.user_id === user.id)
          : undefined;
        return transformCourse(course, progress);
      });

      return {
        subtopic: transformSubtopic(subtopicData, courses),
        topicId: subtopicData.topic.id,
      };
    },
    enabled: !!subtopicId,
  });
};

export const useLibraryCourses = () => {
  const { user } = useAuth();
  
  return useQuery<Course[]>({
    queryKey: ["library-courses", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("user_course_progress")
        .select(`
          *,
          courses(
            *,
            topic:topics!topic_id(*),
            chapters(*)
          )
        `)
        .eq("user_id", user.id)
        .order("last_accessed_at", { ascending: false });

      if (error) throw error;
      if (!data) return [];

      return data
        .filter((progress) => progress.courses)
        .map((progress) => {
          const course = progress.courses as any;
          return transformCourse(course, progress);
        });
    },
    enabled: !!user,
  });
};

export const useCourse = (courseId: string) => {
  const { user } = useAuth();
  
  return useQuery<Course | null>({
    queryKey: ["course", courseId, user?.id],
    queryFn: async () => {
      if (!courseId) return null;

      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          topic:topics!topic_id(*),
          chapters(*),
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

      return transformCourse(data, progress);
    },
    enabled: !!courseId,
  });
};

