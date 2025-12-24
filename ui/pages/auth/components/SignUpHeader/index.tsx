import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

export const SignUpHeader = () => {
  const theme = useTheme();

  return (
    <Box gap={2} center>
      <Text size="2xl" weight="medium" color={theme.colors.brand.primary}>
        Create an account
      </Text>
      <Text variant="secondary" size="sm" style={{ width: "60%", textAlign: "center" }}>
        Start your learning journey today
      </Text>
    </Box>
  );
};

