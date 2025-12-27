import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { Course } from "../../../types/courses";
import { Box } from "../Box";
import { Pressable } from "../Pressable";
import { Text } from "../Text";

interface CourseCardProps {
  course: Course;
  width?: number;
  index?: number;
}

export const CourseCard = ({
  course,
  width = 160,
  index = 0,
}: CourseCardProps) => {
  const router = useRouter();

  return (
    <Animated.View entering={FadeIn.delay(200 + index * 50).duration(400)}>
      <Pressable
        width={width}
        bg="surfaceLight"
        borderRadius="xl"
        border
        overflow="hidden"
        onPress={() => router.push(`/course/${course.id}`)}
      >
      <Box
        width={width}
        height={208}
        borderRadiusTopLeft="xl"
        borderRadiusTopRight="xl"
        overflow="hidden"
        position="relative"
      >
        <Image
          source={{ uri: course.imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          contentPosition="center"
        />
      </Box>
      <Box p={3} height={80} borderRadiusBottomLeft="xl" borderRadiusBottomRight="xl" shadow="md">
        <Text size="sm" weight="bold" lineHeight="sm" mb={0} numberOfLines={2}>
          {course.title}
        </Text>
        <Text variant="secondary" size="xs">
          {course.category} • {course.lessons || 0} lessons
        </Text>
      </Box>
    </Pressable>
    </Animated.View>
  );
};
