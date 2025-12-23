export type MediaType = "image" | "video";

export type SlideType = "text" | "text_image" | "quote" | "quote_image" | "image_only";

export interface BaseSlide {
  id: string;
  type: SlideType;
}

export interface TextSlide extends BaseSlide {
  type: "text";
  content: string;
}

export interface TextImageSlide extends BaseSlide {
  type: "text_image";
  content: string;
  mediaUrl: string;
  mediaType: MediaType;
}

export interface QuoteSlide extends BaseSlide {
  type: "quote";
  content: string;
  author: string;
}

export interface QuoteImageSlide extends BaseSlide {
  type: "quote_image";
  content: string;
  author: string;
  mediaUrl: string;
  mediaType: MediaType;
}

export interface ImageOnlySlide extends BaseSlide {
  type: "image_only";
  mediaUrl: string;
  mediaType: MediaType;
  caption?: string;
}

export type Slide = TextSlide | TextImageSlide | QuoteSlide | QuoteImageSlide | ImageOnlySlide;

export interface ChapterContent {
  id: string;
  title: string;
  order: number;
  isCompleted: boolean;
  slides: Slide[];
}

export interface CourseContent {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  duration: number;
  progress: number;
  chapters: ChapterContent[];
}

