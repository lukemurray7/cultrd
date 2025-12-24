import { router } from "expo-router";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Input } from "../../../../components/Input";
import { Pressable } from "../../../../components/Pressable";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

interface ChangePasswordFormProps {
  newPassword: string;
  confirmPassword: string;
  newPasswordError: string;
  confirmPasswordError: string;
  isLoading: boolean;
  onNewPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (password: string) => void;
  onChangePassword: () => void;
}

export const ChangePasswordForm = ({
  newPassword,
  confirmPassword,
  newPasswordError,
  confirmPasswordError,
  isLoading,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onChangePassword,
}: ChangePasswordFormProps) => {
  const theme = useTheme();

  return (
    <Box gap={4} border borderRadius="xl" p={4} mt={4} shadow="sm" bg="surface">
      <Input
        value={newPassword}
        onChangeText={onNewPasswordChange}
        placeholder="Enter new password"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password-new"
        error={newPasswordError}
        bg="surfaceLight"
      />

      <Input
        value={confirmPassword}
        onChangeText={onConfirmPasswordChange}
        placeholder="Confirm new password"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password-new"
        error={confirmPasswordError}
        bg="surfaceLight"
      />

      <Pressable
        onPress={onChangePassword}
        disabled={isLoading}
        bg="primary"
        borderRadius="md"
        py={3}
        center
      >
        <Text size="md" weight="semibold" color={theme.colors.text.white}>
          {isLoading ? "Updating..." : "Update Password"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.back()} center mt={2}>
        <Text size="sm" variant="brand">
          Cancel
        </Text>
      </Pressable>
    </Box>
  );
};

