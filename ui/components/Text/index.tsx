import { Text as RNText, TextProps, TextStyle } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { spacing, typography } from "../../../theme/tokens";

type SizeKey = keyof typeof typography.size;
type WeightKey = keyof typeof typography.weight;
type LineHeightKey = keyof typeof typography.lineHeight;
type SpacingKey = keyof typeof spacing;

interface TextComponentProps extends Omit<TextProps, "style"> {
  variant?: "primary" | "secondary" | "muted" | "brand";
  size?: SizeKey;
  weight?: WeightKey;
  color?: string;
  lineHeight?: LineHeightKey | number;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  letterSpacing?: number;
  mb?: SpacingKey;
  style?: TextStyle;
}

export const Text = ({
  variant = "primary",
  size,
  weight,
  color,
  lineHeight,
  textTransform,
  letterSpacing,
  mb,
  style,
  children,
  ...props
}: TextComponentProps) => {
  const theme = useTheme();

  const getColor = () => {
    if (color) return color;
    if (variant === "brand") return theme.colors.brand.primary;
    return theme.colors.text[variant];
  };

  const getLineHeight = () => {
    if (lineHeight !== undefined) {
      if (typeof lineHeight === "number") return lineHeight;
      return theme.typography.lineHeight[lineHeight];
    }
    if (size) {
      return theme.typography.lineHeight[
        size === "xs" || size === "sm" ? "sm" : size === "lg" || size === "xl" || size === "2xl" ? "lg" : "md"
      ];
    }
    return undefined;
  };

  const computedStyle: TextStyle = {
    color: getColor(),
    ...(size && { fontSize: theme.typography.size[size] }),
    ...(weight && { fontWeight: theme.typography.weight[weight] }),
    ...(getLineHeight() !== undefined && { lineHeight: getLineHeight() }),
    ...(textTransform && { textTransform }),
    ...(letterSpacing !== undefined && { letterSpacing }),
    ...(mb !== undefined && { marginBottom: theme.spacing[mb] }),
    ...style,
  };

  return (
    <RNText style={computedStyle} {...props}>
      {children}
    </RNText>
  );
};

