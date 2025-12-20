import { Switch } from "react-native";
import { Box } from "../../../ui/components/Box";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { Text } from "../../../ui/components/Text";
import { useTheme, useThemeMode } from "../../../theme/ThemeProvider";

export default function ProfileScreen() {
  const theme = useTheme();
  const { colorScheme, toggleColorScheme } = useThemeMode();

  return (
    <SafeAreaView edges={["top"]} bg="primary">
      <Box flex p={4}>
        <Box row between mb={6}>
          <Text size="2xl" weight="bold">
            Profile
          </Text>
        </Box>

        <Box bg="surface" border borderRadius="md" p={4}>
          <Box row between>
            <Box flex>
              <Text size="lg" weight="semibold" mb={1}>
                Dark Mode
              </Text>
              <Text size="sm" variant="secondary">
                Switch between light and dark theme
              </Text>
            </Box>
            <Switch
              value={colorScheme === "dark"}
              onValueChange={toggleColorScheme}
              trackColor={{
                false: theme.colors.bg.surfaceLight,
                true: theme.colors.brand.primary,
              }}
              thumbColor={theme.colors.bg.primary}
            />
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

