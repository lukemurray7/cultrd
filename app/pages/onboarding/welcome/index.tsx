import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ContinueButton } from "../../../components/ContinueButton";
import { ProgressBar } from "../../../components/ProgressBar";
import { colors } from "../../../theme/colors";

export default function WelcomeScreen() {
  const handleContinue = () => {
    router.push("/pages/onboarding/topics");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ProgressBar progress={14} />
      <View style={styles.content}>
        <Text style={styles.title}>
          Answer a few quick{"\n"}questions to personalize{"\n"}your experience.
        </Text>
      </View>
      <ContinueButton onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
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
    color: colors.text.black,
    textAlign: "center",
    lineHeight: 36,
  },
});

