import { router } from "expo-router";
import { Chapter } from "../../../../../types/courses";
import { Box } from "../../../../components/Box";
import { ChapterListItem } from "../ChapterListItem";

interface ChaptersListProps {
  chapters: Chapter[];
  currentChapter?: number;
  courseId: string;
  highlightChapterId?: string;
  allCompleted?: boolean;
}

export const ChaptersList = ({
  allCompleted,
  chapters,
  currentChapter,
  courseId,
  highlightChapterId,
}: ChaptersListProps) => {
  const handleChapterPress = (chapterId: string) => {
    router.push({
      pathname: "/course/[id]/chapter/[chapterId]",
      params: {
        id: courseId,
        chapterId,
      },
    });
  };

  return (
    <Box px={4} pt={4} gap={0}>
      {chapters.map((chapter, index) => {
        const isFirstChapter = index === 0;
        const previousChapter = index > 0 ? chapters[index - 1] : null;
        const isPreviousCompleted = previousChapter?.isCompleted ?? false;
        const isLocked = !isFirstChapter && !isPreviousCompleted;
        const isActive =
          !allCompleted &&
          ((currentChapter === undefined && isFirstChapter) ||
            (currentChapter !== undefined && currentChapter === index + 1));
        const isHighlighted = highlightChapterId === chapter.id && !allCompleted;

        return (
          <ChapterListItem
            key={chapter.id}
            chapter={chapter}
            chapterNumber={index + 1}
            isActive={isActive}
            isLocked={isLocked}
            isHighlighted={isHighlighted}
            onPress={() => handleChapterPress(chapter.id)}
          />
        );
      })}
    </Box>
  );
};
