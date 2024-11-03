import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-2 bg-gray-200 w-10 h-10 flex justify-center dark:bg-gray-800 rounded-full">
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
    </div>
  );
};

export default ThemeToggle;
