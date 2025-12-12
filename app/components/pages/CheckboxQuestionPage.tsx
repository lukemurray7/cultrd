import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../ProgressBar";
import { CheckboxOption } from "../CheckboxOption";
import { ContinueButton } from "../ContinueButton";
import { router } from "expo-router";
import { colors } from "../../theme/colors";

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
      router.push(nextRoute);
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text.black,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.tertiary,
    textAlign: "center",
    marginBottom: 32,
  },
  optionsContainer: {
    marginBottom: 20,
  },
});

