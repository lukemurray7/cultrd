import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, SectionList, StyleSheet, Text, View, ViewToken } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCourses, type Course, type Topic } from "../../../lib/queries/courses";
import { BottomNavBar } from "../../components/BottomNavBar";
import { colors, spacing, typography } from "../../theme/colors";
import { CourseCard } from "./components/CourseCard";
import { TopNav } from "./components/TopNav";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface SubtopicSection {
  id: string;
  topicTitle: string;
  subtopicTitle: string;
  subtitle: string;
  isFirstSubtopic: boolean;
  data: Course[][];
}


export default function CoursesScreen() {
  const insets = useSafeAreaInsets();
  const sectionListRef = useRef<SectionList<Course[], SubtopicSection>>(null);
  const [selectedTopic, setSelectedTopic] = useState("History");
  const selectedTopicRef = useRef("History");
  const topNavScrollRef = useRef<ScrollView>(null);
  const isProgrammaticScrollRef = useRef(false);
  
  const { data: topicsData = [], isLoading, error } = useCourses();

  useEffect(() => {
    if (topicsData.length > 0 && selectedTopicRef.current === "History") {
      setSelectedTopic(topicsData[0].title);
      selectedTopicRef.current = topicsData[0].title;
    }
  }, [topicsData]);

  const flattenTopicsToSections = (topics: Topic[]): SubtopicSection[] => {
    const sections: SubtopicSection[] = [];
    topics.forEach((topic) => {
      topic.subtopics.forEach((subtopic, subtopicIndex) => {
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
          topicTitle: topic.title,
          subtopicTitle: subtopic.title,
          subtitle: subtopic.subtitle,
          isFirstSubtopic: subtopicIndex === 0,
          data: rows,
        });
      });
    });
    return sections;
  };

  const sections = flattenTopicsToSections(topicsData);

  const scrollToTopic = (topicName: string) => {
    setSelectedTopic(topicName);
    selectedTopicRef.current = topicName;
    isProgrammaticScrollRef.current = true;
    const sectionIndex = sections.findIndex(
      (section) => section.topicTitle === topicName
    );
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

          if (firstVisibleSection.topicTitle !== selectedTopicRef.current) {
            const newTopic = firstVisibleSection.topicTitle;
            setSelectedTopic(newTopic);
            selectedTopicRef.current = newTopic;

            const topicIndex = topicsData.findIndex((topic) => topic.title === newTopic);
            if (topicIndex !== -1 && topNavScrollRef.current) {
              const buttonWidth = 80;
              const gap = spacing.xl;
              const scrollPosition = topicIndex * (buttonWidth + gap) - spacing.lg;
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
      <View>
        {section.isFirstSubtopic && (
          <View style={styles.topicHeader}>
            <Text style={styles.topicTitle}>{section.topicTitle}</Text>
          </View>
        )}
        <View style={styles.subtopicHeader}>
          <Text style={styles.subtopicTitle}>{section.subtopicTitle}</Text>
          <Text style={styles.subtitle}>{section.subtitle}</Text>
        </View>
      </View>
    );
  };

  const renderCourseRow = ({ item }: { item: Course[] }) => {
    return (
      <View style={styles.row}>
        {item.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            imageUrl={course.image_url}
          />
        ))}
        {item.length === 1 && <View style={{ width: (SCREEN_WIDTH - spacing.lg * 3) / 2 }} />}
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color={colors.accent.blue} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <StatusBar style="light" />
        <Text style={styles.errorText}>{error.message || "Failed to load courses"}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={[styles.topNavContainer, { paddingTop: insets.top }]}>
        <TopNav ref={topNavScrollRef} selectedTopic={selectedTopic} onTopicPress={scrollToTopic} />
      </View>
      <SectionList<Course[], SubtopicSection>
        ref={sectionListRef}
        sections={sections}
        renderItem={renderCourseRow}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => `row-${index}`}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 },
        ]}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  topNavContainer: {
    backgroundColor: colors.background.primary,
    zIndex: 10,
  },
  scrollContent: {
    paddingTop: spacing.lg,
  },
  topicHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.md,
  },
  topicTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  subtopicHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  subtopicTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: typography.fontSize.base,
    color: colors.error.red,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
  },
});
