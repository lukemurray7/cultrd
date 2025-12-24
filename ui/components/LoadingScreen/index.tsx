import { ActivityIndicator } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../Box";
import { SafeAreaView } from "../SafeAreaView";
import { StatusBar } from "../StatusBar";

export const LoadingScreen = () => {
  const theme = useTheme();

  return (
    <>
      <StatusBar />
      <SafeAreaView bg="primary" flex center>
        <ActivityIndicator size="large" color={theme.colors.brand.primary} />
      </SafeAreaView>
    </>
  );
};

