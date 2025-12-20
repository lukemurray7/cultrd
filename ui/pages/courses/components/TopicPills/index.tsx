import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { topics } from "../../../../../types/topics";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

export const TopicPills = () => {
  const theme = useTheme();
  const [selectedTopic, setSelectedTopic] = useState<string>("history");

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: theme.spacing[4],
        paddingHorizontal: theme.spacing[4],
        paddingVertical: theme.spacing[3],
      }}
    >
      {topics.map((topic) => {
        const isSelected = selectedTopic === topic.id;
        const topicColor = theme.colors.topics[topic.colorKey];
        return (
          <Pressable
            key={topic.id}
            onPress={() => setSelectedTopic(topic.id)}
            center
            gap={2}
            style={{
              alignItems: "center",
            }}
          >
            <Box
              borderRadius="xl"
              border
              p={2}
              style={{
                backgroundColor: theme.colors.bg.surfaceLight,
                borderColor: isSelected ? topicColor : theme.colors.border,
                borderWidth: isSelected ? 2 : 2,
              }}
            >
              <Image
                source={topic.image}
                style={{
                  width: 40,
                  height: 40,
                }}
                contentFit="contain"
              />
            </Box>
            <Box center style={{ width: "100%" }}>
              <Text
                size="xs"
                weight={isSelected ? "semibold" : "medium"}
                style={{
                  color: isSelected
                    ? theme.colors.text.primary
                    : theme.colors.text.secondary,
                }}
              >
                {topic.label}
              </Text>
              {isSelected && (
                <Box
                  style={{
                    width: "100%",
                    height: 2,
                    backgroundColor: topicColor,
                    marginTop: theme.spacing[1],
                  }}
                />
              )}
            </Box>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

