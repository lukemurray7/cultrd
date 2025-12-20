import { Chapter } from "../../../../../types/courses";
import { Box } from "../../../../components/Box";
import { ChapterListItem } from "../ChapterListItem";

interface ChaptersListProps {
  chapters: Chapter[];
  currentChapter?: number;
}

export const ChaptersList = ({ chapters, currentChapter }: ChaptersListProps) => {
  return (
    <Box px={4} pt={4} gap={0}>
      {chapters.map((chapter, index) => {
        const isActive = index === 0;
        const isLocked = index > 0;

        return (
          <ChapterListItem
            key={chapter.id}
            chapter={chapter}
            chapterNumber={index + 1}
            isActive={isActive}
            isLocked={isLocked}
          />
        );
      })}
    </Box>
  );
};

