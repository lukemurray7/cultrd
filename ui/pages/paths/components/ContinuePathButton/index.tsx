import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Course } from "../../../../../types/courses";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

interface ContinuePathButtonProps {
  categoryColor: string;
  firstIncompleteCourse: Course | null;
  courses: Course[];
}

export const ContinuePathButton = ({
  categoryColor,
  firstIncompleteCourse,
  courses,
}: ContinuePathButtonProps) => {
  const router = useRouter();
  const theme = useTheme();

  const handlePress = () => {
    if (firstIncompleteCourse) {
      router.push(`/course/${firstIncompleteCourse.id}`);
    } else if (courses.length > 0) {
      router.push(`/course/${courses[0].id}`);
    }
  };

  return (
    <Box px={4} pb={8} pt={4}>
      <Pressable
        row
        center
        gap={2}
        borderRadius="md"
        px={6}
        py={4}
        bg={categoryColor}
        onPress={handlePress}
      >
        <MaterialIcons
          name="play-arrow"
          size={24}
          color={theme.colors.text.black}
        />
        <Text size="lg" weight="bold" color={theme.colors.text.black}>
          Continue Path
        </Text>
      </Pressable>
    </Box>
  );
};

