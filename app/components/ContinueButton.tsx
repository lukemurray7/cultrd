import { Pressable, StyleSheet, Text, View } from "react-native";
import { fonts } from "../theme/colors";

interface ContinueButtonProps {
  onPress: () => void;
  disabled?: boolean;
  label?: string;
}

export function ContinueButton({
  onPress,
  disabled = false,
  label = "Continue",
}: ContinueButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled]}
    >
      {disabled ? (
        <View style={styles.disabledButton}>
          <Text style={styles.disabledText}>{label}</Text>
        </View>
      ) : (
          <Text style={styles.text}>{label}</Text>
      )}
    </Pressable>
  );
}

export default ContinueButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 50,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E5E5",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fonts.ubuntu.medium,
  },
  disabledText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fonts.ubuntu.medium,
  },
});

