import { router } from "expo-router";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../../../ui/components/Box";
import { LottieAnimation } from "../../../ui/components/LottieAnimation";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { OnboardingFooter } from "../../../ui/pages/onboarding/components/OnboardingFooter";
import { OnboardingHeader } from "../../../ui/pages/onboarding/components/OnboardingHeader";
import { WelcomeLogoIntro } from "../../../ui/pages/onboarding/components/WelcomeLogoIntro";

const booksAnimation = require("../../../assets/animations/books.json");

export default function OnboardingWelcomeScreen() {
  const theme = useTheme();

  return (
    <>
      <StatusBar />
      <Box flex bg="primary">
        <SafeAreaView edges={["top"]} bg="primary" flex={false}>
          <OnboardingHeader currentStep={1} totalSteps={5} showBack={false} showProgress={false} />
        </SafeAreaView>

        <Box flex>
          <Box>
            <Box width={200} height={200} center style={{ alignSelf: "center" }}>
              <LottieAnimation
                source={booksAnimation}
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Box center>
              <WelcomeLogoIntro tagline="be more interesting." />
            </Box>
          </Box>
        </Box>

        <OnboardingFooter>
          <Box gap={3}>
            <Pressable
              onPress={() => router.push("/onboarding/value")}
              bg="primary"
              borderRadius="md"
              py={4}
              center
            >
              <Text size="md" weight="semibold" color={theme.colors.text.white}>
                Get started
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/auth/login")}
              bg="surface"
              border
              borderRadius="md"
              py={4}
              center
            >
              <Text size="md" weight="medium">
                Already have an account
              </Text>
            </Pressable>
          </Box>
        </OnboardingFooter>
      </Box>
    </>
  );
}

