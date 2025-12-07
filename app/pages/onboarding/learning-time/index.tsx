import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ContinueButton } from "../../../components/ContinueButton";
import { ProgressBar } from "../../../components/ProgressBar";

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
        <Text style={styles.title}>When will you fit learning into your day?</Text>
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
                    selectedTime === option.label && styles.optionSubtitleSelected,
                  ]}
                >
                  {option.subtitle}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <ContinueButton
        onPress={handleContinue}
        disabled={!selectedTime}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  optionSelected: {
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  optionLabelSelected: {
    color: "#000000",
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#666666",
  },
  optionSubtitleSelected: {
    color: "#000000",
  },
});

