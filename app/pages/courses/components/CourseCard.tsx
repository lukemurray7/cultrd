import { Image } from "expo-image";
import { Dimensions, Pressable, StyleSheet, Text } from "react-native";
import { borders, colors, spacing, typography } from "../../../../theme/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - spacing.lg * 3) / 2;

interface CourseCardProps {
  title: string;
  imageUrl?: string;
  onPress?: () => void;
}

export function CourseCard({ title, imageUrl, onPress }: CourseCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={imageUrl ? { uri: imageUrl } : { uri: "https://etmdylaxhgtxqbtyzstr.supabase.co/storage/v1/object/public/course-images/courses/test_image2.png" }}
        style={styles.image}
        contentFit="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
}

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginBottom: spacing.lg,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: borders.radius.lg,
    marginBottom: spacing.md,
    borderWidth: borders.width.thick,
    borderColor: colors.border.gray,
  },
  title: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    paddingHorizontal: spacing.xs,
  },
});

