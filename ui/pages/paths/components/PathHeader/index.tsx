import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { LearningPath, LearningPathProgress } from "../../../../../types/paths";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

interface PathHeaderProps {
  path: LearningPath | LearningPathProgress;
  completedCount: number;
  categoryColor: string;
}

export const PathHeader = ({ path, completedCount, categoryColor }: PathHeaderProps) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box
      row
      center
      between
      px={4}
      py={4}
      mx={4}
      my={4}
      borderRadius="xl"
      bg="surfaceLight"
      border
      shadow="sm"
    >
      <Pressable onPress={() => router.back()} center>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={theme.colors.text.primary}
        />
      </Pressable>
      <Box flex center>
        <Text size="lg" weight="bold">
          {path.title}
        </Text>
      </Box>
      <Box width={40} center>
        <Text size="md" weight="bold" color={categoryColor}>
          {completedCount}/{path.totalCourses}
        </Text>
      </Box>
    </Box>
  );
};

