import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart2, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PremiumCard from '@/components/PremiumCard';
import { formatCurrency } from '@/utils/formatters';
import { motion } from 'framer-motion';
import EnhancedChart from '@/components/EnhancedChart';
import { useTheme } from '@/providers/ThemeProvider';

const FinancialInsightsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  // Sample data for monthly income vs expenses
  const monthlyData = [
    { name: 'Jan', income: 4000, expenses: 2400 },
    { name: 'Feb', income: 3000, expenses: 1398 },
    { name: 'Mar', income: 2000, expenses: 9800 },
    { name: 'Apr', income: 2780, expenses: 3908 },
    { name: 'May', income: 1890, expenses: 4800 },
    { name: 'Jun', income: 2390, expenses: 3800 },
    { name: 'Jul', income: 3490, expenses: 4300 },
    { name: 'Aug', income: 4000, expenses: 2400 },
    { name: 'Sep', income: 3000, expenses: 1398 },
    { name: 'Oct', income: 2000, expenses: 9800 },
    { name: 'Nov', income: 2780, expenses: 3908 },
    { name: 'Dec', income: 1890, expenses: 4800 },
  ];
  
  // Sample data for monthly category spending
  const monthlyCategoryData = [
    { name: 'Jan', food: 1200, shopping: 800, transport: 500, entertainment: 300, utilities: 400 },
    { name: 'Feb', food: 1100, shopping: 750, transport: 450, entertainment: 350, utilities: 420 },
    { name: 'Mar', food: 1300, shopping: 850, transport: 550, entertainment: 280, utilities: 380 },
    { name: 'Apr', food: 1250, shopping: 820, transport: 520, entertainment: 320, utilities: 410 },
    { name: 'May', food: 1150, shopping: 780, transport: 480, entertainment: 330, utilities: 430 },
    { name: 'Jun', food: 1220, shopping: 810, transport: 510, entertainment: 310, utilities: 400 },
  ];
  
  // Sample data for income sources
  const incomeSourcesData = [
    { name: 'Salary', value: 60000 },
    { name: 'Investments', value: 15000 },
    { name: 'Freelance', value: 8000 },
    { name: 'Other', value: 3000 },
  ];
  
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
          <h1 className="text-xl font-bold">Financial Insights</h1>
        </div>
        
        <Button variant="outline" size="sm">
          <BarChart2 className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PremiumCard className="mb-6" variant="main">
          <h2 className="text-lg font-semibold mb-3">Income vs Expenses</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">A visual representation of your monthly income against expenses.</p>
          
          <EnhancedChart
            data={monthlyData}
            type="area"
            lines={[
              { 
                dataKey: 'income', 
                stroke: '#10B981', 
                fill: '#10B981',
                fillOpacity: 0.2
              }
            ]}
            height={200}
            showGrid
            showTooltip
            showXAxis
            showYAxis
          />
          
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
              <p className="text-lg font-medium text-green-700 dark:text-green-400">
                {formatCurrency(monthlyData.reduce((sum, month) => sum + month.income, 0))}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
              <p className="text-lg font-medium text-red-700 dark:text-red-400">
                {formatCurrency(monthlyData.reduce((sum, month) => sum + month.expenses, 0))}
              </p>
            </div>
          </div>
        </PremiumCard>
      </motion.div>
      
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">Spending by Category</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Understand where your money goes each month.</p>
        
        <EnhancedChart
          data={monthlyCategoryData}
          type="stacked"
          lines={[
            { dataKey: 'food', stroke: '#F97316', fill: '#F97316', fillOpacity: 0.7 },
            { dataKey: 'shopping', stroke: '#8B5CF6', fill: '#8B5CF6', fillOpacity: 0.7 },
            { dataKey: 'transport', stroke: '#3B82F6', fill: '#3B82F6', fillOpacity: 0.7 },
            { dataKey: 'entertainment', stroke: '#EC4899', fill: '#EC4899', fillOpacity: 0.7 },
            { dataKey: 'utilities', stroke: '#6B7280', fill: '#6B7280', fillOpacity: 0.7 }
          ]}
          height={300}
        />
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">Income Sources</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">See a breakdown of your income sources.</p>
        
        <EnhancedChart
          data={incomeSourcesData}
          type="pie"
          lines={[
            { dataKey: 'value', stroke: '#64748B', fill: '#64748B', fillOpacity: 0.7 },
            { dataKey: 'value', stroke: '#8B5CF6', fill: '#8B5CF6', fillOpacity: 0.7 },
            { dataKey: 'value', stroke: '#3B82F6', fill: '#3B82F6', fillOpacity: 0.7 },
            { dataKey: 'value', stroke: '#10B981', fill: '#10B981', fillOpacity: 0.7 }
          ]}
          height={300}
        />
      </div>
    </div>
  );
};

export default FinancialInsightsPage;
