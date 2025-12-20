import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Chapter } from "../../../../../types/courses";
import { Box } from "../../../../../ui/components/Box";
import { Pressable } from "../../../../../ui/components/Pressable";
import { Text } from "../../../../../ui/components/Text";


interface ChapterListItemProps {
  chapter: Chapter;
  chapterNumber: number;
  isActive?: boolean;
  isLocked?: boolean;
  onPress?: () => void;
}

export const ChapterListItem = ({
  chapter,
  chapterNumber,
  isActive = false,
  isLocked = false,
  onPress,
}: ChapterListItemProps) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={isLocked}
      bg={isActive ? "surfaceLight" : "surface"}
      borderRadius="lg"
      border
      shadow="md"
      p={3}
      mb={3}
      row
      gap={3}
      style={{
        borderLeftWidth: isActive ? 4 : 1,
        borderLeftColor: isActive ? theme.colors.brand.primary : theme.colors.border,
        alignItems: "center",
      }}
    >
      <Box
        width={40}
        height={40}
        borderRadius="pill"
        bg={isLocked ? "surface" : isActive ? "brand.primary" : "surface"}
        center
        border
      >
        {isLocked ? (
          <MaterialIcons
            name="lock"
            size={20}
            color={theme.colors.text.muted}
          />
        ) : (
          <MaterialIcons
            name="play-arrow"
            size={24}
            color={isActive ? theme.colors.text.white : theme.colors.text.primary}
          />
        )}
      </Box>
      <Box flex gap={1}>
        <Text size="sm" weight="bold">
          {chapterNumber}. {chapter.title}
        </Text>
      </Box>
      <Box center>
        <Text size="sm" variant="secondary">
          {chapter.duration} min
        </Text>
      </Box>
    </Pressable>
  );
};

