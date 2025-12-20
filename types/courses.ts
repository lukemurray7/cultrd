export type Category = "For You" | "Culture" | "Art" | "Economics" | "Politics" | "History" | "Philosophy" | "Science";

export interface Course {
  id: string;
  title: string;
  description: string;
  category: Category;
  imageUrl: string;
  duration: number;
  lessons?: number;
  progress?: number;
}

export interface FeaturedCourse extends Course {
  timeRemaining: number;
}

export interface User {
  name: string;
  avatarUrl: string;
  streak: number;
  isOnline: boolean;
}

