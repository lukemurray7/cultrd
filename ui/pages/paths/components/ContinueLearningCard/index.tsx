import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { getCategoryColor } from "../../../../../lib/utils/categoryColors";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { LearningPathProgress } from "../../../../../types/paths";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

interface ContinueLearningCardProps {
  path: LearningPathProgress;
}

export const ContinueLearningCard = ({ path }: ContinueLearningCardProps) => {
  const theme = useTheme();
  const router = useRouter();
  const categoryColor = getCategoryColor(path.category, theme);
  const isCompleted = path.progressPercentage === 100 || path.coursesCompleted === path.totalCourses;

  return (
    <Pressable
      row
      gap={3}
      p={3}
      borderRadius="lg"
      bg="surfaceLight"
      border
      onPress={() => router.push(`/path/${path.id}`)}
    >
      <Box position="relative">
        <Image
          source={{ uri: path.imageUrl }}
          style={{
            width: 96,
            height: 96,
            borderRadius: theme.radii.md,
          }}
          contentFit="cover"
        />
        {isCompleted && (
          <Box
            position="absolute"
            top={0}
            right={0}
            borderRadius="pill"
            center
            style={{
              backgroundColor: categoryColor,
              width: 32,
              height: 32,
            }}
          >
            <MaterialIcons
              name="check"
              size={20}
              color={theme.colors.text.white}
            />
          </Box>
        )}
      </Box>
      <Box flex gap={2}>
        <Box>
          <Text
            size="xs"
            weight="bold"
            textTransform="uppercase"
            letterSpacing={1}
            style={{ color: categoryColor }}
            mb={1}
          >
            {path.category}
          </Text>
          <Text size="md" weight="bold" lineHeight="sm" mb={1}>
            {path.title}
          </Text>
          <Text variant="secondary" size="xs" numberOfLines={1}>
            {path.description}
          </Text>
        </Box>
        <Box gap={1}>
          <Text variant="secondary" size="xs">
            {isCompleted ? "Completed" : `${path.coursesCompleted} of ${path.totalCourses} courses completed`}
          </Text>
          <Box row center between>
            <Box
              flex
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
            <Text
              size="xs"
              weight="semibold"
              style={{
                marginLeft: theme.spacing[2],
                color: theme.colors.text.white,
              }}
            >
              {path.progressPercentage}%
            </Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};

