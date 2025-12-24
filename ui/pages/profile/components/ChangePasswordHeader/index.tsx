import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

export const ChangePasswordHeader = () => {
  const theme = useTheme();

  return (
    <Box gap={2} center>
      <Text size="xl" weight="medium" color={theme.colors.brand.primary}>
        Change Password
      </Text>
      <Text color={theme.colors.text.muted} size="sm" style={{ width: "60%", textAlign: "center" }}>
        Enter your new password below
      </Text>
    </Box>
  );
};

