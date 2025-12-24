import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useSignUpWithEmail } from "../../../lib/mutations/auth";
import { Box } from "../../../ui/components/Box";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { useTheme } from "../../../theme/ThemeProvider";
import { useOnboarding } from "../../../lib/onboarding/OnboardingContext";
import { AppleSignInButton } from "../../../ui/pages/auth/components/AppleSignInButton";
import { AuthDivider } from "../../../ui/pages/auth/components/AuthDivider";
import { GoogleSignInButton } from "../../../ui/pages/auth/components/GoogleSignInButton";
import { SignUpForm } from "../../../ui/pages/auth/components/SignUpForm";
import { SignUpHeader } from "../../../ui/pages/auth/components/SignUpHeader";
import { OnboardingFooter } from "../../../ui/pages/onboarding/components/OnboardingFooter";
import { OnboardingHeader } from "../../../ui/pages/onboarding/components/OnboardingHeader";

export default function OnboardingCreateAccountScreen() {
  const theme = useTheme();
  const { setFromOnboarding } = useOnboarding();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const signUpWithEmail = useSignUpWithEmail();
  const footerSpace = theme.spacing[12] + theme.spacing[8];

  useEffect(() => {
    setFromOnboarding(true);
  }, [setFromOnboarding]);

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
        router.replace("/onboarding/complete");
      } else {
        router.replace("/auth/login");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to sign up";
      Alert.alert("Error", errorMessage);
    }
  };

  const handleSignIn = () => {
    router.push({
      pathname: "/auth/login",
      params: { fromOnboarding: "true" },
    });
  };

  return (
    <>
      <StatusBar />
      <Box flex bg="primary">
        <SafeAreaView edges={["top"]} bg="primary" flex={false}>
          <OnboardingHeader currentStep={5} totalSteps={5} />
        </SafeAreaView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: footerSpace }}
        >
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
          </Box>
        </ScrollView>

        <OnboardingFooter>
          <Box gap={3}>
            <Pressable
              onPress={handleSignUp}
              disabled={signUpWithEmail.isPending}
              bg="primary"
              borderRadius="md"
              py={4}
              center
            >
              <Text size="md" weight="semibold" color={theme.colors.text.white}>
                {signUpWithEmail.isPending ? "Creating account..." : "Create account"}
              </Text>
            </Pressable>

            <Box row center gap={1}>
              <Text variant="secondary" size="sm">
                Already have an account?
              </Text>
              <Pressable onPress={handleSignIn}>
                <Text size="sm" variant="brand" weight="semibold">
                  Sign in
                </Text>
              </Pressable>
            </Box>
          </Box>
        </OnboardingFooter>
      </Box>
    </>
  );
}

