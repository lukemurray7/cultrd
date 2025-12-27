import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { useFeaturedCourse } from "../../../../../lib/queries/courses";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";
import { FeaturedCardSkeleton } from "../FeaturedCardSkeleton";

export const FeaturedCard = () => {
  const theme = useTheme();
  const router = useRouter();
  const { data: course, isLoading } = useFeaturedCourse();

  if (!course && isLoading) {
    return <FeaturedCardSkeleton />;
  }

  if (!course) {
    return null;
  }

  return (
    <Animated.View entering={FadeIn.delay(100).duration(400)}>
      <Box borderRadius="xl" bg="surfaceLight" border shadow="sm" overflow="hidden">
      <Pressable
        borderRadius="xl"
        onPress={() => router.push(`/course/${course.id}`)}
      >
        <Box position="relative" borderRadius="xl" width="100%" aspectRatio={16 / 12}>
          <Image
            source={{ uri: course.imageUrl }}
            style={{ width: "100%", height: "100%", borderRadius: theme.radii.xl }}
            contentFit="cover"
          />
          <Box
            position="absolute"
            top={10}
            left={12}
            bg="brand.primary"
            px={3}
            py={1}
            borderRadius="md"
          >
            <Text size="xs" weight="bold" style={{ color: theme.colors.text.white }}>
              Featured Course
            </Text>
          </Box>
        </Box>
        <Box p={4} gap={2}>
          <Box>
            <Text
              size="lg"
              weight="bold"
              variant="primary"
              lineHeight="sm"
              mb={1}
            >
              {course.title}
            </Text>
            <Text size="sm" weight="regular" variant="muted" numberOfLines={2}>
              {course.description}
            </Text>
          </Box>
          {course.progress !== undefined && (
            <Box
              width="100%"
              bg={`${theme.colors.text.muted}80`}
              borderRadius="pill"
              height={4}
              mt={2}
              mb={1}
            >
              <Box
                width={`${course.progress}%`}
                bg={theme.colors.brand.primary}
                height={4}
                borderRadius="pill"
              />
            </Box>
          )}
          <Box row center between mt={1}>
            <Text size="xs" weight="semibold" variant="secondary">
              {course.category} • {course.progress === 100 || (course.currentChapter !== undefined && course.totalChapters !== undefined && course.currentChapter >= course.totalChapters) ? "Completed" : `${course.timeRemaining} min left`}
            </Text>
            <Pressable
              center
              borderRadius="md"
              bg="primary"
              border
              px={4}
              height={32}
              onPress={() => router.push(`/course/${course.id}`)}
            >
              <Text
                size="xs"
                weight="bold"
                color={theme.colors.text.white}
                variant="primary"
                textTransform="uppercase"
                letterSpacing={0.5}
              >
                {(course.progress !== undefined && course.progress > 0) || course.currentChapter !== undefined ? "Continue" : "Start"}
              </Text>
            </Pressable>
          </Box>
        </Box>
      </Pressable>
    </Box>
    </Animated.View>
  );
};
