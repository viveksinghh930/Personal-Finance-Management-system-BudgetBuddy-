import { createContext, useContext, useEffect, useState } from "react";

export const darkThemeColor = 'dark:bg-gray-700 dark:text-gray-300';


const initialState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem(storageKey, theme); // ✅ Fix: Save theme properly
  }, [theme]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};




export const HandleMessageUISuccess = () => {
  const isDark = document.documentElement.classList.contains('dark');
  return {
    duration: 4000,
    icon: "✅",
    position: "bottom-right",
    style: { 
      backgroundColor: isDark ? "#1F2937" : "#257c8a", 
      color: "#fff",
      border: isDark ? "1px solid #374151" : "none"
    }
  };
};

export const HandleMessageUIError = () => {
  const isDark = document.documentElement.classList.contains('dark');
  return {
    duration: 4000,
    icon: "❌",
    position: "bottom-right",
    style: { 
      backgroundColor: isDark ? "#1F2937" : "#EF4444", 
      color: "#fff",
      border: isDark ? "1px solid #374151" : "none"
    }
  }
}