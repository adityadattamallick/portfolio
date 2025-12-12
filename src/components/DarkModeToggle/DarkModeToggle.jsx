import React from "react";
import { useTheme } from "../../hooks/useTheme";
import styles from "./DarkModeToggle.module.css";

export const DarkModeToggle = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className={styles.toggleIcon}>
        {isDark ? (
          <span className={styles.bulbIcon}>️☀</span>
        ) : (
          <span className={styles.bulbOffIcon}>☀</span>
        )}
      </div>
    </button>
  );
};
