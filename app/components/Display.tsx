'use client';

interface DisplayProps {
  value: string;
  theme: string;
}

const Display = ({ value, theme }: DisplayProps) => {
  return (
    <div className={`display ${theme} rounded-lg p-3 sm:p-4 text-right text-2xl sm:text-3xl font-bold min-h-[60px] sm:min-h-[80px] flex items-center justify-end overflow-hidden`}>
      <span className="truncate">{value}</span>
    </div>
  );
};

export default Display;
