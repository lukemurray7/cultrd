import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { DimensionValue } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { Course } from "../../../types/courses";
import { Box } from "../Box";
import { Pressable } from "../Pressable";
import { Text } from "../Text";

interface LibraryCourseCardProps {
  course: Course;
  width?: DimensionValue;
}

export const LibraryCourseCard = ({ course, width }: LibraryCourseCardProps) => {
  const theme = useTheme();
  const hasProgress = course.currentChapter !== undefined && course.totalChapters !== undefined;
  const progressPercentage = hasProgress && course.totalChapters
    ? Math.round(((course.currentChapter || 0) / course.totalChapters) * 100)
    : course.progress || 0;

  return (
    <Pressable bg="surfaceLight" borderRadius="xl" border overflow="hidden" width={width}>
      <Box width="100%" height={208} overflow="hidden" position="relative">
        <Image
          source={{ uri: course.imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          contentPosition="center"
        />
        <Box
          position="absolute"
          style={{
            bottom: theme.spacing[3],
            right: theme.spacing[3],
          }}
        >
          <Box
            borderRadius="pill"
            center
            style={{
              backgroundColor: theme.colors.brand.primary,
              width: 40,
              height: 40,
            }}
          >
            <MaterialIcons name="play-arrow" size={24} color={theme.colors.text.white} />
          </Box>
        </Box>
      </Box>
      <Box p={3} gap={2} flex>
        <Text size="sm" weight="bold" lineHeight="sm" mb={0} numberOfLines={1}>
          {course.title}
        </Text>
        {hasProgress && (
          <Box gap={2}>
            <Text variant="secondary" size="xs">
              Chapter {course.currentChapter} of {course.totalChapters}
            </Text>
            <Box
              width="100%"
              height={4}
              bg="primary"
              borderRadius="pill"
              overflow="hidden"
            >
              <Box
                height="100%"
                width={`${progressPercentage}%`}
                style={{
                  backgroundColor: theme.colors.brand.primary,
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Pressable>
  );
};

