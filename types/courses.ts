export type Category = "For You" | "Culture" | "Art" | "Economics" | "Politics" | "History" | "Philosophy" | "Science";

export interface Chapter {
  id: string;
  title: string;
  duration: number;
  isCompleted?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: Category;
  imageUrl: string;
  duration: number;
  lessons: number;
  progress: number;
  currentChapter?: number;
  totalChapters?: number;
  chapters: Chapter[];
}

export interface FeaturedCourse extends Course {
  timeRemaining: number;
}

export interface User {
  name: string;
  avatarUrl: string;
  streak: number;
  isOnline: boolean;
  email: string;
  subscription?: {
    type: string;
    status: string;
  };
}

