import { router } from "expo-router";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Input } from "../../../../components/Input";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

interface LoginFormProps {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSignIn: () => void;
}

export const LoginForm = ({
  email,
  password,
  emailError,
  passwordError,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSignIn,
}: LoginFormProps) => {
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
        placeholder="Enter your password"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
        error={passwordError}
      />

      <Pressable
        onPress={() => router.push("/auth/forgot-password")}
        style={{ alignSelf: "flex-end" }}
      >
        <Text size="sm" variant="brand">
          Forgot password?
        </Text>
      </Pressable>

      <Pressable
        onPress={onSignIn}
        disabled={isLoading}
        bg="primary"
        borderRadius="md"
        py={3}
        center
      >
        <Text size="md" weight="semibold" color={theme.colors.text.white}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Text>
      </Pressable>
    </Box>
  );
};

