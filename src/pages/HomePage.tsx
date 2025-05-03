
import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Bell } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import SummaryCard from '@/components/SummaryCard';
import TransactionItem from '@/components/TransactionItem';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/utils/formatters';

const HomePage: React.FC = () => {
  const { totalBalance, incomeTotal, expenseTotal, getRecentTransactions } = useApp();
  const transactions = getRecentTransactions(5);
  const navigate = useNavigate();
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">SMS-Fi Flow</h1>
          <p className="text-gray-500">Your financial dashboard</p>
        </div>
        <button className="p-2 rounded-full bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      <div className="bg-primary rounded-xl text-white p-5 mb-6">
        <p className="text-sm opacity-80 mb-1">Total Balance</p>
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
      
      <div className="mb-6 grid grid-cols-2 gap-4">
        <SummaryCard 
          title="Income"
          amount={incomeTotal}
          icon={<TrendingUp className="h-5 w-5" />}
          trend={8}
        />
        <SummaryCard 
          title="Expenses"
          amount={expenseTotal}
          icon={<TrendingDown className="h-5 w-5" />}
          trend={-3}
        />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <button 
            className="text-primary text-sm"
            onClick={() => navigate('/transactions')}
          >
            View All
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
          <button className="text-primary text-sm">View All</button>
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

export default HomePage;
