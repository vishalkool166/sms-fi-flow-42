
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface SpendingInsightProps {
  title: string;
  description: string;
  trend?: 'up' | 'down';
  priority?: 'normal' | 'warning';
}

const SpendingInsightsCard: React.FC<SpendingInsightProps> = ({ 
  title, 
  description, 
  trend = 'up',
  priority = 'normal'
}) => {
  return (
    <Card className="shadow-sm hover:shadow transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 
            ${priority === 'warning' ? 'bg-amber-100' : 
              (trend === 'up' ? 'bg-green-100' : 'bg-red-100')}`
          }>
            {priority === 'warning' ? (
              <AlertCircle className="h-5 w-5 text-amber-600" />
            ) : (
              trend === 'up' ? (
                <TrendingUp className={`h-5 w-5 text-green-600`} />
              ) : (
                <TrendingDown className={`h-5 w-5 text-red-600`} />
              )
            )}
          </div>
          <div>
            <h3 className="font-medium mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingInsightsCard;
