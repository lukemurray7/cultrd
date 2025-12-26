import { useUser } from "../../../../../lib/queries/courses";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

export const HomeHeader = () => {
  const theme = useTheme();
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Box
      row
      center
      between
      px={4}
      py={4}
      mx={4}
      borderRadius="xl"
      bg="surfaceLight"
      border
      shadow="sm"
    >
      <Box>
        <Text
          size="md"
          weight="bold"
          style={{ lineHeight: theme.typography.lineHeight.sm }}
        >
          {getGreeting()}
        </Text>
        <Text variant="secondary" size="xs" weight="medium">
          Ready to learn?
        </Text>
      </Box>
      <Box
        row
        center
        bg="surfaceLight"
        borderRadius="pill"
        px={3}
        py={1}
        gap={1}
        border
        style={{
          justifyContent: "flex-end",
          backgroundColor: `${theme.colors.bg.surfaceLight}80`,
        }}
      >
        <Text size="md">🔥</Text>
        <Text variant="primary" size="sm" weight="bold">
          {user.streak}
        </Text>
      </Box>
    </Box>
  );
};
