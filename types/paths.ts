import { Category } from "./courses";

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: Category;
  imageUrl: string;
  courses: string[];
  totalCourses: number;
  totalDuration: number;
}

export interface LearningPathProgress extends LearningPath {
  coursesCompleted: number;
  progressPercentage: number;
}

export interface PathOfTheWeek extends LearningPath {
  isPathOfTheWeek: true;
}

