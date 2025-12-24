import { router } from "expo-router";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

export const SignInPrompt = () => {
  return (
    <Box row center gap={1} mt={4}>
      <Text variant="secondary" size="sm">
        Already have an account?
      </Text>
      <Pressable onPress={() => router.push("/auth/login")}>
        <Text size="sm" variant="brand" weight="semibold">
          Sign in
        </Text>
      </Pressable>
    </Box>
  );
};

