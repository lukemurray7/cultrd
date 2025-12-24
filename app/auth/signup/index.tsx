import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useSignUpWithEmail } from "../../../lib/mutations/auth";
import { useTheme } from "../../../theme/ThemeProvider";
import { AppleSignInButton } from "../../../ui/pages/auth/components/AppleSignInButton";
import { GoogleSignInButton } from "../../../ui/pages/auth/components/GoogleSignInButton";
import { Box } from "../../../ui/components/Box";
import { Input } from "../../../ui/components/Input";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";

export default function SignUpScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const signUpWithEmail = useSignUpWithEmail();

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      await signUpWithEmail.mutateAsync({ email, password });
      Alert.alert(
        "Success",
        "Please check your email to verify your account",
        [
          {
            text: "OK",
            onPress: () => router.replace("/auth/login"),
          },
        ]
      );
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to sign up";
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
                Create an account
              </Text>
              <Text variant="secondary" size="md">
                Start your learning journey today
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

              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
                error={passwordError}
              />

              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
                error={confirmPasswordError}
              />

              <Pressable
                onPress={handleSignUp}
                disabled={signUpWithEmail.isPending}
                bg="primary"
                borderRadius="md"
                py={3}
                center
              >
                <Text size="md" weight="semibold" color={theme.colors.text.white}>
                  {signUpWithEmail.isPending ? "Creating account..." : "Sign up"}
                </Text>
              </Pressable>
            </Box>

            <Box row center gap={2} my={2}>
              <Box flex height={1} bg="border" />
              <Text variant="muted" size="sm">
                OR
              </Text>
              <Box flex height={1} bg="border" />
            </Box>

            <Box gap={3}>
              <GoogleSignInButton />
              <AppleSignInButton />
            </Box>

            <Box row center gap={1} mt={4}>
              <Text variant="secondary" size="sm">
                Already have an account?
              </Text>
              <Pressable onPress={() => router.push("/auth/login")}>
                <Text size="sm" variant="brand" weight="semibold">
                  Sign in
                </Text>
              </Pressable>
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

