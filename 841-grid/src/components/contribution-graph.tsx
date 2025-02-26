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
    },
    {
      index: 150,
      amount: 3000,
      source: "YouTube Revenue",
    },
    {
      index: 300,
      amount: 2000,
      source: "Consulting Work",
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

const generateContributionData = (
  data: ContributionData[]
): ContributionDay[] => {
  // Change length from 900 to 841 (29x29)
  const days = Array.from({ length: 841 }, (_, index) => ({
    index,
    amount: 0,
    source: "No contribution",
    level: 0 as ContributionLevel,
  }));

  // Update days with actual contribution data
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

const getRandomColor = (isDark: boolean): string => {
  const colors = isDark
    ? [
        "bg-blue-600 hover:bg-blue-500 border-2 border-blue-500/50",
        "bg-green-600 hover:bg-green-500 border-2 border-green-500/50",
        "bg-purple-600 hover:bg-purple-500 border-2 border-purple-500/50",
        "bg-pink-600 hover:bg-pink-500 border-2 border-pink-500/50",
        "bg-yellow-600 hover:bg-yellow-500 border-2 border-yellow-500/50",
        "bg-red-600 hover:bg-red-500 border-2 border-red-500/50",
        "bg-indigo-600 hover:bg-indigo-500 border-2 border-indigo-500/50",
        "bg-teal-600 hover:bg-teal-500 border-2 border-teal-500/50",
      ]
    : [
        "bg-blue-400 hover:bg-blue-300 border-2 border-blue-300/50",
        "bg-green-400 hover:bg-green-300 border-2 border-green-300/50",
        "bg-purple-400 hover:bg-purple-300 border-2 border-purple-300/50",
        "bg-pink-400 hover:bg-pink-300 border-2 border-pink-300/50",
        "bg-yellow-400 hover:bg-yellow-300 border-2 border-yellow-300/50",
        "bg-red-400 hover:bg-red-300 border-2 border-red-300/50",
        "bg-indigo-400 hover:bg-indigo-300 border-2 border-indigo-300/50",
        "bg-teal-400 hover:bg-teal-300 border-2 border-teal-300/50",
      ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const getLevelColor = (day: ContributionDay, isDark: boolean): string => {
  if (day.amount === 0) {
    return isDark
      ? "bg-gray-800 hover:bg-gray-700 border-2 border-gray-700/50"
      : "bg-gray-200 hover:bg-gray-100 border-2 border-gray-300/50";
  }

  return getRandomColor(isDark);
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
