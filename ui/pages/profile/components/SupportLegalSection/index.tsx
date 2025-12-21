import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";
import { SettingsRow } from "../SettingsRow";

export const SupportLegalSection = () => {
  return (
    <Box gap={2}>
      <Text size="xs" weight="semibold" variant="secondary" mb={1} style={{ textTransform: "uppercase" }}>
        SUPPORT & LEGAL
      </Text>
      <Box gap={2} bg="surface" border borderRadius="md" shadow="sm" p={2}>
        <SettingsRow
          icon="help-outline"
          iconColor="#14B8A6"
          title="Help Center"
          rightContent="arrow"
          isExternal={true}
          onPress={() => {}}
        />
        <SettingsRow
          icon="shield"
          iconColor="#3B82F6"
          title="Privacy Policy"
          rightContent="arrow"
          onPress={() => {}}
        />
      </Box>
    </Box>
  );
};

