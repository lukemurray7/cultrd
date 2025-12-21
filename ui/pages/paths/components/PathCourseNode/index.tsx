import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Course } from "../../../../../types/courses";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

interface PathCourseNodeProps {
  course: Course;
  isCompleted: boolean;
  categoryColor: string;
}

export const PathCourseNode = ({
  course,
  isCompleted,
  categoryColor,
}: PathCourseNodeProps) => {
  const theme = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push(`/course/${course.id}`);
  };

  return (
    <Box
      row
      gap={3}
      mb={4}
      bg="surfaceLight"
      borderRadius="xl"
      border
      shadow="sm"
      py={2}
      pr={2}
    >
      <Box width={60} center>
        <Pressable
          onPress={handlePress}
          width={48}
          height={48}
          borderRadius="pill"
          center
          style={{
            backgroundColor: isCompleted
              ? categoryColor
              : theme.colors.bg.surfaceLight,
            borderWidth: isCompleted ? 0 : 2,
            borderColor: categoryColor,
          }}
        >
          {isCompleted && (
            <MaterialIcons
              name="check"
              size={24}
              color={theme.colors.text.white}
            />
          )}
        </Pressable>
      </Box>
      <Box flex gap={1}>
        <Pressable onPress={handlePress}>
          <Text size="md" weight="semibold" mb={1}>
            {course.title}
          </Text>
          <Text size="xs" variant="secondary">
            {course.chapters?.length || 0} chapters • {course.duration} minutes
          </Text>
        </Pressable>
        <Box row gap={2} center mr={4}>
          <Box
            flex
            height={4}
            bg="primary"
            borderRadius="pill"
            overflow="hidden"
          >
            <Box
              height="100%"
              width={`${course.progress}%`}
              style={{
                backgroundColor: categoryColor,
              }}
              borderRadius="pill"
            />
          </Box>
          <Text size="xs" weight="semibold" color={theme.colors.text.muted}>
            {course.progress}%
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
