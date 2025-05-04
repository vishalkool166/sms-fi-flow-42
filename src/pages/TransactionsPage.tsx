
import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Transaction, CategoryType } from '@/models/Transaction';
import PremiumTransactionItem from '@/components/PremiumTransactionItem';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, subDays, isWithinInterval, parse, startOfDay, endOfDay } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Filter, 
  Download, 
  Calendar as CalendarIcon,
  Search,
  SlidersHorizontal,
  Check,
  X,
  ArrowUpDown
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import IconBox from '@/components/IconBox';
import PremiumCard from '@/components/PremiumCard';

const TransactionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { transactions } = useApp();
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionType, setTransactionType] = useState<'all' | 'expense' | 'income'>('all');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categories: CategoryType[] = [
    'food', 
    'transport', 
    'shopping', 
    'entertainment', 
    'utilities', 
    'health', 
    'education', 
    'salary', 
    'investment', 
    'other'
  ];

  // Apply filters
  useEffect(() => {
    let result = [...transactions];
    
    // Filter by transaction type
    if (transactionType !== 'all') {
      result = result.filter(t => t.type === transactionType);
    }
    
    // Filter by date range
    if (dateRange.from && dateRange.to) {
      result = result.filter(t => 
        isWithinInterval(new Date(t.date), { 
          start: startOfDay(dateRange.from), 
          end: endOfDay(dateRange.to) 
        })
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(t => t.category === selectedCategory);
    }
    
    // Filter by amount range
    if (amountRange.min !== '') {
      result = result.filter(t => t.amount >= parseFloat(amountRange.min));
    }
    if (amountRange.max !== '') {
      result = result.filter(t => t.amount <= parseFloat(amountRange.max));
    }
    
    // Filter by search term
    if (searchTerm !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(term) || 
        (t.merchant && t.merchant.toLowerCase().includes(term)) ||
        (t.note && t.note.toLowerCase().includes(term))
      );
    }
    
    // Sort transactions
    result = sortTransactions(result, sortOrder);
    
    setFilteredTransactions(result);
  }, [transactions, transactionType, dateRange, selectedCategory, amountRange, searchTerm, sortOrder]);
  
  const sortTransactions = (txns: Transaction[], order: string) => {
    switch(order) {
      case 'newest':
        return [...txns].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return [...txns].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'highest':
        return [...txns].sort((a, b) => b.amount - a.amount);
      case 'lowest':
        return [...txns].sort((a, b) => a.amount - b.amount);
      default:
        return txns;
    }
  };
  
  const resetFilters = () => {
    setTransactionType('all');
    setDateRange({ from: subDays(new Date(), 30), to: new Date() });
    setSelectedCategory('all');
    setAmountRange({ min: '', max: '' });
    setSortOrder('newest');
    setSearchTerm('');
    setIsFilterOpen(false);
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <div className="flex items-center mb-5">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">All Transactions</h1>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-5 space-y-3">
        <div className="flex space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4"
            />
            {searchTerm && (
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={isFilterOpen ? 'bg-primary/10' : ''}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
        
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Filters</h3>
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Reset
                  </button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Transaction Type</label>
                  <Tabs value={transactionType} onValueChange={(value: any) => setTransactionType(value)}>
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="expense">Expense</TabsTrigger>
                      <TabsTrigger value="income">Income</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Date Range</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "MMM d")} -{" "}
                              {format(dateRange.to, "MMM d, yyyy")}
                            </>
                          ) : (
                            format(dateRange.from, "MMM d, yyyy")
                          )
                        ) : (
                          "Select date range"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange as any}
                        initialFocus
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Amount Range</label>
                  <div className="flex space-x-2 items-center">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={amountRange.min}
                      onChange={(e) => setAmountRange({ ...amountRange, min: e.target.value })}
                      className="flex-1"
                    />
                    <span className="text-gray-400">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={amountRange.max}
                      onChange={(e) => setAmountRange({ ...amountRange, max: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Sort By</label>
                  <Select value={sortOrder} onValueChange={(value: any) => setSortOrder(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="highest">Highest Amount</SelectItem>
                      <SelectItem value="lowest">Lowest Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-2 flex items-center space-x-3">
                  <Button className="flex-1" onClick={() => setIsFilterOpen(false)}>
                    <Check className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Transactions List */}
      <PremiumCard className="mb-5">
        <div className="mb-1 flex justify-between items-center">
          <h2 className="font-bold text-lg">Transactions</h2>
          <div className="flex items-center text-sm text-gray-500">
            <ArrowUpDown className="h-3 w-3 mr-1" />
            <span>{filteredTransactions.length} found</span>
          </div>
        </div>
        
        <AnimatePresence>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
              >
                <PremiumTransactionItem 
                  transaction={transaction} 
                  onClick={() => navigate(`/transaction/${transaction.id}`)}
                />
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-10"
            >
              <Filter className="h-16 w-16 text-gray-300 mb-2" />
              <p className="text-gray-500 mb-1">No transactions found</p>
              <p className="text-gray-400 text-sm text-center max-w-xs">
                Try adjusting your filters or adding new transactions
              </p>
              <Button 
                onClick={() => resetFilters()} 
                variant="outline" 
                className="mt-3"
                size="sm"
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </PremiumCard>
    </div>
  );
};

export default TransactionsPage;
