import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomNavBar } from "../../components/BottomNavBar";
import { Carousel } from "../../components/Carousel";
import { CourseCard } from "../../components/CourseCard";
import { colors, spacing, typography } from "../../../theme/colors";
import { ExploreTopics } from "./components/ExploreTopics";
import { FeedbackSection } from "./components/FeedbackSection";
import { StreakView } from "./components/StreakView";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const courseCards = [
    {
      title: "Essential Philosophy: Theories and Thinkers",
    },
    {
      title: "The Science Behind Andrew Huberman's Morning Routine",
    },
    {
      title: "Economics Fundamentals",
    },
    {
      title: "History of Classical Music",
    },
    {
      title: "Ancient Civilizations",
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
          { paddingBottom: insets.bottom + spacing.xxxxxl, paddingTop: insets.top + spacing.sm },
        ]}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <StreakView currentStreak={1} activeDayIndex={0} />
        <View style={styles.carouselContainer}>
          <Text style={styles.carouselTitle}>Your Learning Paths</Text>
          <Carousel>
            {courseCards.map((card, index) => (
              <CourseCard key={index} title={card.title} />
            ))}
          </Carousel>
        </View>

        <ExploreTopics />

        <View style={styles.carouselContainer}>
          <Text style={styles.carouselTitle}>Most Popular</Text>
          <Carousel>
            {courseCards.map((card, index) => (
              <CourseCard key={index} title={card.title} />
            ))}
          </Carousel>
        </View>

        <FeedbackSection />
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
    paddingBottom: spacing.xl,
  },
  carouselContainer: {
    marginTop: spacing.xxxl,
    marginHorizontal: spacing.xxl,
    marginBottom: spacing.lg,
  },
  carouselTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
});
