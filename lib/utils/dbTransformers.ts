import { ChapterContent, CourseContent, Slide } from "../../types/courseContent";
import { Category, Chapter, Course, FeaturedCourse } from "../../types/courses";
import { LearningPath, LearningPathProgress, PathOfTheWeek } from "../../types/paths";

type DbCourse = {
  id: string;
  title: string;
  description: string;
  topic_id: string;
  topic?: {
    id: string;
    label: string;
  } | null;
  image_url: string;
  duration: number;
  lessons: number;
  total_chapters: number;
  is_featured: boolean;
  is_trending: boolean;
  is_recommended: boolean;
  chapters?: DbChapter[] | null;
  user_course_progress?: DbCourseProgress[] | null;
};

type DbChapter = {
  id: string;
  course_id: string;
  title: string;
  order: number;
  duration: number;
  slides?: DbSlide[] | null;
  user_chapter_progress?: DbChapterProgress[] | null;
};

type DbSlide = {
  id: string;
  chapter_id: string;
  type: "text" | "text_image" | "quote" | "quote_image" | "image_only";
  order: number;
  content: string | null;
  author: string | null;
  media_url: string | null;
  media_type: "image" | "video" | null;
  caption: string | null;
};

type DbCourseProgress = {
  progress_percentage: number;
  current_chapter_order: number | null;
};

type DbChapterProgress = {
  is_completed: boolean;
};

type DbPath = {
  id: string;
  title: string;
  description: string;
  topic_id: string;
  topic?: {
    id: string;
    label: string;
  } | null;
  image_url: string;
  total_courses: number;
  total_duration: number;
  is_path_of_the_week: boolean;
  learning_path_courses?: {
    course_id: string;
    order: number;
    courses?: DbCourse;
  }[] | null;
  user_path_progress?: DbPathProgress[] | null;
};

type DbPathProgress = {
  courses_completed: number;
  progress_percentage: number;
};

// Helper to map topic label to Category type
function topicLabelToCategory(label: string): Category {
  const labelMap: Record<string, Category> = {
    "History": "History",
    "Economics": "Economics",
    "Philosophy": "Philosophy",
    "Science": "Science",
    "Culture": "Culture",
    "Politics": "Politics",
  };
  return labelMap[label] || "For You";
}

// Helper to ensure category is a valid type
function ensureCategory(category: string): Category {
  const validCategories: Category[] = ["For You", "Culture", "Art", "Economics", "Politics", "History", "Philosophy", "Science"];
  if (validCategories.includes(category as Category)) {
    return category as Category;
  }
  return "For You"; // Default or handle error
}

export function transformCourse(
  dbCourse: DbCourse,
  progress?: DbCourseProgress
): Course {
  const chapters = (Array.isArray(dbCourse.chapters) ? dbCourse.chapters : [])
    .sort((a, b) => a.order - b.order)
    .map((ch) => transformChapter(ch));

  const progressPercentage = progress?.progress_percentage ?? 0;
  const currentChapterOrder = progress?.current_chapter_order ?? undefined;

  // Derive category from topic
  const category = dbCourse.topic?.label 
    ? topicLabelToCategory(dbCourse.topic.label)
    : ensureCategory(dbCourse.topic_id); // Fallback to topic_id if topic not joined

  return {
    id: dbCourse.id,
    title: dbCourse.title,
    description: dbCourse.description,
    category,
    imageUrl: dbCourse.image_url,
    duration: dbCourse.duration,
    lessons: dbCourse.lessons,
    progress: progressPercentage,
    currentChapter: currentChapterOrder,
    totalChapters: dbCourse.total_chapters,
    chapters,
  };
}

export function transformFeaturedCourse(
  dbCourse: DbCourse,
  progress?: DbCourseProgress
): FeaturedCourse {
  const course = transformCourse(dbCourse, progress);
  const timeRemaining = course.duration - Math.round((course.duration * course.progress) / 100);
  return {
    ...course,
    timeRemaining: Math.max(0, timeRemaining),
  };
}

export function transformChapter(dbChapter: DbChapter): Chapter {
  return {
    id: dbChapter.id,
    title: dbChapter.title,
    duration: dbChapter.duration,
  };
}

