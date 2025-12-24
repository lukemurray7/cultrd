import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        animationDuration: 300,
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome/index" options={{ headerShown: false }} />
      <Stack.Screen name="value/index" options={{ headerShown: false }} />
      <Stack.Screen name="interests/index" options={{ headerShown: false }} />
      <Stack.Screen name="notifications/index" options={{ headerShown: false }} />
      <Stack.Screen name="refer/index" options={{ headerShown: false }} />
      <Stack.Screen name="create-account/index" options={{ headerShown: false }} />
      <Stack.Screen name="complete/index" options={{ headerShown: false }} />
    </Stack>
  );
}

