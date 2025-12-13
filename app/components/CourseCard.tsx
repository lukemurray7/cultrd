import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { borders, colors, fonts, spacing, typography } from "../../theme/colors";

interface CourseCardProps {
  title: string;
  onPress?: () => void;
  onCTAPress?: () => void;
}

export function CourseCard({
  title,
  onPress,
  onCTAPress,
}: CourseCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <ImageBackground
        source={{ uri: "https://etmdylaxhgtxqbtyzstr.supabase.co/storage/v1/object/public/course-images/courses/test_image2.png" }}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={[
            "transparent",
            "transparent",
            "transparent",
            "rgba(0,0,0,0.8)",
            "rgba(0,0,0,0.95)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientOverlay}
        >
          <View style={styles.bottomContent}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <Pressable style={styles.ctaButton} onPress={onCTAPress || onPress}>
              <Text style={styles.ctaText}>Continue</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: borders.radius.xl,
    width: "100%",
    minHeight: 400,
    overflow: "hidden",
    borderWidth: borders.width.medium,
    borderColor: colors.border.darkGray,
  },
  backgroundImage: {
    flex: 1,
    borderRadius: borders.radius.xl,
  },
  imageStyle: {
    borderRadius: borders.radius.xl,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: spacing.lg,
  },
  bottomContent: {
    gap: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    fontFamily: fonts.ubuntu.bold,
    color: colors.text.primary,
  },
  ctaButton: {
    backgroundColor: colors.accent.blue,
    borderRadius: borders.radius.circle,
    width: 110,
    paddingVertical: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    fontFamily: fonts.ubuntu.medium,
    color: colors.text.primary,
  },
});
