import { router, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../../theme/colors";
import { CheckboxOption } from "../CheckboxOption";
import { ContinueButton } from "../ContinueButton";
import { ProgressBar } from "../ProgressBar";

interface CheckboxQuestionPageProps {
  title: string;
  subtitle?: string;
  options: string[];
  progress: number;
  nextRoute: string;
  maxSelections?: number;
  requireSelection?: boolean;
  onContinue?: (selected: Set<string>) => void;
}

export function CheckboxQuestionPage({
  title,
  subtitle,
  options,
  progress,
  nextRoute,
  maxSelections,
  requireSelection = true,
  onContinue,
}: CheckboxQuestionPageProps) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set()
  );

  const toggleOption = (option: string) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(option)) {
      newSelected.delete(option);
    } else {
      if (maxSelections && newSelected.size >= maxSelections) {
        return;
      }
      newSelected.add(option);
    }
    setSelectedOptions(newSelected);
  };

  const handleContinue = () => {
    if (!requireSelection || selectedOptions.size > 0) {
      if (onContinue) {
        onContinue(selectedOptions);
      }
      router.push(nextRoute as Href);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ProgressBar progress={progress} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <CheckboxOption
              key={option}
              label={option}
              selected={selectedOptions.has(option)}
              onPress={() => toggleOption(option)}
            />
          ))}
        </View>
      </ScrollView>
      <ContinueButton
        onPress={handleContinue}
        disabled={requireSelection && selectedOptions.size === 0}
      />
    </View>
  );
}

export default CheckboxQuestionPage;

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
    marginBottom: spacing.xl,
  },
});

