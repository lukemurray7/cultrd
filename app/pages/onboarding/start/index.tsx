import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ContinueButton } from "../../../components/ContinueButton";
import { colors, spacing, typography } from "../../../../theme/colors";

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.topSection}>
        <Image
          source={require("../../../../assets/images/icon.png")}
          style={styles.icon}
          contentFit="contain"
        />
        <Text style={styles.title}>Understand the world</Text>
      </View>

      <View style={styles.iconLayout}>
        <Ionicons
          name="flag"
          size={48}
          color={colors.accent.blueLight}
          style={styles.politicsIcon}
        />
        <Ionicons
          name="trending-up"
          size={48}
          color={colors.accent.purple}
          style={styles.economicsIcon}
        />
        <Ionicons
          name="musical-notes"
          size={32}
          color={colors.accent.blueLight}
          style={styles.cultureIcon}
        />
        <Ionicons
          name="time"
          size={32}
          color={colors.accent.purple}
          style={styles.historyIcon}
        />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.description}>
          Interactive lessons in politics, economics, history & culture. Get smarter in minutes a day.
        </Text>
      </View>

      <View style={styles.actionsSection}>
        <ContinueButton
          onPress={() => {
            router.push("/pages/onboarding/welcome");
          }}
        />
        
        <Pressable
          onPress={() => {
            router.push("/pages/auth/login");
          }}
          style={styles.loginLink}
        >
          <Text style={styles.loginLinkText}>Log in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
    paddingTop: spacing.xxxxxl,
    paddingHorizontal: spacing.xl,
  },
  topSection: {
    alignItems: "center",
    marginTop: spacing.xl,
    marginBottom: spacing.xxxxl,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.black,
    textAlign: "center",
  },
  iconLayout: {
    height: 240,
    position: "relative",
    marginBottom: spacing.xl,
  },
  politicsIcon: {
    position: "absolute",
    left: spacing.xl,
    top: 0,
  },
  economicsIcon: {
    position: "absolute",
    right: spacing.xl,
    top: spacing.xxxxxl,
  },
  cultureIcon: {
    position: "absolute",
    left: spacing.xxxxl,
    top: 120,
    opacity: 0.5,
  },
  historyIcon: {
    position: "absolute",
    right: spacing.xxxxl,
    top: 180,
    opacity: 0.5,
  },
  contentSection: {
    marginBottom: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
    textAlign: "center",
    lineHeight: 24,
  },
  actionsSection: {
    marginBottom: spacing.xxxxl,
  },
  loginLink: {
    alignItems: "center",
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
  },
  loginLinkText: {
    color: colors.accent.blueLight,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
  },
});
