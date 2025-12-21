import { Box } from "../../../ui/components/Box";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { AccountSection } from "../../../ui/pages/profile/components/AccountSection";
import { LogOutSection } from "../../../ui/pages/profile/components/LogOutSection";
import { PreferencesSection } from "../../../ui/pages/profile/components/PreferencesSection";
import { ProfileHeader } from "../../../ui/pages/profile/components/ProfileHeader";
import { SupportLegalSection } from "../../../ui/pages/profile/components/SupportLegalSection";
import { VersionFooter } from "../../../ui/pages/profile/components/VersionFooter";

export default function ProfileScreen() {
  return (
    <>
      <StatusBar />
      <SafeAreaView bg="primary" flex>
        <ProfileHeader />

        <ScrollView px={4} pb={6}>
          <Box gap={4} mt={2}>
            <AccountSection />
            <PreferencesSection />
            <SupportLegalSection />
            <LogOutSection />
            <VersionFooter />
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
