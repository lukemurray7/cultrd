import { StatusBar as RNStatusBar, StatusBarProps } from "react-native";
import { useThemeMode } from "../../../theme/ThemeProvider";

interface StatusBarComponentProps extends Omit<StatusBarProps, "barStyle"> {
  barStyle?: "light-content" | "dark-content" | "default";
}

export const StatusBar = ({ barStyle, ...props }: StatusBarComponentProps) => {
  const { colorScheme } = useThemeMode();

  const computedBarStyle =
    barStyle || (colorScheme === "dark" ? "light-content" : "dark-content");

  return <RNStatusBar barStyle={computedBarStyle} {...props} />;
};

