import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { topics } from "../../../../../types/topics";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { SearchBar } from "../../../../components/SearchBar";

interface TopicPillProps {
  topic: typeof topics[0];
  isSelected: boolean;
  onPress: () => void;
  topicColor: string;
}

const TopicPill = ({ topic, isSelected, onPress, topicColor }: TopicPillProps) => {
  const theme = useTheme();
  const progress = useSharedValue(isSelected ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, { duration: 300 });
  }, [isSelected, progress]);

  const borderAnimatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.border, topicColor]
    );
    const borderWidth = progress.value * 1 + 1;

    return {
      borderColor,
      borderWidth,
    };
  });

  const underlineAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scaleX: progress.value }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.text.secondary, theme.colors.text.primary]
    );

    return {
      color: textColor,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      center
      gap={2}
      style={{
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: theme.radii.xl,
            backgroundColor: theme.colors.bg.surfaceLight,
            padding: theme.spacing[2],
          },
          borderAnimatedStyle,
        ]}
      >
        <Image
          source={topic.image}
          style={{
            width: 40,
            height: 40,
          }}
          contentFit="contain"
        />
      </Animated.View>
      <Box center style={{ width: "100%" }}>
        <Animated.Text
          style={[
            {
              fontSize: theme.typography.size.xs,
              fontFamily: theme.typography.fontFamily.regular,
              fontWeight: isSelected ? theme.typography.weight.semibold : theme.typography.weight.medium,
            },
            textAnimatedStyle,
          ]}
        >
          {topic.label}
        </Animated.Text>
        <Animated.View
          style={[
            {
              width: "100%",
              height: 2,
              backgroundColor: topicColor,
              marginTop: theme.spacing[1],
            },
            underlineAnimatedStyle,
          ]}
        />
      </Box>
    </Pressable>
  );
};

export const CoursesHeader = () => {
  const theme = useTheme();
  const [selectedTopic, setSelectedTopic] = useState<string>("history");

  return (
    <Box>
      <Box
        mx={4}
        my={3}
        shadow="sm"
      >
        <Box row between gap={4} center mb={4}>
          <Box style={{ flex: 1}}>
            <SearchBar />
          </Box>
        </Box>
      </Box>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: theme.spacing[4],
          paddingHorizontal: theme.spacing[4],
          paddingBottom: theme.spacing[3],
        }}
      >
        {topics.map((topic) => {
          const isSelected = selectedTopic === topic.id;
          const topicColor = theme.colors.topics[topic.colorKey];
          return (
            <TopicPill
              key={topic.id}
              topic={topic}
              isSelected={isSelected}
              onPress={() => setSelectedTopic(topic.id)}
              topicColor={topicColor}
            />
          );
        })}
      </ScrollView>
    </Box>
  );
};

