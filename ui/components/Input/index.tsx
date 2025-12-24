import { TextInput, TextInputProps, TextStyle } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { radii, spacing, typography } from "../../../theme/tokens";
import { Box } from "../Box";
import { Text } from "../Text";

type SpacingKey = keyof typeof spacing;
type RadiiKey = keyof typeof radii;
type SizeKey = keyof typeof typography.size;
type WeightKey = keyof typeof typography.weight;

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
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
  bg?: "primary" | "surface" | "surfaceLight" | string;
  border?: boolean;
  borderTop?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
  borderRadius?: RadiiKey;
  color?: "primary" | "secondary" | "muted" | string;
  size?: SizeKey;
  weight?: WeightKey;
  height?: number;
  style?: TextStyle;
}

export const Input = ({
  label,
  error,
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
  bg,
  border,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
  borderRadius,
  color,
  size,
  weight,
  height,
  style,
  ...props
}: InputProps) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    if (!bg) return theme.colors.bg.surfaceLight;
    if (bg === "primary" || bg === "surface" || bg === "surfaceLight") {
      return theme.colors.bg[bg];
    }
    if (bg === "brand.primary") return theme.colors.brand.primary;
    if (bg === "brand.accent") return theme.colors.brand.accent;
    if (bg === "brand.danger") return theme.colors.brand.danger;
    if (bg === "brand.success") return theme.colors.brand.success;
    return bg;
  };

  const getTextColor = () => {
    if (color === "primary" || color === "secondary" || color === "muted") {
      return theme.colors.text[color];
    }
    if (color) return color;
    return theme.colors.text.primary;
  };

  const getBorderWidth = () => {
    if (border) return 1;
    if (borderTop || borderBottom || borderLeft || borderRight) return 0;
    return 1;
  };

  const computedStyle: TextStyle = {
    height: height ?? 48,
    backgroundColor: getBackgroundColor(),
    borderColor: error ? theme.colors.brand.danger : theme.colors.border,
    borderWidth: getBorderWidth(),
    ...(borderTop && { borderTopWidth: 1 }),
    ...(borderBottom && { borderBottomWidth: 1 }),
    ...(borderLeft && { borderLeftWidth: 1 }),
    ...(borderRight && { borderRightWidth: 1 }),
    ...(borderRadius && { borderRadius: theme.radii[borderRadius] }),
    ...(!borderRadius && { borderRadius: theme.radii.md }),
    ...(p !== undefined && { padding: theme.spacing[p] }),
    ...(px !== undefined && { paddingHorizontal: theme.spacing[px] }),
    ...(py !== undefined && { paddingVertical: theme.spacing[py] }),
    ...(pt !== undefined && { paddingTop: theme.spacing[pt] }),
    ...(pb !== undefined && { paddingBottom: theme.spacing[pb] }),
    ...(pl !== undefined && { paddingLeft: theme.spacing[pl] }),
    ...(pr !== undefined && { paddingRight: theme.spacing[pr] }),
    ...(p === undefined && px === undefined && pl === undefined && pr === undefined && { paddingHorizontal: theme.spacing[4] }),
    ...(m !== undefined && { margin: theme.spacing[m] }),
    ...(mx !== undefined && { marginHorizontal: theme.spacing[mx] }),
    ...(my !== undefined && { marginVertical: theme.spacing[my] }),
    ...(mt !== undefined && { marginTop: theme.spacing[mt] }),
    ...(mb !== undefined && { marginBottom: theme.spacing[mb] }),
    ...(ml !== undefined && { marginLeft: theme.spacing[ml] }),
    ...(mr !== undefined && { marginRight: theme.spacing[mr] }),
    color: getTextColor(),
    ...(size && { fontSize: theme.typography.size[size] }),
    ...(!size && { fontSize: theme.typography.size.md }),
    ...(weight && { fontWeight: theme.typography.weight[weight] }),
    ...(!weight && { fontFamily: theme.typography.fontFamily.regular }),
    ...style,
  };

  return (
    <Box>
      {label && (
        <Text size="sm" weight="medium" mb={1}>
          {label}
        </Text>
      )}
      <TextInput
        style={computedStyle}
        placeholderTextColor={theme.colors.text.muted}
        {...props}
      />
      {error && (
        <Box mt={1}>
          <Text size="xs" color={theme.colors.brand.danger}>
            {error}
          </Text>
        </Box>
      )}
    </Box>
  );
};

