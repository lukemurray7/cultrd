import { ScrollView as RNScrollView, ScrollViewProps, ViewStyle } from "react-native";
import { spacing } from "../../../theme/tokens";
import { useTheme } from "../../../theme/ThemeProvider";

type SpacingKey = keyof typeof spacing;

interface ScrollViewComponentProps extends Omit<ScrollViewProps, "style" | "contentContainerStyle"> {
  p?: SpacingKey;
  px?: SpacingKey;
  py?: SpacingKey;
  pt?: SpacingKey;
  pb?: SpacingKey;
  pl?: SpacingKey;
  pr?: SpacingKey;
  m?: SpacingKey;
  mx?: SpacingKey;
  my?: SpacingKey;
  mt?: SpacingKey;
  mb?: SpacingKey;
  ml?: SpacingKey;
  mr?: SpacingKey;
  gap?: SpacingKey;
  bg?: "canvas" | "surface" | "surface2";
  flex?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const ScrollView = ({
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  gap,
  bg,
  flex,
  style,
  contentContainerStyle,
  children,
  ...props
}: ScrollViewComponentProps) => {
  const theme = useTheme();

  const computedStyle: ViewStyle = {
    ...(flex && { flex: 1 }),
    ...(bg && { backgroundColor: theme.colors.bg[bg] }),
    ...(m !== undefined && { margin: theme.spacing[m] }),
    ...(mx !== undefined && { marginHorizontal: theme.spacing[mx] }),
    ...(my !== undefined && { marginVertical: theme.spacing[my] }),
    ...(mt !== undefined && { marginTop: theme.spacing[mt] }),
    ...(mb !== undefined && { marginBottom: theme.spacing[mb] }),
    ...(ml !== undefined && { marginLeft: theme.spacing[ml] }),
    ...(mr !== undefined && { marginRight: theme.spacing[mr] }),
    ...style,
  };

  const computedContentStyle: ViewStyle = {
    ...(p !== undefined && { padding: theme.spacing[p] }),
    ...(px !== undefined && { paddingHorizontal: theme.spacing[px] }),
    ...(py !== undefined && { paddingVertical: theme.spacing[py] }),
    ...(pt !== undefined && { paddingTop: theme.spacing[pt] }),
    ...(pb !== undefined && { paddingBottom: theme.spacing[pb] }),
    ...(pl !== undefined && { paddingLeft: theme.spacing[pl] }),
    ...(pr !== undefined && { paddingRight: theme.spacing[pr] }),
    ...(gap !== undefined && { gap: theme.spacing[gap] }),
    ...contentContainerStyle,
  };

  return (
    <RNScrollView style={computedStyle} contentContainerStyle={computedContentStyle} {...props}>
      {children}
    </RNScrollView>
  );
};