export function transformSlide(dbSlide: DbSlide): Slide {
  const base = {
    id: dbSlide.id,
    type: dbSlide.type,
  };

  switch (dbSlide.type) {
    case "text":
      return {
        ...base,
        type: "text",
        content: dbSlide.content || "",
      };
    case "text_image":
      return {
        ...base,
        type: "text_image",
        content: dbSlide.content || "",
        mediaUrl: dbSlide.media_url || "",
        mediaType: (dbSlide.media_type || "image") as "image" | "video",
      };
    case "quote":
      return {
        ...base,
        type: "quote",
        content: dbSlide.content || "",
        author: dbSlide.author || "",
      };
    case "quote_image":
      return {
        ...base,
        type: "quote_image",
        content: dbSlide.content || "",
        author: dbSlide.author || "",
        mediaUrl: dbSlide.media_url || "",
        mediaType: (dbSlide.media_type || "image") as "image" | "video",
      };
    case "image_only":
      return {
        ...base,
        type: "image_only",
        mediaUrl: dbSlide.media_url || "",
        mediaType: (dbSlide.media_type || "image") as "image" | "video",
        caption: dbSlide.caption || undefined,
      };
  }
}

export function transformChapterContent(
  dbChapter: DbChapter,
  isCompleted?: boolean
): ChapterContent {
  const slides = (Array.isArray(dbChapter.slides) ? dbChapter.slides : [])
    .sort((a, b) => a.order - b.order)
    .map((slide) => transformSlide(slide));

  return {
    id: dbChapter.id,
    title: dbChapter.title,
    order: dbChapter.order,
    isCompleted: isCompleted ?? false,
    slides,
  };
}

export function transformCourseContent(
  dbCourse: DbCourse,
  progress?: DbCourseProgress
): CourseContent {
  const chapters = (Array.isArray(dbCourse.chapters) ? dbCourse.chapters : [])
    .sort((a, b) => a.order - b.order)
    .map((ch) => {
      const chapterProgress = Array.isArray(ch.user_chapter_progress) && ch.user_chapter_progress.length > 0
        ? ch.user_chapter_progress[0]
        : undefined;
      return transformChapterContent(ch, chapterProgress?.is_completed);
    });

  const progressPercentage = progress?.progress_percentage ?? 0;

  // Derive category from topic
  const category = dbCourse.topic?.label 
    ? topicLabelToCategory(dbCourse.topic.label)
    : ensureCategory(dbCourse.topic_id); // Fallback to topic_id if topic not joined

  return {
    id: dbCourse.id,
    title: dbCourse.title,
    description: dbCourse.description,
    category,
    imageUrl: dbCourse.image_url,
    duration: dbCourse.duration,
    progress: progressPercentage,
    chapters,
  };
}

export function transformPath(
  dbPath: DbPath,
  progress?: DbPathProgress
): LearningPath | LearningPathProgress {
  const courses = (Array.isArray(dbPath.learning_path_courses) ? dbPath.learning_path_courses : [])
    .sort((a, b) => a.order - b.order)
    .map((lpc) => lpc.course_id);

  // Derive category from topic
  const category = dbPath.topic?.label 
    ? topicLabelToCategory(dbPath.topic.label)
    : ensureCategory(dbPath.topic_id); // Fallback to topic_id if topic not joined

  const base = {
    id: dbPath.id,
    title: dbPath.title,
    description: dbPath.description,
    category,
    imageUrl: dbPath.image_url,
    courses,
    totalCourses: dbPath.total_courses,
    totalDuration: dbPath.total_duration,
  };

  if (progress) {
    return {
      ...base,
      coursesCompleted: progress.courses_completed,
      progressPercentage: progress.progress_percentage,
    } as LearningPathProgress;
  }

  return base as LearningPath;
}

export function transformPathOfTheWeek(dbPath: DbPath): PathOfTheWeek {
  const path = transformPath(dbPath) as LearningPath;
  return {
    ...path,
    isPathOfTheWeek: true,
  };
}

export function transformSubtopic(dbSubtopic: any, courses: Course[]): any {
  return {
    id: dbSubtopic.id,
    title: dbSubtopic.title,
    description: dbSubtopic.description,
    courses: courses,
  };
}

export function transformTopicWithSubtopics(dbTopic: any, dbSubtopics: any[], coursesBySubtopic: Map<string, Course[]>): any {
  const subtopics = dbSubtopics
    .sort((a, b) => a.order - b.order)
    .map((subtopic) => ({
      id: subtopic.id,
      title: subtopic.title,
      description: subtopic.description,
      courses: coursesBySubtopic.get(subtopic.id) || [],
    }));

  return {
    topicId: dbTopic.id,
    subtopics,
  };
}

