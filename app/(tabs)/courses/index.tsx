import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { useCoursesByTopic } from "../../../lib/queries/courses";
import { Box } from "../../../ui/components/Box";
import { CourseCard } from "../../../ui/components/CourseCard";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { Text } from "../../../ui/components/Text";
import { CoursesHeader } from "../../../ui/pages/courses/components/CoursesHeader";

export default function CoursesScreen() {
  const [selectedTopic, setSelectedTopic] = useState<string>("history");
  const { data: topicData } = useCoursesByTopic(selectedTopic);
  const { width } = useWindowDimensions();
  const cardWidth = (width - 32 - 16) / 2;

  return (
    <SafeAreaView bg="primary" flex>
      <CoursesHeader selectedTopic={selectedTopic} onTopicChange={setSelectedTopic} />
      <ScrollView bg="primary" px={4} pb={12}>
        {topicData?.subtopics.map((subtopic) => (
          <Box key={subtopic.id} mb={6}>
            <Box mb={3}>
              <Text size="lg" weight="bold" mb={1}>
                {subtopic.title}
              </Text>
              <Text variant="secondary" size="sm">
                {subtopic.description}
              </Text>
            </Box>
            <Box row gap={4} style={{ flexWrap: "wrap" }}>
              {subtopic.courses.map((course) => (
                <CourseCard key={course.id} course={course} width={cardWidth} />
              ))}
            </Box>
          </Box>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

