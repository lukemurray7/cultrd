import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { DimensionValue } from "react-native";
import { getCategoryColor } from "../../../lib/utils/categoryColors";
import { useTheme } from "../../../theme/ThemeProvider";
import { LearningPath, LearningPathProgress } from "../../../types/paths";
import { Box } from "../Box";
import { Pressable } from "../Pressable";
import { Text } from "../Text";

interface LibraryPathCardProps {
  path: LearningPath | LearningPathProgress;
  width?: DimensionValue;
}

export const LibraryPathCard = ({ path, width }: LibraryPathCardProps) => {
  const theme = useTheme();
  const router = useRouter();
  const categoryColor = getCategoryColor(path.category, theme);
  const isCompleted = "progressPercentage" in path && (path.progressPercentage === 100 || path.coursesCompleted === path.totalCourses);

  return (
    <Pressable
      bg="surfaceLight"
      borderRadius="xl"
      border
      overflow="hidden"
      width={width}
      onPress={() => router.push(`/path/${path.id}`)}
    >
      <Box width="100%" height={208} overflow="hidden" position="relative">
        <Image
          source={{ uri: path.imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          contentPosition="center"
        />
        {isCompleted && (
          <Box
            position="absolute"
            style={{
              top: theme.spacing[2],
              right: theme.spacing[2],
            }}
          >
            <Box
              borderRadius="pill"
              center
              style={{
                backgroundColor: categoryColor,
                width: 40,
                height: 40,
              }}
            >
              <MaterialIcons name="check" size={24} color={theme.colors.text.white} />
            </Box>
          </Box>
        )}
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
          {path.title}
        </Text>
        {"progressPercentage" in path && path.progressPercentage > 0 ? (
          <Box gap={2}>
            <Text variant="secondary" size="xs">
              {path.coursesCompleted} of {path.totalCourses} courses completed
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
                width={`${path.progressPercentage}%`}
                style={{
                  backgroundColor: categoryColor,
                }}
              />
            </Box>
          </Box>
        ) : (
          <Text variant="secondary" size="xs">
            {path.totalCourses} Courses • {path.totalDuration} minutes
          </Text>
        )}
      </Box>
    </Pressable>
  );
};

