import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { usePath, usePathCourses } from "../../../lib/queries/paths";
import { getCategoryColor } from "../../../lib/utils/categoryColors";
import { useTheme } from "../../../theme/ThemeProvider";
import { Course } from "../../../types/courses";
import { Box } from "../../../ui/components/Box";
import { LottieAnimation } from "../../../ui/components/LottieAnimation";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { PathCourses } from "../../../ui/pages/paths/components/PathCourses";
import { PathHeader } from "../../../ui/pages/paths/components/PathHeader";

const completeAnimation = require("../../../assets/animations/complete.json");

export default function PathDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { data: path, isLoading } = usePath(id || "");
  const { data: courses = [], isLoading: isLoadingCourses } = usePathCourses(path?.courses || []);

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

  if (isLoading || !path) {
    return (
      <SafeAreaView bg="primary" flex center>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const categoryColor = getCategoryColor(path.category, theme);
  const isCompleted = "progressPercentage" in path && (path.progressPercentage === 100 || path.coursesCompleted === path.totalCourses);

  return (
    <>
      <StatusBar />
      <SafeAreaView bg="primary" flex>
        <Box flex>
          <PathHeader pathId={id || ""} path={path} />

          <ScrollView
            mt={4}
            style={{
              paddingBottom: 100,
            }}
          >
            <Box row center shadow="sm" mx={3}>
              <Box
                width="100%"
                height={300}
                overflow="hidden"
                borderRadiusTopLeft="xl"
                borderRadiusTopRight="xl"
                border
                style={{ position: "relative" }}
              >
                <Image
                  source={{ uri: path.imageUrl }}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                  contentPosition="center"
                />
                {isCompleted && (
                  <Box
                    style={{
                      position: "absolute",
                      top: theme.spacing[2],
                      right: theme.spacing[2],
                      width: 120,
                      height: 120,
                    }}
                  >
                    <LottieAnimation
                      source={completeAnimation}
                      autoPlay
                      loop={false}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              px={4}
              py={4}
              gap={3}
              bg="surfaceLight"
              mx={3}
              border
              shadow="sm"
              borderRadiusBottomLeft="xl"
              borderRadiusBottomRight="xl"
            >
              <Text size="xl" weight="bold">
                {path.title}
              </Text>
              <Text size="md" variant="secondary">
                {path.description}
              </Text>
              {completedCount > 0 && (
                <Text size="sm" weight="semibold">
                  {completedCount} of {path.totalCourses} courses completed
                </Text>
              )}
            </Box>
            <Box px={4} pt={6} row between center>
              <Text size="lg" weight="bold">
                Courses
              </Text>
              <Text size="xs" variant="secondary" letterSpacing={0.5}>
                {path.totalCourses} Courses • {path.totalDuration} minutes
              </Text>
            </Box>
            <PathCourses
              courses={courses}
              completedCourseIds={completedCourseIds}
              firstIncompleteIndex={firstIncompleteIndex}
              isLoading={isLoadingCourses}
              categoryColor={categoryColor}
            />
          </ScrollView>
        </Box>
      </SafeAreaView>
    </>
  );
}

