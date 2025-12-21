import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

export const ProfileHeader = () => {
  return (
    <Box px={4} pt={3} pb={3} center>
      <Text size="lg" weight="bold">
        Profile Settings
      </Text>
    </Box>
  );
};

