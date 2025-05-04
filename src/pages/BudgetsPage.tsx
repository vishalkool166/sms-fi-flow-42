import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, ChevronRight, PieChart, Wallet, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import PremiumCard from '@/components/PremiumCard';
import PremiumProgress from '@/components/PremiumProgress';
import { formatCurrency } from '@/utils/formatters';
import { useTheme } from '@/providers/ThemeProvider';

interface Budget {
  id: number;
  name: string;
  icon: React.ElementType;
  currentAmount: number;
  maxAmount: number;
  period: string;
  color: string;
  remainingDays: number;
}

const BudgetsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  // Sample budget data
  const [budgets] = useState<Budget[]>([
    {
      id: 1,
      name: 'Food & Drinks',
      icon: PieChart,
      currentAmount: 8250,
      maxAmount: 12000,
      period: 'Monthly',
      color: 'orange',
      remainingDays: 15
    },
    {
      id: 2, 
      name: 'Shopping',
      icon: Wallet,
      currentAmount: 15800,
      maxAmount: 20000,
      period: 'Monthly',
      color: 'purple',
      remainingDays: 15
    },
    {
      id: 3,
      name: 'Transportation',
      icon: Calculator,
      currentAmount: 3600,
      maxAmount: 8000,
      period: 'Monthly',
      color: 'blue',
      remainingDays: 15
    }
  ]);
  
  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 dark:text-white" />
          </button>
          <h1 className="text-xl font-bold">Your Budgets</h1>
        </div>
        
        <Button onClick={() => navigate('/add-budget')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Budget
        </Button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PremiumCard className="mb-6" variant="main">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-1">Total Budget</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">May 2025</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Spent</p>
              <p className="text-xl font-semibold">
                {formatCurrency(budgets.reduce((sum, budget) => sum + budget.currentAmount, 0))}
                <span className="text-gray-400 text-sm ml-1">
                  / {formatCurrency(budgets.reduce((sum, budget) => sum + budget.maxAmount, 0))}
                </span>
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <PremiumProgress
              value={Math.round((budgets.reduce((sum, budget) => sum + budget.currentAmount, 0) / budgets.reduce((sum, budget) => sum + budget.maxAmount, 0)) * 100)}
              color="blue"
              animated={true}
              showLabel={true}
            />
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
              <p className="text-lg font-medium text-blue-700 dark:text-blue-400">
                {formatCurrency(budgets.reduce((sum, budget) => sum + budget.maxAmount - budget.currentAmount, 0))}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Time Left</p>
              <p className="text-lg font-medium text-green-700 dark:text-green-400">
                15 days
              </p>
            </div>
          </div>
        </PremiumCard>
      </motion.div>
      
      <div className="mb-5">
        <h2 className="text-lg font-bold mb-3">Budget Categories</h2>
        
        {budgets.map((budget, index) => {
          const percentUsed = Math.round((budget.currentAmount / budget.maxAmount) * 100);
          const BudgetIcon = budget.icon;
          
          return (
            <motion.div
              key={budget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <PremiumCard 
                className="mb-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/budget/${budget.id}`)}
                animated
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${budget.color}-100 dark:bg-${budget.color}-900/30 mr-3`}>
                      <BudgetIcon className={`h-5 w-5 text-${budget.color}-600 dark:text-${budget.color}-400`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{budget.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{budget.period} • {budget.remainingDays} days left</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{percentUsed}% used</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(budget.currentAmount)} <span className="text-gray-400 text-xs">/ {formatCurrency(budget.maxAmount)}</span>
                  </span>
                </div>
                
                <PremiumProgress
                  value={percentUsed}
                  color={budget.color as any}
                  animated={true}
                />
              </PremiumCard>
            </motion.div>
          );
        })}
        
        {budgets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <Wallet className="h-16 w-16 text-gray-300 dark:text-gray-700 mb-3" />
            <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-1">No budgets yet</h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm text-center max-w-xs mb-4">
              Start creating budgets to manage your expenses better
            </p>
            <Button onClick={() => navigate('/add-budget')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Budget
            </Button>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">Budget Insights</h2>
        
        <PremiumCard>
          <div className="p-4 flex items-center">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
              <PieChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">Food & Drinks</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">You've spent 40% more than last month on this category.</p>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 p-4 flex items-center">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
              <Wallet className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">Shopping</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">You're within your budget limit. Good job!</p>
            </div>
          </div>
        </PremiumCard>
      </div>
      
      <Button 
        className="w-full"
        variant="outline"
        onClick={() => navigate('/budgets/history')}
      >
        View Budget History
      </Button>
    </div>
  );
};

export default BudgetsPage;
