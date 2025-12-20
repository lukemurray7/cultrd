import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Course } from "../../../../../types/courses";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

interface RecommendedCardProps {
  course: Course;
}

export const RecommendedCard = ({ course }: RecommendedCardProps) => {
  const theme = useTheme();
  const router = useRouter();

  const getCategoryColor = (category: string) => {
    if (category === "Science") {
      return theme.colors.brand.accent;
    }
    return theme.colors.brand.primary;
  };

  return (
    <Pressable
      row
      gap={4}
      p={3}
      borderRadius="lg"
      bg={`${theme.colors.bg.surfaceLight}80`}
      border
      onPress={() => router.push(`/course/${course.id}`)}
    >
      <Image
        source={{ uri: course.imageUrl }}
        style={{
          width: 96,
          height: 96,
          borderRadius: theme.radii.md,
        }}
        contentFit="cover"
      />
      <Box flex style={{ justifyContent: "center" }}>
        <Box row between mb={1} style={{ alignItems: "flex-start" }}>
          <Text
            size="xs"
            weight="bold"
            textTransform="uppercase"
            letterSpacing={1}
            color={getCategoryColor(course.category)}
          >
            {course.category}
          </Text>
          <MaterialIcons name="more-horiz" size={20} color={theme.colors.text.secondary} />
        </Box>
        <Text size="md" weight="bold" lineHeight="sm" mb={1}>
          {course.title}
        </Text>
        <Text variant="secondary" size="xs" mb={2} numberOfLines={2}>
          {course.description}
        </Text>
        <Box row center gap={1}>
          <MaterialIcons name="schedule" size={12} color={theme.colors.text.secondary} />
          <Text variant="secondary" style={{ fontSize: 10 }}>
            {course.duration} min read
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

