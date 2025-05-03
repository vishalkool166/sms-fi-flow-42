
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  className?: string;
  trend?: number; // Percentage change, positive or negative
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  amount, 
  icon,
  className = '', 
  trend 
}) => {
  const isTrendPositive = trend && trend > 0;
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm text-muted-foreground font-medium">{title}</h3>
          <div className="text-primary">{icon}</div>
        </div>
        <div className="text-2xl font-semibold">{formatCurrency(amount)}</div>
        
        {trend !== undefined && (
          <div className={`mt-2 text-xs flex items-center ${
            isTrendPositive ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {isTrendPositive ? '↑' : trend < 0 ? '↓' : '•'} 
            {Math.abs(trend)}% {isTrendPositive ? 'more than' : trend < 0 ? 'less than' : 'same as'} last month
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
