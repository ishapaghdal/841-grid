import { useState } from "react";

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

interface ContributionDay {
  level: ContributionLevel;
}

const generateMockData = (): ContributionDay[] => {
  return Array.from({ length: 900 }, () => ({
    level: Math.floor(Math.random() * 5) as ContributionLevel,
  }));
};

const getLevelColor = (level: ContributionLevel, isDark: boolean): string => {
  const lightColors = [
    "bg-green-50",
    "bg-green-200",
    "bg-green-300",
    "bg-green-400",
    "bg-green-500",
  ];

  const darkColors = [
    "bg-green-900",
    "bg-green-700",
    "bg-green-600",
    "bg-green-500",
    "bg-green-400",
  ];

  return isDark ? darkColors[level] : lightColors[level];
};

export function ContributionGraph() {
  const [contributionData] = useState<ContributionDay[]>(generateMockData());
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div className="w-full flex justify-center items-center">
      <div className="inline-block">
        <div className="grid grid-cols-30 gap-1">
          {contributionData.map((day, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-sm ${getLevelColor(
                day.level,
                isDark
              )}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
