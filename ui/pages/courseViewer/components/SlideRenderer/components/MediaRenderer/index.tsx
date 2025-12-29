import { Image } from "expo-image";
import { Dimensions } from "react-native";
import { useTheme } from "../../../../../../../theme/ThemeProvider";
import { Box } from "../../../../../../../ui/components/Box";
import { Text } from "../../../../../../../ui/components/Text";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_IMAGE_WIDTH = SCREEN_WIDTH * 0.85;
const MAX_IMAGE_HEIGHT = SCREEN_HEIGHT * 0.4;

interface MediaRendererProps {
  mediaUrl: string;
  mediaType: string;
  isCentered?: boolean;
}

export const MediaRenderer = ({ mediaUrl, mediaType, isCentered = false }: MediaRendererProps) => {
  const theme = useTheme();

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

