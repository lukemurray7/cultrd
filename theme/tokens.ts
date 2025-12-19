export const colors = {
  bg: {
    canvas: "#0B0C10",
    surface: "#12131A",
    surface2: "#1A1C25",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255,255,255,0.78)",
    muted: "rgba(255,255,255,0.55)",
  },   
  brand: {
    primary: "#6369D1",
    accent: "#FCD34D",
    danger: "#E83F6F",
    success: "#22C55E",
  },
  border: "rgba(255,255,255,0.10)",
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  fontFamily: {
    regular: "System",
    medium: "System",
    semibold: "System",
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    "2xl": 28,
  },
  lineHeight: {
    sm: 18,
    md: 22,
    lg: 26,
    xl: 30,
  },
  weight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
} as const;

export const theme = { colors, spacing, radii, typography } as const;
export type Theme = typeof theme;
