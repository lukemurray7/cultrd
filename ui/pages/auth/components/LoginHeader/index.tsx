import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

export const LoginHeader = () => {
  const theme = useTheme();

  return (
    <Box gap={2} center>
      <Text size="2xl" weight="medium" color={theme.colors.brand.primary}>
        Welcome back
      </Text>
      <Text variant="secondary" size="sm" style={{ width: "60%", textAlign: "center" }}>
        Save your progress, sync data between devices, and more.
      </Text>
    </Box>
  );
};

