
import React from 'react';
import { cn } from "@/lib/utils";

interface PremiumButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  onClick,
  className,
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = "flex items-center justify-center rounded-button font-value transition-all hover:scale-[0.98] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-finance-navy to-finance-sky text-white shadow-premium hover:shadow-premium-hover",
    secondary: "bg-white text-finance-dark border border-gray-100 shadow-card hover:shadow-premium",
    outline: "bg-transparent border border-gray-200 text-finance-dark hover:bg-gray-50",
    danger: "bg-gradient-to-r from-red-500 to-red-400 text-white shadow-premium hover:shadow-premium-hover",
  };
  
  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-5",
    lg: "py-4 px-6 text-lg",
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className
      )}
    >
      {children}
    </button>
  );
};

export default PremiumButton;
