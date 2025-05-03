
import React from 'react';
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

interface IconBoxProps {
  icon: LucideIcon;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'navy' | 'sky' | 'teal' | 'amber' | 'indigo' | 'pink' | 'orange' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const IconBox: React.FC<IconBoxProps> = ({ 
  icon: Icon, 
  color, 
  size = 'md', 
  className,
  onClick
}) => {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
    navy: 'bg-blue-900/10 text-blue-900',
    sky: 'bg-blue-400/10 text-blue-500',
    teal: 'bg-teal-100 text-teal-600',
    amber: 'bg-amber-100 text-amber-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    pink: 'bg-pink-100 text-pink-600',
    orange: 'bg-orange-100 text-orange-600',
    gray: 'bg-gray-100 text-gray-600',
  };
  
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  
  const iconSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div 
      className={cn(
        `rounded-full flex items-center justify-center animate-hover`, 
        sizeMap[size], 
        colorMap[color], 
        className
      )}
      onClick={onClick}
    >
      <Icon className={iconSizeMap[size]} />
    </div>
  );
};

export default IconBox;
