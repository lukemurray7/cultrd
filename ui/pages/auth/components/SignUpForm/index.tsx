import { useTheme } from "../../../../../theme/ThemeProvider";
import { Input } from "../../../../components/Input";
import { Pressable } from "../../../../components/Pressable";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

interface SignUpFormProps {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSignUp: () => void;
}

export const SignUpForm = ({
  email,
  password,
  emailError,
  passwordError,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSignUp,
}: SignUpFormProps) => {
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

      <Input
        value={password}
        onChangeText={onPasswordChange}
        placeholder="Create a password"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password-new"
        error={passwordError}
      />

      <Pressable
        onPress={onSignUp}
        disabled={isLoading}
        bg="primary"
        borderRadius="md"
        py={3}
        center
      >
        <Text size="md" weight="semibold" color={theme.colors.text.white}>
          {isLoading ? "Creating account..." : "Sign up"}
        </Text>
      </Pressable>
    </Box>
  );
};

