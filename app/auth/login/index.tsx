import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useSignInWithEmail } from "../../../lib/mutations/auth";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../../../ui/components/Box";
import { Input } from "../../../ui/components/Input";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { AppleSignInButton } from "../../../ui/pages/auth/components/AppleSignInButton";
import { GoogleSignInButton } from "../../../ui/pages/auth/components/GoogleSignInButton";

export default function LoginScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const signInWithEmail = useSignInWithEmail();

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

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
    }

    return isValid;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    try {
      await signInWithEmail.mutateAsync({ email, password });
      router.replace("/(tabs)/home");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to sign in";
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
                Welcome back
              </Text>
              <Text variant="secondary" size="md">
                Sign in to continue learning
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
                onPress={handleSignIn}
                disabled={signInWithEmail.isPending}
                bg="primary"
                borderRadius="md"
                py={3}
                center
              >
                <Text size="md" weight="semibold" color={theme.colors.text.white}>
                  {signInWithEmail.isPending ? "Signing in..." : "Sign in"}
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
                Don&apos;t have an account?
              </Text>
              <Pressable onPress={() => router.push("/auth/signup")}>
                <Text size="sm" variant="brand" weight="semibold">
                  Sign up
                </Text>
              </Pressable>
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

