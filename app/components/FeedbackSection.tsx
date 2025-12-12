import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONTAINER_WIDTH = SCREEN_WIDTH - 48;
const GAP = 8;
const CARD_WIDTH = (CONTAINER_WIDTH - GAP) / 2;

const feedbackOptions = [
  { label: "Request a topic", icon: "add-circle" as const, color: "#6369D1" },
  { label: "Feature request", icon: "bulb" as const, color: "#4ECDC4" },
  { label: "Questions?", icon: "help-circle" as const, color: "#E83F6F" },
  { label: "Rate app", icon: "star" as const, color: "#F39C12" },
];

export function FeedbackSection() {
  const handlePress = () => {
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Can we help?</Text>
      <View style={styles.grid}>
        {feedbackOptions.map((option, index) => (
          <Pressable
            key={index}
            style={[styles.card, { backgroundColor: option.color }]}
            onPress={handlePress}
          >
            <Ionicons
              name={option.icon}
              size={32}
              color={colors.text.primary}
            />
            <Text style={styles.label}>{option.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default FeedbackSection;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 32,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: CARD_WIDTH,
    minHeight: 120,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: colors.text.primary,
    marginTop: 12,
  },
});

