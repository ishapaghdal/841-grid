import { useState, useEffect } from "react";
import {
  ContributionDay,
  ContributionData,
  ContributionLevel,
} from "../types/contribution";

// Import JSON data
const contributionsData = {
  contributions: [
    {
      index: 50,
      amount: 2000,
      source: "Freelance Project",
      color: "bg-blue-600",
    },
    {
      index: 150,
      amount: 3000,
      source: "YouTube Revenue",
      color: "bg-green-600",
    },
    {
      index: 300,
      amount: 2000,
      source: "Consulting Work",
      color: "bg-purple-600",
    },
  ],
};

const calculateLevel = (amount: number): ContributionLevel => {
  if (amount === 0) return 0;
  if (amount <= 1000) return 1;
  if (amount <= 2000) return 2;
  if (amount <= 3000) return 3;
  return 4;
};

const getLevelColor = (day: ContributionDay, isDark: boolean): string => {
  if (day.amount === 0) {
    return isDark ? "bg-gray-800" : "bg-gray-200";
  }

  return isDark ? day.color : day.color.replace("-600", "-400");
};

const generateContributionData = (
  data: ContributionData[]
): ContributionDay[] => {
  const days = Array.from({ length: 841 }, (_, index) => ({
    index,
    amount: 0,
    source: "No contribution",
    level: 0 as ContributionLevel,
    color: "bg-gray-200",
  }));

  data.forEach((contribution) => {
    if (contribution.index < days.length) {
      days[contribution.index] = {
        ...contribution,
        level: calculateLevel(contribution.amount),
      };
    }
  });

  return days;
};

export function ContributionGraph() {
  const [contributionData, setContributionData] = useState<ContributionDay[]>(
    []
  );
  const isDark = document.documentElement.classList.contains("dark");

  useEffect(() => {
    // Fetch the JSON data
    fetch("/src/data/contributions.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        const processedData = generateContributionData(data.contributions);
        setContributionData(processedData);
      })
      .catch((error) => {
        console.error("Error loading contributions:", error);
        // Fallback to hardcoded data if fetch fails
        const processedData = generateContributionData(
          contributionsData.contributions
        );
        setContributionData(processedData);
      });
  }, []);

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="inline-block p-4 sm:p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl dark:shadow-gray-900/50 relative">
        <div className="grid grid-cols-[repeat(15,1fr)] sm:grid-cols-[repeat(20,1fr)] md:grid-cols-[repeat(25,1fr)] lg:grid-cols-[repeat(29,1fr)] gap-1 sm:gap-2">
          {contributionData.map((day) => (
            <div
              key={day.index}
              className={`
                w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7
                rounded-[35%]
                transform hover:scale-110 
                transition-all duration-300 ease-in-out
                cursor-pointer 
                shadow-sm hover:shadow-lg
                hover:-translate-y-1
                group
                relative
                ${getLevelColor(day, isDark)}
              `}
            >
              <div
                className={`
                  invisible group-hover:visible
                  absolute
                  -top-12
                  left-1/2 -translate-x-1/2
                  bg-gray-900/95 dark:bg-gray-800/95
                  text-white 
                  px-3 py-2 
                  rounded-xl
                  text-[10px] sm:text-xs
                  whitespace-nowrap
                  transition-all duration-200
                  pointer-events-none
                  shadow-xl
                  z-[100]
                  min-w-[120px] sm:min-w-[150px]
                  backdrop-blur-sm
                  border border-gray-700/50
                `}
                style={{
                  transform: "translate(-50%, -100%)",
                }}
              >
                <div className="font-semibold">{day.source}</div>
                <div className="text-gray-300">Cell #{day.index + 1}</div>
                <div
                  className={`font-medium ${
                    day.amount > 0 ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  ${day.amount.toLocaleString()}
                </div>
                <div
                  className={`
                    absolute 
                    -bottom-1 rotate-45
                    left-1/2 -translate-x-1/2
                    w-2 h-2 
                    bg-gray-900 dark:bg-gray-800
                    transform
                    border-r border-b border-gray-700/50
                  `}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
