import { Dimensions } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTheme } from "../../../../../../../theme/ThemeProvider";
import { ImageOnlySlide as ImageOnlySlideType } from "../../../../../../../types/courseContent";
import { Box } from "../../../../../../../ui/components/Box";
import { Text } from "../../../../../../../ui/components/Text";
import { MediaRenderer } from "../MediaRenderer";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ImageOnlySlideProps {
  slide: ImageOnlySlideType;
}

export const ImageOnlySlide = ({ slide }: ImageOnlySlideProps) => {
  const theme = useTheme();

  return (
    <Box flex center bg="surface" p={6} style={{ maxHeight: SCREEN_HEIGHT }}>
      <Animated.View entering={FadeIn.delay(200)} style={{ alignItems: "center", gap: theme.spacing[4] }}>
        <MediaRenderer mediaUrl={slide.mediaUrl} mediaType={slide.mediaType} isCentered />
        {slide.caption && (
          <Text size="lg" weight="semibold" style={{ textAlign: "center" }}>
            {slide.caption}
          </Text>
        )}
      </Animated.View>
    </Box>
  );
};

