import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { LearningPathProgress } from "../../../../../types/paths";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Theme } from "../../../../../theme/tokens";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

interface ContinueLearningCardProps {
  path: LearningPathProgress;
}

const getCategoryColor = (category: string, theme: Theme) => {
  if (category === "Economics") {
    return theme.colors.brand.accent;
  }
  if (category === "Philosophy") {
    return theme.colors.topics.philosophy;
  }
  return theme.colors.brand.primary;
};

export const ContinueLearningCard = ({ path }: ContinueLearningCardProps) => {
  const theme = useTheme();
  const router = useRouter();
  const categoryColor = getCategoryColor(path.category, theme);

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
      <Image
        source={{ uri: path.imageUrl }}
        style={{
          width: 96,
          height: 96,
          borderRadius: theme.radii.md,
        }}
        contentFit="cover"
      />
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
            {path.coursesCompleted} of {path.totalCourses} courses completed
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

