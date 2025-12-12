import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography, borders } from "../../../theme/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONTAINER_WIDTH = SCREEN_WIDTH - spacing.xxl * 2;
const GAP = spacing.sm;
const CARD_WIDTH = (CONTAINER_WIDTH - GAP) / 2;

const feedbackOptions = [
  { label: "Request a topic", icon: "add-circle" as const, color: colors.accent.blue },
  { label: "Feature request", icon: "bulb" as const, color: colors.accent.teal },
  { label: "Questions?", icon: "help-circle" as const, color: colors.accent.red },
  { label: "Rate app", icon: "star" as const, color: colors.accent.orange },
];

export function FeedbackSection() {
  const handlePress = () => {
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Can we help?</Text>
      <View style={styles.grid}>
        {feedbackOptions.map((option, index) => (
          <Pressable
            key={index}
            style={[styles.card, { backgroundColor: option.color }]}
            onPress={handlePress}
          >
            <Ionicons
              name={option.icon}
              size={32}
              color={colors.text.primary}
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  card: {
    borderRadius: borders.radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    width: CARD_WIDTH,
    minHeight: 120,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    textAlign: "center",
    color: colors.text.primary,
    marginTop: spacing.md,
  },
});

