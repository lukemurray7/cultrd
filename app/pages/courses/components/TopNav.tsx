import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { borders, colors, spacing, typography } from "../../../theme/colors";
import { topicImages } from "../../../utils/topicImages";

const topics = [
  { name: "History", bgImage: "history", color: colors.accent.blue },
  { name: "Economics", bgImage: "economics", color: colors.accent.yellow },
  { name: "Philosophy", bgImage: "philosophy", color: colors.accent.red },
  { name: "Culture", bgImage: "culture", color: colors.accent.teal },
  { name: "Art & Music", bgImage: "art", color: colors.accent.red },
  { name: "Politics", bgImage: "politics", color: colors.accent.blue },
  { name: "Science", bgImage: "science", color: colors.accent.green },
];

export function TopNav() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].name);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore All Our Topics</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {topics.map((topic) => {
          const isSelected = selectedTopic === topic.name;
          const topicColor = topic.color;
          return (
            <Pressable
              key={topic.name}
              style={[styles.button]}
              onPress={() => setSelectedTopic(topic.name)}
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    borderWidth: isSelected ? 4 : borders.width.medium,
                    borderColor: isSelected ? topicColor : colors.border.light,
                    backgroundColor: "transparent",
                  },
                ]}
              >
                <Image
                  source={topicImages[topic.bgImage]}
                  style={styles.iconImage}
                  contentFit="contain"
                />
              </View>
              <View style={styles.labelContainer}>
                <Text style={[styles.label, isSelected && styles.labelSelected]}>
                  {topic.name}
                </Text>
                {isSelected && (
                  <View
                    style={[
                      styles.underline,
                      { backgroundColor: topicColor },
                    ]}
                  />
                )}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default TopNav;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    paddingVertical: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xl,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 60,
    borderRadius: borders.radius.lg,
    padding: spacing.xs,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.text.primary,
    paddingBottom: spacing.sm,
    width: 80,
    textAlign: "center",
  },
  labelSelected: {
    fontWeight: typography.fontWeight.medium,
  },
  labelContainer: {
    alignItems: "center",
    width: 80,
  },
  underline: {
    height: 2,
    width: 60,
    marginTop: spacing.xs,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
});
