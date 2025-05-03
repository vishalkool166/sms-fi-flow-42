
import * as React from "react";
import { cn } from "@/lib/utils";

interface PremiumProgressProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
  size?: "sm" | "md" | "lg";
  color?: "default" | "success" | "warning" | "danger" | "navy" | "sky";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

const PremiumProgress: React.FC<PremiumProgressProps> = ({
  value,
  max = 100,
  className,
  indicatorClassName,
  size = "md",
  color = "default",
  showLabel = false,
  label,
  animated = false,
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const sizeStyles = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };
  
  const colorStyles = {
    default: "bg-primary",
    success: "bg-green-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    navy: "bg-finance-navy",
    sky: "bg-finance-sky",
  };
  
  const baseStyles = "w-full bg-gray-100 rounded-full overflow-hidden";
  
  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between mb-1 text-xs text-finance-medium">
          <span>{label}</span>
          {showLabel && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={cn(baseStyles, sizeStyles[size], className)}>
        <div
          className={cn(
            "h-full rounded-full transition-all",
            colorStyles[color],
            animated && "animate-pulse-soft",
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default PremiumProgress;
