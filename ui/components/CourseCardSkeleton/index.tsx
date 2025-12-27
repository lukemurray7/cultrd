import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../Box";

interface CourseCardSkeletonProps {
  width?: number;
}

export const CourseCardSkeleton = ({ width = 160 }: CourseCardSkeletonProps) => {
  const theme = useTheme();

  return (
    <Box
      width={width}
      bg="surfaceLight"
      borderRadius="xl"
      border
      overflow="hidden"
    >
      <Box
        width={width}
        height={208}
        borderRadiusTopLeft="xl"
        borderRadiusTopRight="xl"
        bg={`${theme.colors.text.muted}40`}
      />
      <Box p={3} height={80} borderRadiusBottomLeft="xl" borderRadiusBottomRight="xl">
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
          width="70%"
          height={10}
        />
      </Box>
    </Box>
  );
};

