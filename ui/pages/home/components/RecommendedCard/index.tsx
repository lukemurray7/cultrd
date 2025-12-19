import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Course } from "../../../../../types/courses";

interface RecommendedCardProps {
  course: Course;
}

export const RecommendedCard = ({ course }: RecommendedCardProps) => {
  const theme = useTheme();

  const getCategoryColor = (category: string) => {
    if (category === "Science") {
      return theme.colors.brand.accent;
    }
    return theme.colors.brand.primary;
  };

  return (
    <Pressable
      style={{
        flexDirection: "row",
        gap: theme.spacing[4],
        padding: theme.spacing[3],
        borderRadius: theme.radii.lg,
        backgroundColor: `${theme.colors.bg.surface2}80`,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      <Image
        source={{ uri: course.imageUrl }}
        style={{
          width: 96,
          height: 96,
          borderRadius: theme.radii.md,
        }}
        contentFit="cover"
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: theme.spacing[1],
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: theme.typography.weight.bold,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: getCategoryColor(course.category),
            }}
          >
            {course.category}
          </Text>
          <MaterialIcons name="more-horiz" size={20} color={theme.colors.text.secondary} />
        </View>
        <Text
          style={{
            color: theme.colors.text.primary,
            fontSize: theme.typography.size.md,
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
            fontSize: theme.typography.size.xs,
            marginBottom: theme.spacing[2],
          }}
          numberOfLines={2}
        >
          {course.description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing[1],
          }}
        >
          <MaterialIcons name="schedule" size={12} color={theme.colors.text.secondary} />
          <Text
            style={{
              color: theme.colors.text.secondary,
              fontSize: 10,
            }}
          >
            {course.duration} min read
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

