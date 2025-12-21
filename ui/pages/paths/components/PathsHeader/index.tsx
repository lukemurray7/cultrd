import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

export const PathsHeader = () => {
  return (
    <Box px={4} mb={4}>
      <Text size="2xl" weight="bold" mb={1}>
        Learning Paths
      </Text>
      <Text variant="secondary" size="sm">
        Structured courses to master new skills
      </Text>
    </Box>
  );
};

