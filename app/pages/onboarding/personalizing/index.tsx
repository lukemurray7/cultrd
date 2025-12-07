import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../../../components/ProgressBar";
import { ContinueButton } from "../../../components/ContinueButton";
import { router } from "expo-router";

export default function PersonalizingScreen() {
  const handleContinue = () => {
    router.push("/pages/onboarding/create-account");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ProgressBar progress={71} />
      <View style={styles.content}>
        <Text style={styles.title}>
          Just a moment while we personalize your Epistoria experience...
        </Text>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.clouds}>
              <View style={styles.cloud1} />
              <View style={styles.cloud2} />
            </View>
            <View style={styles.birds}>
              <View style={styles.leadBird} />
              <View style={styles.birdRow1}>
                <View style={styles.bird} />
                <View style={styles.bird} />
                <View style={styles.bird} />
              </View>
              <View style={styles.birdRow2}>
                <View style={styles.bird} />
                <View style={styles.bird} />
                <View style={styles.bird} />
              </View>
            </View>
          </View>
        </View>
      </View>
      <ContinueButton onPress={handleContinue} />
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
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    marginBottom: 60,
    lineHeight: 28,
  },
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  illustrationBox: {
    width: 200,
    height: 200,
    borderRadius: 16,
    backgroundColor: "#14B8A6",
    position: "relative",
    overflow: "hidden",
  },
  clouds: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    gap: 20,
  },
  cloud1: {
    width: 60,
    height: 30,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D97706",
  },
  cloud2: {
    width: 50,
    height: 25,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D97706",
  },
  birds: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  leadBird: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF69B4",
    borderWidth: 2,
    borderColor: "#000000",
    marginBottom: 8,
  },
  birdRow1: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  birdRow2: {
    flexDirection: "row",
    gap: 12,
  },
  bird: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#000000",
  },
});

