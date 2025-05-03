
import React from 'react';
import { Wallet, TrendingUp, TrendingDown, ChevronRight, ArrowUpRight, Zap, Calendar, RefreshCw, BarChart3, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import TransactionItem from '@/components/TransactionItem';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/utils/formatters';
import { Progress } from "@/components/ui/progress";
import EnhancedChart from '@/components/EnhancedChart';
import PremiumCard from '@/components/PremiumCard';
import IconBox from '@/components/IconBox';

const DashboardPage: React.FC = () => {
  const { totalBalance, incomeTotal, expenseTotal, getRecentTransactions } = useApp();
  const transactions = getRecentTransactions(5);
  const navigate = useNavigate();
  
  // Calculate savings ratio
  const savingsRatio = incomeTotal > 0 ? Math.round(((incomeTotal - expenseTotal) / incomeTotal) * 100) : 0;
  
  // Sample spending data for mini chart
  const spendingTrendData = [
    { day: 'Mon', amount: 1200 },
    { day: 'Tue', amount: 1800 },
    { day: 'Wed', amount: 1500 },
    { day: 'Thu', amount: 2200 },
    { day: 'Fri', amount: 1900 },
    { day: 'Sat', amount: 2500 },
    { day: 'Sun', amount: 1300 },
  ];
  
  return (
    <div className="p-5 pb-28 max-w-md mx-auto">
      <PremiumCard 
        variant="gradient" 
        className="mb-6" 
        withPattern
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm opacity-90 font-label">Total Balance</p>
          <div className="bg-white/20 rounded-full p-1.5">
            <RefreshCw className="h-4 w-4" />
          </div>
        </div>
        <h2 className="text-3xl font-value mb-4">{formatCurrency(totalBalance)}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs opacity-80 font-label">Income</p>
              <p className="font-value">{formatCurrency(incomeTotal)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <TrendingDown className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs opacity-80 font-label">Expenses</p>
              <p className="font-value">{formatCurrency(expenseTotal)}</p>
            </div>
          </div>
        </div>
      </PremiumCard>
      
      <PremiumCard className="mb-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-lg font-heading">Monthly Overview</h3>
            <p className="text-sm text-finance-medium">May 2025</p>
          </div>
          <IconBox icon={Calendar} color="navy" />
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-finance-medium font-label">Savings Rate</p>
              <p className="text-sm font-value text-finance-navy">{savingsRatio}%</p>
            </div>
            <Progress value={savingsRatio} className="h-2 mb-1 bg-gray-100" indicatorClassName="bg-finance-navy" />
            <p className="text-xs text-finance-light">of monthly income</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-finance-medium font-label">Budget Used</p>
              <p className="text-sm font-value text-finance-sky">70%</p>
            </div>
            <Progress value={70} className="h-2 mb-1 bg-gray-100" indicatorClassName="bg-finance-sky" />
            <p className="text-xs text-finance-light">of monthly allocation</p>
          </div>
        </div>
        
        <div className="flex justify-between border-t border-gray-100 pt-4">
          <div onClick={() => navigate('/analytics')} className="flex items-center text-finance-navy cursor-pointer">
            <span className="font-value">Analytics</span>
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </div>
          <div onClick={() => navigate('/insights')} className="flex items-center text-finance-navy cursor-pointer">
            <span className="font-value">Insights</span>
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </PremiumCard>
      
      <div className="mb-6 grid grid-cols-2 gap-4">
        <PremiumCard>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm text-finance-medium font-label">Weekly Spending</p>
              <p className="text-xl font-value">₹12,400</p>
            </div>
            <IconBox icon={Zap} color="blue" />
          </div>
          <div className="h-20">
            <EnhancedChart 
              data={spendingTrendData}
              type="area"
              xAxisKey="day"
              showGrid={false}
              height="100%"
              lines={[{ dataKey: 'amount', stroke: '#0EA5E9', fill: '#0EA5E9', fillOpacity: 0.1 }]}
            />
          </div>
        </PremiumCard>
        <PremiumCard>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm text-finance-medium font-label">Upcoming Bills</p>
              <p className="text-xl font-value">₹34,500</p>
            </div>
            <IconBox icon={Calendar} color="amber" />
          </div>
          <div className="space-y-2 mt-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-finance-medium font-label">Bills</span>
              <span className="font-value">₹22,500</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-finance-medium font-label">EMIs</span>
              <span className="font-value">₹12,000</span>
            </div>
          </div>
        </PremiumCard>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-heading">Recent Transactions</h2>
          <button 
            className="text-finance-navy flex items-center font-value"
            onClick={() => navigate('/transactions')}
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <PremiumCard className="p-0 overflow-hidden">
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
                onClick={() => navigate(`/transaction/${transaction.id}`)}
              />
            ))
          ) : (
            <div className="p-5 text-center text-finance-medium">
              No transactions yet
            </div>
          )}
          
          <div className="bg-gray-50 p-3 text-center">
            <button 
              className="text-finance-navy flex items-center font-value mx-auto"
              onClick={() => navigate('/add-transaction')}
            >
              Add Transaction
              <Plus className="h-4 w-4 ml-1" />
            </button>
          </div>
        </PremiumCard>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-heading">Upcoming Bills</h2>
          <button 
            className="text-finance-navy flex items-center font-value"
            onClick={() => navigate('/bills')}
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <PremiumCard>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <IconBox icon={Wallet} color="blue" size="md" className="mr-3" />
              <div>
                <p className="font-value">Credit Card Bill</p>
                <p className="text-sm text-finance-light">Due in 3 days</p>
              </div>
            </div>
            <p className="font-value text-expense">₹12,500</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IconBox icon={Wallet} color="purple" size="md" className="mr-3" />
              <div>
                <p className="font-value">Rent</p>
                <p className="text-sm text-finance-light">Due next week</p>
              </div>
            </div>
            <p className="font-value text-expense">₹22,000</p>
          </div>
        </PremiumCard>
      </div>
      
      <PremiumCard variant="gradient" className="flex items-center p-5" withPattern>
        <div className="flex-1">
          <h3 className="text-lg font-value mb-1">AI Financial Assistant</h3>
          <p className="text-sm opacity-90">Get personalized insights about your finances</p>
        </div>
        <button 
          className="bg-white/20 hover:bg-white/30 text-white rounded-xl py-2 px-4 flex items-center font-value transition-all"
          onClick={() => navigate('/ai-insights')}
        >
          Explore
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </PremiumCard>
    </div>
  );
};

export default DashboardPage;
