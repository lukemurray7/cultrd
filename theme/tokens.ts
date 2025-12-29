export const colorSchemes = {
  dark: {
    bg: {
      primary: "hsl(264, 0%, 10%)",
      surface: "hsl(264, 0%, 20%)",
      surfaceLight: "hsl(264, 0%, 30%)",
      inverseSurface: "hsl(264, 20%, 95%)",
      inverseSurfaceLight: "hsl(264, 0%, 96%)",
      inverseSurfaceLighter: "hsl(264, 0%, 100%)",
    },
    text: {
      primary: "hsl(264, 0%, 96%)",
      secondary: "hsl(264, 0%, 82%)",
      muted: "hsl(264, 0%, 70%)",
      white: "#FFFFFF",
      black: "#000000",
      inversePrimary: "#1a1a1a",
    },
    brand: {
      primary: "#80A4ED",
      accent: "#FCD34D",
      danger: "#E83F6F",
      success: "#22C55E",
    },
    topics: {
      history: "#F97316",
      economics: "#FCD34D",
      philosophy: "#8B5CF6",
      culture: "#EC4899",
      music: "#3B82F6",
      politics: "#EF4444",
      science: "#10B981",
    },
    border: "rgba(255,255,255,0.10)",
  },
  light: {
    bg: {
      primary: "hsl(264, 20%, 95%)",
      surface: "hsl(264, 0%, 96%)",
      surfaceLight: "hsl(264, 0%, 100%)",
      inverseSurface: "hsl(264, 0%, 10%)",
      inverseSurfaceLight: "hsl(264, 0%, 20%)",
      inverseSurfaceLighter: "hsl(264, 0%, 30%)",
    },
    text: {
      primary: "hsl(264, 0%, 10%)",
      secondary: "hsl(264, 0%, 20%)",
      muted: "hsl(264, 0%, 50%)",
      white: "#FFFFFF",
      black: "#000000",
      inversePrimary: "hsl(264, 0%, 100%)",
    },
    brand: {
      primary: "#6369D1",
      accent: "#FCD34D",
      danger: "#E83F6F",
      success: "#22C55E",
    },
    topics: {
      history: "#F97316",
      economics: "#FCD34D",
      philosophy: "#8B5CF6",
      culture: "#EC4899",
      music: "#3B82F6",
      politics: "#EF4444",
      science: "#10B981",
    },
    border: "rgba(0,0,0,0.10)",
  },
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
    regular: "FunnelSans-Regular",
    medium: "FunnelSans-Medium",
    semibold: "FunnelSans-SemiBold",
    bold: "FunnelSans-Bold",
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

export type ColorScheme = keyof typeof colorSchemes;

export const createTheme = (mode: ColorScheme = "light") => ({
  colors: colorSchemes[mode],
  spacing,
  radii,
  typography,
} as const);

export const theme = createTheme("light");
export type Theme = ReturnType<typeof createTheme>;
