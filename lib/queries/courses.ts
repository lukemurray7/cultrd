import { useQuery } from "@tanstack/react-query";
import { mockFeaturedCourse, mockRecommendedCourses, mockTrendingCourses, mockUser } from "../../__mocks__/courses";
import { Course, FeaturedCourse, User } from "../../types/courses";

export const useFeaturedCourse = () => {
  return useQuery<FeaturedCourse>({
    queryKey: ["featured-course"],
    queryFn: () => Promise.resolve(mockFeaturedCourse),
  });
};

export const useTrendingCourses = () => {
  return useQuery<Course[]>({
    queryKey: ["trending-courses"],
    queryFn: () => Promise.resolve(mockTrendingCourses),
  });
};

export const useRecommendedCourses = () => {
  return useQuery<Course[]>({
    queryKey: ["recommended-courses"],
    queryFn: () => Promise.resolve(mockRecommendedCourses),
  });
};

export const useUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: () => Promise.resolve(mockUser),
  });
};

export const useCoursesByTopic = (topicId: string) => {
  return useQuery({
    queryKey: ["courses-by-topic", topicId],
    queryFn: async () => {
      const { mockCoursesByTopic } = await import("../../__mocks__/courses");
      const topicData = mockCoursesByTopic.find((t) => t.topicId === topicId);
      return topicData || null;
    },
  });
};

export const useAllCoursesByTopic = () => {
  return useQuery({
    queryKey: ["all-courses-by-topic"],
    queryFn: async () => {
      const { mockCoursesByTopic } = await import("../../__mocks__/courses");
      return mockCoursesByTopic;
    },
  });
};

export const useCoursesBySubtopic = (subtopicId: string) => {
  return useQuery({
    queryKey: ["courses-by-subtopic", subtopicId],
    queryFn: async () => {
      if (subtopicId === "trending") {
        const { mockTrendingCourses } = await import("../../__mocks__/courses");
        return {
          subtopic: {
            id: "trending",
            title: "Trending Now",
            description: "Popular courses trending right now",
            courses: mockTrendingCourses,
          },
          topicId: "trending",
        };
      }
      const { mockCoursesByTopic } = await import("../../__mocks__/courses");
      for (const topicData of mockCoursesByTopic) {
        const subtopic = topicData.subtopics.find((s) => s.id === subtopicId);
        if (subtopic) {
          return {
            subtopic,
            topicId: topicData.topicId,
          };
        }
      }
      return null;
    },
    enabled: !!subtopicId,
  });
};

