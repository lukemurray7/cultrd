import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, fonts } from "../theme/colors";

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
        source={require(`../../assets/images/onboarding/test_image2.png`)}
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
    borderRadius: 20,
    width: "100%",
    minHeight: 400,
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    borderRadius: 20,
  },
  imageStyle: {
    borderRadius: 20,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  bottomContent: {
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: fonts.ubuntu.bold,
    color: colors.text.primary,
  },
  ctaButton: {
    backgroundColor: colors.accent.blue,
    borderRadius: 100,
    width: 110,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: fonts.ubuntu.medium,
    color: colors.text.primary,
  },
});
