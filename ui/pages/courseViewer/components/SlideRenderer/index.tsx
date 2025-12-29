import { Slide } from "../../../../../types/courseContent";
import { ImageOnlySlide } from "./components/ImageOnlySlide";
import { QuoteImageSlide } from "./components/QuoteImageSlide";
import { QuoteSlide } from "./components/QuoteSlide";
import { TextImageSlide } from "./components/TextImageSlide";
import { TextSlide } from "./components/TextSlide";

interface SlideRendererProps {
  slide: Slide;
  sentenceIndex?: number;
}

export const SlideRenderer = ({ slide, sentenceIndex = 0 }: SlideRendererProps) => {
  switch (slide.type) {
    case "text":
      return <TextSlide slide={slide} sentenceIndex={sentenceIndex} />;

    case "text_image":
      return <TextImageSlide slide={slide} sentenceIndex={sentenceIndex} />;

    case "quote":
      return <QuoteSlide slide={slide} />;

    case "quote_image":
      return <QuoteImageSlide slide={slide} />;

    case "image_only":
      return <ImageOnlySlide slide={slide} />;

    default:
      return null;
  }
};

