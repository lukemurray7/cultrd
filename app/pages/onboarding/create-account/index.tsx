import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../../../components/ProgressBar";
import { router } from "expo-router";

export default function CreateAccountScreen() {
  const handleApple = () => {
    router.push("/pages/onboarding/free-trial");
  };

  const handleGoogle = () => {
    router.push("/pages/onboarding/free-trial");
  };

  const handleEmail = () => {
    router.push("/pages/onboarding/free-trial");
  };

  const handleLogin = () => {
    console.log("Navigate to login");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ProgressBar progress={78} />
      <View style={styles.content}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>
          Save your progress, sync across devices, and more
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.appleButton]}
            onPress={handleApple}
          >
            <Text style={styles.appleText}>Continue with Apple</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.googleButton]}
            onPress={handleGoogle}
          >
            <View style={styles.googleIcon}>
              <View style={styles.googleG} />
            </View>
            <Text style={styles.googleText}>Continue with Google</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.emailButton]}
            onPress={handleEmail}
          >
            <Text style={styles.emailText}>Continue with Email</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={handleLogin}>
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#4A9EFF",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  appleButton: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  appleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E5E5",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  googleG: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4285F4",
  },
  googleText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  emailButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E5E5",
  },
  emailText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
  },
  link: {
    color: "#4A9EFF",
    textDecorationLine: "underline",
  },
});

