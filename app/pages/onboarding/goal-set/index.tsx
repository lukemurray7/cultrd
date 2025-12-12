import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ContinueButton } from "../../../components/ContinueButton";
import { ProgressBar } from "../../../components/ProgressBar";
import { borders, colors, spacing, typography } from "../../../theme/colors";

export default function GoalSetScreen() {
  const handleContinue = () => {
    router.push("/pages/onboarding/welcome");
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
    backgroundColor: colors.background.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxxl,
  },
  title: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.black,
    textAlign: "center",
    marginBottom: spacing.xxl,
  },
  description: {
    fontSize: typography.fontSize.lg,
    color: colors.text.black,
    lineHeight: 28,
    marginBottom: spacing.xxxxl,
  },
  pathContainer: {
    alignItems: "center",
    marginBottom: spacing.xxxxl,
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
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: borders.radius.xs,
    backgroundColor: colors.text.black,
  },
  step1: {
    position: "absolute",
    left: "15%",
    top: spacing.xl,
  },
  step2: {
    position: "absolute",
    left: "30%",
    top: spacing.xxxxl,
  },
  step3: {
    position: "absolute",
    left: "45%",
    top: spacing.xxxxxl,
  },
  step4: {
    position: "absolute",
    left: "60%",
    top: spacing.xxxxxl + spacing.sm,
  },
  step5: {
    position: "absolute",
    left: "75%",
    top: spacing.xxxxxl + spacing.md,
  },
  endStep: {
    position: "absolute",
    right: 0,
    top: spacing.xxxxxl + spacing.lg,
  },
  endDot: {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: borders.radius.xs,
    backgroundColor: colors.text.black,
    position: "absolute",
    right: 0,
    top: spacing.xxxxxl + spacing.xl,
  },
  stepCircle: {
    width: spacing.xxxxxl,
    height: spacing.xxxxxl,
    borderRadius: borders.radius.circle / 2,
    borderWidth: borders.width.thick,
    borderColor: colors.accent.gold,
    backgroundColor: colors.background.white,
    justifyContent: "center",
    alignItems: "center",
  },
  stepIcon: {
    fontSize: typography.fontSize.xxl,
  },
  stepCircleFilled: {
    width: spacing.xxl,
    height: spacing.xxl,
    borderRadius: borders.radius.base,
    backgroundColor: colors.success.green,
  },
  endIcon: {
    fontSize: typography.fontSize.titleLarge,
  },
});

