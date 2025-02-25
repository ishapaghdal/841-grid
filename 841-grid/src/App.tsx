import { useState, useEffect } from "react";
import Header from "./Header";
import { ContributionGraph } from "./components/contribution-graph";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden dark:bg-gray-900 transition-colors duration-200">
      <div className="relative w-full">
        <Header />
        <div className="mt-16 w-full block">
          <ContributionGraph />
        </div>

        {/* Stylish Dark Mode Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
        >
          <div className="relative w-6 h-6">
            {/* Sun Icon */}
            <svg
              className={`w-6 h-6 text-yellow-500 transition-all duration-300 ${
                isDark ? "opacity-0 scale-50" : "opacity-100 scale-100"
              } absolute top-0 left-0`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>

            {/* Moon Icon */}
            <svg
              className={`w-6 h-6 text-blue-500 transition-all duration-300 ${
                isDark ? "opacity-100 scale-100" : "opacity-0 scale-50"
              } absolute top-0 left-0`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

export default App;
