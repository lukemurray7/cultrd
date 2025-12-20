import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";
import { useFeaturedCourse } from "../../../../../lib/queries/courses";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Text } from "../../../../components/Text";

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
        backgroundColor: theme.colors.bg.surfaceLight,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      <View style={{ position: "relative", width: "100%", aspectRatio: 16 / 12 }}>
        <Image
          source={{ uri: course.imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        <LinearGradient
          colors={["transparent", theme.colors.bg.surfaceLight]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "20%",
          }}
        />
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

