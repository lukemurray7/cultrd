import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Pressable as RNPressable, ScrollView, Share } from "react-native";
import Animated, { FadeIn, FadeInUp, FadeOut } from "react-native-reanimated";
import { useCompleteChapter } from "../../../../../lib/mutations/courses";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { ChapterContent } from "../../../../../types/courseContent";
import { Box } from "../../../../../ui/components/Box";
import { LottieAnimation } from "../../../../../ui/components/LottieAnimation";
import { Pressable } from "../../../../../ui/components/Pressable";
import { SafeAreaView } from "../../../../../ui/components/SafeAreaView";
import { Text } from "../../../../../ui/components/Text";
import { SlideRenderer } from "../SlideRenderer";

interface CourseViewerProps {
  courseId: string;
  chapter: ChapterContent;
  allChapters: ChapterContent[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const completeAnimation = require("../../../../../assets/animations/complete.json");

const completionMessages = [
  "Great work! You've completed {percentage}% of the course",
  "Awesome! You're {percentage}% through the course",
  "Excellent progress! You've finished {percentage}% of the course",
  "Well done! You've completed {percentage}% of the course",
  "Fantastic! You're {percentage}% through the course",
  "Outstanding! You've finished {percentage}% of the course",
  "Brilliant! You've completed {percentage}% of the course",
  "Amazing! You're {percentage}% through the course",
  "Incredible! You've finished {percentage}% of the course",
  "Superb! You've completed {percentage}% of the course",
  "Terrific! You're {percentage}% through the course",
  "Wonderful! You've finished {percentage}% of the course",
  "Impressive! You've completed {percentage}% of the course",
  "Phenomenal! You're {percentage}% through the course",
  "Stellar! You've finished {percentage}% of the course",
  "Magnificent! You've completed {percentage}% of the course",
  "Exceptional! You're {percentage}% through the course",
  "Remarkable! You've finished {percentage}% of the course",
  "Splendid! You've completed {percentage}% of the course",
  "Marvelous! You're {percentage}% through the course",
];

export const CourseViewer = ({ courseId, chapter, allChapters }: CourseViewerProps) => {
  const theme = useTheme();
  const [slideIndex, setSlideIndex] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const completeChapter = useCompleteChapter();
  const hasCompletedRef = useRef(false);

  const slides = chapter.slides;
  const currentSlide = slides[slideIndex];
  const isLastSlide = slideIndex === slides.length - 1;

  const nextChapter = allChapters.find((ch) => ch.order === chapter.order + 1);

  useEffect(() => {
    if (showComplete) {
      const randomMessage = completionMessages[Math.floor(Math.random() * completionMessages.length)];
      setSelectedMessage(randomMessage);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }, 200);

      if (!chapter.isCompleted && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        completeChapter.mutate({
          courseId,
          chapterId: chapter.id,
          chapterOrder: chapter.order,
          totalChapters: allChapters.length,
        });
      }
    } else {
      setSelectedMessage("");
      hasCompletedRef.current = false;
    }
  }, [showComplete, chapter.id, chapter.isCompleted, courseId, allChapters.length]);


  const handleNext = useCallback(() => {
    if (isLastSlide) {
      setShowComplete(true);
    } else {
      setSlideIndex((prev) => prev + 1);
    }
  }, [isLastSlide]);

