import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../../../components/ProgressBar";
import { ContinueButton } from "../../../components/ContinueButton";
import { router } from "expo-router";

export default function GoalSetScreen() {
  const handleContinue = () => {
    router.push("/pages/onboarding/personalizing");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ProgressBar progress={80} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Goal set.</Text>
        <Text style={styles.description}>
          People who commit to a{"\n"}
          goal learn more. Even with{"\n"}
          just a few minutes a day{"\n"}
          you can master complex{"\n"}
          topics.
        </Text>
        <View style={styles.pathContainer}>
          <View style={styles.path}>
            <View style={styles.startDot} />
            <View style={styles.step1}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepIcon}>⏰</Text>
              </View>
            </View>
            <View style={styles.step2}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepIcon}>📚</Text>
              </View>
            </View>
            <View style={styles.step3}>
              <View style={styles.stepCircleFilled} />
            </View>
            <View style={styles.step4}>
              <View style={styles.stepCircleFilled} />
            </View>
            <View style={styles.step5}>
              <View style={styles.stepCircleFilled} />
            </View>
            <View style={styles.endStep}>
              <View style={styles.endIcon}>📍</View>
            </View>
            <View style={styles.endDot} />
          </View>
        </View>
      </ScrollView>
      <ContinueButton onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    marginBottom: 24,
  },
  description: {
    fontSize: 18,
    color: "#000000",
    lineHeight: 28,
    marginBottom: 40,
  },
  pathContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  path: {
    width: "100%",
    height: 200,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  startDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000000",
  },
  step1: {
    position: "absolute",
    left: "15%",
    top: 20,
  },
  step2: {
    position: "absolute",
    left: "30%",
    top: 40,
  },
  step3: {
    position: "absolute",
    left: "45%",
    top: 60,
  },
  step4: {
    position: "absolute",
    left: "60%",
    top: 80,
  },
  step5: {
    position: "absolute",
    left: "75%",
    top: 100,
  },
  endStep: {
    position: "absolute",
    right: 0,
    top: 120,
  },
  endDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000000",
    position: "absolute",
    right: 0,
    top: 140,
  },
  stepCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#FFD700",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  stepIcon: {
    fontSize: 24,
  },
  stepCircleFilled: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#22C55E",
  },
  endIcon: {
    fontSize: 32,
  },
});

