import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useCourse } from "../../../lib/queries/courses";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../../../ui/components/Box";
import { LottieAnimation } from "../../../ui/components/LottieAnimation";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { ChaptersList } from "../../../ui/pages/course/components/ChaptersList";
import { CourseHeader } from "../../../ui/pages/course/components/CourseHeader";

const completeAnimation = require("../../../assets/animations/complete.json");

export default function CourseDetailScreen() {
  const { id, highlightChapterId } = useLocalSearchParams<{ id: string; highlightChapterId?: string }>();
  const { data: course, isLoading } = useCourse(id || "");
  const theme = useTheme();

  const hasProgress =
    course?.currentChapter !== undefined && course?.totalChapters !== undefined;
  const progressPercentage =
    hasProgress && course?.totalChapters
      ? Math.round(((course.currentChapter || 0) / course.totalChapters) * 100)
      : course?.progress || 0;

  if (isLoading || !course) {
    return (
      <SafeAreaView bg="primary" flex center>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar />
      <SafeAreaView bg="primary" flex>
        <Box flex>
          <CourseHeader courseId={id || ""} course={course} />

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
                  source={{ uri: course.imageUrl }}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                  contentPosition="center"
                />
                {progressPercentage === 100 && (
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
                {course.title}
              </Text>
              <Text size="md" variant="secondary">
                {course.description}
              </Text>
              {progressPercentage > 0 && (
                <Box gap={2}>
                  <Box row between center>
                    <Text size="sm" variant="secondary">
                      Progress
                    </Text>
                    <Text size="sm" weight="semibold">
                      {progressPercentage}%
                    </Text>
                  </Box>
                  <Box
                    width="100%"
                    height={6}
                    borderRadius="pill"
                    overflow="hidden"
                    style={{
                      backgroundColor: `${theme.colors.text.muted}40`,
                    }}
                  >
                    <Box
                      height="100%"
                      width={`${progressPercentage}%`}
                      style={{
                        backgroundColor: theme.colors.brand.primary,
                      }}
                      borderRadius="pill"
                    />
                  </Box>
                </Box>
              )}
            </Box>
            <Box px={4} pt={6} row between center>
              <Text size="lg" weight="bold">
                Chapters
              </Text>
              <Text size="xs" variant="secondary" letterSpacing={0.5}>
                {course.totalChapters ||
                  course.lessons ||
                  course.chapters?.length ||
                  0}{" "}
                Chapters •{" "}
                {course.chapters
                  ? course.chapters.reduce((sum, ch) => sum + ch.duration, 0)
                  : course.duration}{" "}
                minutes
              </Text>
            </Box>
            {course.chapters && course.chapters.length > 0 && (
              <ChaptersList
                allCompleted={progressPercentage === 100}
                chapters={course.chapters}
                currentChapter={course.currentChapter}
                courseId={id || ""}
                highlightChapterId={progressPercentage === 100 ? undefined : highlightChapterId}
              />
            )}
          </ScrollView>
        </Box>
      </SafeAreaView>
    </>
  );
}
