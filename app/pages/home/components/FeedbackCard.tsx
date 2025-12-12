import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography, borders } from "../../../theme/colors";

interface FeedbackCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}

export function FeedbackCard({ icon, label, onPress }: FeedbackCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={32} color={colors.text.primary} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

export default FeedbackCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.accent.blue,
    borderRadius: borders.radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minHeight: 120,
    marginHorizontal: spacing.md,
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    textAlign: "center",
    includeFontPadding: false,
    color: colors.text.primary,
  },
});

