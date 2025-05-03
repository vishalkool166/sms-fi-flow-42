
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import CategoryChart from '@/components/CategoryChart';
import { formatCurrency } from '@/utils/formatters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const { transactions, expenseTotal, getTransactionsByCategory } = useApp();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  
  const categoryData = getTransactionsByCategory();
  
  const chartData = Object.entries(categoryData).map(([name, value]) => {
    const colorMap: Record<string, string> = {
      food: '#F97316',
      transport: '#0EA5E9',
      shopping: '#8B5CF6',
      entertainment: '#EC4899',
      utilities: '#6B7280',
      health: '#EF4444',
      education: '#F59E0B',
      other: '#6B7280',
    };
    
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: colorMap[name] || '#6B7280',
    };
  });
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      
      <Tabs defaultValue="expenses">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>
        
        <TabsContent value="expenses">
          <div className="mb-4">
            <div className="mb-2 text-sm text-gray-500">Total Expenses</div>
            <div className="flex items-center">
              <TrendingDown className="h-5 w-5 text-expense mr-2" />
              <span className="text-2xl font-semibold">{formatCurrency(expenseTotal)}</span>
            </div>
          </div>
          
          <div className="flex justify-between mb-6">
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                period === 'week' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
              onClick={() => setPeriod('week')}
            >
              Week
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                period === 'month' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
              onClick={() => setPeriod('month')}
            >
              Month
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                period === 'year' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
              onClick={() => setPeriod('year')}
            >
              Year
            </button>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
            <CategoryChart data={chartData} />
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
            
            {chartData.length > 0 ? (
              <div className="space-y-3">
                {chartData
                  .sort((a, b) => b.value - a.value)
                  .map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <div className="font-medium">{formatCurrency(item.value)}</div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">
                No expense data available
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="income">
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
            <p className="text-gray-500">Income analytics coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
