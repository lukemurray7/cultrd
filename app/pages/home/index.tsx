import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
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

        <Pressable
          style={styles.exploreSection}
          onPress={() => router.push("/pages/courses")}
        >
          <Text style={styles.exploreTitle}>
            Explore All Topics{" "}
            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.text.primary}
            />
          </Text>
          <ImageBackground
            source={require("../../../assets/images/onboarding/cover-test.png")}
            style={styles.exploreCard}
            imageStyle={styles.exploreCardImage}
          ></ImageBackground>
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
    marginHorizontal: 24,
    borderRadius: 16,
    marginTop: 32,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  exploreCard: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    minHeight: 120,
  },
  exploreCardImage: {
    borderRadius: 16,
  },
  exploreTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: 12
  },
  feedbackSection: {
    flexDirection: "row",
    paddingHorizontal: 14,
    marginBottom: 20,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 16,
    paddingVertical: 16,
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
