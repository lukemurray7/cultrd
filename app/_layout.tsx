import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { AuthProvider, useAuth } from "../lib/auth/AuthProvider";
import { OnboardingProvider } from "../lib/onboarding/OnboardingContext";
import { ThemeProvider } from "../theme/ThemeProvider";
import { LoadingScreen } from "../ui/components/LoadingScreen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

export const unstable_settings = {
  anchor: "(tabs)",
};

const MIN_LOADING_TIME_MS = 2000;

function RootStack() {
  const { loading } = useAuth();
  const [showLoading, setShowLoading] = useState(true);
  const [loadingStartTime] = useState(Date.now());

  useEffect(() => {
    if (!loading) {
      const elapsedTime = Date.now() - loadingStartTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME_MS - elapsedTime);
      
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [loading, loadingStartTime]);

  if (loading || showLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        animationDuration: 300,
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login/index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup/index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/forgot-password/index" options={{ headerShown: false }} />
      <Stack.Screen name="course/[id]/index" options={{ headerShown: false }} />
      <Stack.Screen name="course/[id]/chapter/[chapterId]/index" options={{ headerShown: false }} />
      <Stack.Screen name="path/[id]/index" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <OnboardingProvider>
            <RootStack />
            <StatusBar style="auto" />
          </OnboardingProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
