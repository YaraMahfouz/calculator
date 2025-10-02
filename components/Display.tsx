
import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  const getFontSize = (val: string) => {
    const length = val.length;
    if (length > 15) return 'text-3xl';
    if (length > 10) return 'text-4xl';
    if (length > 7) return 'text-5xl';
    return 'text-7xl';
  };

  return (
    <div className="bg-[#f3e9d2] text-[#4a2e2a] rounded-2xl p-6 w-full text-right overflow-hidden break-all flex items-center justify-end h-32">
      <h1 className={`font-light ${getFontSize(value)} transition-all duration-100`}>
        {value}
      </h1>
    </div>
  );
};

export default Display;