  const handlePrevious = useCallback(() => {
    if (showComplete) {
      setShowComplete(false);
    } else if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    }
  }, [slideIndex, showComplete]);

  const handleTap = (event: { nativeEvent: { locationX: number } }) => {
    const tapX = event.nativeEvent.locationX;
    const leftZone = SCREEN_WIDTH * 0.5;

    if (tapX < leftZone) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  const handleReturnToCourse = () => {
    router.back();
  };

  const handleContinueToNextChapter = () => {
    if (nextChapter) {
      router.replace({
        pathname: "/course/[id]/chapter/[chapterId]",
        params: {
          id: courseId,
          chapterId: nextChapter.id,
        },
      });
    }
  };

  const handleClose = () => {
    router.back();
  };

  const handleShareCourse = async () => {
    try {
      const courseUrl = Linking.createURL(`/course/${courseId}`);
      await Share.share({
        message: `Check out this course: ${courseUrl}`,
        title: "Share Course",
        url: courseUrl,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleGoHome = () => {
    router.replace("/(tabs)/home");
  };

  if (showComplete) {
    const currentChapterIndex = allChapters.findIndex((ch) => ch.id === chapter.id);
    const completedChapters = allChapters.filter((ch) => ch.order <= chapter.order);
    const totalChapters = allChapters.length;
    const completionPercentage = Math.round((completedChapters.length / totalChapters) * 100);
    const message = selectedMessage || completionMessages[0];
    const fullText = message.replace("{percentage}", completionPercentage.toString());
    const words = fullText.split(" ");

    return (
      <SafeAreaView bg="surface" flex>
        <Box flex>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              padding: theme.spacing[6],
              gap: theme.spacing[6],
              paddingBottom: theme.spacing[8],
            }}
          >
            <Animated.View entering={FadeIn} style={{ alignItems: "center" }}>
              <Box width={200} height={200} center mb={4}>
                <LottieAnimation
                  source={completeAnimation}
                  autoPlay
                  loop={false}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Box row center gap={2} style={{ minHeight: 60, justifyContent: "center", flexWrap: "wrap" }}>
                {words.map((word, index) => (
                  <Animated.View
                    key={index}
                    entering={FadeIn.delay(index * 100).duration(400)}
                  >
                    <Text size="xl" weight="bold">
                      {word}
                      {index < words.length - 1 && " "}
                    </Text>
                  </Animated.View>
                ))}
              </Box>
            </Animated.View>

            <Box gap={4}>
              <Animated.View entering={FadeInUp.delay(300).duration(400)}>
                <Box
                  bg="surfaceLight"
                  borderRadius="lg"
                  border
                  p={4}
                  row
                  gap={3}
                  style={{
                    borderWidth: 2,
                    borderColor: theme.colors.brand.success,
                    minHeight: 80,
                    alignItems: "center",
                  }}
                >
                  <Box
                    width={48}
                    height={48}
                    borderRadius="pill"
                    bg="brand.success"
                    center
                  >
                    <MaterialIcons
                      name="check-circle"
                      size={28}
                      color={theme.colors.text.white}
                    />
                  </Box>
                  <Box flex gap={1}>
                    <Text size="md" weight="bold">
                      {currentChapterIndex + 1}. {chapter.title}
                    </Text>
                    <Text size="sm" variant="secondary">
                      Completed
                    </Text>
                  </Box>
                </Box>
              </Animated.View>

              {nextChapter && (
                <Animated.View entering={FadeInUp.delay(600).duration(400)}>
                  <Pressable
                    bg="surfaceLight"
                    borderRadius="lg"
                    border
                    p={4}
                    row
                    gap={3}
                    onPress={handleContinueToNextChapter}
                    style={{
                      minHeight: 80,
                      alignItems: "center",
                    }}
                  >
                    <Box
                      width={48}
                      height={48}
                      borderRadius="pill"
                      bg="brand.primary"
                      center
                      border
                    >
                      <MaterialIcons
                        name="play-arrow"
                        size={24}
                        color={theme.colors.text.white}
                      />
                    </Box>
                    <Box flex gap={1}>
                      <Text size="md" weight="bold">
                        {currentChapterIndex + 2}. {nextChapter.title}
                      </Text>
                      <Text size="sm" variant="secondary">
                        Next Chapter
                      </Text>
                    </Box>
                    <Box
                      style={{
                        backgroundColor: theme.colors.brand.primary,
                        paddingHorizontal: theme.spacing[5],
                        paddingVertical: theme.spacing[3],
                        borderRadius: theme.radii.lg,
                      }}
                    >
                      <Text size="md" weight="semibold" style={{ color: theme.colors.text.white }}>
                        Continue
                      </Text>
                    </Box>
                  </Pressable>
                </Animated.View>
              )}
            </Box>
          </ScrollView>

          <Animated.View entering={FadeInUp.delay(900).duration(400)}>
            <Box
              row
              gap={3}
              center
              p={4}
              style={{
                paddingBottom: theme.spacing[6],
              }}
            >
              <Pressable
                bg="surfaceLight"
                width={56}
                height={56}
                borderRadius="lg"
                border
                shadow="md"
                center
                onPress={handleReturnToCourse}
              >
                <MaterialIcons
                  name="arrow-back"
                  size={24}
                  color={theme.colors.text.primary}
                />
              </Pressable>
              <Pressable
                bg="surfaceLight"
                width={56}
                height={56}
                borderRadius="lg"
                border
                shadow="md"
                center
                onPress={handleGoHome}
              >
                <MaterialIcons
                  name="home"
                  size={24}
                  color={theme.colors.text.primary}
                />
              </Pressable>
              <Pressable
                bg="surfaceLight"
                width={56}
                height={56}
                borderRadius="lg"
                border
                shadow="md"
                center
                onPress={handleShareCourse}
              >
                <MaterialIcons
                  name="share"
                  size={24}
                  color={theme.colors.text.primary}
                />
              </Pressable>
            </Box>
          </Animated.View>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView bg="surface" flex>
      <Box flex bg="surface">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          zIndex={10}
          bg="surface"
          p={3}
          style={{
            paddingTop: theme.spacing[6],
          }}
        >
          <Box row between center mx={1} gap={3}>
            <Pressable
              onPress={handleClose}
              bg="surfaceLight"
              borderRadius="pill"
              border
              center
              shadow="sm"
              width={40}
              height={40}
            >
              <MaterialIcons name="close" size={24} color={theme.colors.text.primary} />
            </Pressable>

            <Box
              flex
              height={3}
              borderRadius="pill"
              overflow="hidden"
              style={{
                backgroundColor: `${theme.colors.text.muted}40`,
              }}
            >
              <Box
                height="100%"
                width={`${((slideIndex + 1) / slides.length) * 100}%`}
                style={{
                  backgroundColor: theme.colors.brand.primary,
                }}
              />
            </Box>

            <Pressable
              onPress={handleShareCourse}
              bg="surfaceLight"
              borderRadius="pill"
              border
              center
              shadow="sm"
              width={40}
              height={40}
            >
              <MaterialIcons name="share" size={24} color={theme.colors.text.primary} />
            </Pressable>
          </Box>
        </Box>

        <RNPressable style={{ flex: 1 }} onPress={handleTap}>
          <Animated.View
            key={currentSlide.id}
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(200)}
            style={{ flex: 1 }}
          >
            <SlideRenderer slide={currentSlide} />
          </Animated.View>
        </RNPressable>
      </Box>
    </SafeAreaView>
  );
};
