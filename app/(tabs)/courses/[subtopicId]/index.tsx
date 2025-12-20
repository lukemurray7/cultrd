import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";
import { useCoursesBySubtopic } from "../../../../lib/queries/courses";
import { useTheme } from "../../../../theme/ThemeProvider";
import { Course } from "../../../../types/courses";
import { topics } from "../../../../types/topics";
import { Box } from "../../../../ui/components/Box";
import { CourseCard } from "../../../../ui/components/CourseCard";
import { EmptyCourseCard } from "../../../../ui/components/EmptyCourseCard";
import { Pressable } from "../../../../ui/components/Pressable";
import { SafeAreaView } from "../../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../../ui/components/ScrollView";
import { Text } from "../../../../ui/components/Text";

export default function SubtopicCoursesScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { subtopicId } = useLocalSearchParams<{ subtopicId: string }>();
  const { data, isLoading } = useCoursesBySubtopic(subtopicId || "");
  const { width } = useWindowDimensions();
  const cardWidth = (width - 32 - 16) / 2;

  if (isLoading || !data) {
    return (
      <SafeAreaView bg="primary" flex>
        <Box flex center>
          <Text>Loading...</Text>
        </Box>
      </SafeAreaView>
    );
  }

  const topic = topics.find((t) => t.id === data.topicId);
  const topicTitle = topic?.label || data.subtopic.title;

  const courses = data.subtopic.courses || [];
  const allItems: (Course | "suggest")[] = [...courses, "suggest"];
  const courseRows: (Course | "suggest")[][] = [];

  allItems.forEach((item, index) => {
    if (index % 2 === 0) {
      courseRows.push([item]);
    } else {
      courseRows[courseRows.length - 1].push(item);
    }
  });

  return (
    <SafeAreaView bg="primary" flex>
      <Box px={4} pt={3} pb={3} row between center>
        <Pressable onPress={() => router.back()} center>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </Pressable>
        <Box flex center>
          <Text size="lg" weight="bold">
            {topicTitle}
          </Text>
        </Box>
        <Box width={24} />
      </Box>
      <ScrollView>
        <Box px={4} pt={4} pb={3}>
          <Text size="xl" weight="bold" mb={1}>
            {data.subtopic.title}
          </Text>
          <Text variant="secondary" size="sm">
            {data.subtopic.description}
          </Text>
        </Box>
        {courseRows.map((row, rowIndex) => (
          <Box key={rowIndex} row gap={4} px={4} mb={5}>
            {row.map((item, itemIndex) => {
              if (item === "suggest") {
                return <EmptyCourseCard key="suggest" width={cardWidth} />;
              }
              return <CourseCard key={item.id} course={item} width={cardWidth} />;
            })}
            {row.length === 1 && <Box width={cardWidth} />}
          </Box>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

