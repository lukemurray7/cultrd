import { Pressable, StyleSheet, Text } from "react-native";
import { borders, colors, spacing, typography } from "../../theme/colors";

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function OptionButton({
  label,
  selected,
  onPress,
}: OptionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, selected && styles.buttonSelected]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default OptionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.background.white,
    borderRadius: borders.radius.base,
    borderWidth: borders.width.thin,
    borderColor: colors.border.lightGray,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
    alignItems: "center",
  },
  buttonSelected: {
    backgroundColor: colors.success.lightGreen,
    borderColor: colors.success.green,
  },
  text: {
    fontSize: typography.fontSize.base,
    color: colors.text.black,
    fontWeight: typography.fontWeight.regular,
  },
  textSelected: {
    fontWeight: typography.fontWeight.medium,
  },
});

