
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/formatters';
import PremiumCard from '@/components/PremiumCard';
import EnhancedChart from '@/components/EnhancedChart';
import CategoryChart from '@/components/CategoryChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const EnhancedAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();
  const { transactions, expenseTotal, incomeTotal } = useApp();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [selectedMonth, setSelectedMonth] = useState<string>("May 2025");
  
  // Demo data for spending by category
  const categoryData = [
    { name: 'Food', value: 4800, color: '#F97316' },
    { name: 'Shopping', value: 3200, color: '#8B5CF6' },
    { name: 'Transport', value: 2100, color: '#0EA5E9' },
    { name: 'Entertainment', value: 1800, color: '#EC4899' },
    { name: 'Utilities', value: 3200, color: '#6B7280' },
    { name: 'Health', value: 1500, color: '#EF4444' },
    { name: 'Education', value: 1200, color: '#F59E0B' },
  ];
  
  // Demo data for trends
  const trendData = [
    { name: 'Jan', expense: 16000, income: 29000 },
    { name: 'Feb', expense: 17500, income: 29500 },
    { name: 'Mar', expense: 15500, income: 29200 },
    { name: 'Apr', expense: 18000, income: 30500 },
    { name: 'May', expense: 16800, income: 31000 },
  ];
  
  // Demo data for day by day spending
  const dailyData = [
    { name: '1', expense: 600 },
    { name: '5', expense: 900 },
    { name: '10', expense: 1200 },
    { name: '15', expense: 800 },
    { name: '20', expense: 1600 },
    { name: '25', expense: 700 },
    { name: '30', expense: 1100 },
  ];
  
  // Demo data for weekly spending
  const weeklyData = [
    { name: 'Week 1', expense: 3500 },
    { name: 'Week 2', expense: 4200 },
    { name: 'Week 3', expense: 3800 },
    { name: 'Week 4', expense: 5300 },
  ];
  
  const prevMonth = () => {
    // This is just a simulation for demo purposes
    const months = [
      "January 2025", "February 2025", "March 2025", 
      "April 2025", "May 2025", "June 2025"
    ];
    const currentIndex = months.indexOf(selectedMonth);
    if (currentIndex > 0) {
      setSelectedMonth(months[currentIndex - 1]);
    }
  };
  
  const nextMonth = () => {
    // This is just a simulation for demo purposes
    const months = [
      "January 2025", "February 2025", "March 2025", 
      "April 2025", "May 2025", "June 2025"
    ];
    const currentIndex = months.indexOf(selectedMonth);
    if (currentIndex < months.length - 1) {
      setSelectedMonth(months[currentIndex + 1]);
    }
  };
  
  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Analytics</h1>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="expenses" className="flex-1">Expenses</TabsTrigger>
          <TabsTrigger value="income" className="flex-1">Income</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Monthly Summary</h2>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant={period === 'week' ? 'default' : 'outline'} 
                className="h-7 px-3"
                onClick={() => setPeriod('week')}
              >
                W
              </Button>
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
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-finance-medium" />
                <h3 className="font-value">{selectedMonth}</h3>
              </div>
              <div className="flex space-x-1">
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={prevMonth}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={nextMonth}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded-lg border border-gray-100">
                <p className="text-sm text-finance-medium mb-1 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1 text-expense" /> 
                  Expenses
                </p>
                <p className="text-xl font-value">{formatCurrency(expenseTotal)}</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-100">
                <p className="text-sm text-finance-medium mb-1 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-income" /> 
                  Income
                </p>
                <p className="text-xl font-value">{formatCurrency(incomeTotal)}</p>
              </div>
            </div>
            
            <div className="h-60">
              <EnhancedChart 
                data={trendData} 
                type="area"
                lines={[
                  { dataKey: 'expense', stroke: '#F97316', fill: '#F97316', fillOpacity: 0.1 },
                  { dataKey: 'income', stroke: '#10B981', fill: '#10B981', fillOpacity: 0.1 }
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
            
            <div className="border-t border-gray-100 pt-4 mt-2">
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
        </TabsContent>
        
        <TabsContent value="expenses">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Expense Analysis</h2>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant={period === 'week' ? 'default' : 'outline'} 
                className="h-7 px-3"
                onClick={() => setPeriod('week')}
              >
                W
              </Button>
              <Button 
                size="sm" 
                variant={period === 'month' ? 'default' : 'outline'} 
                className="h-7 px-3"
                onClick={() => setPeriod('month')}
              >
                M
              </Button>
            </div>
          </div>
          
          <PremiumCard className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-finance-medium" />
                <h3 className="font-value">{selectedMonth}</h3>
              </div>
              <div className="flex space-x-1">
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={prevMonth}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={nextMonth}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-finance-medium mb-1">Total Expenses</p>
              <p className="text-2xl font-value text-expense">{formatCurrency(expenseTotal)}</p>
            </div>
            
            <div className="h-60">
              {period === 'month' ? (
                <EnhancedChart 
                  data={dailyData} 
                  type="bar"
                  lines={[
                    { dataKey: 'expense', fill: '#F97316' }
                  ]}
                  height={220}
                />
              ) : (
                <EnhancedChart 
                  data={weeklyData} 
                  type="bar"
                  lines={[
                    { dataKey: 'expense', fill: '#F97316' }
                  ]}
                  height={220}
                />
              )}
            </div>
          </PremiumCard>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Expense Breakdown</h2>
          </div>
          
          <PremiumCard className="mb-6">
            <div className="h-72">
              <CategoryChart data={categoryData} />
            </div>
          </PremiumCard>
        </TabsContent>
        
        <TabsContent value="income">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Income Analysis</h2>
          </div>
          
          <PremiumCard className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-finance-medium" />
                <h3 className="font-value">{selectedMonth}</h3>
              </div>
              <div className="flex space-x-1">
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={prevMonth}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={nextMonth}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-finance-medium mb-1">Total Income</p>
              <p className="text-2xl font-value text-income">{formatCurrency(incomeTotal)}</p>
            </div>
            
            <div className="h-60">
              <EnhancedChart 
                data={trendData} 
                type="line"
                lines={[
                  { dataKey: 'income', stroke: '#10B981', strokeWidth: 2 }
                ]}
                height={220}
              />
            </div>
          </PremiumCard>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Income Sources</h2>
          </div>
          
          <PremiumCard className="mb-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-value">Salary</p>
                    <p className="text-xs text-finance-light">Monthly</p>
                  </div>
                </div>
                <p className="text-income font-value">{formatCurrency(25000)}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-value">Investments</p>
                    <p className="text-xs text-finance-light">Dividends</p>
                  </div>
                </div>
                <p className="text-income font-value">{formatCurrency(6000)}</p>
              </div>
              
              <Button variant="outline" className="w-full">
                Add Income Source
              </Button>
            </div>
          </PremiumCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAnalyticsPage;
