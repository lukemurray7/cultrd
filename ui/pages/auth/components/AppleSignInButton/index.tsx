import { Ionicons } from "@expo/vector-icons";
import { appleAuth, appleAuthAndroid } from "@invertase/react-native-apple-authentication";
import { SignInWithIdTokenCredentials } from "@supabase/supabase-js";
import { Platform } from "react-native";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { supabase } from "../../../../../lib/supabase";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

export const AppleSignInButton = () => {
  const theme = useTheme();

  const handleAppleSignInIOS = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      if (
        credentialState === appleAuth.State.AUTHORIZED &&
        appleAuthRequestResponse.identityToken &&
        appleAuthRequestResponse.authorizationCode
      ) {
        const signInWithIdTokenCredentials: SignInWithIdTokenCredentials = {
          provider: "apple",
          token: appleAuthRequestResponse.identityToken,
          nonce: appleAuthRequestResponse.nonce || undefined,
          access_token: appleAuthRequestResponse.authorizationCode,
        };

        const { data, error } = await supabase.auth.signInWithIdToken(
          signInWithIdTokenCredentials
        );

        if (error) {
          console.error("Error signing in with Apple:", error);
        }

        if (data) {
          console.log("Apple sign in successful:", data);
        }
      }
    } catch (error) {
      console.error("Apple sign in error:", error);
    }
  };

  const handleAppleSignInAndroid = async () => {
    try {
      const rawNonce = uuid();
      const state = uuid();

      appleAuthAndroid.configure({
        clientId: process.env.EXPO_PUBLIC_APPLE_AUTH_SERVICE_ID || "",
        redirectUri: process.env.EXPO_PUBLIC_APPLE_AUTH_REDIRECT_URI || "",
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
      });

      const credentialState = await appleAuthAndroid.signIn();

      if (credentialState.id_token && credentialState.code && credentialState.nonce) {
        const signInWithIdTokenCredentials: SignInWithIdTokenCredentials = {
          provider: "apple",
          token: credentialState.id_token,
          nonce: credentialState.nonce,
          access_token: credentialState.code,
        };

        const { data, error } = await supabase.auth.signInWithIdToken(
          signInWithIdTokenCredentials
        );

        if (error) {
          console.error("Error signing in with Apple:", error);
        }

        if (data) {
          console.log("Apple sign in successful:", data);
        }
      }
    } catch (error) {
      console.error("Apple sign in error:", error);
    }
  };

  const handleAppleSignIn = () => {
    if (Platform.OS === "ios") {
      handleAppleSignInIOS();
    } else if (Platform.OS === "android" && appleAuthAndroid.isSupported) {
      handleAppleSignInAndroid();
    }
  };

  if (Platform.OS === "android" && !appleAuthAndroid.isSupported) {
    return null;
  }

  return (
    <Pressable
      onPress={handleAppleSignIn}
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
        name="logo-apple"
        size={24}
        color={theme.colors.text.primary}
        style={{ marginRight: theme.spacing[2] }}
      />
      <Text size="md" weight="medium">
        Continue with Apple
      </Text>
    </Pressable>
  );
};

