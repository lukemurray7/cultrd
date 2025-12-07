import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.checkbox,
            selected && styles.checkboxSelected,
          ]}
        >
          {selected && (
            <Ionicons name="checkmark" size={16} color="#000000" />
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
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  buttonSelected: {
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxSelected: {
    backgroundColor: "#FFFFFF",
    borderColor: "#22C55E",
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    fontWeight: "400",
  },
  textSelected: {
    fontWeight: "500",
  },
});

