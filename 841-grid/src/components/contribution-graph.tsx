import { useState } from "react";

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

interface ContributionDay {
  level: ContributionLevel;
  amount: number;
}

const generateMockData = (): ContributionDay[] => {
  return Array.from({ length: 900 }, () => {
    const level = Math.floor(Math.random() * 5) as ContributionLevel;
    return {
      level,
      amount: level * 1000, // $1000 per level
    };
  });
};

const getLevelColor = (level: ContributionLevel, isDark: boolean): string => {
  const lightColors = [
    "bg-green-50 hover:bg-green-100 border-2 border-green-100/50",
    "bg-green-200 hover:bg-green-300 border-2 border-green-300/50",
    "bg-green-300 hover:bg-green-400 border-2 border-green-400/50",
    "bg-green-400 hover:bg-green-500 border-2 border-green-500/50",
    "bg-green-500 hover:bg-green-600 border-2 border-green-600/50",
  ];

  const darkColors = [
    "bg-green-900 hover:bg-green-800 border-2 border-green-800/50",
    "bg-green-700 hover:bg-green-600 border-2 border-green-600/50",
    "bg-green-600 hover:bg-green-500 border-2 border-green-500/50",
    "bg-green-500 hover:bg-green-400 border-2 border-green-400/50",
    "bg-green-400 hover:bg-green-300 border-2 border-green-300/50",
  ];

  return isDark ? darkColors[level] : lightColors[level];
};

export function ContributionGraph() {
  const [contributionData] = useState<ContributionDay[]>(generateMockData());
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div className="w-full flex justify-center items-center">
      <div className="inline-block p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl dark:shadow-gray-900/50">
        <div className="grid grid-cols-30 gap-2">
          {contributionData.map((day, index) => (
            <div
              key={index}
              className={`
                w-7 h-7 
                rounded-xl
                transform hover:scale-110 
                transition-all duration-300 ease-in-out
                cursor-pointer 
                shadow-sm hover:shadow-lg
                hover:-translate-y-1
                group
                relative
                overflow-hidden
                ${getLevelColor(day.level, isDark)}
              `}
              title={`$${day.amount.toLocaleString()}`}
            >
              <div
                className="
                opacity-0 group-hover:opacity-100 
                absolute -top-10 left-1/2 -translate-x-1/2
                bg-gray-900 dark:bg-gray-700 
                text-white 
                px-2 py-1 
                rounded-md 
                text-xs 
                whitespace-nowrap
                transition-opacity duration-200
                pointer-events-none
                shadow-lg
                z-10
              "
              >
                ${day.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
