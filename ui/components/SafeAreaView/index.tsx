import { SafeAreaView as RNSafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import { useTheme } from "../../../theme/ThemeProvider";

interface SafeAreaViewComponentProps extends Omit<SafeAreaViewProps, "style"> {
  bg?: "primary" | "surface" | "surfaceLight";
  flex?: boolean;
}

export const SafeAreaView = ({ bg = "primary", flex = true, children, ...props }: SafeAreaViewComponentProps) => {
  const theme = useTheme();

  return (
    <RNSafeAreaView style={{
      flex: flex ? 1 : undefined,
      backgroundColor: theme.colors.bg[bg],
    }} {...props}>
      {children}
    </RNSafeAreaView>
  );
};

