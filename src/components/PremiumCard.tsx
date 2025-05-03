
import React from 'react';
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'main';
  withPattern?: boolean;
  onClick?: () => void;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ 
  children, 
  className, 
  variant = 'default', 
  withPattern = false,
  onClick
}) => {
  const baseClass = variant === 'main' 
    ? 'main-card' 
    : variant === 'gradient'
      ? 'premium-card premium-gradient text-white' 
      : 'premium-card';
  
  return (
    <div 
      className={cn(`relative overflow-hidden animate-hover`, baseClass, className)}
      onClick={onClick}
    >
      {withPattern && <div className="pattern-overlay" />}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default PremiumCard;
