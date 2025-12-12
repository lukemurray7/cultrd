import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { BottomNavBar } from "../../components/BottomNavBar";
import { colors } from "../../theme/colors";

export default function CoursesScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>Courses</Text>
      </View>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text.primary,
  },
});



