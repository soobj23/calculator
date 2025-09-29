'use client';

import { Theme } from '../types';

interface ThemeSelectorProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeSelector = ({ theme, setTheme }: ThemeSelectorProps) => {
  const themes = [
    { id: 'neon' as Theme, name: 'Neon Cyber', emoji: '🌃', description: 'Cyberpunk vibes' },
    { id: 'retro' as Theme, name: 'Retro Game', emoji: '🎮', description: '8-bit nostalgia' },
    { id: 'space' as Theme, name: 'Space Explorer', emoji: '🚀', description: 'Cosmic journey' },
    { id: 'nature' as Theme, name: 'Nature Green', emoji: '🌿', description: 'Eco-friendly' },
  ];

  return (
    <div className="theme-selector bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-700 mb-3">
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs text-gray-600 dark:text-gray-400">Theme:</span>
        {themes.map((themeOption) => (
          <button
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id)}
            className={`theme-option p-1.5 rounded-md transition-all duration-200 text-sm ${
              theme === themeOption.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title={themeOption.description}
          >
            <span className="mr-1">{themeOption.emoji}</span>
            <span className="hidden sm:inline">{themeOption.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
