
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/formatters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Calendar, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EnhancedChart from '@/components/EnhancedChart';

const EnhancedAnalyticsPage: React.FC = () => {
  const { transactions, expenseTotal, getTransactionsByCategory } = useApp();
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  
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
  const monthlyData = [
    { month: 'Jan', income: 45000, expense: 32000, savings: 13000 },
    { month: 'Feb', income: 52000, expense: 36000, savings: 16000 },
    { month: 'Mar', income: 49000, expense: 39000, savings: 10000 },
    { month: 'Apr', income: 54000, expense: 42000, savings: 12000 },
    { month: 'May', income: 57000, expense: 38000, savings: 19000 },
  ];

  // Category trend data
  const categoryTrendData = [
    { month: 'Jan', food: 8500, transport: 6200, shopping: 9500, entertainment: 5800, utilities: 4000 },
    { month: 'Feb', food: 9200, transport: 5800, shopping: 8800, entertainment: 6500, utilities: 4200 },
    { month: 'Mar', food: 10500, transport: 6100, shopping: 7900, entertainment: 7200, utilities: 4500 },
    { month: 'Apr', food: 9800, transport: 6300, shopping: 12500, entertainment: 5900, utilities: 4100 },
    { month: 'May', food: 8700, transport: 5900, shopping: 8200, entertainment: 6800, utilities: 4300 },
  ];

  // Custom tooltip for charts
  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.stroke || entry.fill }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex gap-2">
          <Button size="icon" variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-3 mb-6 bg-gray-100">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-primary data-[state=active]:text-white">Expenses</TabsTrigger>
          <TabsTrigger value="income" className="data-[state=active]:bg-primary data-[state=active]:text-white">Income</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
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
                period === 'quarter' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
              onClick={() => setPeriod('quarter')}
            >
              Quarter
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
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm text-gray-500">Income</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-xl font-semibold">₹57,000</span>
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm text-gray-500">Expenses</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center">
                  <TrendingDown className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-xl font-semibold">₹38,000</span>
                </div>
                <p className="text-xs text-red-600 mt-1">↓ 5% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Monthly Trend</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-64">
                <EnhancedChart 
                  data={monthlyData}
                  type="composed"
                  lines={[
                    { dataKey: 'expense', stroke: '#F97316', fill: '#F97316' },
                    { dataKey: 'income', stroke: '#10B981', strokeWidth: 2 },
                  ]}
                  xAxisKey="month"
                  renderTooltip={renderCustomTooltip}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Savings Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-64">
                <EnhancedChart 
                  data={monthlyData}
                  type="area"
                  lines={[
                    { dataKey: 'savings', stroke: '#8B5CF6', fill: '#8B5CF6', fillOpacity: 0.2 },
                  ]}
                  xAxisKey="month"
                  renderTooltip={renderCustomTooltip}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses">
          <div className="mb-6">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">Total Expenses</div>
                <div className="flex items-center">
                  <TrendingDown className="h-5 w-5 text-expense mr-2" />
                  <span className="text-2xl font-semibold">{formatCurrency(expenseTotal)}</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-primary cursor-pointer">
                <Calendar className="h-4 w-4 mr-1" />
                <span>May 2025</span>
              </div>
            </div>
          
            <Card className="mb-6">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Spending by Category</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-64">
                  <EnhancedChart 
                    data={chartData}
                    type="bar"
                    lines={[{ dataKey: 'value', stroke: '#0EA5E9', fill: '#0EA5E9' }]}
                    xAxisKey="name"
                    renderTooltip={renderCustomTooltip}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Expense Trends</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-72">
                  <EnhancedChart 
                    data={categoryTrendData}
                    type="stacked"
                    lines={[
                      { dataKey: 'food', stroke: '#F97316', fill: '#F97316' },
                      { dataKey: 'transport', stroke: '#0EA5E9', fill: '#0EA5E9' },
                      { dataKey: 'shopping', stroke: '#8B5CF6', fill: '#8B5CF6' },
                      { dataKey: 'entertainment', stroke: '#EC4899', fill: '#EC4899' },
                      { dataKey: 'utilities', stroke: '#6B7280', fill: '#6B7280' },
                    ]}
                    xAxisKey="month"
                    renderTooltip={renderCustomTooltip}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="income">
          <div className="mb-6">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">Total Income</div>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-income mr-2" />
                  <span className="text-2xl font-semibold">₹57,000</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-primary cursor-pointer">
                <Calendar className="h-4 w-4 mr-1" />
                <span>May 2025</span>
              </div>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Income Sources</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-64">
                  <EnhancedChart 
                    data={[
                      { name: 'Salary', value: 48000, color: '#10B981' },
                      { name: 'Freelance', value: 6000, color: '#6366F1' },
                      { name: 'Investments', value: 3000, color: '#F59E0B' },
                    ]}
                    type="bar"
                    lines={[{ dataKey: 'value', stroke: '#10B981', fill: '#10B981' }]}
                    xAxisKey="name"
                    renderTooltip={renderCustomTooltip}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Income Trend</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-64">
                  <EnhancedChart 
                    data={[
                      { month: 'Jan', salary: 45000, freelance: 0, investments: 0 },
                      { month: 'Feb', salary: 45000, freelance: 4000, investments: 3000 },
                      { month: 'Mar', salary: 45000, freelance: 2000, investments: 2000 },
                      { month: 'Apr', salary: 45000, freelance: 5000, investments: 4000 },
                      { month: 'May', salary: 48000, freelance: 6000, investments: 3000 },
                    ]}
                    type="stacked"
                    lines={[
                      { dataKey: 'salary', stroke: '#10B981', fill: '#10B981' },
                      { dataKey: 'freelance', stroke: '#6366F1', fill: '#6366F1' },
                      { dataKey: 'investments', stroke: '#F59E0B', fill: '#F59E0B' },
                    ]}
                    xAxisKey="month"
                    renderTooltip={renderCustomTooltip}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAnalyticsPage;
