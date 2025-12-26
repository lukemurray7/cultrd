import { router } from "expo-router";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../../../ui/components/Box";
import { LottieAnimation } from "../../../ui/components/LottieAnimation";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { OnboardingFooter } from "../../../ui/pages/onboarding/components/OnboardingFooter";
import { OnboardingHeader } from "../../../ui/pages/onboarding/components/OnboardingHeader";

const knowledgeAnimation = require("../../../assets/animations/knowledge.json");

export default function OnboardingValueScreen() {
  const theme = useTheme();
  const footerSpace = theme.spacing[12] + theme.spacing[8];

  return (
    <>
      <StatusBar />
      <Box flex bg="primary">
        <SafeAreaView edges={["top"]} bg="primary" flex={false}>
          <OnboardingHeader currentStep={1} totalSteps={5} />
        </SafeAreaView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: footerSpace }}
        >
          <Box px={4} py={8} gap={8}>
            <Box gap={6}>
              <Text size="xl" weight="bold" style={{ textAlign: "center" }}>
                The world is <Text variant="brand">interesting</Text>.{"\n"}
                <Text variant="brand">Learn more</Text> about it.
              </Text>

              <Box center py={4} bg="surfaceLight" borderRadius="xl" p={4}>
                <Box
                  width="100%"
                  height={300}
                  center
                  style={{ maxWidth: 400 }}
                >
                  <LottieAnimation
                    source={knowledgeAnimation}
                    autoPlay
                    loop
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>

        <OnboardingFooter>
          <Pressable
            onPress={() => router.push("/onboarding/interests")}
            bg="primary"
            borderRadius="xl"
            py={4}
            center
          >
            <Text size="md" weight="semibold" color={theme.colors.text.white}>
              Continue
            </Text>
          </Pressable>
        </OnboardingFooter>
      </Box>
    </>
  );
}

