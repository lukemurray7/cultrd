import { Course } from "../../../../../types/courses";
import { CourseCard } from "../../../../components/CourseCard";

interface TrendingCardProps {
  course: Course;
  showBookmark?: boolean;
}

export const TrendingCard = ({ course, showBookmark = false }: TrendingCardProps) => {
  return <CourseCard course={course} showBookmark={showBookmark} />;
};

