// components/ThemeToggle.js
import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  //   const [mounted, setMounted] = useState(false);

  // Ensures theme is only rendered after mounting
  //   useEffect(() => setMounted(true), []);

  //   if (!mounted) return null;

  return (
    <div>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
    </div>
  );
};

export default ThemeToggle;
