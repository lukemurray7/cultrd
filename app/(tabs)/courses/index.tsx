import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { useAllCoursesByTopic } from "../../../lib/queries/courses";
import { topics } from "../../../types/topics";
import { Box } from "../../../ui/components/Box";
import { CourseCard } from "../../../ui/components/CourseCard";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { Text } from "../../../ui/components/Text";
import { CoursesHeader } from "../../../ui/pages/courses/components/CoursesHeader";

export default function CoursesScreen() {
  const [selectedTopic, setSelectedTopic] = useState<string>("history");
  const { data: allTopicsData } = useAllCoursesByTopic();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 32 - 16) / 2;

  const handleSeeMore = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  return (
    <SafeAreaView bg="primary" flex>
      <CoursesHeader selectedTopic={selectedTopic} onTopicChange={setSelectedTopic} />
      <ScrollView bg="primary" px={4} pb={12}>
        {topics.map((topic) => {
          const topicData = allTopicsData?.find((t) => t.topicId === topic.id);
          if (!topicData || topicData.subtopics.length === 0) return null;

          return (
            <Box key={topic.id} mb={8}>
              <Box row between mb={4}>
                <Text size="xl" weight="bold">
                  {topic.label}
                </Text>
                <Pressable onPress={() => handleSeeMore(topic.id)}>
                  <Text size="sm" weight="semibold" variant="brand">
                    See more
                  </Text>
                </Pressable>
              </Box>
              {topicData.subtopics.map((subtopic) => (
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
            </Box>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

