import { Dimensions } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useTheme } from "../../../../../../../theme/ThemeProvider";
import { QuoteImageSlide as QuoteImageSlideType } from "../../../../../../../types/courseContent";
import { Box } from "../../../../../../../ui/components/Box";
import { Text } from "../../../../../../../ui/components/Text";
import { MediaRenderer } from "../MediaRenderer";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface QuoteImageSlideProps {
  slide: QuoteImageSlideType;
}

export const QuoteImageSlide = ({ slide }: QuoteImageSlideProps) => {
  const theme = useTheme();

  return (
    <Box flex center bg="surface" p={6} style={{ maxHeight: SCREEN_HEIGHT }}>
      <Animated.View entering={FadeInUp.delay(100)} style={{ alignItems: "center", gap: theme.spacing[4] }}>
        <MediaRenderer mediaUrl={slide.mediaUrl} mediaType={slide.mediaType} isCentered />
        <Text size="2xl" weight="bold" style={{ textAlign: "center", fontStyle: "italic" }}>
          &ldquo;{slide.content}&rdquo;
        </Text>
        <Animated.View entering={FadeInDown.delay(300)}>
          <Text size="lg" variant="secondary" style={{ textAlign: "center" }}>
            — {slide.author}
          </Text>
        </Animated.View>
      </Animated.View>
    </Box>
  );
};

