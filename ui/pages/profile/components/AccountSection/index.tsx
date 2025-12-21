import { useUser } from "../../../../../lib/queries/courses";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";
import { SettingsRow } from "../SettingsRow";

export const AccountSection = () => {
  const { data: user } = useUser();

  return (
    <Box gap={2}>
      <Text size="xs" weight="semibold" variant="secondary" mb={1} style={{ textTransform: "uppercase" }}>
        ACCOUNT
      </Text>
      <Box gap={2} bg="surface" border borderRadius="md" shadow="sm" p={2}>
        <SettingsRow
          icon="email"
          iconColor="#3B82F6"
          title="Email"
          rightContent="text"
          rightText={user?.email || "alex.chen@example.com"}
        />
        <SettingsRow
          icon="workspace-premium"
          iconColor="#8B5CF6"
          title="Subscription"
          subtitle={user?.subscription?.type || "Pro Member"}
          rightContent="button"
          rightButtonText="Manage"
          onPress={() => {}}
        />
        <SettingsRow
          icon="lock"
          iconColor="#F97316"
          title="Change Password"
          rightContent="arrow"
          onPress={() => {}}
        />
      </Box>
    </Box>
  );
};

