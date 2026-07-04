import { createContext, useState, useEffect, useCallback } from "react";
import { defaultTheme } from "../styles/themes";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("funky-theme") || defaultTheme;
  });
  const [chaosMode, setChaosMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("funky-theme", theme);
  }, [theme]);

  const toggleChaos = useCallback(() => {
    setChaosMode((prev) => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, chaosMode, toggleChaos }}>
      {children}
    </ThemeContext.Provider>
  );
}
