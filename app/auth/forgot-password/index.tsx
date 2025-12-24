import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useResetPassword } from "../../../lib/mutations/auth";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../../../ui/components/Box";
import { Input } from "../../../ui/components/Input";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";

export default function ForgotPasswordScreen() {
  const theme = useTheme();
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
            <Box gap={2}>
              <Text size="2xl" weight="bold">
                Reset password
              </Text>
              <Text variant="secondary" size="md">
                Enter your email address and we'll send you a link to reset your password
              </Text>
            </Box>

            <Box gap={4}>
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={emailError}
              />

              <Pressable
                onPress={handleResetPassword}
                disabled={resetPassword.isPending}
                bg="primary"
                borderRadius="md"
                py={3}
                center
              >
                <Text size="md" weight="semibold" color={theme.colors.text.white}>
                  {resetPassword.isPending ? "Sending..." : "Send reset link"}
                </Text>
              </Pressable>

              <Pressable onPress={() => router.back()} center mt={2}>
                <Text size="sm" variant="brand">
                  Back to sign in
                </Text>
              </Pressable>
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

