import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";

export const FeaturedCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Box borderRadius="xl" bg="surfaceLight" border shadow="sm" overflow="hidden">
      <Box position="relative" borderRadius="xl" width="100%" aspectRatio={16 / 12}>
        <Box
          flex
          bg={`${theme.colors.text.muted}40`}
          borderRadius="xl"
          width="100%"
          height="100%"
        />
      </Box>
      <Box p={4} gap={2}>
        <Box>
          <Box
            bg={`${theme.colors.text.muted}40`}
            borderRadius="md"
            width="80%"
            height={20}
            mb={2}
          />
          <Box
            bg={`${theme.colors.text.muted}40`}
            borderRadius="md"
            width="100%"
            height={14}
            mb={1}
          />
          <Box
            bg={`${theme.colors.text.muted}40`}
            borderRadius="md"
            width="70%"
            height={14}
          />
        </Box>
        <Box
          width="100%"
          bg={`${theme.colors.text.muted}40`}
          borderRadius="pill"
          height={4}
          mt={2}
          mb={1}
        />
        <Box row center between mt={1}>
          <Box
            bg={`${theme.colors.text.muted}40`}
            borderRadius="md"
            width={100}
            height={12}
          />
          <Box
            bg={`${theme.colors.text.muted}40`}
            borderRadius="md"
            width={80}
            height={32}
          />
        </Box>
      </Box>
    </Box>
  );
};

