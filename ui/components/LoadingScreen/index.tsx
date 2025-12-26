import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useEffect } from "react";
import { useAuth } from "../../../lib/auth/AuthProvider";
import { supabase } from "../../../lib/supabase";
import { transformCourse, transformFeaturedCourse, transformPath, transformPathOfTheWeek, transformTopicWithSubtopics } from "../../../lib/utils/dbTransformers";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../Box";
import { LottieAnimation } from "../LottieAnimation";
import { SafeAreaView } from "../SafeAreaView";
import { StatusBar } from "../StatusBar";

const loadingAnimation = require("../../../assets/animations/books.json");

export const LoadingScreen = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    const prefetchData = async () => {
      const prefetchPromises = [];

      prefetchPromises.push(
        queryClient.prefetchQuery({
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
        })
      );

      prefetchPromises.push(
        queryClient.prefetchQuery({
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
        })
      );

      prefetchPromises.push(
        queryClient.prefetchQuery({
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
        })
      );

      prefetchPromises.push(
        queryClient.prefetchQuery({
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
        })
      );

      prefetchPromises.push(
        queryClient.prefetchQuery({
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
              .map((path) => transformPath(path));
          },
        })
      );

      if (user) {
        prefetchPromises.push(
          queryClient.prefetchQuery({
            queryKey: ["continue-learning-paths", user.id],
            queryFn: async () => {
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
                  return transformPath(path, progress);
                });
            },
          })
        );
      }

      prefetchPromises.push(
        queryClient.prefetchQuery({
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

            const coursesBySubtopic = new Map<string, any[]>();
            
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
        })
      );

      await Promise.allSettled(prefetchPromises);
    };

    prefetchData();
  }, [queryClient, user]);

  const logoSource = theme.colors.bg.primary === "hsl(264, 0%, 10%)" 
    ? require("../../../assets/images/logo-white.png")
    : require("../../../assets/images/logo-black.png");

  return (
    <>
      <StatusBar />
      <SafeAreaView bg="primary" flex center>
        <Box center gap={6}>
          <Box width={120} height={120} center>
            <Image
              source={logoSource}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </Box>
          <Box width={160} height={160} center overflow="hidden">
            <LottieAnimation
              source={loadingAnimation}
              autoPlay={true}
              loop={true}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Box>
      </SafeAreaView>
    </>
  );
};

