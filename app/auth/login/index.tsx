import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useSignInWithEmail } from "../../../lib/mutations/auth";
import { Box } from "../../../ui/components/Box";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { AppleSignInButton } from "../../../ui/pages/auth/components/AppleSignInButton";
import { AuthDivider } from "../../../ui/pages/auth/components/AuthDivider";
import { GoogleSignInButton } from "../../../ui/pages/auth/components/GoogleSignInButton";
import { LoginForm } from "../../../ui/pages/auth/components/LoginForm";
import { LoginHeader } from "../../../ui/pages/auth/components/LoginHeader";
import { SignUpPrompt } from "../../../ui/pages/auth/components/SignUpPrompt";

export default function LoginScreen() {
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
            <LoginHeader />

            <LoginForm
              email={email}
              password={password}
              emailError={emailError}
              passwordError={passwordError}
              isLoading={signInWithEmail.isPending}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSignIn={handleSignIn}
            />

            <AuthDivider />

            <Box gap={3} border borderRadius="xl" p={4} mt={4} shadow="sm" bg="surface">
              <GoogleSignInButton />
              <AppleSignInButton />
            </Box>

            <SignUpPrompt />
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

