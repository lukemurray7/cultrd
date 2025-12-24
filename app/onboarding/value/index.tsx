import { router } from "expo-router";
import { Box } from "../../../ui/components/Box";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { useTheme } from "../../../theme/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { OnboardingFooter } from "../../../ui/pages/onboarding/components/OnboardingFooter";
import { OnboardingHeader } from "../../../ui/pages/onboarding/components/OnboardingHeader";

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
                Why CLTR?
              </Text>

              <Box gap={4} mt={4}>
                <Box row gap={3} p={4} bg="surface" border borderRadius="md">
                  <Box width={48} height={48} borderRadius="pill" bg="brand.primary" center>
                    <MaterialIcons name="schedule" size={24} color={theme.colors.text.white} />
                  </Box>
                  <Box flex gap={1}>
                    <Text size="lg" weight="semibold">
                      Micro-learning
                    </Text>
                    <Text variant="secondary" size="sm">
                      5-10 minute lessons that fit into your day. No need to block hours.
                    </Text>
                  </Box>
                </Box>

                <Box row gap={3} p={4} bg="surface" border borderRadius="md">
                  <Box width={48} height={48} borderRadius="pill" bg="brand.success" center>
                    <MaterialIcons name="stop-screen-share" size={24} color={theme.colors.text.white} />
                  </Box>
                  <Box flex gap={1}>
                    <Text size="lg" weight="semibold">
                      Stop scrolling
                    </Text>
                    <Text variant="secondary" size="sm">
                      Replace mindless scrolling with meaningful learning. Build knowledge instead of wasting time.
                    </Text>
                  </Box>
                </Box>

                <Box row gap={3} p={4} bg="surface" border borderRadius="md">
                  <Box width={48} height={48} borderRadius="pill" bg="brand.accent" center>
                    <MaterialIcons name="local-fire-department" size={24} color={theme.colors.text.white} />
                  </Box>
                  <Box flex gap={1}>
                    <Text size="lg" weight="semibold">
                      Build your streak
                    </Text>
                    <Text variant="secondary" size="sm">
                      Daily learning creates lasting habits. Track your progress and stay motivated.
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>

        <OnboardingFooter>
          <Pressable
            onPress={() => router.push("/onboarding/interests")}
            bg="primary"
            borderRadius="md"
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

