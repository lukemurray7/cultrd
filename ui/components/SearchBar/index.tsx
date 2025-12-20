import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";

export const SearchBar = () => {
  const theme = useTheme();

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
      />
    </View>
  );
};

