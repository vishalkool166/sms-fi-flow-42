
import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/formatters';
import CategoryChart from '@/components/CategoryChart';
import MonthlyTrendChart from '@/components/MonthlyTrendChart';
import SpendingInsightsCard from '@/components/SpendingInsightsCard';

const InsightsPage: React.FC = () => {
  const { getTransactionsByCategory } = useApp();
  
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

  // Monthly trends data
  const trendData = [
    { month: 'Jan', income: 45000, expense: 32000 },
    { month: 'Feb', income: 52000, expense: 36000 },
    { month: 'Mar', income: 49000, expense: 39000 },
    { month: 'Apr', income: 54000, expense: 42000 },
    { month: 'May', income: 57000, expense: 38000 },
  ];
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Financial Insights</h1>
        <div className="flex items-center text-sm text-primary cursor-pointer">
          <Calendar className="h-4 w-4 mr-1" />
          <span>This Month</span>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Total Income</p>
              <p className="text-xl font-semibold text-income">₹54,000</p>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>8% from last month</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
              <p className="text-xl font-semibold text-expense">₹42,000</p>
              <div className="flex items-center text-xs text-red-600 mt-2">
                <TrendingDown className="h-3 w-3 mr-1" />
                <span>12% from last month</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Monthly Trend</h3>
              <div className="flex items-center text-xs">
                <div className="flex items-center mr-3">
                  <div className="w-3 h-3 rounded-full bg-income mr-1"></div>
                  <span>Income</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-expense mr-1"></div>
                  <span>Expense</span>
                </div>
              </div>
            </div>
            <MonthlyTrendChart data={trendData} />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Smart Insights</h3>
              <div className="text-primary text-sm flex items-center cursor-pointer">
                <span>View All</span>
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </div>
            </div>
            <div className="space-y-3">
              <SpendingInsightsCard 
                title="Spending on Food increased"
                description="Your food expenses are 18% higher than last month"
                trend="up"
                priority="warning"
              />
              
              <SpendingInsightsCard 
                title="Great job on Transport!"
                description="You've reduced transport costs by 12%"
                trend="down"
              />
              
              <SpendingInsightsCard 
                title="Subscription due soon"
                description="Netflix subscription (₹649) due in 3 days"
                priority="warning"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="expenses">
          <div className="mb-6">
            <div className="mb-4 text-sm text-gray-500">Total Expenses</div>
            <div className="flex items-center">
              <TrendingDown className="h-5 w-5 text-expense mr-2" />
              <span className="text-2xl font-semibold">₹42,000</span>
            </div>
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
          <div className="mb-6">
            <div className="mb-4 text-sm text-gray-500">Total Income</div>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-income mr-2" />
              <span className="text-2xl font-semibold">₹54,000</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4">Income Sources</h3>
            <div className="h-64 flex items-center justify-center">
              <CategoryChart 
                data={[
                  { name: 'Salary', value: 48000, color: '#10B981' },
                  { name: 'Freelance', value: 4000, color: '#6366F1' },
                  { name: 'Investments', value: 2000, color: '#F59E0B' },
                ]} 
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsightsPage;
