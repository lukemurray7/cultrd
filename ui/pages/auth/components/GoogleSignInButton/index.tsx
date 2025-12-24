import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { useSignInWithOAuth } from "../../../../../lib/mutations/auth";
import { useAuth } from "../../../../../lib/auth/AuthProvider";
import { useOnboarding } from "../../../../../lib/onboarding/OnboardingContext";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

WebBrowser.maybeCompleteAuthSession();

export const GoogleSignInButton = () => {
  const theme = useTheme();
  const params = useLocalSearchParams();
  const fromOnboarding = params.fromOnboarding === "true";
  const { user } = useAuth();
  const { fromOnboarding: contextFromOnboarding } = useOnboarding();
  const signInWithOAuth = useSignInWithOAuth();

  useEffect(() => {
    if (user && (fromOnboarding || contextFromOnboarding)) {
      router.replace("/onboarding/complete");
    } else if (user) {
      router.replace("/(tabs)/home");
    }
  }, [user, fromOnboarding, contextFromOnboarding]);

  const handleGoogleSignIn = async () => {
    try {
      const { url } = await signInWithOAuth.mutateAsync({ provider: "google" });
      
      if (url) {
        const result = await WebBrowser.openAuthSessionAsync(
          url,
          "cltr://auth/callback"
        );

        if (result.type === "success") {
          const url = new URL(result.url);
          const code = url.searchParams.get("code");
          
          if (code) {
            await WebBrowser.dismissAuthSession();
          }
        }
      }
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  return (
    <Pressable
      onPress={handleGoogleSignIn}
      disabled={signInWithOAuth.isPending}
      row
      center
      bg="surfaceLight"
      border
      borderRadius="md"
      py={3}
      px={4}
      width="100%"
    >
      <Ionicons
        name="logo-google"
        size={20}
        color={theme.colors.text.primary}
        style={{ marginRight: theme.spacing[2] }}
      />
      <Text size="md" weight="medium">
        Continue with Google
      </Text>
    </Pressable>
  );
};

