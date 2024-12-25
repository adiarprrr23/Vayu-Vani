import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  onToggle?: () => void;
}

export function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
}