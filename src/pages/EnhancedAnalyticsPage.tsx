import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Calendar, ArrowDownRight, ArrowUpRight, DollarSign } from 'lucide-react';
import EnhancedChart from '@/components/EnhancedChart';
import PremiumCard from '@/components/PremiumCard';
import { formatCurrency } from '@/utils/formatters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';

const EnhancedAnalyticsPage = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('month');
  const [chartType, setChartType] = useState('line');
  

  // Sample spending categories data
  const categoryData = [
    { name: 'Food', value: 4800, color: '#F97316' },
    { name: 'Shopping', value: 3200, color: '#8B5CF6' },
    { name: 'Transport', value: 2100, color: '#0EA5E9' },
    { name: 'Entertainment', value: 1800, color: '#EC4899' },
    { name: 'Utilities', value: 3200, color: '#6B7280' },
  ];
  
  // Monthly expense and income data for charts
  const chartData = [
    { name: 'Jan', expense: 6000, income: 9000 },
    { name: 'Feb', expense: 7500, income: 9500 },
    { name: 'Mar', expense: 5500, income: 9200 },
    { name: 'Apr', expense: 8000, income: 10500 },
    { name: 'May', expense: 6800, income: 11000 },
    { name: 'Jun', expense: 7200, income: 10800 },
    { name: 'Jul', expense: 7800, income: 11200 },
    { name: 'Aug', expense: 8300, income: 11500 },
    { name: 'Sep', expense: 7900, income: 11800 },
    { name: 'Oct', expense: 8500, income: 12000 },
    { name: 'Nov', expense: 9000, income: 12500 },
    { name: 'Dec', expense: 9500, income: 13000 },
  ];
  
  // Weekly data
  const weeklyData = [
    { name: 'Week 1', expense: 2100, income: 2800 },
    { name: 'Week 2', expense: 1800, income: 2500 },
    { name: 'Week 3', expense: 2300, income: 2700 },
    { name: 'Week 4', expense: 1900, income: 2600 },
  ];
  
  // Yearly data
  const yearlyData = [
    { name: '2020', expense: 75000, income: 95000 },
    { name: '2021', expense: 82000, income: 105000 },
    { name: '2022', expense: 88000, income: 115000 },
    { name: '2023', expense: 92000, income: 125000 },
    { name: '2024', expense: 97000, income: 135000 },
  ];
  
  // Top spending categories
  const topCategories = [
    { name: 'Food & Dining', amount: 7500, percentage: 24, trend: 'up' },
    { name: 'Shopping', amount: 5200, percentage: 18, trend: 'down' },
    { name: 'Rent', amount: 4800, percentage: 15, trend: 'stable' },
    { name: 'Transportation', amount: 3500, percentage: 11, trend: 'up' },
    { name: 'Utilities', amount: 2800, percentage: 9, trend: 'down' },
  ];
  
  const renderTrendIcon = (trend) => {
    if (trend === 'up') {
      return <ArrowUpRight className="h-4 w-4 text-red-500" />;
    } else if (trend === 'down') {
      return <ArrowDownRight className="h-4 w-4 text-green-500" />;
    }
    return null;
  };
  
  // Select the right dataset based on period
  const getChartData = () => {
    switch (period) {
      case 'week':
        return weeklyData;
      case 'month':
        return chartData;
      case 'year':
        return yearlyData;
      default:
        return chartData;
    }
  };
  
  const data = getChartData();

  return (
    <motion.div 
      className="p-4 max-w-md mx-auto pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <motion.button 
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
          <h1 className="text-xl font-bold">Analytics</h1>
        </div>
        <button className="flex items-center text-sm text-finance-medium">
          <Calendar className="h-4 w-4 mr-1" />
          This Year
          <ChevronDown className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <PremiumCard className="h-full">
            <div className="flex flex-col h-full justify-between">
              <p className="text-sm text-finance-light">Income</p>
              <div>
                <h2 className="text-xl font-bold text-income">{formatCurrency(135000)}</h2>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+8.2%</span>
                </div>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <PremiumCard className="h-full">
            <div className="flex flex-col h-full justify-between">
              <p className="text-sm text-finance-light">Expenses</p>
              <div>
                <h2 className="text-xl font-bold text-expense">{formatCurrency(97000)}</h2>
                <div className="flex items-center text-xs text-red-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+5.4%</span>
                </div>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </div>
      
      <PremiumCard className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Cash Flow</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 text-xs rounded-full ${period === 'week' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}
              onClick={() => setPeriod('week')}
            >
              W
            </button>
            <button 
              className={`px-3 py-1 text-xs rounded-full ${period === 'month' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}
              onClick={() => setPeriod('month')}
            >
              M
            </button>
            <button 
              className={`px-3 py-1 text-xs rounded-full ${period === 'year' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}
              onClick={() => setPeriod('year')}
            >
              Y
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-3 mb-2">
          <div className="flex items-center text-sm">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block mr-1"></span>
            Income
          </div>
          <div className="flex items-center text-sm">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-1"></span>
            Expense
          </div>
        </div>
        
        <div className="h-60">
          <EnhancedChart 
            data={data} 
            type={chartType}
            lines={[
              { dataKey: 'income', stroke: '#10B981', fill: '#10B981', fillOpacity: 0.2 },
              { dataKey: 'expense', stroke: '#F97316', fill: '#F97316', fillOpacity: 0.2 }
            ]}
            height={220}
          />
        </div>
        
        <div className="flex justify-center mt-2">
          <div className="flex rounded-lg bg-gray-100 overflow-hidden">
            <button 
              className={`px-3 py-1 text-xs ${chartType === 'line' ? 'bg-white shadow' : 'text-gray-500'}`}
              onClick={() => setChartType('line')}
            >
              Line
            </button>
            <button 
              className={`px-3 py-1 text-xs ${chartType === 'bar' ? 'bg-white shadow' : 'text-gray-500'}`}
              onClick={() => setChartType('bar')}
            >
              Bar
            </button>
            <button 
              className={`px-3 py-1 text-xs ${chartType === 'area' ? 'bg-white shadow' : 'text-gray-500'}`}
              onClick={() => setChartType('area')}
            >
              Area
            </button>
          </div>
        </div>
      </PremiumCard>
      
      <h2 className="text-lg font-medium mb-4">Top Spending Categories</h2>
      
      <PremiumCard className="mb-6">
        {topCategories.map((category, index) => (
          <motion.div 
            key={index}
            className={`py-3 px-1 flex items-center justify-between ${index !== topCategories.length - 1 ? 'border-b border-gray-100' : ''}`}
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
          >
            <div>
              <div className="flex items-center">
                <h3 className="font-medium">{category.name}</h3>
                <div className="ml-2">{renderTrendIcon(category.trend)}</div>
              </div>
              <p className="text-xs text-finance-light">{category.percentage}% of total</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatCurrency(category.amount)}</p>
            </div>
          </motion.div>
        ))}
      </PremiumCard>
      
      <h2 className="text-lg font-medium mb-4">Spending by Category</h2>
      
      <PremiumCard className="mb-6">
        <div className="flex space-x-4 mb-4 overflow-x-auto pb-2">
          {categoryData.map((category, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-50 rounded-lg p-3 min-w-[100px] text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ backgroundColor: category.color + '20', color: category.color }}
              >
                <DollarSign className="h-4 w-4" />
              </div>
              <p className="text-xs font-medium mb-1">{category.name}</p>
              <p className="text-sm font-bold">{formatCurrency(category.value)}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="h-60">
          <EnhancedChart 
            data={categoryData} 
            type="pie"
            lines={[
              { dataKey: 'value', stroke: '#ffffff', fill: 'color' }
            ]}
            height={220}
          />
        </div>
      </PremiumCard>
      
      <h2 className="text-lg font-medium mb-4">Income vs Spending Trends</h2>
      
      <PremiumCard className="mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <p className="text-sm">Income</p>
            </div>
            <p className="text-sm font-medium">{formatCurrency(yearlyData[yearlyData.length - 1].income)}</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <p className="text-sm">Expenses</p>
            </div>
            <p className="text-sm font-medium">{formatCurrency(yearlyData[yearlyData.length - 1].expense)}</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
            <div 
              className="bg-red-500 h-2 rounded-full" 
              style={{ width: `${(yearlyData[yearlyData.length - 1].expense / yearlyData[yearlyData.length - 1].income) * 100}%` }}
            ></div>
          </div>
        </div>
      </PremiumCard>
    </motion.div>
  );
};

export default EnhancedAnalyticsPage;
