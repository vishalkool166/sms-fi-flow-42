
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import PremiumCard from '@/components/PremiumCard';
import PremiumTransactionItem from '@/components/PremiumTransactionItem';
import PremiumProgress from '@/components/PremiumProgress';
import { formatCurrency } from '@/utils/formatters';
import { 
  ArrowRight, 
  Wallet, 
  Building, 
  CreditCard, 
  Calendar, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  PiggyBank, 
  BarChart3, 
  Utensils, 
  ShoppingBag, 
  Car,
  Film
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { transactions, totalBalance, incomeTotal, expenseTotal, getRecentTransactions } = useApp();
  const recentTransactions = getRecentTransactions(5);
  const { isDark } = useTheme();
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const bankCards = [
    { 
      id: 1, 
      type: 'Bank', 
      name: 'HDFC Bank', 
      number: '**** 5678', 
      balance: 24500,
      color: 'from-blue-700 to-blue-500'
    },
    { 
      id: 2, 
      type: 'Credit Card', 
      name: 'HDFC Credit Card', 
      number: '**** 1234', 
      balance: -8450,
      color: 'from-purple-700 to-purple-500'
    },
    { 
      id: 3, 
      type: 'Bank', 
      name: 'SBI Bank', 
      number: '**** 9012', 
      balance: 18320,
      color: 'from-teal-600 to-teal-400'
    }
  ];
  
  const weeklySpending = [
    { day: 'Mon', amount: 850, category: 'food' },
    { day: 'Tue', amount: 1200, category: 'shopping' },
    { day: 'Wed', amount: 320, category: 'transport' },
    { day: 'Thu', amount: 980, category: 'entertainment' },
    { day: 'Fri', amount: 1600, category: 'food' },
    { day: 'Sat', amount: 2400, category: 'shopping' },
    { day: 'Sun', amount: 1100, category: 'entertainment' },
  ];
  
  const upcomingBills = [
    { id: 1, name: 'Credit Card Bill', amount: 12500, dueDate: '2025-05-06', daysLeft: 2 },
    { id: 2, name: 'Rent', amount: 22000, dueDate: '2025-05-10', daysLeft: 6 },
    { id: 3, name: 'Electricity Bill', amount: 3200, dueDate: '2025-05-15', daysLeft: 11 },
  ];
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'food': return <Utensils className="h-4 w-4" />;
      case 'shopping': return <ShoppingBag className="h-4 w-4" />;
      case 'transport': return <Car className="h-4 w-4" />;
      case 'entertainment': return <Film className="h-4 w-4" />;
      default: return <Wallet className="h-4 w-4" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'food': return 'bg-orange-500';
      case 'shopping': return 'bg-purple-500';
      case 'transport': return 'bg-blue-500';
      case 'entertainment': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };
  
  const nextCard = () => {
    if (currentCardIndex < bankCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };
  
  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  // Monthly overview data
  const savingsGoal = 25000;
  const currentSavings = 18320;
  const savingsPercentage = Math.min(Math.round((currentSavings / savingsGoal) * 100), 100);
  
  const totalBudget = 40000;
  const spentAmount = 28500;
  const budgetPercentage = Math.round((spentAmount / totalBudget) * 100);
  const remainingBudget = totalBudget - spentAmount;

  return (
    <div className="p-5 pb-28">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Hello, John! 👋</h1>
          <p className="text-finance-medium dark:text-gray-400">Let's track your finances</p>
        </div>
        <div className="flex">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="h-5 w-5 dark:text-gray-300" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full ml-1"
            onClick={() => navigate('/calendar')}
          >
            <Calendar className="h-5 w-5 dark:text-gray-300" />
          </Button>
        </div>
      </div>
      
      {/* Net Worth Card */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PremiumCard variant="gradient" withPattern animated>
          <div className="flex justify-between mb-2">
            <h2 className="text-base font-medium opacity-90">Net Worth</h2>
            <div className="flex">
              <Button variant="ghost" size="sm" className="h-7 px-2 bg-white/20 text-white" onClick={() => navigate('/banks')}>
                <Building className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 bg-white/20 text-white ml-2" onClick={() => navigate('/cards')}>
                <CreditCard className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-3xl font-bold mb-5">{formatCurrency(totalBalance)}</div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <ArrowRight className="h-4 w-4 mr-2 rotate-45" />
                <span className="text-sm">Expenses</span>
              </div>
              <div className="text-lg font-medium">{formatCurrency(expenseTotal)}</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <ArrowRight className="h-4 w-4 mr-2 -rotate-45" />
                <span className="text-sm">Income</span>
              </div>
              <div className="text-lg font-medium">{formatCurrency(incomeTotal)}</div>
            </div>
          </div>
        </PremiumCard>
      </motion.div>
      
      {/* Card Carousel */}
      <div className="relative mb-6">
        <div className="overflow-hidden" ref={cardsRef}>
          <div 
            className="flex transition-transform duration-300 ease-out" 
            style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
          >
            {bankCards.map((card, index) => (
              <div key={card.id} className="w-full flex-shrink-0 px-1">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`rounded-xl bg-gradient-to-br ${card.color} p-5 text-white shadow-lg h-[180px] flex flex-col justify-between card-3d`}
                  whileHover={{ 
                    rotateY: 10, 
                    boxShadow: isDark ? '0 20px 25px rgba(0, 0, 0, 0.4)' : '0 20px 25px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.3),_transparent_70%)]"></div>
                  </div>
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <p className="text-white/80 text-sm">{card.type}</p>
                      <h3 className="text-xl font-semibold mt-1">{card.name}</h3>
                      <p className="text-sm mt-1">{card.number}</p>
                    </div>
                    <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                      {card.type === 'Bank' ? (
                        <Building className="h-6 w-6" />
                      ) : (
                        <CreditCard className="h-6 w-6" />
                      )}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-white/80 text-sm">Available Balance</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {formatCurrency(card.balance)}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-white/70">
                        {card.type === 'Bank' ? '**** 5678' : 'Valid thru 12/25'}
                      </span>
                      <div className="flex space-x-1">
                        <div className="w-5 h-5 bg-white/30 rounded-full"></div>
                        <div className="w-5 h-5 bg-white/20 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 p-4 opacity-5">
                    {card.type === 'Bank' 
                      ? <Building className="h-32 w-32" /> 
                      : <CreditCard className="h-32 w-32" />}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-4">
          {bankCards.map((_, index) => (
            <button
              key={index}
              className={`h-2 mx-1 rounded-full transition-all ${
                currentCardIndex === index ? "w-6 bg-finance-navy dark:bg-finance-sky" : "w-2 bg-gray-300 dark:bg-gray-700"
              }`}
              onClick={() => setCurrentCardIndex(index)}
            />
          ))}
        </div>
        
        {/* Navigation buttons */}
        {currentCardIndex > 0 && (
          <motion.button 
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center dark:bg-gray-800 dark:text-white"
            onClick={prevCard}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
        )}
        
        {currentCardIndex < bankCards.length - 1 && (
          <motion.button 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center dark:bg-gray-800 dark:text-white"
            onClick={nextCard}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        )}
      </div>
      
      {/* Monthly Overview */}
      <PremiumCard className="mb-6 animated">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold dark:text-white">Monthly Overview</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">May 2025</span>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <h3 className="font-medium dark:text-gray-200">Total Budget</h3>
              <span className="text-sm font-medium dark:text-gray-300">{formatCurrency(remainingBudget)} left of {formatCurrency(totalBudget)}</span>
            </div>
            <div className="relative h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400"
                initial={{ width: 0 }}
                animate={{ width: `${budgetPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">Spent: {formatCurrency(spentAmount)}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{budgetPercentage}% used</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <h3 className="font-medium dark:text-gray-200">Savings Goal</h3>
              <span className="text-sm font-medium dark:text-gray-300">{formatCurrency(currentSavings)} of {formatCurrency(savingsGoal)}</span>
            </div>
            <div className="relative h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-300 dark:from-green-600 dark:to-green-400"
                initial={{ width: 0 }}
                animate={{ width: `${savingsPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">Current: {formatCurrency(currentSavings)}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{savingsPercentage}% achieved</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 pt-2">
            <motion.div 
              className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Wallet className="h-5 w-5 text-blue-500 mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">Income</span>
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">{formatCurrency(incomeTotal)}</span>
            </motion.div>
            <motion.div 
              className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowRight className="h-5 w-5 text-red-500 mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">Expense</span>
              <span className="text-sm font-semibold text-red-700 dark:text-red-400">{formatCurrency(expenseTotal)}</span>
            </motion.div>
            <motion.div 
              className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <PiggyBank className="h-5 w-5 text-green-500 mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">Saved</span>
              <span className="text-sm font-semibold text-green-700 dark:text-green-400">{formatCurrency(currentSavings)}</span>
            </motion.div>
          </div>
        </div>
      </PremiumCard>
      
      {/* Weekly spending & Upcoming Bills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Weekly Spending */}
        <PremiumCard className="h-full" animated>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold dark:text-white">Weekly Spending</h2>
            <ArrowRight 
              className="h-4 w-4 text-gray-400 cursor-pointer dark:text-gray-500" 
              onClick={() => navigate('/analytics')} 
            />
          </div>
          
          <div className="flex justify-between h-[140px] items-end mt-4 mb-1">
            {weeklySpending.map((day, index) => (
              <div key={index} className="flex flex-col items-center group">
                <motion.div 
                  className="relative mb-1 w-8 flex justify-center"
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.amount / 2500) * 100}px` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`absolute bottom-0 w-6 rounded-t-md ${getCategoryColor(day.category)}`} style={{ 
                    height: `${(day.amount / 2500) * 100}px` 
                  }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded-md shadow-md text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      {formatCurrency(day.amount)}
                    </div>
                  </div>
                </motion.div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{day.day}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex space-x-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                <span className="text-xs dark:text-gray-300">Food</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                <span className="text-xs dark:text-gray-300">Shopping</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-pink-500 mr-1"></div>
                <span className="text-xs dark:text-gray-300">Other</span>
              </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">May 1-7</span>
          </div>
        </PremiumCard>
        
        {/* Upcoming Bills */}
        <PremiumCard className="h-full" animated>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold dark:text-white">Upcoming Bills</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs dark:text-gray-300"
              onClick={() => navigate('/bills')}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {upcomingBills.map((bill, index) => (
              <motion.div
                key={bill.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/bills')}
              >
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                    <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm dark:text-gray-200">{bill.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Due: {bill.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-expense">{formatCurrency(bill.amount)}</p>
                  <p className="text-xs text-orange-500 dark:text-orange-400">
                    {bill.daysLeft === 0 ? 'Due Today' : 
                     bill.daysLeft === 1 ? 'Due Tomorrow' : 
                     `Due in ${bill.daysLeft} days`}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {upcomingBills.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32">
                <Bell className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-gray-400">No upcoming bills</p>
              </div>
            )}
          </div>
        </PremiumCard>
      </div>
      
      {/* Recent Transactions */}
      <PremiumCard>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold dark:text-white">Recent Transactions</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-xs dark:text-gray-300"
            onClick={() => navigate('/transactions')}
          >
            View All
          </Button>
        </div>
        
        <div>
          <AnimatePresence>
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
              >
                <PremiumTransactionItem 
                  transaction={transaction} 
                  onClick={() => navigate(`/transaction/${transaction.id}`)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {recentTransactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10">
              <Wallet className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-2" />
              <p className="text-gray-400 dark:text-gray-500">No transactions yet</p>
              <Button 
                onClick={() => navigate('/add-transaction')} 
                className="mt-3"
                size="sm"
              >
                Add Your First Transaction
              </Button>
            </div>
          )}
        </div>
      </PremiumCard>
    </div>
  );
};

export default HomePage;
