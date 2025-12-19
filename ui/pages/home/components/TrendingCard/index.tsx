import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Course } from "../../../../../types/courses";

interface TrendingCardProps {
  course: Course;
  showBookmark?: boolean;
}

export const TrendingCard = ({ course, showBookmark = false }: TrendingCardProps) => {
  const theme = useTheme();

  return (
    <Pressable style={{ width: 160, gap: theme.spacing[2] }}>
      <View
        style={{
          width: 160,
          height: 208,
          borderRadius: theme.radii.lg,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          source={{ uri: course.imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        />
        {showBookmark && (
          <View
            style={{
              position: "absolute",
              top: theme.spacing[2],
              right: theme.spacing[2],
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: theme.radii.pill,
              padding: theme.spacing[1],
            }}
          >
            <MaterialIcons name="bookmark" size={16} color={theme.colors.text.primary} />
          </View>
        )}
      </View>
      <View>
        <Text
          style={{
            color: theme.colors.text.primary,
            fontSize: theme.typography.size.sm,
            fontWeight: theme.typography.weight.bold,
            lineHeight: theme.typography.lineHeight.sm,
            marginBottom: theme.spacing[0],
          }}
          numberOfLines={2}
        >
          {course.title}
        </Text>
        <Text
          style={{
            color: theme.colors.text.secondary,
            fontSize: theme.typography.size.xs,
          }}
        >
          {course.category} • {course.lessons || 0} lessons
        </Text>
      </View>
    </Pressable>
  );
};

