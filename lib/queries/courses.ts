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

