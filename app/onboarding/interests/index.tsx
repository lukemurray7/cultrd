import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image } from "react-native";
import { topics } from "../../../constants/topics";
import { useOnboarding } from "../../../lib/onboarding/OnboardingContext";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../../../ui/components/Box";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
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
    if (selectedIds.length < 1) return;
    setTopicIds(selectedIds);
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
          <Box px={4} py={8} gap={6} bg="surface" border borderRadius="xl" p={4} mx={2}>
            <Box gap={2}>
              <Text size="xl" weight="bold" style={{ textAlign: "center" }}>
                What interests you?
              </Text>
              <Text variant="secondary" size="sm" style={{ textAlign: "center" }}>
                Select topics that interest you
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
                    bg={"surfaceLight"}
                    border
                    borderRadius="xl"
                    px={4}
                    py={2}
                    row
                    gap={3}
                    center
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
                    <Box
                      width={24}
                      height={24}
                      borderRadius="sm"
                      border
                      center
                      style={{
                        borderColor: isSelected ? topicColor : theme.colors.border,
                        backgroundColor: isSelected ? topicColor : "transparent",
                      }}
                    >
                      {isSelected && (
                        <MaterialIcons name="check" size={16} color={theme.colors.text.white} />
                      )}
                    </Box>
                  </Pressable>
                );
              })}
            </Box>
          </Box>
        </ScrollView>

        <OnboardingFooter>
          <Pressable
            onPress={handleContinue}
            disabled={selectedIds.length < 1}
            bg="primary"
            borderRadius="xl"
            py={4}
            center
            style={{ opacity: selectedIds.length < 1 ? 0.5 : 1 }}
          >
            <Text size="md" weight="semibold" color={theme.colors.text.white}>
              Continue {selectedIds.length > 0 && `(${selectedIds.length})`}
            </Text>
          </Pressable>
        </OnboardingFooter>
      </Box>
    </>
  );
}

