
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction } from '../models/Transaction';
import { SMS } from '../models/SMS';
import { generateMockTransactions, generateMockSMS } from '../services/mockDataService';
import { parseSMSForTransaction } from '../models/SMS';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface AppContextType {
  transactions: Transaction[];
  smsMessages: SMS[];
  totalBalance: number;
  incomeTotal: number;
  expenseTotal: number;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (transaction: Transaction) => void;
  processNewSMS: (sms: SMS) => boolean;
  scanAllUnprocessedSMS: () => number;
  getTransactionsByCategory: () => Record<string, number>;
  getRecentTransactions: (limit?: number) => Transaction[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [smsMessages, setSmsMessages] = useState<SMS[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  // Initialize with mock data
  useEffect(() => {
    const mockTransactions = generateMockTransactions();
    setTransactions(mockTransactions);
    
    const mockSMS = generateMockSMS();
    setSmsMessages(mockSMS);
  }, []);

  // Calculate totals whenever transactions change
  useEffect(() => {
    let income = 0;
    let expense = 0;
    
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });
    
    setIncomeTotal(income);
    setExpenseTotal(expense);
    setTotalBalance(income - expense);
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: uuidv4() };
    setTransactions(prev => [newTransaction, ...prev]);
    
    toast({
      title: "Transaction Added",
      description: `${transaction.type === 'income' ? 'Income' : 'Expense'} of ₹${transaction.amount} added successfully.`
    });
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    
    toast({
      title: "Transaction Deleted",
      description: "The transaction has been removed."
    });
  };

  const updateTransaction = (transaction: Transaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === transaction.id ? transaction : t)
    );
    
    toast({
      title: "Transaction Updated",
      description: "The transaction has been modified."
    });
  };

  const processNewSMS = (sms: SMS) => {
    const parseResult = parseSMSForTransaction(sms);
    
    if (parseResult.isTransaction && parseResult.amount && parseResult.type) {
      // Create a new transaction from the SMS
      const newTransaction: Omit<Transaction, 'id'> = {
        amount: parseResult.amount,
        type: parseResult.type,
        category: parseResult.type === 'income' ? 'salary' : 'other', // Default category
        description: `Transaction from ${parseResult.bankName || 'bank'}`,
        merchant: parseResult.merchant,
        date: sms.date,
        isAutoDetected: true,
        smsId: sms.id,
        bankName: parseResult.bankName
      };
      
      addTransaction(newTransaction);
      
      // Mark SMS as processed
      setSmsMessages(prev => 
        prev.map(s => s.id === sms.id ? { ...s, isProcessed: true } : s)
      );
      
      toast({
        title: "Transaction Detected",
        description: `A ${parseResult.type} of ₹${parseResult.amount} was detected from SMS.`
      });
      
      return true;
    }
    
    return false;
  };

  const scanAllUnprocessedSMS = () => {
    let detectedCount = 0;
    
    const updatedSMS = smsMessages.map(sms => {
      if (!sms.isProcessed) {
        const parseResult = parseSMSForTransaction(sms);
        
        if (parseResult.isTransaction && parseResult.amount && parseResult.type) {
          // Create a new transaction from the SMS
          const newTransaction: Transaction = {
            id: uuidv4(),
            amount: parseResult.amount,
            type: parseResult.type,
            category: parseResult.type === 'income' ? 'salary' : 'other', // Default category
            description: `Transaction from ${parseResult.bankName || 'bank'}`,
            merchant: parseResult.merchant,
            date: sms.date,
            isAutoDetected: true,
            smsId: sms.id,
            bankName: parseResult.bankName
          };
          
          setTransactions(prev => [newTransaction, ...prev]);
          detectedCount++;
          
          return { ...sms, isProcessed: true };
        }
      }
      
      return sms;
    });
    
    setSmsMessages(updatedSMS);
    
    if (detectedCount > 0) {
      toast({
        title: "SMS Scanning Complete",
        description: `Detected ${detectedCount} new transactions from SMS.`
      });
    } else {
      toast({
        title: "SMS Scanning Complete",
        description: "No new transactions were detected."
      });
    }
    
    return detectedCount;
  };

  const getTransactionsByCategory = () => {
    const categoryTotals: Record<string, number> = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        if (!categoryTotals[transaction.category]) {
          categoryTotals[transaction.category] = 0;
        }
        categoryTotals[transaction.category] += transaction.amount;
      });
    
    return categoryTotals;
  };

  const getRecentTransactions = (limit = 10) => {
    return transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  };

  const value = {
    transactions,
    smsMessages,
    totalBalance,
    incomeTotal,
    expenseTotal,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    processNewSMS,
    scanAllUnprocessedSMS,
    getTransactionsByCategory,
    getRecentTransactions
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
