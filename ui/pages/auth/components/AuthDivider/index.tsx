import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

export const AuthDivider = () => {
  return (
    <Box row center gap={2} my={2}>
      <Box flex height={1} bg="border" />
      <Text variant="muted" size="sm">
        OR
      </Text>
      <Box flex height={1} bg="border" />
    </Box>
  );
};

