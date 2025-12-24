import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Box } from "../../../ui/components/Box";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { useTheme } from "../../../theme/ThemeProvider";
import { useOnboarding } from "../../../lib/onboarding/OnboardingContext";
import { useUpdateProfile } from "../../../lib/mutations/profiles";
import { MaterialIcons } from "@expo/vector-icons";

export default function OnboardingCompleteScreen() {
  const theme = useTheme();
  const { draft, reset } = useOnboarding();
  const updateProfile = useUpdateProfile();
  const hasPersisted = useRef(false);

  useEffect(() => {
    if (hasPersisted.current) return;
    hasPersisted.current = true;

    const persistOnboarding = async () => {
      try {
        await updateProfile.mutateAsync({
          topic_ids: draft.topicIds,
          notifications_preference: draft.notificationsPreference,
          referral_shared: draft.referralShared,
          onboarding_completed: true,
        });
        reset();
        router.replace("/(tabs)/home");
      } catch (error) {
        console.error("Error persisting onboarding:", error);
        router.replace("/(tabs)/home");
      }
    };

    persistOnboarding();
  }, [draft.topicIds, draft.notificationsPreference, draft.referralShared, updateProfile, reset]);

  return (
    <>
      <StatusBar />
      <SafeAreaView edges={["top", "bottom"]} bg="primary" flex>
        <ScrollView flex showsVerticalScrollIndicator={false}>
          <Box px={4} py={12} gap={8} flex center>
            <Box
              width={100}
              height={100}
              borderRadius="pill"
              bg="brand.success"
              center
            >
              <MaterialIcons
                name="check-circle"
                size={60}
                color={theme.colors.text.white}
              />
            </Box>

            <Box gap={2} center>
              <Text size="xl" weight="bold" style={{ textAlign: "center" }}>
                You're all set!
              </Text>
              <Text
                variant="secondary"
                size="md"
                style={{ textAlign: "center", maxWidth: "80%" }}
              >
                Start learning and build your knowledge streak.
              </Text>
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

