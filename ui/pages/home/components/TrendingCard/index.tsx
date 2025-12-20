import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Course } from "../../../../../types/courses";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

interface TrendingCardProps {
  course: Course;
  showBookmark?: boolean;
}

export const TrendingCard = ({ course, showBookmark = false }: TrendingCardProps) => {
  const theme = useTheme();

  return (
    <Pressable width={160} gap={2}>
      <Box
        width={160}
        height={208}
        borderRadius="lg"
        overflow="hidden"
        position="relative"
      >
        <Image
          source={{ uri: course.imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        <Box
          position="absolute"
          bg="rgba(0, 0, 0, 0.2)"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        {showBookmark && (
          <Box
            position="absolute"
            bg="rgba(255, 255, 255, 0.2)"
            borderRadius="pill"
            p={1}
            style={{
              top: theme.spacing[2],
              right: theme.spacing[2],
            }}
          >
            <MaterialIcons name="bookmark" size={16} color={theme.colors.text.primary} />
          </Box>
        )}
      </Box>
      <Box>
        <Text size="sm" weight="bold" lineHeight="sm" mb={0} numberOfLines={2}>
          {course.title}
        </Text>
        <Text variant="secondary" size="xs">
          {course.category} • {course.lessons || 0} lessons
        </Text>
      </Box>
    </Pressable>
  );
};

