import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ContinueButton } from "../../../components/ContinueButton";
import { ProgressBar } from "../../../components/ProgressBar";
import { borders, colors, spacing, typography } from "../../../../theme/colors";

interface TimeOption {
  label: string;
  subtitle: string;
}

export default function LearningTimeScreen() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeOptions: TimeOption[] = [
    { label: "Morning", subtitle: "With breakfast or commuting" },
    { label: "Afternoon", subtitle: "At lunch or during downtime" },
    { label: "Evening", subtitle: "After dinner or while in bed" },
  ];

  const handleContinue = () => {
    if (selectedTime) {
      router.push("/pages/onboarding/notifications");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ProgressBar progress={57} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          When will you fit learning into your day?
        </Text>
        <Text style={styles.subtitle}>
          Picking a time helps to build a habit.
        </Text>
        <View style={styles.optionsContainer}>
          {timeOptions.map((option) => (
            <Pressable
              key={option.label}
              style={[
                styles.option,
                selectedTime === option.label && styles.optionSelected,
              ]}
              onPress={() => setSelectedTime(option.label)}
            >
              <View>
                <Text
                  style={[
                    styles.optionLabel,
                    selectedTime === option.label && styles.optionLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
                <Text
                  style={[
                    styles.optionSubtitle,
                    selectedTime === option.label &&
                      styles.optionSubtitleSelected,
                  ]}
                >
                  {option.subtitle}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <ContinueButton onPress={handleContinue} disabled={!selectedTime} />
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
    marginBottom: spacing.md,
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
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  optionSelected: {
    backgroundColor: colors.success.lightGreen,
    borderColor: colors.success.green,
  },
  optionLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.black,
    marginBottom: spacing.xs,
  },
  optionLabelSelected: {
    color: colors.text.black,
  },
  optionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
  optionSubtitleSelected: {
    color: colors.text.black,
  },
});
