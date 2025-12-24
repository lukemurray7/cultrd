import { router } from "expo-router";
import { useState } from "react";
import { Image } from "react-native";
import { Box } from "../../../ui/components/Box";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { useTheme } from "../../../theme/ThemeProvider";
import { useOnboarding } from "../../../lib/onboarding/OnboardingContext";
import { topics } from "../../../types/topics";
import { OnboardingFooter } from "../../../ui/pages/onboarding/components/OnboardingFooter";
import { OnboardingHeader } from "../../../ui/pages/onboarding/components/OnboardingHeader";

export default function OnboardingInterestsScreen() {
  const theme = useTheme();
  const { draft, setTopicIds } = useOnboarding();
  const [selectedIds, setSelectedIds] = useState<string[]>(draft.topicIds);
  const footerSpace = theme.spacing[12] + theme.spacing[8];

  const toggleTopic = (topicId: string) => {
    if (selectedIds.includes(topicId)) {
      setSelectedIds(selectedIds.filter((id) => id !== topicId));
    } else {
      setSelectedIds([...selectedIds, topicId]);
    }
  };

  const handleContinue = () => {
    if (selectedIds.length < 3) return;
    setTopicIds(selectedIds);
    router.push("/onboarding/notifications");
  };

  const handleSurpriseMe = () => {
    const shuffled = [...topics].sort(() => Math.random() - 0.5);
    const randomSelection = shuffled.slice(0, 3).map((t) => t.id);
    setSelectedIds(randomSelection);
    setTopicIds(randomSelection);
    router.push("/onboarding/notifications");
  };

  return (
    <>
      <StatusBar />
      <Box flex bg="primary">
        <SafeAreaView edges={["top"]} bg="primary" flex={false}>
          <OnboardingHeader currentStep={2} totalSteps={5} />
        </SafeAreaView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: footerSpace }}
        >
          <Box px={4} py={8} gap={6}>
            <Box gap={2}>
              <Text size="xl" weight="bold" style={{ textAlign: "center" }}>
                What interests you?
              </Text>
              <Text variant="secondary" size="sm" style={{ textAlign: "center" }}>
                Pick at least 3 topics to personalize your learning experience
              </Text>
            </Box>

            <Box gap={3} mt={4}>
              {topics.map((topic) => {
                const isSelected = selectedIds.includes(topic.id);
                const topicColor = theme.colors.topics[topic.colorKey];

                return (
                  <Pressable
                    key={topic.id}
                    onPress={() => toggleTopic(topic.id)}
                    bg={isSelected ? "surface" : "surfaceLight"}
                    border
                    borderRadius="md"
                    p={3}
                    row
                    gap={3}
                    style={{
                      borderWidth: isSelected ? 2 : 1,
                      borderColor: isSelected ? topicColor : theme.colors.border,
                    }}
                  >
                    <Box
                      width={48}
                      height={48}
                      borderRadius="md"
                      overflow="hidden"
                      style={{ backgroundColor: topicColor }}
                    >
                      <Image
                        source={topic.image}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </Box>
                    <Box flex center>
                      <Text size="md" weight={isSelected ? "semibold" : "medium"}>
                        {topic.label}
                      </Text>
                    </Box>
                    {isSelected && (
                      <Box width={24} height={24} borderRadius="pill" bg="brand.success" center>
                        <Text size="xs" color={theme.colors.text.white}>
                          ✓
                        </Text>
                      </Box>
                    )}
                  </Pressable>
                );
              })}
            </Box>
          </Box>
        </ScrollView>

        <OnboardingFooter>
          <Box gap={3}>
            <Pressable
              onPress={handleContinue}
              disabled={selectedIds.length < 3}
              bg="primary"
              borderRadius="md"
              py={4}
              center
              style={{ opacity: selectedIds.length < 3 ? 0.5 : 1 }}
            >
              <Text size="md" weight="semibold" color={theme.colors.text.white}>
                Continue {selectedIds.length > 0 && `(${selectedIds.length})`}
              </Text>
            </Pressable>

            <Pressable onPress={handleSurpriseMe} bg="surface" border borderRadius="md" py={4} center>
              <Text size="md" weight="medium">
                Surprise me
              </Text>
            </Pressable>
          </Box>
        </OnboardingFooter>
      </Box>
    </>
  );
}

