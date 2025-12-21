import { Course } from "../../../../../types/courses";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";
import { PathProgress } from "../PathProgress";

interface PathCoursesProps {
  courses: Course[];
  completedCourseIds: Set<string>;
  firstIncompleteIndex: number;
  isLoading: boolean;
  categoryColor: string;
}

export const PathCourses = ({
  courses,
  completedCourseIds,
  firstIncompleteIndex,
  isLoading,
  categoryColor,
}: PathCoursesProps) => {
  if (isLoading) {
    return (
      <Box p={4} center>
        <Text>Loading courses...</Text>
      </Box>
    );
  }

  if (courses.length === 0) {
    return (
      <Box p={4} center>
        <Text variant="secondary">No courses found</Text>
      </Box>
    );
  }

  return (
    <PathProgress
      courses={courses}
      completedCourseIds={completedCourseIds}
      firstIncompleteIndex={firstIncompleteIndex >= 0 ? firstIncompleteIndex : -1}
      categoryColor={categoryColor}
    />
  );
};

