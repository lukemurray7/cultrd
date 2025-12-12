import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { borders, colors, spacing } from "../theme/colors";

interface ProgressBarProps {
  progress: number;
  showBack?: boolean;
}

export function ProgressBar({ progress, showBack = true }: ProgressBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      {showBack && (
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text.black} />
        </Pressable>
      )}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  backButton: {
    marginRight: spacing.md,
  },
  progressBarContainer: {
    flex: 1,
    height: spacing.xs,
    backgroundColor: colors.background.lightGray,
    borderRadius: borders.radius.xs,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.success.green,
    borderRadius: borders.radius.xs,
  },
});

