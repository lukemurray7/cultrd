import { router } from "expo-router";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Input } from "../../../../components/Input";
import { Pressable } from "../../../../components/Pressable";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

interface ForgotPasswordFormProps {
  email: string;
  emailError: string;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onResetPassword: () => void;
}

export const ForgotPasswordForm = ({
  email,
  emailError,
  isLoading,
  onEmailChange,
  onResetPassword,
}: ForgotPasswordFormProps) => {
  const theme = useTheme();

  return (
    <Box gap={4} border borderRadius="xl" p={4} mt={4} shadow="sm" bg="surface">
      <Input
        value={email}
        onChangeText={onEmailChange}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        error={emailError}
        bg="surfaceLight"
      />

      <Pressable
        onPress={onResetPassword}
        disabled={isLoading}
        bg="primary"
        borderRadius="md"
        py={3}
        center
      >
        <Text size="md" weight="semibold" color={theme.colors.text.white}>
          {isLoading ? "Sending..." : "Send reset link"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.back()} center mt={2}>
        <Text size="sm" variant="brand">
          Back to sign in
        </Text>
      </Pressable>
    </Box>
  );
};

