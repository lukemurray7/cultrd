import { useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "../../../../../../../theme/ThemeProvider";
import { TextImageSlide as TextImageSlideType } from "../../../../../../../types/courseContent";
import { Box } from "../../../../../../../ui/components/Box";
import { Text } from "../../../../../../../ui/components/Text";
import { MediaRenderer } from "../MediaRenderer";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface TextImageSlideProps {
  slide: TextImageSlideType;
  sentenceIndex: number;
}

const SentenceItem = ({ sentence, index, isVisible }: { sentence: string; index: number; isVisible: boolean }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      opacity.value = 0;
      translateY.value = 20;
    }
  }, [isVisible, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Text size="lg" weight="regular">
        {sentence}
      </Text>
    </Animated.View>
  );
};

export const TextImageSlide = ({ slide, sentenceIndex }: TextImageSlideProps) => {
  const theme = useTheme();
  const sentences = Array.isArray(slide.content) ? slide.content : [slide.content];

  return (
    <Box flex bg="surface" p={6} style={{ maxHeight: SCREEN_HEIGHT, justifyContent: "space-between" }}>
      <Box style={{ gap: 16 }}>
        {sentences.map((sentence, index) => {
          const isVisible = index <= sentenceIndex;
          return <SentenceItem key={index} sentence={sentence} index={index} isVisible={isVisible} />;
        })}
      </Box>
      <Box style={{ alignItems: "center" }}>
        <MediaRenderer mediaUrl={slide.mediaUrl} mediaType={slide.mediaType} isCentered />
      </Box>
    </Box>
  );
};

