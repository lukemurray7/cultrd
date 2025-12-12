import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
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
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border.gray,
    marginRight: 12,
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
    fontSize: 16,
    color: colors.text.black,
    fontWeight: "400",
  },
  textSelected: {
    fontWeight: "500",
  },
});

