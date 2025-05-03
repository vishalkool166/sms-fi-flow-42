
import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  ArrowUpRight,
  Zap,
  PiggyBank,
  CreditCard,
  BarChart3
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/formatters';
import EnhancedChart from '@/components/EnhancedChart';
import SpendingInsightsCard from '@/components/SpendingInsightsCard';
import { Progress } from '@/components/ui/progress';

const FinancialInsightsPage: React.FC = () => {
  const { getTransactionsByCategory } = useApp();
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  
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

  // Subscription data for bubble chart
  const subscriptionData = [
    { name: 'Netflix', amount: 649, category: 'Entertainment' },
    { name: 'Amazon Prime', amount: 179, category: 'Entertainment' },
    { name: 'Spotify', amount: 119, category: 'Entertainment' },
    { name: 'Gym', amount: 1200, category: 'Health' },
    { name: 'iCloud', amount: 75, category: 'Utility' },
  ];

  // Projected savings data
  const projectedData = [
    { month: 'Jun', projected: 20000, actual: 0 },
    { month: 'Jul', projected: 21000, actual: 0 },
    { month: 'Aug', projected: 22000, actual: 0 },
    { month: 'Sep', projected: 23000, actual: 0 },
    { month: 'Oct', projected: 24000, actual: 0 },
  ];

  // Past savings data
  const savingsHistoryData = [
    { month: 'Jan', amount: 13000 },
    { month: 'Feb', amount: 16000 },
    { month: 'Mar', amount: 10000 },
    { month: 'Apr', amount: 12000 },
    { month: 'May', amount: 19000 },
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
        <h1 className="text-2xl font-bold">Financial Insights</h1>
        <div className="flex items-center text-sm text-primary cursor-pointer">
          <Calendar className="h-4 w-4 mr-1" />
          <span>May 2025</span>
        </div>
      </div>
      
      <div className="flex justify-between mb-6">
        <button
          className={`px-4 py-1 rounded-full text-sm ${
            period === 'month' ? 'bg-primary text-white' : 'bg-gray-100'
          }`}
          onClick={() => setPeriod('month')}
        >
          Month
        </button>
        <button
          className={`px-4 py-1 rounded-full text-sm ${
            period === 'quarter' ? 'bg-primary text-white' : 'bg-gray-100'
          }`}
          onClick={() => setPeriod('quarter')}
        >
          Quarter
        </button>
        <button
          className={`px-4 py-1 rounded-full text-sm ${
            period === 'year' ? 'bg-primary text-white' : 'bg-gray-100'
          }`}
          onClick={() => setPeriod('year')}
        >
          Year
        </button>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-gray-500">Income</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-xl font-semibold">₹57,000</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <span>+8% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-gray-500">Expenses</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-xl font-semibold">₹38,000</p>
                <div className="flex items-center text-xs text-red-600 mt-1">
                  <span>-5% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold">Monthly Trend</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-64">
                <EnhancedChart 
                  data={trendData}
                  type="area"
                  lines={[
                    { dataKey: 'income', stroke: '#10B981', fill: '#10B981', fillOpacity: 0.1 },
                    { dataKey: 'expense', stroke: '#F97316', fill: '#F97316', fillOpacity: 0.1 },
                  ]}
                  xAxisKey="month"
                  renderTooltip={renderCustomTooltip}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold">Savings Projection</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-64">
                <EnhancedChart 
                  data={[...savingsHistoryData, ...projectedData]}
                  type="line"
                  lines={[
                    { dataKey: 'amount', stroke: '#8B5CF6', strokeWidth: 2 },
                    { dataKey: 'projected', stroke: '#8B5CF6', strokeWidth: 2, fill: '#8B5CF6', fillOpacity: 0.1 },
                    { dataKey: 'actual', stroke: '#10B981', strokeWidth: 2 },
                  ]}
                  xAxisKey="month"
                  renderTooltip={renderCustomTooltip}
                />
              </div>
            </CardContent>
          </Card>
          
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
        
        <TabsContent value="spending">
          <div className="mb-6">
            <div className="mb-4 text-sm text-gray-500">Total Expenses</div>
            <div className="flex items-center">
              <TrendingDown className="h-5 w-5 text-expense mr-2" />
              <span className="text-2xl font-semibold">₹38,000</span>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold">Spending Distribution</CardTitle>
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
              <CardTitle className="text-lg font-semibold">Monthly Subscriptions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                {subscriptionData.map((sub, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{sub.name}</p>
                      <p className="text-xs text-gray-500">{sub.category}</p>
                    </div>
                    <div className="font-medium">{formatCurrency(sub.amount)}</div>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Total</p>
                    <p className="font-medium">
                      {formatCurrency(
                        subscriptionData.reduce((sum, sub) => sum + sub.amount, 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights">
          <Card className="mb-6">
            <CardHeader className="p-4 flex flex-row items-center">
              <div className="mr-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-blue-600" />
              </div>
              <CardTitle>Financial Health</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Savings Ratio</span>
                    <span className="font-medium">33%</span>
                  </div>
                  <Progress value={33} className="h-2 mb-1" />
                  <p className="text-xs text-gray-500">Recommended: 20%</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Budget Utilization</span>
                    <span className="font-medium">70%</span>
                  </div>
                  <Progress value={70} className="h-2 mb-1" />
                  <p className="text-xs text-gray-500">Healthy zone: below 85%</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Debt-to-Income</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <Progress value={28} className="h-2 mb-1" />
                  <p className="text-xs text-gray-500">Recommended: below 36%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader className="p-4 flex flex-row items-center">
              <div className="mr-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <PiggyBank className="h-4 w-4 text-green-600" />
              </div>
              <CardTitle>Savings Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">Food & Dining</p>
                    <p className="text-sm text-gray-500">Save up to ₹2,500</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Eating out 8 times this month. Consider cooking more at home.
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">Subscriptions</p>
                    <p className="text-sm text-gray-500">Save up to ₹350</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    You have unused subscriptions that can be canceled.
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">Transportation</p>
                    <p className="text-sm text-gray-500">Save up to ₹1,200</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Consider using public transport or carpooling more often.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader className="p-4 flex flex-row items-center">
              <div className="mr-2 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-orange-600" />
              </div>
              <CardTitle>Credit Card Insights</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">HDFC Credit Card</p>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Usage</span>
                    <span>₹8,450 of ₹50,000</span>
                  </div>
                  <Progress value={17} className="h-2 mt-1 mb-1" />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Due Date</span>
                    <span>May 10, 2025</span>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-800">Recommendation</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Pay your credit card bill in full to avoid interest charges of approximately ₹340 next month.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialInsightsPage;
