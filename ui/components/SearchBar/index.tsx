import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";
import { Symbols } from "expo-symbols";

export const SearchBar = () => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.bg.surface2,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.lg,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <Symbols name="magnifyingglass" size={20} weight="medium" color={theme.colors.text.muted} />
      </View>
      <TextInput
        style={[
          styles.input,
          {
            color: theme.colors.text.primary,
            fontSize: theme.typography.size.sm,
          },
        ]}
        placeholder="What do you want to learn today?"
        placeholderTextColor={theme.colors.text.muted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderWidth: 1,
    paddingHorizontal: 0,
  },
  iconContainer: {
    paddingLeft: theme.spacing[3],
    paddingRight: theme.spacing[2],
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: "System",
    fontWeight: theme.typography.weight.medium,
  },
});

