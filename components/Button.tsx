
import React from 'react';
import { ButtonType } from '../types';

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
  type?: ButtonType;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = ButtonType.NUMBER, className = '' }) => {
  const baseClasses = 'flex items-center justify-center text-3xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#6b423a] transition-all duration-200 shadow-md hover:shadow-lg active:shadow-sm transform active:scale-95';

  const typeClasses = {
    [ButtonType.NUMBER]: 'bg-[#d28f5d] text-white hover:bg-[#c17a47] focus:ring-[#d28f5d] rounded-full',
    [ButtonType.OPERATOR]: 'bg-[#e59b37] text-white hover:bg-[#d48c26] focus:ring-[#e59b37] text-4xl rounded-full',
    [ButtonType.ACTION]: 'bg-[#a5673f] text-white hover:bg-[#94582f] focus:ring-[#a5673f] rounded-full',
  };

  const handleClick = () => {
    onClick(label);
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${typeClasses[type]} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
