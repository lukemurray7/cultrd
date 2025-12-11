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
          color="#4A9EFF"
          style={styles.politicsIcon}
        />
        <Ionicons
          name="trending-up"
          size={48}
          color="#6366F1"
          style={styles.economicsIcon}
        />
        <Ionicons
          name="musical-notes"
          size={32}
          color="#4A9EFF"
          style={styles.cultureIcon}
        />
        <Ionicons
          name="time"
          size={32}
          color="#6366F1"
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
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  topSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
  },
  iconLayout: {
    height: 240,
    position: "relative",
    marginBottom: 20,
  },
  politicsIcon: {
    position: "absolute",
    left: 20,
    top: 0,
  },
  economicsIcon: {
    position: "absolute",
    right: 20,
    top: 60,
  },
  cultureIcon: {
    position: "absolute",
    left: 40,
    top: 120,
    opacity: 0.5,
  },
  historyIcon: {
    position: "absolute",
    right: 40,
    top: 180,
    opacity: 0.5,
  },
  contentSection: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
  },
  actionsSection: {
    marginBottom: 40,
  },
  loginLink: {
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 12,
  },
  loginLinkText: {
    color: "#4A9EFF",
    fontSize: 16,
    fontWeight: "400",
  },
});
