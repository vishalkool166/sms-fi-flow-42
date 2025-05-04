
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, CreditCard, Calendar, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PremiumCard from '@/components/PremiumCard';
import { formatCurrency } from '@/utils/formatters';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';

const CardsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  // Demo cards data
  const cards = [
    {
      id: 1,
      type: 'Credit Card',
      name: 'HDFC Credit Card',
      number: '**** **** **** 1234',
      balance: -8450,
      dueDate: '2025-05-06',
      daysLeft: 2,
      limit: 50000,
      color: 'from-blue-600 to-blue-400'
    },
    {
      id: 2,
      type: 'Debit Card',
      name: 'SBI Debit Card',
      number: '**** **** **** 5678',
      balance: 24500,
      color: 'from-purple-600 to-purple-400'
    }
  ];
  
  // Demo transactions
  const transactions = [
    { id: 1, name: 'Amazon', amount: 2450, date: 'Apr 28, 2025' },
    { id: 2, name: 'Netflix', amount: 649, date: 'Apr 25, 2025' },
    { id: 3, name: 'Swiggy', amount: 780, date: 'Apr 22, 2025' }
  ];
  
  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 dark:text-white" />
          </button>
          <h1 className="text-xl font-bold">Cards</h1>
        </div>
        
        <Button onClick={() => navigate('/add-card')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>
      
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mb-8"
        >
          <div className="mb-6">
            <motion.div
              className={`relative h-[200px] w-full bg-gradient-to-r ${card.color} rounded-xl p-6 overflow-hidden shadow-lg card-3d`}
              initial={{ rotateY: 0 }}
              whileHover={{ 
                rotateY: 15, 
                boxShadow: isDark ? '0 20px 25px rgba(0, 0, 0, 0.4)' : '0 20px 25px rgba(0, 0, 0, 0.2)'
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.3),_transparent_70%)]"></div>
              </div>
              <div className="absolute bottom-0 right-0 p-4 opacity-5">
                <CreditCard className="h-32 w-32" />
              </div>
              <div className="relative z-10 text-white h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-sm">{card.type}</p>
                    <h3 className="text-xl font-semibold mt-1">{card.name}</h3>
                  </div>
                  <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                    <CreditCard className="h-6 w-6" />
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <p className="text-white/80 text-xs mb-1">Card Number</p>
                    <p className="font-medium tracking-wider">{card.number}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/80 text-xs mb-1">Card Holder</p>
                      <p className="font-medium">John Doe</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-xs mb-1">Expires</p>
                      <p className="font-medium">12/25</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <PremiumCard className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{card.name}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8"
                onClick={() => navigate(`/card/${card.id}`)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {card.type === 'Credit Card' ? (
                <>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Due Amount</p>
                    <p className="text-xl font-semibold text-expense">{formatCurrency(Math.abs(card.balance))}</p>
                    <p className="text-xs text-orange-500 dark:text-orange-400 mt-1">Due in {card.daysLeft} days</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Credit Limit</p>
                    <p className="text-xl font-semibold dark:text-white">{formatCurrency(card.limit)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{Math.round((1 - Math.abs(card.balance) / card.limit) * 100)}% available</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Available Balance</p>
                    <p className="text-xl font-semibold text-income dark:text-green-400">{formatCurrency(card.balance)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Card Type</p>
                    <p className="text-lg font-semibold dark:text-white">{card.type}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Visa</p>
                  </div>
                </>
              )}
            </div>
            
            <h4 className="font-medium mb-3">Recent Transactions</h4>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <motion.div 
                  key={tx.id}
                  className="flex justify-between items-center p-3 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <p className="font-medium dark:text-white">{tx.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
                  </div>
                  <p className="font-medium text-expense">₹{tx.amount}</p>
                </motion.div>
              ))}
            </div>
          </PremiumCard>
        </motion.div>
      ))}
      
      {cards.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <CreditCard className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">No cards found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-xs">
            Add your credit and debit cards to track your spending and manage your finances better.
          </p>
          <Button onClick={() => navigate('/add-card')}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Your First Card
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardsPage;
