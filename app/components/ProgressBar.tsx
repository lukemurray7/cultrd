import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

interface ProgressBarProps {
  progress: number;
  showBack?: boolean;
}

export function ProgressBar({ progress, showBack = true }: ProgressBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
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
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 12,
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: colors.background.lightGray,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.success.green,
    borderRadius: 2,
  },
});

