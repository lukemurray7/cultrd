import { useQuery } from "@tanstack/react-query";
import {
    mockAllUserPaths,
    mockContinueLearningPaths,
    mockExplorePaths,
    mockPathOfTheWeek,
} from "../../__mocks__/paths";
import { Course } from "../../types/courses";
import {
    LearningPath,
    LearningPathProgress,
    PathOfTheWeek,
} from "../../types/paths";

export const usePathOfTheWeek = () => {
  return useQuery<PathOfTheWeek>({
    queryKey: ["path-of-the-week"],
    queryFn: () => Promise.resolve(mockPathOfTheWeek),
  });
};

export const useContinueLearningPaths = () => {
  return useQuery<LearningPathProgress[]>({
    queryKey: ["continue-learning-paths"],
    queryFn: () => Promise.resolve(mockContinueLearningPaths),
  });
};

export const useExplorePaths = () => {
  return useQuery<LearningPath[]>({
    queryKey: ["explore-paths"],
    queryFn: () => Promise.resolve(mockExplorePaths),
  });
};

export const usePath = (pathId: string) => {
  return useQuery<LearningPath | LearningPathProgress | null>({
    queryKey: ["path", pathId],
    queryFn: async () => {
      const allPaths = [
        mockPathOfTheWeek,
        ...mockContinueLearningPaths,
        ...mockExplorePaths,
        ...mockAllUserPaths,
      ];
      return allPaths.find((path) => path.id === pathId) || null;
    },
    enabled: !!pathId,
  });
};

export const useAllUserPaths = () => {
  return useQuery<LearningPathProgress[]>({
    queryKey: ["all-user-paths"],
    queryFn: () => Promise.resolve(mockAllUserPaths),
  });
};

const getAllCourses = async (): Promise<Course[]> => {
  const {
    mockFeaturedCourse,
    mockTrendingCourses,
    mockRecommendedCourses,
    mockLibraryCourses,
    mockCoursesByTopic,
  } = await import("../../__mocks__/courses");

  const allCourses: Course[] = [
    mockFeaturedCourse,
    ...mockTrendingCourses,
    ...mockRecommendedCourses,
    ...mockLibraryCourses,
  ];

  for (const topicData of mockCoursesByTopic) {
    for (const subtopic of topicData.subtopics) {
      allCourses.push(...subtopic.courses);
    }
  }

  return allCourses;
};

export const usePathCourses = (courseIds: string[]) => {
  return useQuery<Course[]>({
    queryKey: ["path-courses", courseIds.join(",")],
    queryFn: async () => {
      const allCourses = await getAllCourses();
      return courseIds
        .map((id) => allCourses.find((course) => course.id === id))
        .filter((course): course is Course => course !== undefined);
    },
    enabled: courseIds.length > 0,
  });
};

