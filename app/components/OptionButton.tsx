import { Pressable, StyleSheet, Text } from "react-native";

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
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonSelected: {
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },
  text: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "400",
  },
  textSelected: {
    fontWeight: "500",
  },
});

