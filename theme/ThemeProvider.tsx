import React, { createContext, useContext } from "react";
import { theme, type Theme } from "./tokens";

const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
