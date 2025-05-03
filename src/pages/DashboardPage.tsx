
import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Bell, ChevronRight, BarChart3, ArrowUpRight, Zap, Calendar, RefreshCw } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import SummaryCard from '@/components/SummaryCard';
import TransactionItem from '@/components/TransactionItem';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/utils/formatters';
import { Progress } from "@/components/ui/progress";
import EnhancedChart from '@/components/EnhancedChart';

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
    <div className="p-4 pb-28 max-w-md mx-auto">
      <div className="bg-gradient-to-r from-primary to-blue-400 rounded-xl text-white p-5 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm opacity-90">Total Balance</p>
          <div className="bg-white/20 rounded-full p-1.5">
            <RefreshCw className="h-4 w-4" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">{formatCurrency(totalBalance)}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs opacity-80">Income</p>
              <p className="font-medium">{formatCurrency(incomeTotal)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
              <TrendingDown className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs opacity-80">Expenses</p>
              <p className="font-medium">{formatCurrency(expenseTotal)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Monthly Overview</h3>
          <p className="text-sm text-primary">May 2025</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-gray-500">Saving</p>
              <p className="text-sm font-medium">{savingsRatio}%</p>
            </div>
            <Progress value={savingsRatio} className="h-2 mb-1" />
            <p className="text-xs text-gray-500">of monthly income</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-gray-500">Budget</p>
              <p className="text-sm font-medium">70%</p>
            </div>
            <Progress value={70} className="h-2 mb-1" />
            <p className="text-xs text-gray-500">used this month</p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <div onClick={() => navigate('/analytics')} className="flex items-center text-primary cursor-pointer text-sm">
            <span>See Analytics</span>
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </div>
          <div onClick={() => navigate('/insights')} className="flex items-center text-primary cursor-pointer text-sm">
            <span>View Insights</span>
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-500">Weekly Spending</p>
              <p className="text-xl font-semibold">₹12,400</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Zap className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div className="h-16">
            <EnhancedChart 
              data={spendingTrendData}
              type="area"
              xAxisKey="day"
              showGrid={false}
              height="100%"
              lines={[{ dataKey: 'amount', stroke: '#0EA5E9', fill: '#0EA5E9', fillOpacity: 0.1 }]}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-500">Upcoming</p>
              <p className="text-xl font-semibold">₹34,500</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Bills</span>
              <span>₹22,500</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-500">EMIs</span>
              <span>₹12,000</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <button 
            className="text-primary text-sm flex items-center"
            onClick={() => navigate('/transactions')}
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
                onClick={() => navigate(`/transaction/${transaction.id}`)}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No transactions yet
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Upcoming Bills</h2>
          <button className="text-primary text-sm flex items-center">
            View All
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Credit Card Bill</p>
                <p className="text-sm text-gray-500">Due in 3 days</p>
              </div>
            </div>
            <p className="font-medium text-expense">₹12,500</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Wallet className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Rent</p>
                <p className="text-sm text-gray-500">Due next week</p>
              </div>
            </div>
            <p className="font-medium text-expense">₹22,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
