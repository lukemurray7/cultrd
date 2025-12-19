import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { useFeaturedCourse } from "../../../../../lib/queries/courses";
import { useTheme } from "../../../../../theme/ThemeProvider";

export const FeaturedCard = () => {
  const theme = useTheme();
  const { data: course } = useFeaturedCourse();

  if (!course) {
    return null;
  }

  return (
    <Pressable
      style={{
        borderRadius: theme.radii.lg,
        overflow: "hidden",
        backgroundColor: theme.colors.bg.surface2,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      <View style={{ position: "relative", width: "100%", aspectRatio: 16 / 9 }}>
        <Image
          source={{ uri: course.imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            backgroundColor: theme.colors.bg.surface2,
            opacity: 0.9,
          }}
        />
        {course.isDailyPick && (
          <View
            style={{
              position: "absolute",
              bottom: theme.spacing[3],
              left: theme.spacing[3],
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              paddingHorizontal: theme.spacing[2],
              paddingVertical: theme.spacing[1],
              borderRadius: theme.radii.sm,
            }}
          >
            <Text
              style={{
                color: theme.colors.text.primary,
                fontSize: theme.typography.size.xs,
                fontWeight: theme.typography.weight.bold,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Daily Pick
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          padding: theme.spacing[4],
          gap: theme.spacing[2],
        }}
      >
        <View>
          <Text
            style={{
              color: theme.colors.text.primary,
              fontSize: theme.typography.size.xl,
              fontWeight: theme.typography.weight.bold,
              lineHeight: theme.typography.lineHeight.sm,
              marginBottom: theme.spacing[1],
            }}
          >
            {course.title}
          </Text>
          <Text
            style={{
              color: theme.colors.text.secondary,
              fontSize: theme.typography.size.sm,
              fontWeight: theme.typography.weight.medium,
            }}
            numberOfLines={2}
          >
            {course.description}
          </Text>
        </View>
        {course.progress !== undefined && (
          <View
            style={{
              width: "100%",
              backgroundColor: `${theme.colors.text.muted}80`,
              borderRadius: theme.radii.pill,
              height: 4,
              marginTop: theme.spacing[2],
              marginBottom: theme.spacing[1],
            }}
          >
            <View
              style={{
                width: `${course.progress}%`,
                backgroundColor: theme.colors.brand.primary,
                height: 4,
                borderRadius: theme.radii.pill,
              }}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: theme.spacing[1],
          }}
        >
          <Text
            style={{
              color: theme.colors.text.secondary,
              fontSize: theme.typography.size.xs,
              fontWeight: theme.typography.weight.semibold,
            }}
          >
            {course.category} • {course.timeRemaining} min left
          </Text>
          <Pressable
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.radii.md,
              height: 32,
              paddingHorizontal: theme.spacing[4],
              backgroundColor: theme.colors.brand.primary,
            }}
          >
            <Text
              style={{
                color: theme.colors.text.primary,
                fontSize: theme.typography.size.xs,
                fontWeight: theme.typography.weight.bold,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

