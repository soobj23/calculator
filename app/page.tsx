'use client';

import Calculator from './components/Calculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <header className="text-center mb-2 sm:mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-1">
            🧮 Calculator
          </h1>
        </header>
        <Calculator />
      </div>
    </div>
  );
}
