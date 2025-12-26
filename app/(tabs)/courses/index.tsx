import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, SectionList, useWindowDimensions, ViewToken } from "react-native";
import { useAllCoursesByTopic } from "../../../lib/queries/courses";
import { useTheme } from "../../../theme/ThemeProvider";
import { Course } from "../../../types/courses";
import { topics } from "../../../constants/topics";
import { Box } from "../../../ui/components/Box";
import { CourseCard } from "../../../ui/components/CourseCard";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { CoursesHeader } from "../../../ui/pages/courses/components/CoursesHeader";

interface SubtopicSection {
  id: string;
  topicId: string;
  topicTitle: string;
  subtopicTitle: string;
  subtitle: string;
  isFirstSubtopic: boolean;
  data: Course[][];
}

export default function CoursesScreen() {
  const theme = useTheme();
  const router = useRouter();
  const sectionListRef = useRef<SectionList<Course[], SubtopicSection>>(null);
  const topNavScrollRef = useRef<ScrollView>(null);
  const isProgrammaticScrollRef = useRef(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("history");
  const selectedTopicRef = useRef("history");
  const { data: allTopicsData } = useAllCoursesByTopic();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 32 - 16) / 2;

  useEffect(() => {
    if (allTopicsData && allTopicsData.length > 0 && selectedTopicRef.current === "history") {
      const firstTopic = topics.find((t) => allTopicsData.some((d) => d.topicId === t.id));
      if (firstTopic) {
        setSelectedTopic(firstTopic.id);
        selectedTopicRef.current = firstTopic.id;
      }
    }
  }, [allTopicsData]);

  const flattenTopicsToSections = (): SubtopicSection[] => {
    const sections: SubtopicSection[] = [];
    if (!allTopicsData) return sections;

    topics.forEach((topic) => {
      const topicData = allTopicsData.find((t) => t.topicId === topic.id);
      if (!topicData || topicData.subtopics.length === 0) return;

      topicData.subtopics.forEach((subtopic, subtopicIndex) => {
        const rows: Course[][] = [];
        subtopic.courses.forEach((course, index) => {
          if (index % 2 === 0) {
            rows.push([course]);
          } else {
            rows[rows.length - 1].push(course);
          }
        });
        sections.push({
          id: subtopic.id,
          topicId: topic.id,
          topicTitle: topic.label,
          subtopicTitle: subtopic.title,
          subtitle: subtopic.description,
          isFirstSubtopic: subtopicIndex === 0,
          data: rows,
        });
      });
    });
    return sections;
  };

  const sections = flattenTopicsToSections();

  const scrollToTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    selectedTopicRef.current = topicId;
    isProgrammaticScrollRef.current = true;
    const sectionIndex = sections.findIndex((section) => section.topicId === topicId);
    if (sectionIndex !== -1 && sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        viewOffset: 0,
      });
    }
    setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 500);
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (isProgrammaticScrollRef.current) {
        return;
      }
      if (viewableItems.length > 0) {
        const visibleSections = viewableItems
          .map((item) => {
            const section = item.section as SubtopicSection | undefined;
            if (!section) return null;
            const sectionIndex = sections.findIndex((s) => s.id === section.id);
            return { section, index: sectionIndex };
          })
          .filter((item): item is { section: SubtopicSection; index: number } => item !== null);

        if (visibleSections.length > 0) {
          const firstVisibleSection = visibleSections.reduce((earliest, current) =>
            current.index < earliest.index ? current : earliest
          ).section;

          if (firstVisibleSection.topicId !== selectedTopicRef.current) {
            const newTopicId = firstVisibleSection.topicId;
            setSelectedTopic(newTopicId);
            selectedTopicRef.current = newTopicId;

            const topicIndex = topics.findIndex((topic) => topic.id === newTopicId);
            if (topicIndex !== -1 && topNavScrollRef.current) {
              const buttonWidth = 80;
              const gap = theme.spacing[4];
              const scrollPosition = topicIndex * (buttonWidth + gap) - theme.spacing[4];
              topNavScrollRef.current.scrollTo({
                x: Math.max(0, scrollPosition),
                animated: true,
              });
            }
          }
        }
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 10,
    minimumViewTime: 100,
  }).current;

  const renderSectionHeader = ({ section }: { section: SubtopicSection }) => {
    return (
      <Box>
        {section.isFirstSubtopic && (
          <Box px={4} pt={8} pb={3}>
            <Text size="2xl" weight="bold">
              {section.topicTitle}
            </Text>
          </Box>
        )}
        <Box px={4} pt={4} pb={3} row between>
          <Box flex>
            <Text size="lg" weight="bold" mb={1}>
              {section.subtopicTitle}
            </Text>
            <Text variant="secondary" size="sm">
              {section.subtitle}
            </Text>
          </Box>
          <Pressable mt={1} onPress={() => {
            const href = `/(tabs)/courses/${section.id}` as `/(tabs)/courses/${string}`;
            router.push(href);
          }}>
            <Text size="sm" weight="semibold" style={{ color: theme.colors.brand.primary }}>
              See more
            </Text>
          </Pressable>
        </Box>
      </Box>
    );
  };

  const renderCourseRow = ({
    item,
  }: {
    item: Course[];
    section: SubtopicSection;
    index: number;
  }) => {
    return (
      <Box row gap={4} px={4} mb={5}>
        {item.map((course) => (
          <CourseCard key={course.id} course={course} width={cardWidth} />
        ))}
        {item.length === 1 && <Box width={cardWidth} />}
      </Box>
    );
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView bg="primary" flex>
      <CoursesHeader
        ref={topNavScrollRef}
        selectedTopic={selectedTopic}
        onTopicChange={scrollToTopic}
      />
      <SectionList<Course[], SubtopicSection>
        ref={sectionListRef}
        sections={sections}
        renderItem={renderCourseRow}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => `row-${index}`}
        contentContainerStyle={{
          paddingBottom: theme.spacing[12],
        }}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={{ backgroundColor: theme.colors.bg.primary }}
      />
    </SafeAreaView>
    </>
  );
}

