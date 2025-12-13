import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { borders, colors, spacing, typography } from "../../theme/colors";

interface CheckboxOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function CheckboxOption({
  label,
  selected,
  onPress,
}: CheckboxOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, selected && styles.buttonSelected]}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.checkbox,
            selected && styles.checkboxSelected,
          ]}
        >
          {selected && (
            <Ionicons name="checkmark" size={16} color={colors.text.black} />
          )}
        </View>
        <Text style={[styles.text, selected && styles.textSelected]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

export default CheckboxOption;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.background.white,
    borderRadius: borders.radius.base,
    borderWidth: borders.width.thin,
    borderColor: colors.border.lightGray,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  buttonSelected: {
    backgroundColor: colors.success.lightGreen,
    borderColor: colors.success.green,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: spacing.xxl,
    height: spacing.xxl,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.medium,
    borderColor: colors.border.gray,
    marginRight: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background.white,
  },
  checkboxSelected: {
    backgroundColor: colors.background.white,
    borderColor: colors.success.green,
  },
  text: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text.black,
    fontWeight: typography.fontWeight.regular,
  },
  textSelected: {
    fontWeight: typography.fontWeight.medium,
  },
});

