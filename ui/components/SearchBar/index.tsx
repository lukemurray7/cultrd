import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";

interface SearchBarProps extends Omit<TextInputProps, "style"> {
  value?: string;
  onChangeText?: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText, ...props }: SearchBarProps) => {
  const theme = useTheme();
  const hasValue = value && value.length > 0;

  const handleClear = () => {
    if (onChangeText) {
      onChangeText("");
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 44,
        backgroundColor: theme.colors.bg.surfaceLight,
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderRadius: theme.radii.lg,
      }}
    >
      <View
        style={{
          paddingLeft: theme.spacing[3],
          paddingRight: theme.spacing[2],
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="search" size={20} color={theme.colors.text.muted} />
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{
          flex: 1,
          height: "100%",
          color: theme.colors.text.primary,
          fontSize: theme.typography.size.sm,
          fontFamily: "System",
          fontWeight: theme.typography.weight.medium,
        }}
        placeholder="What do you want to learn today?"
        placeholderTextColor={theme.colors.text.muted}
        {...props}
      />
      {hasValue && (
        <Pressable
          onPress={handleClear}
          style={{
            paddingRight: theme.spacing[3],
            paddingLeft: theme.spacing[2],
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="close" size={20} color={theme.colors.text.muted} />
        </Pressable>
      )}
    </View>
  );
};

