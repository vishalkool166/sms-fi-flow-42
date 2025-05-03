
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/formatters';
import EnhancedChart from '@/components/EnhancedChart';
import CategoryChart from '@/components/CategoryChart';
import PremiumCard from '@/components/PremiumCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingUp, TrendingDown, BarChart2, ArrowLeft, Zap } from 'lucide-react';
import SpendingInsightsCard from '@/components/SpendingInsightsCard';

const FinancialInsightsPage: React.FC = () => {
  const navigate = useNavigate();
  const { getTransactionsByCategory } = useApp();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  
  // Demo chart data
  const monthlyData = [
    { name: 'Jan', expense: 16000, income: 29000, savings: 13000 },
    { name: 'Feb', expense: 17500, income: 29500, savings: 12000 },
    { name: 'Mar', expense: 15500, income: 29200, savings: 13700 },
    { name: 'Apr', expense: 18000, income: 30500, savings: 12500 },
    { name: 'May', expense: 16800, income: 31000, savings: 14200 },
  ];
  
  // Demo category data
  const categoryData = [
    { name: 'Food', value: 4800, color: '#F97316' },
    { name: 'Shopping', value: 3200, color: '#8B5CF6' },
    { name: 'Transport', value: 2100, color: '#0EA5E9' },
    { name: 'Entertainment', value: 1800, color: '#EC4899' },
    { name: 'Utilities', value: 3200, color: '#6B7280' },
  ];
  
  // Demo insights
  const insights = [
    {
      title: "Food expenses increased",
      description: "Your food spending is 15% higher than last month. Consider setting a budget.",
      trend: "up",
      priority: "warning"
    },
    {
      title: "Shopping savings",
      description: "You spent less on shopping compared to your monthly average by 12%.",
      trend: "down",
      priority: "normal"
    },
    {
      title: "Income growth",
      description: "Your income has increased by 5% compared to last month.",
      trend: "up",
      priority: "normal"
    },
    {
      title: "Saving rate improved",
      description: "You're saving 28% of your income, which is 3% more than your usual rate.",
      trend: "up",
      priority: "normal"
    },
  ];
  
  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Financial Insights</h1>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="spending" className="flex-1">Spending</TabsTrigger>
          <TabsTrigger value="trends" className="flex-1">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Monthly Summary</h2>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant={period === 'month' ? 'default' : 'outline'} 
                className="h-7 px-3"
                onClick={() => setPeriod('month')}
              >
                M
              </Button>
              <Button 
                size="sm" 
                variant={period === 'year' ? 'default' : 'outline'} 
                className="h-7 px-3"
                onClick={() => setPeriod('year')}
              >
                Y
              </Button>
            </div>
          </div>
          
          <PremiumCard className="mb-6">
            <div className="h-60">
              <EnhancedChart 
                data={monthlyData} 
                type="composed"
                lines={[
                  { dataKey: 'expense', stroke: '#F97316', fill: '#F97316' },
                  { dataKey: 'income', stroke: '#10B981', strokeWidth: 3 }
                ]}
                height={220}
              />
            </div>
          </PremiumCard>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Spending by Category</h2>
          </div>
          
          <PremiumCard className="mb-6">
            <div className="h-72">
              <CategoryChart data={categoryData} />
            </div>
          </PremiumCard>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Financial Insights</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary"
              onClick={() => navigate('/ai-insights')}
            >
              <Zap className="h-4 w-4 mr-1" /> 
              AI Insights
            </Button>
          </div>
          
          <div className="space-y-4">
            {insights.slice(0, 2).map((insight, index) => (
              <SpendingInsightsCard 
                key={index}
                title={insight.title}
                description={insight.description}
                trend={insight.trend as 'up' | 'down'}
                priority={insight.priority as 'normal' | 'warning'}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="spending">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Spending Analysis</h2>
          </div>
          
          <PremiumCard className="mb-6">
            <div className="h-72">
              <CategoryChart data={categoryData} />
            </div>
            
            <div className="border-t border-gray-100 pt-4 mt-2">
              <h3 className="font-medium mb-3">Category Breakdown</h3>
              <div className="space-y-3">
                {categoryData
                  .sort((a, b) => b.value - a.value)
                  .map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <div className="font-medium">{formatCurrency(item.value)}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </PremiumCard>
          
          <PremiumCard className="mb-6">
            <h3 className="font-medium mb-3">Top Spending Merchants</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">A</div>
                  <span>Amazon</span>
                </div>
                <div className="font-medium">{formatCurrency(2500)}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">S</div>
                  <span>Swiggy</span>
                </div>
                <div className="font-medium">{formatCurrency(1800)}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">U</div>
                  <span>Uber</span>
                </div>
                <div className="font-medium">{formatCurrency(1200)}</div>
              </div>
            </div>
          </PremiumCard>
        </TabsContent>
        
        <TabsContent value="trends">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Spending Trends</h2>
          </div>
          
          <PremiumCard className="mb-6">
            <div className="h-60">
              <EnhancedChart 
                data={monthlyData} 
                type="line"
                lines={[
                  { dataKey: 'expense', stroke: '#F97316', strokeWidth: 2 }
                ]}
                height={220}
              />
            </div>
          </PremiumCard>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Income vs Savings</h2>
          </div>
          
          <PremiumCard className="mb-6">
            <div className="h-60">
              <EnhancedChart 
                data={monthlyData} 
                type="bar"
                lines={[
                  { dataKey: 'income', fill: '#10B981' },
                  { dataKey: 'savings', fill: '#3B82F6' }
                ]}
                height={220}
              />
            </div>
          </PremiumCard>
          
          <div className="space-y-4">
            {insights.slice(2, 4).map((insight, index) => (
              <SpendingInsightsCard 
                key={index}
                title={insight.title}
                description={insight.description}
                trend={insight.trend as 'up' | 'down'}
                priority={insight.priority as 'normal' | 'warning'}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialInsightsPage;
