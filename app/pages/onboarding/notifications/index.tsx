import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { router, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../../../components/ProgressBar";
import { borders, colors, spacing, typography } from "../../../theme/colors";

export default function NotificationsScreen() {
  const handleEnable = async () => {
    await Notifications.requestPermissionsAsync();
    router.push("/pages/onboarding/create-account" as Href);
  };

  const handleNotNow = async () => {
    router.push("/pages/onboarding/create-account" as Href);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ProgressBar progress={64} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.illustrationContainer}>
          <View style={styles.phone}>
            <View style={styles.phoneScreen}>
              <Text style={styles.heartIcon}>❤️</Text>
            </View>
          </View>
          <View style={styles.hand}>
            <View style={styles.finger1} />
            <View style={styles.finger2} />
            <View style={styles.finger3} />
            <View style={styles.finger4} />
            <View style={styles.thumb} />
          </View>
        </View>
        <Text style={styles.title}>
          Reach your daily goal{"\n"}with reminders
        </Text>
        <Text style={styles.subtitle}>
          Turn on notifications to{"\n"}keep yourself motivated{"\n"}and stay on track.
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleEnable}
          style={styles.enableButton}
        >
          <LinearGradient
            colors={[colors.accent.blueLight, colors.accent.purple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.enableButtonText}>Enable Notifications</Text>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={handleNotNow} style={styles.notNowButton}>
          <Text style={styles.notNowText}>Not now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxxl,
    alignItems: "center",
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: spacing.xxxxl,
    position: "relative",
  },
  phone: {
    width: 120,
    height: 180,
    backgroundColor: colors.background.beige,
    borderRadius: borders.radius.xl,
    borderWidth: borders.width.thick,
    borderColor: colors.success.green,
    padding: spacing.sm,
    zIndex: 2,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: colors.background.white,
    borderRadius: borders.radius.base,
    justifyContent: "center",
    alignItems: "center",
  },
  heartIcon: {
    fontSize: typography.fontSize.xxxl,
  },
  hand: {
    position: "absolute",
    width: 140,
    height: 180,
    left: -spacing.xl,
    top: spacing.xl,
  },
  finger1: {
    position: "absolute",
    left: 0,
    top: 0,
    width: spacing.xl,
    height: 50,
    backgroundColor: colors.success.lightGreen,
    borderRadius: spacing.sm,
  },
  finger2: {
    position: "absolute",
    left: 25,
    top: 0,
    width: spacing.xl,
    height: 50,
    backgroundColor: colors.success.lightGreen,
    borderRadius: spacing.sm,
  },
  finger3: {
    position: "absolute",
    left: 50,
    top: 0,
    width: spacing.xl,
    height: 50,
    backgroundColor: colors.success.lightGreen,
    borderRadius: spacing.sm,
  },
  finger4: {
    position: "absolute",
    left: 75,
    top: 0,
    width: spacing.xl,
    height: 50,
    backgroundColor: colors.success.lightGreen,
    borderRadius: spacing.sm,
  },
  thumb: {
    position: "absolute",
    right: 0,
    top: spacing.xl,
    width: 30,
    height: 60,
    backgroundColor: colors.success.lightGreen,
    borderRadius: 15,
  },
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.black,
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxxl,
  },
  enableButton: {
    borderRadius: borders.radius.base,
    overflow: "hidden",
    marginBottom: spacing.md,
  },
  gradient: {
    paddingVertical: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  enableButtonText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  notNowButton: {
    paddingVertical: spacing.lg,
    alignItems: "center",
  },
  notNowText: {
    fontSize: typography.fontSize.base,
    color: colors.accent.blueLight,
    fontWeight: typography.fontWeight.semibold,
  },
});

