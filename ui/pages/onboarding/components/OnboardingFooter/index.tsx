import { ReactNode } from "react";
import { Box } from "../../../../components/Box";
import { SafeAreaView } from "../../../../components/SafeAreaView";

interface OnboardingFooterProps {
  children: ReactNode;
}

export const OnboardingFooter = ({ children }: OnboardingFooterProps) => {
  return (
    <Box position="absolute" bottom={0} left={0} right={0} bg="primary" borderTop>
      <SafeAreaView edges={["bottom"]} bg="primary" flex={false}>
        <Box px={4} py={4}>
          {children}
        </Box>
      </SafeAreaView>
    </Box>
  );
};


