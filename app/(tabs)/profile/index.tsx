import { Text, View } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.bg.canvas,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: theme.colors.text.primary,
          fontSize: theme.typography.size.lg,
        }}
      >
        Profile
      </Text>
    </View>
  );
}

