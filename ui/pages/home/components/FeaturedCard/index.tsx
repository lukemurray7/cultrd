import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useFeaturedCourse } from "../../../../../lib/queries/courses";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

export const FeaturedCard = () => {
  const theme = useTheme();
  const router = useRouter();
  const { data: course } = useFeaturedCourse();

  if (!course) {
    return null;
  }

  return (
    <Pressable
      borderRadius="xl"
      bg="surfaceLight"
      border
      overflow="hidden"
      shadow="sm"
      onPress={() => router.push(`/course/${course.id}`)}
    >
      <Box position="relative" width="100%" aspectRatio={16 / 12}>
        <Image
          source={{ uri: course.imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
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
            {course.category} • {course.timeRemaining} min left
          </Text>
          <Pressable center borderRadius="md" bg="primary" px={4} height={32}>
            <Text
              size="xs"
              weight="bold"
              variant="primary"
              textTransform="uppercase"
              letterSpacing={0.5}
            >
              Continue
            </Text>
          </Pressable>
        </Box>
      </Box>
    </Pressable>
  );
};
