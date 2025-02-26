export const getRandomColor = (isDark: boolean): string => {
  const colors = isDark ? [
    'bg-blue-600',
    'bg-green-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-yellow-600',
    'bg-red-600',
    'bg-indigo-600',
    'bg-teal-600',
  ] : [
    'bg-blue-400',
    'bg-green-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-yellow-400',
    'bg-red-400',
    'bg-indigo-400',
    'bg-teal-400',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}; 