
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/formatters';
import PremiumCard from '@/components/PremiumCard';
import PremiumTransactionItem from '@/components/PremiumTransactionItem';
import EnhancedChart from '@/components/EnhancedChart';
import { Button } from '@/components/ui/button';
import { 
  ArrowDown, 
  ArrowUp, 
  CreditCard, 
  Calendar, 
  Wallet, 
  TrendingUp, 
  PlusCircle, 
  ChevronRight,
  Zap,
  Bell,
  BarChart2,
  PieChart
} from 'lucide-react';
import IconBox from '@/components/IconBox';
import PremiumProgress from '@/components/PremiumProgress';
import SpendingInsightsCard from '@/components/SpendingInsightsCard';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { transactions, totalBalance, incomeTotal, expenseTotal } = useApp();
  
  // Get recent transactions
  const recentTransactions = transactions
    .slice(0, 3)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Demo chart data
  const chartData = [
    { name: 'Jan', expense: 6000, income: 9000 },
    { name: 'Feb', expense: 7500, income: 9500 },
    { name: 'Mar', expense: 5500, income: 9200 },
    { name: 'Apr', expense: 8000, income: 10500 },
    { name: 'May', expense: 6800, income: 11000 },
  ];
  
  // Demo spending categories data
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
      description: "Your food spending is 15% higher than last month.",
      trend: "up",
      priority: "warning"
    },
    {
      title: "Shopping savings",
      description: "You spent less on shopping compared to your monthly average.",
      trend: "down",
      priority: "normal"
    },
  ];

  // Upcoming bills
  const upcomingBills = [
    { name: "Credit Card Bill", amount: 12500, dueDate: "2025-05-06" },
    { name: "Rent", amount: 22000, dueDate: "2025-05-10" },
  ];

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-finance-medium">Financial overview</p>
      </div>
      
      <PremiumCard variant="gradient" className="mb-6" withPattern>
        <div className="flex justify-between mb-2">
          <h2 className="text-sm font-medium opacity-90">Available Balance</h2>
          <div className="flex">
            <Button variant="ghost" size="sm" className="h-7 px-2 bg-white/20 text-white" onClick={() => navigate('/notifications')}>
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 bg-white/20 text-white ml-2" onClick={() => navigate('/banks')}>
              <Wallet className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-2xl font-bold mb-5">{formatCurrency(totalBalance)}</div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <ArrowDown className="h-4 w-4 mr-2" />
              <span className="text-sm">Expenses</span>
            </div>
            <div className="text-lg font-medium">{formatCurrency(expenseTotal)}</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <ArrowUp className="h-4 w-4 mr-2" />
              <span className="text-sm">Income</span>
            </div>
            <div className="text-lg font-medium">{formatCurrency(incomeTotal)}</div>
          </div>
        </div>
      </PremiumCard>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          className="w-full flex flex-col items-center py-6 h-auto"
          variant="outline"
          onClick={() => navigate('/add-transaction?type=expense')}
        >
          <ArrowDown className="h-6 w-6 mb-2 text-expense" />
          <span>Add Expense</span>
        </Button>
        <Button 
          className="w-full flex flex-col items-center py-6 h-auto"
          variant="outline"
          onClick={() => navigate('/add-transaction?type=income')}
        >
          <ArrowUp className="h-6 w-6 mb-2 text-income" />
          <span>Add Income</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <PremiumCard className="p-4 cursor-pointer" onClick={() => navigate('/analytics')}>
          <div className="flex flex-col items-center">
            <IconBox icon={BarChart2} color="blue" size="md" className="mb-3" />
            <span className="text-sm font-medium">Analytics</span>
          </div>
        </PremiumCard>
        <PremiumCard className="p-4 cursor-pointer" onClick={() => navigate('/insights')}>
          <div className="flex flex-col items-center">
            <IconBox icon={PieChart} color="purple" size="md" className="mb-3" />
            <span className="text-sm font-medium">Insights</span>
          </div>
        </PremiumCard>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Monthly Overview</h2>
      </div>
      
      <PremiumCard className="mb-6">
        <div className="h-60">
          <EnhancedChart 
            data={chartData} 
            type="area"
            lines={[
              { dataKey: 'income', stroke: '#10B981', fill: '#10B981', fillOpacity: 0.2 },
              { dataKey: 'expense', stroke: '#F97316', fill: '#F97316', fillOpacity: 0.2 }
            ]}
            height={220}
          />
        </div>
      </PremiumCard>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Recent Transactions</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-finance-medium"
          onClick={() => navigate('/home')}
        >
          See All
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <PremiumCard className="mb-6">
        {recentTransactions.length > 0 ? (
          <div>
            {recentTransactions.map((transaction) => (
              <PremiumTransactionItem 
                key={transaction.id}
                transaction={transaction}
                onClick={() => navigate(`/transaction/${transaction.id}`)}
              />
            ))}
            <div className="p-3 text-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/home')}
              >
                View All Transactions
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="flex justify-center mb-2">
              <CreditCard className="h-10 w-10 text-gray-300" />
            </div>
            <p className="text-finance-medium mb-4">No transactions yet</p>
            <Button onClick={() => navigate('/add-transaction')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        )}
      </PremiumCard>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Spending Insights</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-finance-medium"
          onClick={() => navigate('/ai-insights')}
        >
          All Insights
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="grid gap-4 mb-6">
        {insights.map((insight, index) => (
          <SpendingInsightsCard 
            key={index}
            title={insight.title}
            description={insight.description}
            trend={insight.trend as 'up' | 'down'}
            priority={insight.priority as 'normal' | 'warning'}
          />
        ))}
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Upcoming Bills</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-finance-medium"
          onClick={() => navigate('/bills')}
        >
          All Bills
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <PremiumCard className="mb-6">
        {upcomingBills.map((bill, index) => (
          <div 
            key={index} 
            className="p-3 border-b border-gray-100 last:border-none flex items-center justify-between"
            onClick={() => navigate('/bills')}
          >
            <div className="flex items-center">
              <IconBox icon={Calendar} color="blue" className="mr-3" />
              <div>
                <p className="font-value">{bill.name}</p>
                <p className="text-xs text-finance-light">Due on {bill.dueDate}</p>
              </div>
            </div>
            <p className="text-expense font-value">{formatCurrency(bill.amount)}</p>
          </div>
        ))}
      </PremiumCard>
      
      <PremiumCard className="mb-6 p-5 bg-gradient-to-r from-finance-navy to-finance-sky text-white" withPattern>
        <div className="flex items-start">
          <IconBox 
            icon={Zap} 
            color="yellow" 
            size="lg" 
            className="mr-4 bg-white/20 text-white"
          />
          <div className="flex-1">
            <h3 className="font-value text-lg mb-1">SMS Scan Feature</h3>
            <p className="text-sm mb-3 opacity-90">
              Automatically detect transactions from your SMS messages to track your expenses.
            </p>
            <Button 
              size="sm" 
              className="bg-white text-finance-navy hover:bg-white/90"
              onClick={() => navigate('/scan-sms')}
            >
              Scan SMS
            </Button>
          </div>
        </div>
      </PremiumCard>
    </div>
  );
};

export default DashboardPage;
