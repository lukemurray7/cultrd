import { useMemo } from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Course } from "../../../../../types/courses";
import { Box } from "../../../../components/Box";
import { PathCourseNode } from "../PathCourseNode";

interface PathProgressProps {
  courses: Course[];
  completedCourseIds: Set<string>;
  firstIncompleteIndex: number;
  categoryColor: string;
}

const NODE_HEIGHT = 80;
const CIRCLE_CENTER_X = 30;

export const PathProgress = ({
  courses,
  completedCourseIds,
  firstIncompleteIndex,
  categoryColor,
}: PathProgressProps) => {
  const theme = useTheme();

  const pathData = useMemo(() => {
    if (courses.length === 0) return "";

    const circleRadius = 24;
    const nodeTopPadding = theme.spacing[2];
    const startY = nodeTopPadding + circleRadius;
    const endY = (courses.length - 1) * NODE_HEIGHT + nodeTopPadding + circleRadius;

    return `M ${CIRCLE_CENTER_X} ${startY} L ${CIRCLE_CENTER_X} ${endY}`;
  }, [courses.length, theme.spacing]);

  return (
    <Box position="relative" px={4} py={2}>
      <Svg
        height={courses.length * NODE_HEIGHT}
        width={60}
        style={{
          position: "absolute",
          left: theme.spacing[4],
          top: theme.spacing[2],
        }}
      >
        <Path
          d={pathData}
          stroke={categoryColor}
          strokeWidth={3}
          fill="none"
        />
      </Svg>
      <Box>
        {courses.map((course) => {
          const isCompleted = completedCourseIds.has(course.id);

          return (
            <PathCourseNode
              key={course.id}
              course={course}
              isCompleted={isCompleted}
              categoryColor={categoryColor}
            />
          );
        })}
      </Box>
    </Box>
  );
};

