import { SafeAreaView as RNSafeAreaView, SafeAreaViewProps, ViewStyle } from "react-native-safe-area-context";
import { useTheme } from "../../../theme/ThemeProvider";

interface SafeAreaViewComponentProps extends Omit<SafeAreaViewProps, "style"> {
  bg?: "canvas" | "surface" | "surface2";
  flex?: boolean;
  style?: ViewStyle;
}

export const SafeAreaView = ({ bg = "canvas", flex = true, style, children, ...props }: SafeAreaViewComponentProps) => {
  const theme = useTheme();

  const computedStyle: ViewStyle = {
    flex: flex ? 1 : undefined,
    backgroundColor: theme.colors.bg[bg],
    ...style,
  };

  return (
    <RNSafeAreaView style={computedStyle} {...props}>
      {children}
    </RNSafeAreaView>
  );
};

