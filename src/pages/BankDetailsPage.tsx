
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Building, Plus, Ban as Bank, BarChart2, Download, Eye, EyeOff, MoreHorizontal, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PremiumCard from '@/components/PremiumCard';
import { formatCurrency } from '@/utils/formatters';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const BankDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isBalanceHidden, setIsBalanceHidden] = React.useState(false);
  
  // Demo bank data
  const bank = {
    id: parseInt(id || '1'),
    name: 'HDFC Bank',
    accountNumber: '**** 5678',
    balance: 24500,
    accountType: 'Savings',
    color: 'blue',
    ifsc: 'HDFC0000123',
    branch: 'Andheri East, Mumbai',
    transactions: [
      { id: 1, description: 'Salary Credit', amount: 50000, type: 'income', date: 'Apr 30, 2025' },
      { id: 2, description: 'Electricity Bill', amount: 2100, type: 'expense', date: 'Apr 28, 2025' },
      { id: 3, description: 'Grocery Shopping', amount: 3450, type: 'expense', date: 'Apr 26, 2025' },
      { id: 4, description: 'Movie Tickets', amount: 800, type: 'expense', date: 'Apr 25, 2025' },
      { id: 5, description: 'Interest Credit', amount: 120, type: 'income', date: 'Apr 22, 2025' },
    ],
    cards: [
      { id: 1, name: 'Debit Card', number: '**** 1234', type: 'debit' }
    ]
  };
  
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
          <h1 className="text-xl font-bold">{bank.name}</h1>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/edit-bank/${bank.id}`)}>
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/add-transaction?bankId=1')}>
              Add Transaction
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Remove Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <PremiumCard className="bg-gradient-to-r from-blue-600 to-blue-400 text-white" withPattern>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-80">Account Balance</p>
              <h2 className="text-3xl font-bold mt-1">
                {isBalanceHidden ? '••••••' : formatCurrency(bank.balance)}
              </h2>
              <p className="text-sm mt-1 opacity-80">{bank.accountType} Account</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <Building className="h-6 w-6" />
              </div>
              <button 
                onClick={() => setIsBalanceHidden(!isBalanceHidden)} 
                className="p-2 bg-white/20 rounded-full"
              >
                {isBalanceHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-sm opacity-80">Account Number</p>
            <div className="flex justify-between items-center mt-1">
              <p className="font-medium">{bank.accountNumber}</p>
              <Button size="sm" variant="secondary" className="h-8 px-3 bg-white/20 hover:bg-white/30 text-white">
                Copy
              </Button>
            </div>
          </div>
        </PremiumCard>
      </motion.div>
      
      <Tabs defaultValue="transactions" className="mb-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="details">Account Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-4">
          <PremiumCard>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Recent Transactions</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/transactions?bankId=1')}
              >
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {bank.transactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  className="flex justify-between items-center p-3 border border-gray-100 dark:border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/transaction/${tx.id}`)}
                >
                  <div>
                    <p className="font-medium dark:text-white">{tx.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
                  </div>
                  <p className={`font-medium ${tx.type === 'income' ? 'text-income dark:text-green-400' : 'text-expense dark:text-red-400'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/add-transaction?bankId=1')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </PremiumCard>
          
          <PremiumCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Monthly Summary</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/analytics?bankId=1')}
              >
                <BarChart2 className="h-4 w-4 mr-1" />
                Analytics
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Income</p>
                <p className="text-xl font-semibold text-income dark:text-green-400">
                  {formatCurrency(bank.transactions
                    .filter(tx => tx.type === 'income')
                    .reduce((sum, tx) => sum + tx.amount, 0))}
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Expense</p>
                <p className="text-xl font-semibold text-expense dark:text-red-400">
                  {formatCurrency(bank.transactions
                    .filter(tx => tx.type === 'expense')
                    .reduce((sum, tx) => sum + tx.amount, 0))}
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/analytics?bankId=1')}
              >
                View Detailed Analytics
              </Button>
            </div>
          </PremiumCard>
        </TabsContent>
        
        <TabsContent value="details">
          <PremiumCard className="mb-4">
            <h3 className="font-medium mb-4">Account Details</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bank Name</p>
                <p className="font-medium dark:text-white">{bank.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Account Number</p>
                <p className="font-medium dark:text-white">{bank.accountNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Account Type</p>
                <p className="font-medium dark:text-white">{bank.accountType}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">IFSC Code</p>
                <p className="font-medium dark:text-white">{bank.ifsc}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Branch</p>
                <p className="font-medium dark:text-white">{bank.branch}</p>
              </div>
            </div>
          </PremiumCard>
          
          <PremiumCard className="mb-4">
            <h3 className="font-medium mb-4">Linked Cards</h3>
            
            {bank.cards.map((card) => (
              <div key={card.id} className="flex justify-between items-center p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                    <Bank className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{card.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{card.number}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate(`/card/${card.id}`)}>
                  View
                </Button>
              </div>
            ))}
            
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/add-card?bankId=1')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Card
              </Button>
            </div>
          </PremiumCard>
          
          <div className="space-x-4 flex">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/edit-bank/1')}
            >
              Edit Details
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BankDetailsPage;
