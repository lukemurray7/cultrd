import Animated, { FadeIn } from "react-native-reanimated";
import { useUser } from "../../../../../lib/queries/courses";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { LottieAnimation } from "../../../../components/LottieAnimation";
import { Text } from "../../../../components/Text";
import { HomeHeaderSkeleton } from "../HomeHeaderSkeleton";

const bookAnimation = require("../../../../../assets/animations/book.json");

export const HomeHeader = () => {
  const theme = useTheme();
  const { data: user, isLoading } = useUser();

  if (!user && isLoading) {
    return <HomeHeaderSkeleton />;
  }

  if (!user) {
    return null;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Animated.View entering={FadeIn.duration(400)}>
      <Box
        row
        center
        between
        px={4}
        py={1}
        mx={4}
        borderRadius="xl"
        bg="surfaceLight"
        border
        shadow="sm"
      >
        <Box>
          <Text
            size="md"
            weight="bold"
            style={{ lineHeight: theme.typography.lineHeight.sm }}
          >
            {getGreeting()}
          </Text>
          <Text variant="secondary" size="xs" weight="medium">
            Ready to learn?
          </Text>
        </Box>
        <Box
          center
          style={{
            width: 60,
            height: 60,
          }}
        >
          <LottieAnimation
            source={bookAnimation}
            autoPlay
            loop
            style={{
              width: 60,
              height: 60,
            }}
          />
        </Box>
      </Box>
    </Animated.View>
  );
};
