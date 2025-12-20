import { Stack } from "expo-router";

export default function CoursesLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        animationDuration: 300,
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[subtopicId]/index" />
    </Stack>
  );
}

