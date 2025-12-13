import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { borders, colors, spacing, typography } from "../../../../theme/colors";

interface TopNavHeaderProps {
  currentStreak?: number;
}

export function TopNavHeader({
  currentStreak = 1,
}: TopNavHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <View style={styles.rightContainer}>
        <View style={styles.streakBadge}>
          <Text style={styles.streakNumber}>{currentStreak}</Text>
          <Ionicons
            name="flash-outline"
            size={16}
            color={colors.text.primary}
          />
        </View>
        <Pressable
          style={styles.settingsButton}
          onPress={() => router.push("/pages/settings/account")}
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color={colors.text.primary}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default TopNavHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.sm,
    backgroundColor: colors.background.navBar,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borders.radius.xl,
    gap: spacing.xs,
  },
  streakNumber: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  settingsButton: {
    padding: spacing.xs,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
});

