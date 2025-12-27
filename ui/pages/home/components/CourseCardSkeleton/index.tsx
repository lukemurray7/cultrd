import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";

export const CourseCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Box
      row
      gap={4}
      p={3}
      borderRadius="xl"
      bg={`${theme.colors.bg.surfaceLight}80`}
      border
      shadow="sm"
    >
      <Box
        width={96}
        height={96}
        borderRadius="md"
        bg={`${theme.colors.text.muted}40`}
      />
      <Box flex style={{ justifyContent: "center" }}>
        <Box
          bg={`${theme.colors.text.muted}40`}
          borderRadius="md"
          width={60}
          height={10}
          mb={1}
        />
        <Box
          bg={`${theme.colors.text.muted}40`}
          borderRadius="md"
          width="90%"
          height={14}
          mb={1}
        />
        <Box
          bg={`${theme.colors.text.muted}40`}
          borderRadius="md"
          width="100%"
          height={10}
          mb={1}
        />
        <Box
          bg={`${theme.colors.text.muted}40`}
          borderRadius="md"
          width="70%"
          height={10}
          mb={2}
        />
        <Box row gap={2}>
          <Box
            bg={`${theme.colors.text.muted}40`}
            borderRadius="md"
            width={60}
            height={10}
          />
          <Box
            bg={`${theme.colors.text.muted}40`}
            borderRadius="md"
            width={50}
            height={10}
          />
        </Box>
      </Box>
    </Box>
  );
};

