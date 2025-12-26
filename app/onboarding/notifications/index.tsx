import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useState } from "react";
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

const notificationsAnimation = require("../../../assets/animations/notifications.json");

export default function OnboardingNotificationsScreen() {
  const theme = useTheme();
  const { setNotificationsPreference } = useOnboarding();
  const [isRequesting, setIsRequesting] = useState(false);
  const footerSpace = theme.spacing[12] + theme.spacing[8];

  const handleEnableNotifications = async () => {
    setIsRequesting(true);
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      setNotificationsPreference(status === "granted" ? "enabled" : "skipped");
    } catch (error) {
      console.error("Error requesting notifications:", error);
      setNotificationsPreference("skipped");
    } finally {
      setIsRequesting(false);
      router.push("/onboarding/refer");
    }
  };

  const handleSkip = () => {
    setNotificationsPreference("skipped");
    router.push("/onboarding/refer");
  };

  return (
    <>
      <StatusBar />
      <Box flex bg="primary">
        <SafeAreaView edges={["top"]} bg="primary" flex={false}>
          <OnboardingHeader currentStep={3} totalSteps={5} />
        </SafeAreaView>

        <Box flex>
          <Box px={4} gap={8} flex>
            <Box gap={4} flex>
              <Box
                width="100%"
                height={300}
                center
                style={{ maxWidth: 400 }}
              >
                <LottieAnimation
                  source={notificationsAnimation}
                  autoPlay
                  loop
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>

              <Text size="xl" weight="bold" style={{ textAlign: "center" }}>
                Stay on track
              </Text>
              <Text
                variant="secondary"
                size="md"
                style={{ textAlign: "center", maxWidth: "80%", alignSelf: "center" }}
              >
                Get daily reminders to protect your learning streak. We&apos;ll only send you helpful updates.
              </Text>
            </Box>
          </Box>
        </Box>

        <OnboardingFooter>
          <Box gap={3}>
            <Pressable
              onPress={handleEnableNotifications}
              disabled={isRequesting}
              bg="primary"
              borderRadius="xl"
              py={4}
              center
            >
              <Text size="md" weight="semibold" color={theme.colors.text.white}>
                {isRequesting ? "Requesting..." : "Enable notifications"}
              </Text>
            </Pressable>

            <Pressable onPress={handleSkip} bg="surface" border borderRadius="xl" py={4} center>
              <Text size="md" weight="medium">
                Not now
              </Text>
            </Pressable>
          </Box>
        </OnboardingFooter>
      </Box>
    </>
  );
}

