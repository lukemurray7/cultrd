import { ViewStyle } from "react-native";

export type ShadowLevel = "sm" | "md" | "lg";

export const getShadowStyle = (
  shadow: boolean | ShadowLevel | undefined
): ViewStyle | null => {
  if (!shadow) return null;

  const shadowLevel = shadow === true ? "md" : shadow;

  const shadowStyles: Record<ShadowLevel, ViewStyle> = {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  };

  return shadowStyles[shadowLevel];
};

