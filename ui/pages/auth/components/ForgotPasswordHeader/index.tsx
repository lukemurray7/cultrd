import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

export const ForgotPasswordHeader = () => {
  const theme = useTheme();

  return (
    <Box gap={2} center>
      <Text size="2xl" weight="medium" color={theme.colors.brand.primary}>
        Reset password
      </Text>
      <Text variant="secondary" size="sm" style={{ width: "60%", textAlign: "center" }}>
        Enter your email address and we&apos;ll send you a link to reset your password
      </Text>
    </Box>
  );
};

