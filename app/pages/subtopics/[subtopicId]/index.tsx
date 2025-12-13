import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSubtopic, Course } from "../../../../lib/queries/courses";
import { colors, spacing, typography } from "../../../../theme/colors";
import { CourseCard } from "../../courses/components/CourseCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - spacing.lg * 3) / 2;

export default function SubtopicScreen() {
  const insets = useSafeAreaInsets();
  const { subtopicId } = useLocalSearchParams<{ subtopicId: string }>();
  const { data: subtopic, isLoading, error } = useSubtopic(subtopicId);

  const handleBack = () => {
    router.back();
  };

  const renderCourseRow = (courses: Course[], startIndex: number) => {
    const rowCourses = courses.slice(startIndex, startIndex + 2);
    return (
      <View style={styles.row} key={startIndex}>
        {rowCourses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            imageUrl={course.image_url}
          />
        ))}
        {rowCourses.length === 1 && <View style={{ width: CARD_WIDTH }} />}
      </View>
    );
  };

  const renderSuggestCourseCard = () => {
    return (
      <View style={styles.row}>
        <Pressable style={styles.suggestCard}>
          <Text style={styles.suggestCardText}>Suggest a course</Text>
        </Pressable>
        <View style={{ width: CARD_WIDTH }} />
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

  if (error || !subtopic) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <StatusBar style="light" />
        <Text style={styles.errorText}>
          {error?.message || "Failed to load subtopic"}
        </Text>
      </View>
    );
  }

  const courses = subtopic.courses || [];
  const courseRows: number[] = [];
  for (let i = 0; i < courses.length; i += 2) {
    courseRows.push(i);
  }

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
        <Text style={styles.subtopicTitle}>{subtopic.title}</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {courseRows.map((startIndex) => renderCourseRow(courses, startIndex))}
        {renderSuggestCourseCard()}
      </ScrollView>
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
  subtopicTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    flex: 1,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.lg,
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

