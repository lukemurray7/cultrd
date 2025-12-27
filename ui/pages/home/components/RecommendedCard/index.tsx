import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { getCategoryColor } from "../../../../../lib/utils/categoryColors";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Course } from "../../../../../types/courses";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

interface RecommendedCardProps {
  course: Course;
  index?: number;
}

export const RecommendedCard = ({ course, index = 0 }: RecommendedCardProps) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Animated.View entering={FadeIn.delay(300 + index * 50).duration(400)}>
      <Pressable
        row
        gap={4}
        p={3}
        borderRadius="xl"
        bg={`${theme.colors.bg.surfaceLight}80`}
        border
        shadow="sm"
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
        <Text
          size="xs"
          weight="bold"
          textTransform="uppercase"
          letterSpacing={1}
          style={{ color: getCategoryColor(course.category, theme) }}
          mb={1}
        >
          {course.category}
        </Text>
        <Text size="md" weight="bold" lineHeight="sm" mb={1}>
          {course.title}
        </Text>
        <Text variant="secondary" size="xs" mb={2} numberOfLines={2}>
          {course.description || "description"}
        </Text>
        <Box row gap={2}>
          <Box row center gap={1} style={{ alignItems: "center" }}>
            <MaterialIcons name="book" size={12} color={theme.colors.text.secondary} />
            <Text variant="secondary" style={{ fontSize: 10, lineHeight: 12 }}>
              {course.totalChapters || course.lessons || course.chapters?.length || 0} Chapters
            </Text>
          </Box>
          <Box row center gap={1} style={{ alignItems: "center" }}>
            <MaterialIcons name="schedule" size={12} color={theme.colors.text.secondary} />
            <Text variant="secondary" style={{ fontSize: 10, lineHeight: 12 }}>
              {course.duration} min
            </Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
    </Animated.View>
  );
};

