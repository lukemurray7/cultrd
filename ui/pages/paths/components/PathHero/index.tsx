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
        <Box
          borderRadius="md"
          px={3}
          py={1}
          mb={3}
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

