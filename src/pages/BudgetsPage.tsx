
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PremiumCard from '@/components/PremiumCard';
import PremiumProgress from '@/components/PremiumProgress';
import IconBox from '@/components/IconBox';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';
import { 
  ArrowLeft, 
  PlusCircle, 
  Utensils, 
  ShoppingBag, 
  Car, 
  Film, 
  Home,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Budget {
  id: number;
  name: string;
  category: string;
  icon: React.ElementType;
  color: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'teal' | 'orange' | 'pink';
  budget: number;
  spent: number;
  period: string;
}

const BudgetsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const budgets: Budget[] = [
    {
      id: 1,
      name: 'Food & Dining',
      category: 'food',
      icon: Utensils,
      color: 'orange',
      budget: 12000,
      spent: 8500,
      period: 'May 2025'
    },
    {
      id: 2,
      name: 'Shopping',
      category: 'shopping',
      icon: ShoppingBag,
      color: 'purple',
      budget: 8000,
      spent: 7200,
      period: 'May 2025'
    },
    {
      id: 3,
      name: 'Transportation',
      category: 'transport',
      icon: Car,
      color: 'blue',
      budget: 4000,
      spent: 2500,
      period: 'May 2025'
    },
    {
      id: 4,
      name: 'Entertainment',
      category: 'entertainment',
      icon: Film,
      color: 'pink',
      budget: 6000,
      spent: 4800,
      period: 'May 2025'
    },
    {
      id: 5,
      name: 'Utilities',
      category: 'utilities',
      icon: Home,
      color: 'teal',
      budget: 10000,
      spent: 9800,
      period: 'May 2025'
    }
  ];
  
  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Budgets</h1>
        </div>
        
        <Button onClick={() => navigate('/add-budget')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Budget
        </Button>
      </div>
      
      <div className="space-y-4">
        {budgets.map((budget, index) => {
          const percentage = Math.round((budget.spent / budget.budget) * 100);
          const isOverBudget = percentage > 80;
          const remaining = budget.budget - budget.spent;
          
          return (
            <motion.div
              key={budget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <PremiumCard className="cursor-pointer hover:shadow-premium-hover transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <IconBox 
                      icon={budget.icon} 
                      color={budget.color} 
                      className="mr-3" 
                    />
                    <div>
                      <h3 className="font-medium">{budget.name}</h3>
                      <div className="text-sm text-gray-500">
                        {budget.period}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      {formatCurrency(budget.spent)}
                    </div>
                    <div className="text-xs text-gray-500">
                      of {formatCurrency(budget.budget)}
                    </div>
                  </div>
                </div>
                
                <PremiumProgress
                  value={percentage}
                  color={percentage > 90 ? 'danger' : percentage > 75 ? 'warning' : 'success'}
                  animated={isOverBudget}
                  showLabel
                />
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  {isOverBudget ? (
                    <div className="flex items-center text-orange-500 text-sm">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      <span>Near budget limit</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">
                      {formatCurrency(remaining)} remaining
                    </span>
                  )}
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              </PremiumCard>
            </motion.div>
          );
        })}
        
        {budgets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <Wallet className="h-16 w-16 text-gray-300 mb-3" />
            <h3 className="font-medium text-gray-500 mb-1">No budgets yet</h3>
            <p className="text-gray-400 text-sm text-center max-w-xs mb-4">
              Create a budget to track your spending in different categories
            </p>
            <Button onClick={() => navigate('/add-budget')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Your First Budget
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetsPage;
