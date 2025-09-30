
import React from 'react';

const ChefHatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.69 2 6 4.69 6 8c0 1.95.9 3.68 2.33 4.88.08.07.15.15.22.23.16.16.32.31.48.46.04.04.08.08.13.11.23.17.47.33.71.48.2.12.41.24.62.35.25.13.5.25.76.36.23.1.47.19.71.27.23.08.46.15.7.21.28.07.56.12.85.17.22.03.44.06.66.08.28.03.56.05.85.06h.02c.28 0 .56-.02.84-.05.22-.02.44-.05.66-.07.29-.05.58-.1.87-.16.23-.05.46-.1.69-.16.27-.07.54-.15.8-.23.23-.08.46-.17.68-.26.26-.1.52-.22.77-.33.2-.1.4-.2.6-.31.25-.15.5-.3.74-.46.04-.03.09-.06.13-.09.16-.15.31-.3.47-.46.07-.08.14-.16.21-.24C17.1 11.68 18 9.95 18 8c0-3.31-2.69-6-6-6zm0 18c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4z"/>
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center p-4 sm:p-6">
      <div className="flex justify-center items-center gap-4">
        <ChefHatIcon />
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
          AI Recipe Generator
        </h1>
      </div>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
        Turn your pantry into a feast. What ingredients do you have today?
      </p>
    </header>
  );
};
