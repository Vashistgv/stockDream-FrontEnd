"use client";

import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={`Switch to ${
        theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
      } mode`}
    >
      {getIcon()}
    </button>
  );
}
