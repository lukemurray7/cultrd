import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  showBack?: boolean;
  showProgress?: boolean;
}

export const OnboardingHeader = ({
  currentStep,
  totalSteps,
  showBack = true,
  showProgress = true,
}: OnboardingHeaderProps) => {
  const router = useRouter();
  const theme = useTheme();

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <Box px={4} pt={4} pb={3} bg="primary">
      <Box row center gap={3}>
        {showBack ? (
          <Pressable
            onPress={() => router.back()}
            bg="surfaceLight"
            borderRadius="pill"
            border
            center
            shadow="sm"
            width={40}
            height={40}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={theme.colors.text.primary}
            />
          </Pressable>
        ) : null}
        {showProgress ? (
          <Box flex height={4} bg="surfaceLight" borderRadius="pill" overflow="hidden">
            <Box
              height="100%"
              bg="brand.primary"
              borderRadius="pill"
              style={{ width: `${progressPercentage}%` }}
            />
          </Box>
        ) : (
          <Box flex />
        )}
      </Box>
    </Box>
  );
};

