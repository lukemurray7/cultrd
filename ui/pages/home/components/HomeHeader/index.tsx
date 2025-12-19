import { Image } from "expo-image";
import { Text, View } from "react-native";
import { useUser } from "../../../../../lib/queries/courses";
import { useTheme } from "../../../../../theme/ThemeProvider";

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
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: theme.spacing[4],
        paddingBottom: theme.spacing[2],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing[3],
        }}
      >
        <View style={{ position: "relative" }}>
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
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 12,
                height: 12,
                backgroundColor: theme.colors.brand.success,
                borderRadius: theme.radii.pill,
                borderWidth: 2,
                borderColor: theme.colors.bg.canvas,
              }}
            />
          )}
        </View>
        <View>
          <Text
            style={{
              color: theme.colors.text.primary,
              fontSize: theme.typography.size.md,
              fontWeight: theme.typography.weight.bold,
              lineHeight: theme.typography.lineHeight.sm,
            }}
          >
            {getGreeting()}, {user.name}
          </Text>
          <Text
            style={{
              color: theme.colors.text.secondary,
              fontSize: theme.typography.size.xs,
              fontWeight: theme.typography.weight.medium,
            }}
          >
            Ready to learn?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: `${theme.colors.bg.surface2}80`,
          borderRadius: theme.radii.pill,
          paddingHorizontal: theme.spacing[3],
          paddingVertical: theme.spacing[1],
          gap: theme.spacing[1],
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <Text style={{ fontSize: theme.typography.size.md }}>🔥</Text>
        <Text
          style={{
            color: theme.colors.text.primary,
            fontSize: theme.typography.size.sm,
            fontWeight: theme.typography.weight.bold,
          }}
        >
          {user.streak}
        </Text>
      </View>
    </View>
  );
};

