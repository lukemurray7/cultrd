import { Alert } from "react-native";
import { useSignOut } from "../../../../../lib/mutations/auth";
import { Box } from "../../../../components/Box";
import { SettingsRow } from "../SettingsRow";

export const LogOutSection = () => {
  const signOut = useSignOut();

  const handleLogOut = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut.mutateAsync();
            } catch (error: unknown) {
              const errorMessage = error instanceof Error ? error.message : "Failed to log out";
              Alert.alert("Error", errorMessage);
            }
          },
        },
      ]
    );
  };

  return (
    <Box gap={2} mt={2}>
      <Box bg="surface" border borderRadius="md" shadow="sm" p={2}>
        <SettingsRow
          icon="exit-to-app"
          iconColor="#EF4444"
          title="Log Out"
          danger={true}
          onPress={handleLogOut}
        />
      </Box>
    </Box>
  );
};

