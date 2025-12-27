import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { LottieAnimation } from "../../../../components/LottieAnimation";

const bookAnimation = require("../../../../../assets/animations/book.json");

export const HomeHeaderSkeleton = () => {
  const theme = useTheme();

  return (
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
        <Box
          bg={`${theme.colors.text.muted}40`}
          borderRadius="md"
          width={120}
          height={16}
          mb={1}
        />
        <Box
          bg={`${theme.colors.text.muted}40`}
          borderRadius="md"
          width={100}
          height={12}
        />
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
  );
};

