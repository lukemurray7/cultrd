import { useLocalSearchParams } from "expo-router";
import { useCourseContent } from "../../../../../lib/queries/courseContent";
import { Box } from "../../../../../ui/components/Box";
import { SafeAreaView } from "../../../../../ui/components/SafeAreaView";
import { StatusBar } from "../../../../../ui/components/StatusBar";
import { Text } from "../../../../../ui/components/Text";
import { CourseViewer } from "../../../../../ui/pages/courseViewer/components/CourseViewer";

export default function ChapterViewerScreen() {
  const { id, chapterId } = useLocalSearchParams<{ id: string; chapterId: string }>();

  const { data: courseContent, isLoading, error } = useCourseContent(id || "");

  if (isLoading) {
    return (
      <SafeAreaView bg="primary" flex center>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!courseContent) {
    return (
      <SafeAreaView bg="primary" flex center>
        <Box px={6} gap={3} center>
          <Text size="lg" weight="bold">
            Course content not available
          </Text>
          <Text size="md" variant="secondary" style={{ textAlign: "center" }}>
            This course doesn't have slides yet. Only courses with full content can be viewed.
          </Text>
        </Box>
      </SafeAreaView>
    );
  }

  const chapter = courseContent.chapters.find((ch) => ch.id === chapterId);

  if (!chapter) {
    return (
      <SafeAreaView bg="primary" flex center>
        <Box px={6} gap={3} center>
          <Text size="lg" weight="bold">
            Chapter not found
          </Text>
          <Text size="md" variant="secondary" style={{ textAlign: "center" }}>
            The chapter you're looking for doesn't exist in this course.
          </Text>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar />
      <CourseViewer courseId={id || ""} chapter={chapter} allChapters={courseContent.chapters} />
    </>
  );
}

