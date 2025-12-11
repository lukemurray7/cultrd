import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

interface StreakViewProps {
  currentStreak?: number;
  activeDayIndex?: number;
}

export function StreakView({
  currentStreak = 1,
  activeDayIndex = 0,
}: StreakViewProps) {
  const days = ["T", "W", "Th", "F", "S"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>For you</Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakNumber}>{currentStreak}</Text>
          <Ionicons name="flame-outline" size={16} color={colors.text.onYellow} />
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
                {isActive && (
                  <Ionicons
                    name="flame-outline"
                    size={20}
                    color={colors.text.onYellow}
                  />
                )}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text.primary,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accent.yellow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.onYellow,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayItem: {
    alignItems: "center",
    gap: 8,
  },
  dayCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircleActive: {
    backgroundColor: colors.accent.yellow,
  },
  dayCircleInactive: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.text.tertiary,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
});
