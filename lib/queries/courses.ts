import { useQuery } from "@tanstack/react-query";
import { FeaturedCourse, Course, User } from "@/types/courses";
import { mockFeaturedCourse, mockTrendingCourses, mockRecommendedCourses, mockUser } from "__mocks__/courses";

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

