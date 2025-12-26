import { router } from "expo-router";
import { Share } from "react-native";
import { useOnboarding } from "../../../lib/onboarding/OnboardingContext";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../../../ui/components/Box";
import { LottieAnimation } from "../../../ui/components/LottieAnimation";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { OnboardingFooter } from "../../../ui/pages/onboarding/components/OnboardingFooter";
import { OnboardingHeader } from "../../../ui/pages/onboarding/components/OnboardingHeader";

const shareAnimation = require("../../../assets/animations/share.json");

export default function OnboardingReferScreen() {
  const theme = useTheme();
  const { setReferralShared } = useOnboarding();
  const footerSpace = theme.spacing[12] + theme.spacing[8];

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out CLTR - transform your scrolling time into learning time!",
        title: "Share CLTR",
      });
      setReferralShared(true);
    } catch (error) {
      console.error("Error sharing:", error);
    }
    router.push({
      pathname: "/auth/signup",
      params: { fromOnboarding: "true" },
    });
  };

  const handleSkip = () => {
    router.push({
      pathname: "/auth/signup",
      params: { fromOnboarding: "true" },
    });
  };

  return (
    <>
      <StatusBar />
      <Box flex bg="primary">
        <SafeAreaView edges={["top"]} bg="primary" flex={false}>
          <OnboardingHeader currentStep={4} totalSteps={5} />
        </SafeAreaView>

        <Box flex style={{ paddingBottom: footerSpace }}>
          <Box px={4} py={8} gap={8} flex>
            <Box gap={4} flex>
              <Box
                width="100%"
                height={200}
                center
                style={{ maxWidth: 400 }}
              >
                <LottieAnimation
                  source={shareAnimation}
                  autoPlay
                  loop
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>

              <Text size="xl" weight="bold" style={{ textAlign: "center" }}>
                Invite a friend
              </Text>
              <Text
                variant="secondary"
                size="md"
                style={{ maxWidth: "80%", alignSelf: "center", textAlign: "center" }}
              >
                Share a free trial with someone who wants to learn. Learning is better together!
              </Text>
            </Box>
          </Box>
        </Box>

        <OnboardingFooter>
          <Box gap={3}>
            <Pressable onPress={handleShare} bg="primary" borderRadius="xl" py={4} center>
              <Text size="md" weight="semibold" color={theme.colors.text.white}>
                Share invite
              </Text>
            </Pressable>

            <Pressable onPress={handleSkip} bg="surface" border borderRadius="xl" py={4} center>
              <Text size="md" weight="medium">
                Skip
              </Text>
            </Pressable>
          </Box>
        </OnboardingFooter>
      </Box>
    </>
  );
}

