import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../theme/colors";
import { ContinueButton } from "../ContinueButton";
import { OptionButton } from "../OptionButton";
import { ProgressBar } from "../ProgressBar";

interface ButtonQuestionPageProps {
  title: string;
  options: string[];
  progress: number;
  nextRoute: string;
  onContinue?: (selected: string) => void;
}

export function ButtonQuestionPage({
  title,
  options,
  progress,
  nextRoute,
  onContinue,
}: ButtonQuestionPageProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) {
      if (onContinue) {
        onContinue(selected);
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
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <OptionButton
              key={option}
              label={option}
              selected={selected === option}
              onPress={() => setSelected(option)}
            />
          ))}
        </View>
      </ScrollView>
      <ContinueButton
        onPress={handleContinue}
        disabled={!selected}
      />
    </View>
  );
}

export default ButtonQuestionPage;

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
    marginBottom: spacing.xxxl,
  },
  optionsContainer: {
    marginBottom: spacing.xl,
  },
});

