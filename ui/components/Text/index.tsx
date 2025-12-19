import { Text as RNText, TextProps, TextStyle } from "react-native";
import { typography } from "../../../theme/tokens";
import { useTheme } from "../../../theme/ThemeProvider";

type SizeKey = keyof typeof typography.size;
type WeightKey = keyof typeof typography.weight;

interface TextComponentProps extends Omit<TextProps, "style"> {
  variant?: "primary" | "secondary" | "muted" | "brand";
  size?: SizeKey;
  weight?: WeightKey;
  color?: string;
  style?: TextStyle;
}

export const Text = ({
  variant = "primary",
  size,
  weight,
  color,
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

  const computedStyle: TextStyle = {
    color: getColor(),
    ...(size && { fontSize: theme.typography.size[size] }),
    ...(weight && { fontWeight: theme.typography.weight[weight] }),
    ...(size && {
      lineHeight: theme.typography.lineHeight[
        size === "xs" || size === "sm" ? "sm" : size === "lg" || size === "xl" || size === "2xl" ? "lg" : "md"
      ],
    }),
    ...style,
  };

  return (
    <RNText style={computedStyle} {...props}>
      {children}
    </RNText>
  );
};

