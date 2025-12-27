import { ReactNode } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { Course } from "../../../types/courses";
import { Box } from "../Box";
import { Pressable } from "../Pressable";
import { ScrollView } from "../ScrollView";
import { Text } from "../Text";

interface HorizontalScrollableCoursesProps {
  title: string;
  courses?: Course[];
  isLoading?: boolean;
  renderCard: (course: Course, index: number) => ReactNode;
  renderSkeleton?: () => ReactNode;
  showSeeAll?: boolean;
  onSeeAllPress?: () => void;
}

export const HorizontalScrollableCourses = ({
  title,
  courses,
  isLoading,
  renderCard,
  renderSkeleton,
  showSeeAll = true,
  onSeeAllPress,
}: HorizontalScrollableCoursesProps) => {
  return (
    <Box mb={6}>
      <Animated.View entering={FadeIn.delay(200).duration(400)}>
        <Box row between px={4} mb={3}>
          <Text size="lg" weight="bold">
            {title}
          </Text>
          {showSeeAll && (
            <Pressable onPress={onSeeAllPress}>
              <Text size="sm" weight="semibold" variant="brand">
                See all
              </Text>
            </Pressable>
          )}
        </Box>
      </Animated.View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pl={4}
        pr={4}
        gap={4}
      >
        {isLoading && renderSkeleton ? (
          <>
            <Box>{renderSkeleton()}</Box>
            <Box>{renderSkeleton()}</Box>
            <Box>{renderSkeleton()}</Box>
          </>
        ) : (
          courses?.map((course, index) => (
            <Box key={course.id}>{renderCard(course, index)}</Box>
          ))
        )}
      </ScrollView>
    </Box>
  );
};

