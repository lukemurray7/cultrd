import { Image } from "expo-image";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTopics } from "../../../../lib/queries/topics";
import { borders, colors, spacing, typography } from "../../../theme/colors";
import { topicImages } from "../../../utils/topicImages";

interface TopNavProps {
  selectedTopic: string;
  onTopicPress?: (topicName: string) => void;
}

export const TopNav = forwardRef<ScrollView, TopNavProps>(
  ({ selectedTopic, onTopicPress }, ref) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const { data: topicsData = [], isLoading } = useTopics();

    useImperativeHandle(ref, () => scrollViewRef.current as ScrollView);

    const handleTopicPress = (topicName: string) => {
      onTopicPress?.(topicName);
    };

    const topics = topicsData.map((topic) => {
      const bgImage = topic.slug in topicImages ? topic.slug : "history";
      const color = topic.color || colors.accent.blue;
      return {
        name: topic.name,
        bgImage,
        color,
      };
    });

    if (isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Explore All Our Topics</Text>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.accent.blue} />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Explore All Our Topics</Text>
        <ScrollView
          ref={scrollViewRef}
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
              onPress={() => handleTopicPress(topic.name)}
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
);

TopNav.displayName = "TopNav";

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
  loadingContainer: {
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
});
