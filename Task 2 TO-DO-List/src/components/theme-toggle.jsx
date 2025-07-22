import { Sun, Moon } from "lucide-react";
import "../styles/theme-toggle.css";

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="theme-icon" />
      ) : (
        <Sun className="theme-icon" />
      )}
    </button>
  );
}
