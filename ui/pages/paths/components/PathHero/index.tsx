import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { LearningPath, LearningPathProgress } from "../../../../../types/paths";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

interface PathHeroProps {
  path: LearningPath | LearningPathProgress;
  categoryColor: string;
}

export const PathHero = ({ path, categoryColor }: PathHeroProps) => {
  const theme = useTheme();
  const isCompleted = "progressPercentage" in path && (path.progressPercentage === 100 || path.coursesCompleted === path.totalCourses);

  return (
    <Box position="relative" height={300} mb={4} mx={4} borderRadius="xl" overflow="hidden" shadow="sm" border>
      <Image
        source={{ uri: path.imageUrl }}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
      />
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p={4}
        style={{
          backgroundColor: `${theme.colors.text.black}80`,
        }}
      >
        <Box row gap={2} mb={3}>
          <Box
            borderRadius="md"
            px={3}
            py={1}
            bg={categoryColor}
            style={{
              alignSelf: "flex-start",
            }}
          >
            <Text
              size="xs"
              weight="bold"
              textTransform="uppercase"
              letterSpacing={1}
              color={theme.colors.text.black}
            >
              {path.category}
            </Text>
          </Box>
          {isCompleted && (
            <Box
              row
              center
              gap={1}
              borderRadius="md"
              px={3}
              py={1}
              style={{
                backgroundColor: categoryColor,
                alignSelf: "flex-start",
              }}
            >
              <MaterialIcons
                name="check-circle"
                size={16}
                color={theme.colors.text.black}
              />
              <Text
                size="xs"
                weight="bold"
                textTransform="uppercase"
                letterSpacing={1}
                color={theme.colors.text.black}
              >
                Completed
              </Text>
            </Box>
          )}
        </Box>
        <Text size="2xl" weight="bold" mb={2} color={theme.colors.text.white}>
          {path.title}
        </Text>
        <Text size="md" color={theme.colors.text.white}>
          {path.description}
        </Text>
      </Box>
    </Box>
  );
};

