import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Share } from "react-native";
import { useOnboarding } from "../../../lib/onboarding/OnboardingContext";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../../../ui/components/Box";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { OnboardingFooter } from "../../../ui/pages/onboarding/components/OnboardingFooter";
import { OnboardingHeader } from "../../../ui/pages/onboarding/components/OnboardingHeader";

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
    router.push("/onboarding/create-account");
  };

  const handleSkip = () => {
    router.push("/onboarding/create-account");
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
            <Box gap={4} center flex>
              <Box width={80} height={80} borderRadius="pill" bg="brand.accent" center>
                <MaterialIcons name="people" size={40} color={theme.colors.text.white} />
              </Box>

              <Text size="xl" weight="bold" style={{ textAlign: "center" }}>
                Invite a friend
              </Text>
              <Text
                variant="secondary"
                size="md"
                style={{ textAlign: "center", maxWidth: "80%" }}
              >
                Share CLTR with someone who wants to learn. Learning is better together!
              </Text>
            </Box>
          </Box>
        </Box>

        <OnboardingFooter>
          <Box gap={3}>
            <Pressable onPress={handleShare} bg="primary" borderRadius="md" py={4} center>
              <Text size="md" weight="semibold" color={theme.colors.text.white}>
                Share invite
              </Text>
            </Pressable>

            <Pressable onPress={handleSkip} bg="surface" border borderRadius="md" py={4} center>
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

