import { useState, useEffect } from "react";
import Header from "./components/Header";
import { ContributionGraph } from "./components/contribution-graph";
import { RevenueBreakdown } from "./components/revenue-breakdown";
import { Footer } from "./components/Footer";

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <div className="relative w-full flex-1">
        <Header />
        <div className="mt-16 w-full block">
          <ContributionGraph />
        </div>
        <RevenueBreakdown />
      </div>
      <Footer 
        isDark={isDark} 
        onThemeToggle={() => setIsDark(!isDark)} 
      />
    </div>
  );
}

export default App;
