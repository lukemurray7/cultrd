import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../../../components/ProgressBar";
import { ContinueButton } from "../../../components/ContinueButton";
import { router } from "expo-router";

export default function FreeTrialScreen() {
  const handleContinue = () => {
    router.push("/pages/onboarding/trial-reminder");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ProgressBar progress={85} />
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <View style={styles.person}>
            <View style={styles.head} />
            <View style={styles.body} />
            <View style={styles.phone} />
          </View>
          <View style={styles.atomIcon}>
            <View style={styles.nucleus} />
            <View style={styles.orbit1} />
            <View style={styles.orbit2} />
            <View style={styles.orbit3} />
          </View>
        </View>
        <Text style={styles.title}>
          We offer <Text style={styles.highlight}>7 days</Text>{"\n"}
          <Text style={styles.highlight}>free</Text> so everyone{"\n"}
          can learn on{"\n"}
          Epistoria.
        </Text>
      </View>
      <ContinueButton onPress={handleContinue} label="I'm Ready" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 40,
    position: "relative",
  },
  person: {
    alignItems: "center",
    position: "relative",
  },
  head: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF6B4A",
    marginBottom: 10,
  },
  body: {
    width: 80,
    height: 100,
    backgroundColor: "#4A9EFF",
    borderRadius: 8,
  },
  phone: {
    position: "absolute",
    right: -20,
    top: 40,
    width: 40,
    height: 60,
    backgroundColor: "#FFD700",
    borderRadius: 6,
  },
  atomIcon: {
    position: "absolute",
    top: -20,
    right: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
  },
  nucleus: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF0000",
  },
  orbit1: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FF0000",
  },
  orbit2: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FF0000",
    transform: [{ rotate: "60deg" }],
  },
  orbit3: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FF0000",
    transform: [{ rotate: "120deg" }],
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    lineHeight: 36,
  },
  highlight: {
    color: "#22C55E",
  },
});

