import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../../../components/ProgressBar";
import { colors } from "../../../theme/colors";

export default function NotificationsScreen() {
  const handleEnable = async () => {
    await Notifications.requestPermissionsAsync();
    router.push("/pages/onboarding/create-account");
  };

  const handleNotNow = async () => {
    router.push("/pages/onboarding/create-account");
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
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 40,
    position: "relative",
  },
  phone: {
    width: 120,
    height: 180,
    backgroundColor: colors.background.beige,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.success.green,
    padding: 10,
    zIndex: 2,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: colors.background.white,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  heartIcon: {
    fontSize: 40,
  },
  hand: {
    position: "absolute",
    width: 140,
    height: 180,
    left: -20,
    top: 20,
  },
  finger1: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 20,
    height: 50,
    backgroundColor: colors.success.lightGreen,
    borderRadius: 10,
  },
  finger2: {
    position: "absolute",
    left: 25,
    top: 0,
    width: 20,
    height: 50,
    backgroundColor: colors.success.lightGreen,
    borderRadius: 10,
  },
  finger3: {
    position: "absolute",
    left: 50,
    top: 0,
    width: 20,
    height: 50,
    backgroundColor: colors.success.lightGreen,
    borderRadius: 10,
  },
  finger4: {
    position: "absolute",
    left: 75,
    top: 0,
    width: 20,
    height: 50,
    backgroundColor: colors.success.lightGreen,
    borderRadius: 10,
  },
  thumb: {
    position: "absolute",
    right: 0,
    top: 20,
    width: 30,
    height: 60,
    backgroundColor: colors.success.lightGreen,
    borderRadius: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text.black,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.tertiary,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  enableButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  enableButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  notNowButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  notNowText: {
    fontSize: 16,
    color: colors.accent.blueLight,
    fontWeight: "600",
  },
});

