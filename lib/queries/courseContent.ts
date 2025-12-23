import { useQuery } from "@tanstack/react-query";
import { CourseContent } from "../../types/courseContent";
import { mockCourseContentById } from "../../__mocks__/courseContent";

export const useCourseContent = (courseId: string) => {
  return useQuery<CourseContent | null>({
    queryKey: ["course-content", courseId],
    queryFn: async () => {
      return mockCourseContentById[courseId] || null;
    },
    enabled: !!courseId,
  });
};

