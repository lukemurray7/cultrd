import { PressableProps, Pressable as RNPressable, ViewStyle } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { radii, spacing } from "../../../theme/tokens";

type SpacingKey = keyof typeof spacing;
type RadiiKey = keyof typeof radii;

interface PressableComponentProps extends Omit<PressableProps, "style"> {
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
  bg?: "canvas" | "surface" | "surface2" | "primary" | "accent" | "success" | "danger";
  border?: boolean;
  borderRadius?: RadiiKey;
  flex?: boolean;
  row?: boolean;
  center?: boolean;
  between?: boolean;
  style?: ViewStyle;
}

export const Pressable = ({
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
  border,
  borderRadius,
  flex,
  row,
  center,
  between,
  style,
  children,
  ...props
}: PressableComponentProps) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    if (!bg) return undefined;
    if (bg === "primary") return theme.colors.brand.primary;
    if (bg === "accent") return theme.colors.brand.accent;
    if (bg === "success") return theme.colors.brand.success;
    if (bg === "danger") return theme.colors.brand.danger;
    return theme.colors.bg[bg];
  };

  const computedStyle: ViewStyle = {
    ...(p !== undefined && { padding: theme.spacing[p] }),
    ...(px !== undefined && { paddingHorizontal: theme.spacing[px] }),
    ...(py !== undefined && { paddingVertical: theme.spacing[py] }),
    ...(pt !== undefined && { paddingTop: theme.spacing[pt] }),
    ...(pb !== undefined && { paddingBottom: theme.spacing[pb] }),
    ...(pl !== undefined && { paddingLeft: theme.spacing[pl] }),
    ...(pr !== undefined && { paddingRight: theme.spacing[pr] }),
    ...(m !== undefined && { margin: theme.spacing[m] }),
    ...(mx !== undefined && { marginHorizontal: theme.spacing[mx] }),
    ...(my !== undefined && { marginVertical: theme.spacing[my] }),
    ...(mt !== undefined && { marginTop: theme.spacing[mt] }),
    ...(mb !== undefined && { marginBottom: theme.spacing[mb] }),
    ...(ml !== undefined && { marginLeft: theme.spacing[ml] }),
    ...(mr !== undefined && { marginRight: theme.spacing[mr] }),
    ...(gap !== undefined && { gap: theme.spacing[gap] }),
    ...(bg && { backgroundColor: getBackgroundColor() }),
    ...(border && {
      borderWidth: 1,
      borderColor: theme.colors.border,
    }),
    ...(borderRadius && { borderRadius: theme.radii[borderRadius] }),
    ...(flex && { flex: 1 }),
    ...(row && { flexDirection: "row" }),
    ...(center && { alignItems: "center", justifyContent: "center" }),
    ...(between && { justifyContent: "space-between" }),
    ...style,
  };

  return (
    <RNPressable style={computedStyle} {...props}>
      {children}
    </RNPressable>
  );
};

