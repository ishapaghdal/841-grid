import { useState, useEffect } from "react";
import contributionsData from "../data/contributions.json";

interface CategoryTotal {
  source: string;
  amount: number;
  color: string;
}

export function RevenueBreakdown() {
  const [categories, setCategories] = useState<CategoryTotal[]>([]);
  const [total, setTotal] = useState(0);
  const isDark = document.documentElement.classList.contains("dark");

  useEffect(() => {
    const processedCategories = contributionsData.contributions.reduce(
      (
        acc: CategoryTotal[],
        curr: { source: string; amount: number; color: string }
      ) => {
        const existingCategory = acc.find((cat) => cat.source === curr.source);
        if (existingCategory) {
          existingCategory.amount += curr.amount;
        } else {
          acc.push({
            source: curr.source,
            amount: curr.amount,
            color: isDark ? curr.color : curr.color.replace("-600", "-400"),
          });
        }
        return acc;
      },
      []
    );
    setCategories(processedCategories);
    setTotal(
      processedCategories.reduce(
        (sum: number, category: CategoryTotal) => sum + category.amount,
        0
      )
    );
  }, [isDark]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 px-4 mb-16">
      <h2 className="text-2xl font-bold mb-6 dark:text-white text-gray-900">
        Revenue Breakdown
      </h2>

      <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
        <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          Categories
        </h3>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-7 h-7
                    rounded-[35%]
                    transform hover:scale-110 
                    transition-all duration-300 ease-in-out
                    shadow-sm hover:shadow-lg
                    ${category.color}
                  `}
                />
                <span className="dark:text-gray-200 text-gray-700 font-medium">
                  {category.source}
                </span>
              </div>
              <span className="text-green-600 dark:text-green-400 font-semibold">
                ${category.amount.toLocaleString()}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
            <div className="flex items-center justify-between text-lg">
              <span className="dark:text-gray-200 text-gray-700 font-bold">
                Total
              </span>
              <span className="text-green-600 dark:text-green-400 font-bold">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
