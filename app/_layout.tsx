import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AuthProvider } from "../lib/auth/AuthProvider";
import { ThemeProvider } from "../theme/ThemeProvider";

const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Stack
            screenOptions={{
              animation: "slide_from_right",
              animationDuration: 300,
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login/index" options={{ headerShown: false }} />
            <Stack.Screen name="auth/signup/index" options={{ headerShown: false }} />
            <Stack.Screen name="auth/forgot-password/index" options={{ headerShown: false }} />
            <Stack.Screen name="course/[id]/index" options={{ headerShown: false }} />
            <Stack.Screen name="course/[id]/chapter/[chapterId]/index" options={{ headerShown: false }} />
            <Stack.Screen name="path/[id]/index" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
