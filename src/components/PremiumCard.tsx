
import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'main';
  withPattern?: boolean;
  onClick?: () => void;
  animated?: boolean;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ 
  children, 
  className, 
  variant = 'default', 
  withPattern = false,
  onClick,
  animated = false
}) => {
  const baseClass = variant === 'main' 
    ? 'main-card' 
    : variant === 'gradient'
      ? 'premium-card premium-gradient text-white' 
      : 'premium-card';

  const cardContent = (
    <>
      {withPattern && <div className="pattern-overlay" />}
      <div className="relative z-10">{children}</div>
    </>
  );
  
  if (animated) {
    return (
      <motion.div
        className={cn(`relative overflow-hidden animate-hover card-hover-effect`, baseClass, className)}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -5, scale: 1.01 }}
      >
        {cardContent}
      </motion.div>
    );
  }
  
  return (
    <div 
      className={cn(`relative overflow-hidden animate-hover`, baseClass, className)}
      onClick={onClick}
    >
      {cardContent}
    </div>
  );
};

export default PremiumCard;
