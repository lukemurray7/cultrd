import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomNavBar } from "../../components/BottomNavBar";
import { Carousel } from "../../components/Carousel";
import { CourseCard } from "../../components/CourseCard";
import { FeedbackCard } from "../../components/FeedbackCard";
import { StreakView } from "../../components/StreakView";
import { colors } from "../../theme/colors";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const courseCards = [
    {
      icon: "book" as const,
      title: "Essential Philosophy: Theories and Thinkers",
      subtitle: "John Kaag",
    },
    {
      icon: "flask" as const,
      title: "The Science Behind Andrew Huberman's Morning Routine",
      subtitle: "Science Daily",
    },
    {
      icon: "trending-up" as const,
      title: "Economics Fundamentals",
      subtitle: "Economic Times",
    },
    {
      icon: "musical-notes" as const,
      title: "History of Classical Music",
      subtitle: "Music History",
    },
    {
      icon: "time" as const,
      title: "Ancient Civilizations",
      subtitle: "Historical Society",
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80, paddingTop: insets.top },
        ]}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <StreakView currentStreak={1} activeDayIndex={0} />

        <Carousel>
          {courseCards.map((card, index) => (
            <CourseCard
              key={index}
              icon={card.icon}
              title={card.title}
              subtitle={card.subtitle}
            />
          ))}
        </Carousel>

        <Pressable
          style={styles.exploreSection}
          onPress={() => router.push("/pages/courses")}
        >
          <View style={styles.exploreCard}>
            <View style={styles.exploreIconContainer}>
              <Ionicons
                name="compass"
                size={48}
                color={colors.text.primary}
              />
            </View>
            <Text style={styles.exploreTitle}>Explore All Paths</Text>
          </View>
        </Pressable>

        <View style={styles.feedbackSection}>
          <FeedbackCard icon="add-circle" label="Suggest a course" />
          <FeedbackCard icon="chatbubble-ellipses" label="Give feedback" />
          <FeedbackCard icon="help-circle" label="Any questions?" />
        </View>
      </ScrollView>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  exploreSection: {
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 24,
  },
  exploreCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  exploreIconContainer: {
    marginBottom: 16,
  },
  exploreTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text.primary,
  },
  feedbackSection: {
    flexDirection: "row",
    paddingHorizontal: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});
