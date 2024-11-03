import ThemeToggle from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="bg-white dark:text-white dark:bg-gray-900 shadow top-0 fixed w-screen z-10 ">
      <div className="max-w-7xl py-6 px-4 mx-auto flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-orange-400">
            APCO{" "}
            <span className="text-gray-300 text-sm sm:text-lg">assignment</span>
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};
