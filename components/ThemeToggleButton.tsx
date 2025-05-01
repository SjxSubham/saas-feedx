import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="bg-opacity-5 ml-2 px-2 py-2 rounded-full bg-gray-100 dark:bg-transparent">
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggleButton;