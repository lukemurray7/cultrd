import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

interface CourseCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  onCTAPress?: () => void;
}

export function CourseCard({
  icon,
  title,
  subtitle,
  onPress,
  onCTAPress,
}: CourseCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={64} color={colors.text.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      <Pressable
        style={styles.ctaButton}
        onPress={onCTAPress || onPress}
      >
        <Text style={styles.ctaText}>Continue</Text>
      </Pressable>
    </Pressable>
  );
}

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    width: "100%",
    minHeight: 400,
  },
  iconContainer: {
    width: "100%",
    height: 200,
    backgroundColor: colors.background.navBar,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  ctaButton: {
    backgroundColor: colors.accent.yellow,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.onYellow,
  },
});
