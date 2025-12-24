import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useResetPassword } from "../../../lib/mutations/auth";
import { ForgotPasswordForm } from "../../../ui/pages/auth/components/ForgotPasswordForm";
import { ForgotPasswordHeader } from "../../../ui/pages/auth/components/ForgotPasswordHeader";
import { Box } from "../../../ui/components/Box";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const resetPassword = useResetPassword();

  const validateForm = () => {
    setEmailError("");

    if (!email) {
      setEmailError("Email is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }

    return true;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    try {
      await resetPassword.mutateAsync({ email });
      Alert.alert(
        "Email sent",
        "Please check your email for password reset instructions",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send reset email";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView edges={["top", "bottom"]} bg="primary">
        <ScrollView flex showsVerticalScrollIndicator={false}>
          <Box px={4} py={8} gap={6}>
            <ForgotPasswordHeader />

            <ForgotPasswordForm
              email={email}
              emailError={emailError}
              isLoading={resetPassword.isPending}
              onEmailChange={setEmail}
              onResetPassword={handleResetPassword}
            />
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

