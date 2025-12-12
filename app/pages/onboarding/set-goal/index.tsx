import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ContinueButton } from "../../../components/ContinueButton";
import { ProgressBar } from "../../../components/ProgressBar";
import { borders, colors, spacing, typography } from "../../../theme/colors";

interface GoalOption {
  label: string;
  time: string;
  lessons: number;
}

export default function SetGoalScreen() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals: GoalOption[] = [
    { label: "Quick", time: "2 min / day", lessons: 30 },
    { label: "Regular", time: "5 min / day", lessons: 75 },
    { label: "Advanced", time: "10 min / day", lessons: 150 },
  ];

  const handleContinue = () => {
    if (selectedGoal) {
      router.push("/pages/onboarding/learning-time");
    }
  };

  const selectedGoalData = goals.find((g) => g.label === selectedGoal);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ProgressBar progress={50} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Set a daily learning goal</Text>
        <Text style={styles.subtitle}>You can always change this later.</Text>
        <View style={styles.optionsContainer}>
          {goals.map((goal) => (
            <Pressable
              key={goal.label}
              style={[
                styles.option,
                selectedGoal === goal.label && styles.optionSelected,
              ]}
              onPress={() => setSelectedGoal(goal.label)}
            >
              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionLabel,
                    selectedGoal === goal.label && styles.optionLabelSelected,
                  ]}
                >
                  {goal.label}
                </Text>
                <View style={styles.divider} />
                <Text
                  style={[
                    styles.optionTime,
                    selectedGoal === goal.label && styles.optionTimeSelected,
                  ]}
                >
                  {goal.time}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
        {selectedGoalData && (
          <View style={styles.infoBox}>
            <View style={styles.infoIcon}>
              <Text style={styles.flameIcon}>🔥</Text>
            </View>
            <Text style={styles.infoText}>
              That's <Text style={styles.infoBold}>{selectedGoalData.lessons}</Text> bite-sized
              lessons in a month!
            </Text>
          </View>
        )}
      </ScrollView>
      <ContinueButton
        onPress={handleContinue}
        disabled={!selectedGoal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxxl,
  },
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.black,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
    textAlign: "center",
    marginBottom: spacing.xxxl,
  },
  optionsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  option: {
    backgroundColor: colors.background.white,
    borderRadius: borders.radius.base,
    borderWidth: borders.width.thin,
    borderColor: colors.border.lightGray,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  optionSelected: {
    backgroundColor: colors.success.lightGreen,
    borderColor: colors.success.green,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.black,
    flex: 1,
  },
  optionLabelSelected: {
    color: colors.text.black,
  },
  divider: {
    width: borders.width.thin,
    height: spacing.xxl,
    backgroundColor: colors.border.lightGray,
    marginHorizontal: spacing.lg,
  },
  optionTime: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
  },
  optionTimeSelected: {
    color: colors.text.black,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accent.yellowLight,
    borderRadius: borders.radius.base,
    padding: spacing.lg,
    borderWidth: borders.width.thin,
    borderColor: colors.accent.yellowDark,
    marginBottom: spacing.xl,
  },
  infoIcon: {
    width: spacing.xxxxl,
    height: spacing.xxxxl,
    borderRadius: borders.radius.xl,
    backgroundColor: colors.background.white,
    borderWidth: borders.width.medium,
    borderColor: colors.text.black,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  flameIcon: {
    fontSize: typography.fontSize.xl,
  },
  infoText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text.black,
  },
  infoBold: {
    fontWeight: typography.fontWeight.bold,
  },
});

