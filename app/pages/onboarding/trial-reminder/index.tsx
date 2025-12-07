import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../../../components/ProgressBar";
import { ContinueButton } from "../../../components/ContinueButton";
import { router } from "expo-router";

export default function TrialReminderScreen() {
  const handleContinue = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ProgressBar progress={92} />
      <View style={styles.content}>
        <Text style={styles.title}>
          You'll get a reminder{"\n"}
          <Text style={styles.highlight}>2 days</Text> before your{"\n"}
          trial ends.
        </Text>
        <View style={styles.bellContainer}>
          <View style={styles.bellCircle}>
            <View style={styles.bell}>
              <View style={styles.bellHandle} />
              <View style={styles.bellBody} />
              <View style={styles.bellClapper} />
            </View>
          </View>
        </View>
      </View>
      <ContinueButton onPress={handleContinue} label="Try for Free" />
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
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    marginBottom: 60,
    lineHeight: 36,
  },
  highlight: {
    color: "#22C55E",
  },
  bellContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  bellCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#DCFCE7",
    borderWidth: 4,
    borderColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
  },
  bell: {
    alignItems: "center",
  },
  bellHandle: {
    width: 30,
    height: 20,
    backgroundColor: "#FFD700",
    borderWidth: 2,
    borderColor: "#FFA500",
    borderRadius: 15,
    marginBottom: -5,
  },
  bellBody: {
    width: 100,
    height: 100,
    backgroundColor: "#FFD700",
    borderWidth: 3,
    borderColor: "#FFA500",
    borderRadius: 50,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: "hidden",
  },
  bellClapper: {
    position: "absolute",
    bottom: -10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF4500",
  },
});

