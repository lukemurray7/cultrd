import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useSignUpWithEmail } from "../../../lib/mutations/auth";
import { Box } from "../../../ui/components/Box";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { AppleSignInButton } from "../../../ui/pages/auth/components/AppleSignInButton";
import { AuthDivider } from "../../../ui/pages/auth/components/AuthDivider";
import { GoogleSignInButton } from "../../../ui/pages/auth/components/GoogleSignInButton";
import { SignInPrompt } from "../../../ui/pages/auth/components/SignInPrompt";
import { SignUpForm } from "../../../ui/pages/auth/components/SignUpForm";
import { SignUpHeader } from "../../../ui/pages/auth/components/SignUpHeader";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const signUpWithEmail = useSignUpWithEmail();

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
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const data = await signUpWithEmail.mutateAsync({ email, password });
      if (data.session) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/auth/login");
      }
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
            <SignUpHeader />

            <SignUpForm
              email={email}
              password={password}
              emailError={emailError}
              passwordError={passwordError}
              isLoading={signUpWithEmail.isPending}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSignUp={handleSignUp}
            />

            <AuthDivider />

            <Box gap={3} border borderRadius="xl" p={4} mt={4} shadow="sm" bg="surface">
              <GoogleSignInButton />
              <AppleSignInButton />
            </Box>

            <SignInPrompt />
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

