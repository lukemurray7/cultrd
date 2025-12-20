import { ReactNode } from "react";
import { Course } from "../../../types/courses";
import { Box } from "../Box";
import { Pressable } from "../Pressable";
import { ScrollView } from "../ScrollView";
import { Text } from "../Text";

interface HorizontalScrollableCoursesProps {
  title: string;
  courses?: Course[];
  renderCard: (course: Course, index: number) => ReactNode;
  showSeeAll?: boolean;
  onSeeAllPress?: () => void;
}

export const HorizontalScrollableCourses = ({
  title,
  courses,
  renderCard,
  showSeeAll = true,
  onSeeAllPress,
}: HorizontalScrollableCoursesProps) => {
  return (
    <Box mb={6}>
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pl={4}
        pr={4}
        gap={4}
      >
        {courses?.map((course, index) => (
          <Box key={course.id}>{renderCard(course, index)}</Box>
        ))}
      </ScrollView>
    </Box>
  );
};

