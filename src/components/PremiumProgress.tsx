import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface PremiumProgressProps {
  value: number;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'navy' | 'sky' | 'teal' | 'amber' | 'indigo' | 'pink' | 'orange' | 'gray';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PremiumProgress: React.FC<PremiumProgressProps> = ({ 
  value, 
  color = 'blue', 
  showLabel = false, 
  animated = false, 
  className,
  size = 'md'
}) => {
  const colorMap = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    purple: 'text-purple-600 dark:text-purple-400',
    navy: 'text-blue-900 dark:text-blue-200',
    sky: 'text-sky-600 dark:text-sky-400',
    teal: 'text-teal-600 dark:text-teal-400',
    amber: 'text-amber-600 dark:text-amber-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    pink: 'text-pink-600 dark:text-pink-400',
    orange: 'text-orange-600 dark:text-orange-400',
    gray: 'text-gray-600 dark:text-gray-400',
  };
  
  const sizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  const progressContent = (
    <>
      <Progress value={value} className={className} />
      {showLabel && (
        <p className={cn("mt-1 font-medium", sizeMap[size], colorMap[color])}>
          {value}%
        </p>
      )}
    </>
  );
  
  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {progressContent}
      </motion.div>
    );
  }
  
  return <>{progressContent}</>;
};

export default PremiumProgress;
