import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

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
      activeOpacity={0.7}
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonSelected: {
    backgroundColor: colors.success.lightGreen,
    borderColor: colors.success.green,
  },
  text: {
    fontSize: 16,
    color: colors.text.black,
    fontWeight: "400",
  },
  textSelected: {
    fontWeight: "500",
  },
});

