import { Box } from "../../../../components/Box";
import { SettingsRow } from "../SettingsRow";

export const LogOutSection = () => {
  return (
    <Box gap={2} mt={2}>
      <Box bg="surface" border borderRadius="md" shadow="sm" p={2}>
        <SettingsRow
          icon="exit-to-app"
          iconColor="#EF4444"
          title="Log Out"
          danger={true}
          onPress={() => {}}
        />
      </Box>
    </Box>
  );
};

