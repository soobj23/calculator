'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

const Button = ({ children, onClick, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className} rounded-lg p-2 sm:p-4 text-sm sm:text-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[40px] sm:min-h-[60px]`}
    >
      {children}
    </button>
  );
};

export default Button;
