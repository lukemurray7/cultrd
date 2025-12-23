import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../../ui/components/Box";
import { Text } from "../../../../../ui/components/Text";
import { Slide } from "../../../../../types/courseContent";

interface SlideRendererProps {
  slide: Slide;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_IMAGE_WIDTH = SCREEN_WIDTH * 0.85;
const MAX_IMAGE_HEIGHT = SCREEN_HEIGHT * 0.6;

export const SlideRenderer = ({ slide }: SlideRendererProps) => {
  const theme = useTheme();

  const renderMedia = (mediaUrl: string, mediaType: string, isCentered = false) => {
    if (mediaType === "video") {
      return (
        <Box flex center bg="surface" p={6}>
          <Text size="lg" weight="bold" variant="secondary">
            Video coming soon
          </Text>
        </Box>
      );
    }

    if (isCentered) {
      return (
        <Box center mb={4}>
          <Image
            source={{ uri: mediaUrl }}
            style={{
              width: MAX_IMAGE_WIDTH,
              height: MAX_IMAGE_HEIGHT,
              borderRadius: theme.radii.xl,
            }}
            contentFit="cover"
            contentPosition="center"
          />
        </Box>
      );
    }

    return (
      <Image
        source={{ uri: mediaUrl }}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        contentPosition="center"
      />
    );
  };

  switch (slide.type) {
    case "text": {
      return (
        <Box flex center bg="surface" p={6} style={{ maxHeight: SCREEN_HEIGHT }}>
          <Animated.View entering={FadeInUp.delay(100)}>
            <Text size="xl" weight="semibold" style={{ textAlign: "center" }}>
              {slide.content}
            </Text>
          </Animated.View>
        </Box>
      );
    }

    case "text_image": {
      return (
        <Box flex center bg="surface" p={6} style={{ maxHeight: SCREEN_HEIGHT }}>
          <Animated.View entering={FadeInUp.delay(100)} style={{ alignItems: "center", gap: theme.spacing[4] }}>
            {renderMedia(slide.mediaUrl, slide.mediaType, true)}
            <Text size="xl" weight="semibold" style={{ textAlign: "center" }}>
              {slide.content}
            </Text>
          </Animated.View>
        </Box>
      );
    }

    case "quote": {
      return (
        <Box flex center bg="surface" p={6} style={{ maxHeight: SCREEN_HEIGHT }}>
          <Animated.View entering={FadeInUp.delay(100)} style={{ alignItems: "center", gap: theme.spacing[4] }}>
            <Text size="2xl" weight="bold" style={{ textAlign: "center", fontStyle: "italic" }}>
              "{slide.content}"
            </Text>
            <Animated.View entering={FadeInDown.delay(300)}>
              <Text size="lg" variant="secondary" style={{ textAlign: "center" }}>
                — {slide.author}
              </Text>
            </Animated.View>
          </Animated.View>
        </Box>
      );
    }

    case "quote_image": {
      return (
        <Box flex center bg="surface" p={6} style={{ maxHeight: SCREEN_HEIGHT }}>
          <Animated.View entering={FadeInUp.delay(100)} style={{ alignItems: "center", gap: theme.spacing[4] }}>
            {renderMedia(slide.mediaUrl, slide.mediaType, true)}
            <Text size="2xl" weight="bold" style={{ textAlign: "center", fontStyle: "italic" }}>
              "{slide.content}"
            </Text>
            <Animated.View entering={FadeInDown.delay(300)}>
              <Text size="lg" variant="secondary" style={{ textAlign: "center" }}>
                — {slide.author}
              </Text>
            </Animated.View>
          </Animated.View>
        </Box>
      );
    }

    case "image_only": {
      return (
        <Box flex center bg="surface" p={6} style={{ maxHeight: SCREEN_HEIGHT }}>
          <Animated.View entering={FadeIn.delay(200)} style={{ alignItems: "center", gap: theme.spacing[4] }}>
            {renderMedia(slide.mediaUrl, slide.mediaType, true)}
            {slide.caption && (
              <Text size="lg" weight="semibold" style={{ textAlign: "center" }}>
                {slide.caption}
              </Text>
            )}
          </Animated.View>
        </Box>
      );
    }

    default:
      return null;
  }
};

