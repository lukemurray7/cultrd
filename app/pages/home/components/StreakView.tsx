import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography, borders } from "../../../theme/colors";

interface StreakViewProps {
  currentStreak?: number;
  activeDayIndex?: number;
}

export function StreakView({
  currentStreak = 1,
  activeDayIndex = 0,
}: StreakViewProps) {
  const days = ["M", "T", "W", "Th", "F", "Sa", "Su"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Good Morning</Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakNumber}>{currentStreak}</Text>
          <Ionicons
            name="flame-outline"
            size={16}
            color={colors.text.primary}
          />
        </View>
      </View>
      <View style={styles.daysContainer}>
        {days.map((day, index) => {
          const isActive = index === activeDayIndex;
          return (
            <View key={day} style={styles.dayItem}>
              <View
                style={[
                  styles.dayCircle,
                  isActive ? styles.dayCircleActive : styles.dayCircleInactive,
                ]}
              >
                <Ionicons
                  name="flame-outline"
                  size={20}
                  color={colors.text.primary}
                />
              </View>
              <Text style={styles.dayLabel}>{day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default StreakView;

const styles = StyleSheet.create({
  container: {
    marginLeft: spacing.xxl,
    marginRight: spacing.xxl,
    borderRadius: borders.radius.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accent.red,
    color: colors.text.primary,
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
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.lg,
    borderRadius: borders.radius.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  dayItem: {
    alignItems: "center",
    gap: spacing.sm,
  },
  dayCircle: {
    width: spacing.xxxl,
    height: spacing.xxxl,
    borderRadius: borders.radius.xxl,
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircleActive: {
    backgroundColor: colors.accent.red,
  },
  dayCircleInactive: {
    backgroundColor: colors.background.secondary,
    borderWidth: borders.width.hairline,
    borderColor: colors.accent.red,
  },
  dayLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
});

