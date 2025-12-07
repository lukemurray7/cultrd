import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("../../../../assets/images/onboarding/start-screen.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.topSection} />
      </ImageBackground>

      <View style={styles.bottomSection}>
        <Text style={styles.titleContainer}>Epistoria</Text>
        <Text style={styles.tagline}>
          Learn about the world.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => {
              console.log("Get Started pressed");
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#4A9EFF", "#2563EB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.accountButton}
            onPress={() => {
              console.log("I already have an account pressed");
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.accountButtonText}>
              I already have an account
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.legalLinks}>
          <Pressable onPress={() => console.log("Terms pressed")}>
            <Text style={styles.legalLink}>Terms & Conditions</Text>
          </Pressable>
          <Text style={styles.legalSeparator}> • </Text>
          <Pressable onPress={() => console.log("Privacy pressed")}>
            <Text style={styles.legalLink}>Privacy Policy</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  topSection: {
    flex: 1,
    flexGrow: 1,
  },
  bottomSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: 60,
  },
  tagline: {
    fontSize: 24,
    color: "#666666",
    marginBottom: 24,
    fontWeight: "400",
    fontStyle: "italic",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 16,
  },
  getStartedButton: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  getStartedButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  accountButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingVertical: 16,
    alignItems: "center",
  },
  accountButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "400",
  },
  legalLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  legalLink: {
    color: "#4A9EFF",
    fontSize: 12,
  },
  legalSeparator: {
    color: "#000000",
    fontSize: 12,
  },
  titleContainer: {
    fontSize: 40,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
  },
});
