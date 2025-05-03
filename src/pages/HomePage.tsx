
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/formatters';
import PremiumCard from '@/components/PremiumCard';
import PremiumTransactionItem from '@/components/PremiumTransactionItem';
import EnhancedChart from '@/components/EnhancedChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Zap
} from 'lucide-react';
import PremiumProgress from '@/components/PremiumProgress';
import IconBox from '@/components/IconBox';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { transactions, totalBalance, incomeTotal, expenseTotal } = useApp();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  
  // Get recent transactions
  const recentTransactions = transactions
    .slice(0, 5)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Demo chart data
  const chartData = [
    { name: 'Jan', expense: 6000, income: 9000 },
    { name: 'Feb', expense: 7500, income: 9500 },
    { name: 'Mar', expense: 5500, income: 9200 },
    { name: 'Apr', expense: 8000, income: 10500 },
    { name: 'May', expense: 6800, income: 11000 },
    { name: 'Jun', expense: 7200, income: 10800 },
  ];
  
  const budgets = [
    { category: 'Shopping', current: 5200, limit: 8000, percentage: 65 },
    { category: 'Food', current: 4800, limit: 6000, percentage: 80 },
    { category: 'Transport', current: 2100, limit: 3000, percentage: 70 },
  ];
  
  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Welcome back,</h1>
        <p className="text-finance-medium">Here's your financial summary</p>
      </div>
      
      <PremiumCard variant="gradient" className="mb-6" withPattern>
        <div className="flex justify-between mb-2">
          <h2 className="text-sm font-medium opacity-90">Available Balance</h2>
          <Button variant="ghost" size="sm" className="h-7 px-2 bg-white/20 text-white" onClick={() => navigate('/banks')}>
            <Wallet className="h-4 w-4 mr-1" /> View Accounts
          </Button>
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
      
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">Cash Flow</h2>
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
          onClick={() => navigate('/transactions')}
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
                onClick={() => navigate('/transactions')}
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
        <h2 className="text-lg font-bold">Budget Overview</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-finance-medium"
          onClick={() => navigate('/budgets')}
        >
          Manage
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <PremiumCard className="mb-6">
        {budgets.map((budget, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{budget.category}</span>
              <span className="text-sm">
                {formatCurrency(budget.current)} / {formatCurrency(budget.limit)}
              </span>
            </div>
            <PremiumProgress 
              value={budget.percentage} 
              color={budget.percentage > 80 ? "warning" : "success"}
            />
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
            <h3 className="font-value text-lg mb-1">Get Financial Insights</h3>
            <p className="text-sm mb-3 opacity-90">
              Discover personalized insights about your spending habits and financial health.
            </p>
            <Button 
              size="sm" 
              className="bg-white text-finance-navy hover:bg-white/90"
              onClick={() => navigate('/ai-insights')}
            >
              View Insights
            </Button>
          </div>
        </div>
      </PremiumCard>
      
      <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
};

export default HomePage;
