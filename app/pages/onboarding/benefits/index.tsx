import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ContinueButton } from "../../../components/ContinueButton";
import { ProgressBar } from "../../../components/ProgressBar";

export default function BenefitsScreen() {
  const handleContinue = () => {
    router.push("/pages/onboarding/welcome");
  };

  const benefits = [
    {
      title: "Understand how politics affects you",
      icon: "cards",
    },
    {
      title: "Why economics matters",
      icon: "maze",
    },
    {
      title: "Learn from the past",
      icon: "infinity",
    },
    {
      title: "Communicate your ideas effectively",
      icon: "cards",
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ProgressBar progress={7} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          <Text style={styles.titleHighlight}>Epistoria</Text> helps you...
        </Text>
        <View style={styles.benefitsContainer}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitCard}>
              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitText}>{benefit.title}</Text>
              </View>
              <View style={styles.benefitIconContainer}>
                {benefit.icon === "cards" && (
                  <View style={styles.cardsIcon}>
                    <View style={[styles.card, styles.card1]} />
                    <View style={[styles.card, styles.card2]} />
                    <View style={[styles.card, styles.card3]} />
                  </View>
                )}
                {benefit.icon === "maze" && (
                  <View style={styles.mazeIcon}>
                    <View style={styles.mazeGrid} />
                  </View>
                )}
                {benefit.icon === "infinity" && (
                  <View style={styles.infinityIcon}>
                    <Text style={styles.infinitySymbol}>∞</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
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
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    marginBottom: 40,
  },
  titleHighlight: {
    color: "#4A9EFF",
  },
  benefitsContainer: {
    marginBottom: 20,
  },
  benefitCard: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  benefitTextContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  benefitText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  benefitIconContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  cardsIcon: {
    width: 80,
    height: 100,
    position: "relative",
  },
  card: {
    position: "absolute",
    width: 60,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000000",
  },
  card1: {
    backgroundColor: "#FCE7F3",
    left: 0,
    top: 0,
    zIndex: 1,
  },
  card2: {
    backgroundColor: "#DCFCE7",
    left: 10,
    top: 10,
    zIndex: 2,
  },
  card3: {
    backgroundColor: "#000000",
    left: 20,
    top: 20,
    zIndex: 3,
  },
  mazeIcon: {
    width: 100,
    height: 100,
    backgroundColor: "#000000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  mazeGrid: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 4,
  },
  infinityIcon: {
    width: 100,
    height: 100,
    backgroundColor: "#14B8A6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  infinitySymbol: {
    fontSize: 48,
    color: "#FCE7F3",
    fontWeight: "300",
  },
});

