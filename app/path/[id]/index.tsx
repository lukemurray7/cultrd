import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { usePath, usePathCourses } from "../../../lib/queries/paths";
import { getCategoryColor } from "../../../lib/utils/categoryColors";
import { useTheme } from "../../../theme/ThemeProvider";
import { Course } from "../../../types/courses";
import { Box } from "../../../ui/components/Box";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { ContinuePathButton } from "../../../ui/pages/paths/components/ContinuePathButton";
import { PathCourses } from "../../../ui/pages/paths/components/PathCourses";
import { PathHeader } from "../../../ui/pages/paths/components/PathHeader";
import { PathHero } from "../../../ui/pages/paths/components/PathHero";

export default function PathDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { data: path } = usePath(id || "");
  const { data: courses = [], isLoading } = usePathCourses(path?.courses || []);

  const completedCourseIds = useMemo(() => {
    const completed = new Set<string>();
    courses.forEach((course: Course) => {
      if (course.progress === 100) {
        completed.add(course.id);
      }
    });
    return completed;
  }, [courses]);

  const firstIncompleteIndex = useMemo(() => {
    return courses.findIndex((course: Course) => course.progress !== 100);
  }, [courses]);

  const completedCount = useMemo(() => {
    return completedCourseIds.size;
  }, [completedCourseIds]);

  if (!path) {
    return (
      <>
        <StatusBar />
        <SafeAreaView edges={["top"]} bg="primary">
          <Box p={4}>
            <Text>Path not found</Text>
          </Box>
        </SafeAreaView>
      </>
    );
  }

  const categoryColor = getCategoryColor(path.category, theme);
  const firstIncompleteCourse =
    firstIncompleteIndex >= 0 ? courses[firstIncompleteIndex] : null;

  return (
    <>
      <StatusBar />
      <SafeAreaView bg="primary" flex>
        <Box flex>
          <PathHeader
            path={path}
            completedCount={completedCount}
            categoryColor={categoryColor}
          />

          <ScrollView>
            <PathHero path={path} categoryColor={categoryColor} />

            <PathCourses
              courses={courses}
              completedCourseIds={completedCourseIds}
              firstIncompleteIndex={firstIncompleteIndex}
              isLoading={isLoading}
              categoryColor={categoryColor}
            />

            <ContinuePathButton
              categoryColor={categoryColor}
              firstIncompleteCourse={firstIncompleteCourse}
              courses={courses}
            />
          </ScrollView>
        </Box>
      </SafeAreaView>
    </>
  );
}

