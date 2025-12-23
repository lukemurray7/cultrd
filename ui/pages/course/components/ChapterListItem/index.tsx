import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
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
  isHighlighted?: boolean;
  onPress?: () => void;
}

export const ChapterListItem = ({
  chapter,
  chapterNumber,
  isActive = false,
  isLocked = false,
  isHighlighted = false,
  onPress,
}: ChapterListItemProps) => {
  const theme = useTheme();
  const pulseAnim = useSharedValue(1);

  useEffect(() => {
    if (isActive || isHighlighted) {
      pulseAnim.value = withRepeat(
        withTiming(1.005, { duration: 1500 }),
        -1,
        true
      );
    } else {
      pulseAnim.value = 1;
    }
  }, [isActive, isHighlighted, pulseAnim]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseAnim.value }],
    };
  });

  const borderWidth = isActive || isHighlighted ? 2 : 1;
  const borderColor = isActive || isHighlighted 
    ? `${theme.colors.brand.primary}60` 
    : theme.colors.border;
  const bg = isActive || isHighlighted ? "surfaceLight" : "surface";

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        disabled={isLocked}
        bg={bg}
        borderRadius="lg"
        shadow="md"
        p={3}
        mb={3}
        row
        gap={3}
        style={{
          borderWidth,
          borderColor,
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
    </Animated.View>
  );
};

