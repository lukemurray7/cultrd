import { Image } from "expo-image";
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
      <Box row center gap={3}>
        <Box style={{ position: "relative" }}>
          <Image
            source={{ uri: user.avatarUrl }}
            style={{
              width: 40,
              height: 40,
              borderRadius: theme.radii.pill,
            }}
            contentFit="cover"
          />
          {user.isOnline && (
            <Box
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 12,
                height: 12,
                backgroundColor: theme.colors.brand.success,
                borderRadius: theme.radii.pill,
                borderWidth: 2,
                borderColor: theme.colors.bg.primary,
              }}
            />
          )}
        </Box>
        <Box>
          <Text
            size="md"
            weight="bold"
            style={{ lineHeight: theme.typography.lineHeight.sm }}
          >
            {getGreeting()}, {user.name}
          </Text>
          <Text variant="secondary" size="xs" weight="medium">
            Ready to learn?
          </Text>
        </Box>
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
