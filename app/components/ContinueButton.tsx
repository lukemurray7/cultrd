import { Pressable, StyleSheet, Text, View } from "react-native";
import { borders, colors, fonts, spacing, typography } from "../theme/colors";

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
        <View style={styles.button}>
          <Text style={styles.text}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

export default ContinueButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent.blueLight,
    borderRadius: borders.radius.base,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    textAlign: "center",
    marginHorizontal: spacing.xl,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  gradient: {
    paddingVertical: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    paddingVertical: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background.lightGray,
  },
  text: {
    color: colors.text.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: fonts.ubuntu.medium,
    textAlign: "center",
  },
  disabledText: {
    color: colors.text.tertiary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: fonts.ubuntu.medium,
  },
});
