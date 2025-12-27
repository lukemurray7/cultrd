import { Course } from "../../../../../types/courses";
import { CourseCard } from "../../../../components/CourseCard";

interface TrendingCardProps {
  course: Course;
  showBookmark?: boolean;
  index?: number;
}

export const TrendingCard = ({ course, showBookmark = false, index = 0 }: TrendingCardProps) => {
  return <CourseCard course={course} showBookmark={showBookmark} index={index} />;
};

