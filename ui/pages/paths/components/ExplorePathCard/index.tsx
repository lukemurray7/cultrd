import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { LearningPath } from "../../../../../types/paths";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

interface ExplorePathCardProps {
  path: LearningPath;
}

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  }
  return `${mins}m`;
};

export const ExplorePathCard = ({ path }: ExplorePathCardProps) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Pressable
      row
      center
      between
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
          width: 64,
          height: 64,
          borderRadius: theme.radii.md,
        }}
        contentFit="cover"
      />
      <Box flex>
        <Text size="md" weight="bold" lineHeight="sm" mb={1}>
          {path.title}
        </Text>
        <Text variant="secondary" size="xs">
          {path.totalCourses} Courses • {formatDuration(path.totalDuration)}
        </Text>
      </Box>
      <MaterialIcons
        name="chevron-right"
        size={24}
        color={theme.colors.text.secondary}
      />
    </Pressable>
  );
};


