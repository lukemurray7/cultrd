import { router } from "expo-router";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

export const SignUpPrompt = () => {
  return (
    <Box row center gap={1} mt={4}>
      <Text variant="secondary" size="sm">
        Don&apos;t have an account?
      </Text>
      <Pressable onPress={() => router.push("/auth/signup")}>
        <Text size="sm" variant="brand" weight="semibold">
          Sign up
        </Text>
      </Pressable>
    </Box>
  );
};

