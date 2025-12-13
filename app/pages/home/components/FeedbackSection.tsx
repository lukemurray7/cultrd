import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { borders, colors, spacing, typography } from "../../../../theme/colors";

const feedbackOptions = [
  { label: "Rate us", icon: "star-outline" as const },
  { label: "Feedback - we're listening", icon: "chatbubble-outline" as const },
  { label: "Request Topic or Course", icon: "add-circle-outline" as const },
  { label: "Have A Question?", icon: "help-circle-outline" as const },
  { label: "Share with a Friend", icon: "share-outline" as const },
];

export function FeedbackSection() {
  const handlePress = () => {
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Can we help?</Text>
      <View style={styles.list}>
        {feedbackOptions.map((option, index) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={handlePress}
          >
            <Ionicons
              name={option.icon}
              size={24}
              color={colors.accent.purple}
              style={styles.icon}
            />
            <Text style={styles.label}>{option.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default FeedbackSection;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xxl,
    marginTop: spacing.xxxl,
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  list: {
    gap: spacing.sm,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: borders.radius.base,
    padding: spacing.lg,
    backgroundColor: colors.background.secondary,
  },
  icon: {
    marginRight: spacing.md,
  },
  label: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  secondaryText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
});

