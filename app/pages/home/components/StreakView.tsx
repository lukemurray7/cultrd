import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../theme/colors";

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
    marginLeft: 24,
    marginRight: 24,
    borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text.primary,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accent.red,
    color: colors.text.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 16,
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  dayItem: {
    alignItems: "center",
    gap: 8,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircleActive: {
    backgroundColor: colors.accent.red,
  },
  dayCircleInactive: {
    backgroundColor: colors.background.secondary,
    borderWidth: 0.5,
    borderColor: colors.accent.red,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
});

