import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Dimensions, Pressable as RNPressable, Share } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../../ui/components/Box";
import { Pressable } from "../../../../../ui/components/Pressable";
import { SafeAreaView } from "../../../../../ui/components/SafeAreaView";
import { Text } from "../../../../../ui/components/Text";
import { ChapterContent } from "../../../../../types/courseContent";
import { SlideRenderer } from "../SlideRenderer";

interface CourseViewerProps {
  courseId: string;
  chapter: ChapterContent;
  allChapters: ChapterContent[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const CourseViewer = ({ courseId, chapter, allChapters }: CourseViewerProps) => {
  const theme = useTheme();
  const [slideIndex, setSlideIndex] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const slides = chapter.slides;
  const currentSlide = slides[slideIndex];
  const isLastSlide = slideIndex === slides.length - 1;

  const nextChapter = allChapters.find((ch) => ch.order === chapter.order + 1);

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

  const handleClose = () => {
    router.back();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out "${chapter.title}" from ${chapter.title}`,
        title: chapter.title,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (showComplete) {
    return (
      <SafeAreaView bg="surface" flex>
        <Box flex center bg="surface" p={6}>
          <Animated.View entering={FadeIn} style={{ alignItems: "center", gap: theme.spacing[6] }}>
            <Box
              width={120}
              height={120}
              borderRadius="pill"
              bg="brand.primary"
              center
              mb={4}
            >
              <MaterialIcons name="check-circle" size={80} color={theme.colors.text.white} />
            </Box>
            <Text size="2xl" weight="bold" style={{ textAlign: "center" }}>
              Chapter Complete!
            </Text>
            <Text size="lg" variant="secondary" style={{ textAlign: "center" }}>
              {chapter.title}
            </Text>
            {nextChapter && (
              <Text size="md" variant="muted" style={{ textAlign: "center" }}>
                Next: {nextChapter.title}
              </Text>
            )}
            <Pressable
              bg="brand.primary"
              p={4}
              borderRadius="lg"
              mt={6}
              onPress={handleReturnToCourse}
            >
              <Text size="lg" weight="semibold" style={{ color: theme.colors.text.white }}>
                Back to Course
              </Text>
            </Pressable>
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
              onPress={handleShare}
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

