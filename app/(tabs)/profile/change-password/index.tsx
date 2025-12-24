import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useUpdatePassword } from "../../../../lib/mutations/auth";
import { useTheme } from "../../../../theme/ThemeProvider";
import { Box } from "../../../../ui/components/Box";
import { Pressable } from "../../../../ui/components/Pressable";
import { SafeAreaView } from "../../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../../ui/components/ScrollView";
import { StatusBar } from "../../../../ui/components/StatusBar";
import { ChangePasswordForm } from "../../../../ui/pages/profile/components/ChangePasswordForm";
import { ChangePasswordHeader } from "../../../../ui/pages/profile/components/ChangePasswordHeader";

export default function ChangePasswordScreen() {
  const theme = useTheme();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const updatePassword = useUpdatePassword();

  const validateForm = () => {
    let isValid = true;
    setNewPasswordError("");
    setConfirmPasswordError("");

    if (!newPassword) {
      setNewPasswordError("Password is required");
      isValid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    try {
      await updatePassword.mutateAsync({ newPassword });
      Alert.alert(
        "Success",
        "Your password has been updated",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update password";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView edges={["top", "bottom"]} bg="primary">
        <Box px={4} pt={3} pb={3}>
          <Pressable
            onPress={() => router.back()}
            bg="surfaceLight"
            borderRadius="pill"
            border
            center
            shadow="sm"
            width={40}
            height={40}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={theme.colors.text.primary}
            />
          </Pressable>
        </Box>
        <ScrollView flex showsVerticalScrollIndicator={false}>
          <Box px={4} py={8} gap={6}>
            <Box mt={4}>
              <ChangePasswordHeader />
            </Box>

            <ChangePasswordForm
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              newPasswordError={newPasswordError}
              confirmPasswordError={confirmPasswordError}
              isLoading={updatePassword.isPending}
              onNewPasswordChange={setNewPassword}
              onConfirmPasswordChange={setConfirmPassword}
              onChangePassword={handleChangePassword}
            />
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

