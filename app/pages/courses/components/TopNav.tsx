import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { borders, colors, spacing, typography } from "../../../theme/colors";

const topics = [
  { name: "History", icon: "time" as const },
  { name: "Economics", icon: "trending-up" as const },
  { name: "Philosophy", icon: "book" as const },
  { name: "Culture", icon: "musical-notes" as const },
  { name: "Art & Music", icon: "color-palette" as const },
  { name: "Politics", icon: "flag" as const },
  { name: "Science", icon: "flask" as const },
];

export function TopNav() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].name);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {topics.map((topic) => {
          const isSelected = selectedTopic === topic.name;
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
                    borderColor: isSelected
                      ? colors.accent.yellow
                      : colors.border.gray,
                    backgroundColor: isSelected
                      ? colors.accent.teal
                      : "",
                  },
                ]}
              >
                <Ionicons
                  name={topic.icon}
                  size={40}
                  color={colors.text.primary}
                />
              </View>
              <Text style={[styles.label, isSelected && styles.labelSelected]}>
                {topic.name}
              </Text>
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
    borderRadius: borders.radius.sm,
    backgroundColor: colors.background.primary,
  },
  iconContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    borderWidth: borders.width.thick,
    alignItems: "center",
    width: 80,
    height: 60,
    borderRadius: borders.radius.xl,
    padding: spacing.xs,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.text.primary,
    paddingBottom: spacing.md,
    width: 80,
    textAlign: "center",
  },
  labelSelected: {
    fontWeight: typography.fontWeight.medium,
    borderBottomWidth: borders.width.thick,
    borderBottomColor: colors.accent.yellow,
  },
});
