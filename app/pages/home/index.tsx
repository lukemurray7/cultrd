import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomNavBar } from "../../components/BottomNavBar";
import { Carousel } from "../../components/Carousel";
import { CourseCard } from "../../components/CourseCard";
import { ExploreTopics } from "../../components/ExploreTopics";
import { FeedbackSection } from "../../components/FeedbackSection";
import { StreakView } from "../../components/StreakView";
import { colors } from "../../theme/colors";

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
          { paddingBottom: insets.bottom + 80, paddingTop: insets.top + 8 },
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
    paddingBottom: 20,
  },
  carouselContainer: {
    marginTop: 32,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 8,
  },
});
