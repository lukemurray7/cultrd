import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Dimensions, Pressable, SectionList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTopic, Course, Subtopic } from "../../../../lib/queries/courses";
import { colors, spacing, typography } from "../../../../theme/colors";
import { CourseCard } from "../../courses/components/CourseCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - spacing.lg * 3) / 2;

interface SubtopicSection {
  id: string;
  subtopicTitle: string;
  subtitle: string;
  data: Course[][];
}

export default function TopicScreen() {
  const insets = useSafeAreaInsets();
  const { topicId } = useLocalSearchParams<{ topicId: string }>();
  const { data: topic, isLoading, error } = useTopic(topicId);

  const handleBack = () => {
    router.back();
  };

  const flattenSubtopicToSections = (subtopics: Subtopic[]): SubtopicSection[] => {
    return subtopics.map((subtopic) => {
      const rows: Course[][] = [];
      subtopic.courses.forEach((course, index) => {
        if (index % 2 === 0) {
          rows.push([course]);
        } else {
          rows[rows.length - 1].push(course);
        }
      });
      return {
        id: subtopic.id,
        subtopicTitle: subtopic.title,
        subtitle: subtopic.subtitle,
        data: rows,
      };
    });
  };

  const renderSectionHeader = ({ section }: { section: SubtopicSection }) => {
    return (
      <View style={styles.subtopicHeader}>
        <Text style={styles.subtopicTitle}>{section.subtopicTitle}</Text>
        <Text style={styles.subtitle}>{section.subtitle}</Text>
      </View>
    );
  };

  const renderCourseRow = ({ item, section, index }: { item: Course[]; section: SubtopicSection; index: number }) => {
    const isLastRow = index === section.data.length - 1;
    
    return (
      <>
        <View style={styles.row}>
          {item.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              imageUrl={course.image_url}
            />
          ))}
          {item.length === 1 && isLastRow ? (
            <Pressable style={styles.suggestCard}>
              <Text style={styles.suggestCardText}>Suggest a course</Text>
            </Pressable>
          ) : item.length === 1 ? (
            <View style={{ width: CARD_WIDTH }} />
          ) : null}
        </View>
        {item.length === 2 && isLastRow && (
          <View style={styles.row}>
            <Pressable style={styles.suggestCard}>
              <Text style={styles.suggestCardText}>Suggest a course</Text>
            </Pressable>
            <View style={{ width: CARD_WIDTH }} />
          </View>
        )}
      </>
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

  if (error || !topic) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <StatusBar style="light" />
        <Text style={styles.errorText}>
          {error?.message || "Failed to load topic"}
        </Text>
      </View>
    );
  }

  const sections = flattenSubtopicToSections(topic.subtopics);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={[styles.topNav, { paddingTop: insets.top }]}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.text.primary}
          />
        </Pressable>
        <Text style={styles.topicTitle}>{topic.title}</Text>
        <View style={{ width: 24 }} />
      </View>
      <SectionList<Course[], SubtopicSection>
        sections={sections}
        renderItem={renderCourseRow}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => `row-${index}`}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.background.navBar,
  },
  backButton: {
    padding: spacing.xs,
  },
  topicTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    flex: 1,
    textAlign: "center",
  },
  scrollContent: {
    paddingTop: spacing.lg,
  },
  subtopicHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxxl,
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
  suggestCard: {
    width: CARD_WIDTH,
    height: 250,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: colors.border.gray,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
  },
  suggestCardText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.secondary,
    textAlign: "center",
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

