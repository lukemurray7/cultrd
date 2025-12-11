import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

interface FeedbackCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}

export function FeedbackCard({ icon, label, onPress }: FeedbackCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={32} color={colors.text.primary} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

export default FeedbackCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.accent.blue,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minHeight: 120,
    marginHorizontal: 6,
  },
  iconContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    includeFontPadding: false,
    color: colors.text.primary,
  },
});


