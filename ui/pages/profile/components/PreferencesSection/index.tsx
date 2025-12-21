import { useState } from "react";
import { useThemeMode } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";
import { SettingsRow } from "../SettingsRow";

export const PreferencesSection = () => {
  const { colorScheme, setColorScheme } = useThemeMode();
  const [dailyReminders, setDailyReminders] = useState(true);

  const handleAppearanceToggle = (value: boolean) => {
    setColorScheme(value ? "dark" : "light");
  };

  return (
    <Box gap={2}>
      <Text size="xs" weight="semibold" variant="secondary" mb={1} style={{ textTransform: "uppercase" }}>
        PREFERENCES
      </Text>
      <Box gap={2} bg="surface" border borderRadius="md" shadow="sm" p={2}>
        <SettingsRow
          icon="notifications"
          iconColor="#22C55E"
          title="Daily Reminders"
          subtitle="Stay on your streak"
          rightContent="toggle"
          toggleValue={dailyReminders}
          onToggleChange={setDailyReminders}
        />
        <SettingsRow
          icon="notifications-active"
          iconColor="#EC4899"
          title="Push Notifications"
          rightContent="arrow"
          onPress={() => {}}
        />
        <SettingsRow
          icon="brightness-6"
          iconColor="#6B7280"
          title="Dark Mode"
          rightContent="toggle"
          toggleValue={colorScheme === "dark"}
          onToggleChange={handleAppearanceToggle}
        />
      </Box>
    </Box>
  );
};

