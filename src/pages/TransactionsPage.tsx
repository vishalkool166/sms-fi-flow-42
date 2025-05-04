
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Plus, Search, Filter, Calendar, ArrowDown, ArrowUp } from 'lucide-react';
import PremiumTransactionItem from '@/components/PremiumTransactionItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectGroup,
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Transaction } from '@/models/Transaction';
import { useTheme } from '@/providers/ThemeProvider';

const TransactionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { transactions } = useApp();
  const { isDark } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({ from: undefined, to: undefined });
  const [selectedTab, setSelectedTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  
  // Filter transactions based on search query, category, and date range
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by tab
    if (selectedTab === 'income' && transaction.type !== 'income') return false;
    if (selectedTab === 'expense' && transaction.type !== 'expense') return false;
    
    // Filter by search
    if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Filter by category
    if (selectedCategory && transaction.category !== selectedCategory) return false;
    
    // Filter by date range
    if (selectedDateRange.from && new Date(transaction.date) < selectedDateRange.from) return false;
    if (selectedDateRange.to && new Date(transaction.date) > selectedDateRange.to) return false;
    
    return true;
  });
  
  // Group transactions by date
  const groupedTransactions: { [key: string]: Transaction[] } = {};
  
  filteredTransactions.forEach(transaction => {
    const date = format(new Date(transaction.date), 'yyyy-MM-dd');
    if (!groupedTransactions[date]) {
      groupedTransactions[date] = [];
    }
    groupedTransactions[date].push(transaction);
  });
  
  // Sort dates in descending order
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  // Count active filters
  React.useEffect(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCategory) count++;
    if (selectedDateRange.from || selectedDateRange.to) count++;
    setActiveFilters(count);
  }, [searchQuery, selectedCategory, selectedDateRange]);
  
  return (
    <div className="p-4 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 dark:text-white" />
          </button>
          <h1 className="text-xl font-bold">Transactions</h1>
        </div>
        
        <Button onClick={() => navigate('/add-transaction')}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search transactions" 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="relative"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                {activeFilters > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {activeFilters}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-1">Category</Label>
                  <Select 
                    value={selectedCategory || ''} 
                    onValueChange={(value) => setSelectedCategory(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="bills">Bills</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1">Date Range</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDateRange.from ? (
                            format(selectedDateRange.from, 'PP')
                          ) : (
                            <span>From date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDateRange.from}
                          onSelect={(date) => setSelectedDateRange(prev => ({ ...prev, from: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDateRange.to ? (
                            format(selectedDateRange.to, 'PP')
                          ) : (
                            <span>To date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDateRange.to}
                          onSelect={(date) => setSelectedDateRange(prev => ({ ...prev, to: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedDateRange({ from: undefined, to: undefined });
                    }}
                  >
                    Reset
                  </Button>
                  <Button size="sm">Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Active filters */}
        {activeFilters > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedCategory && (
              <Badge 
                variant="outline" 
                className="flex items-center gap-1 px-3 py-1 dark:bg-secondary"
                onClick={() => setSelectedCategory(null)}
              >
                Category: {selectedCategory}
                <span className="ml-1 cursor-pointer">×</span>
              </Badge>
            )}
            {selectedDateRange.from && (
              <Badge 
                variant="outline" 
                className="flex items-center gap-1 px-3 py-1 dark:bg-secondary"
                onClick={() => setSelectedDateRange(prev => ({ ...prev, from: undefined }))}
              >
                From: {format(selectedDateRange.from, 'PP')}
                <span className="ml-1 cursor-pointer">×</span>
              </Badge>
            )}
            {selectedDateRange.to && (
              <Badge 
                variant="outline" 
                className="flex items-center gap-1 px-3 py-1 dark:bg-secondary"
                onClick={() => setSelectedDateRange(prev => ({ ...prev, to: undefined }))}
              >
                To: {format(selectedDateRange.to, 'PP')}
                <span className="ml-1 cursor-pointer">×</span>
              </Badge>
            )}
            {searchQuery && (
              <Badge 
                variant="outline" 
                className="flex items-center gap-1 px-3 py-1 dark:bg-secondary"
                onClick={() => setSearchQuery('')}
              >
                Search: {searchQuery}
                <span className="ml-1 cursor-pointer">×</span>
              </Badge>
            )}
          </div>
        )}
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="income" className="flex items-center gap-1">
              <ArrowDown className="h-3 w-3 rotate-180" />
              Income
            </TabsTrigger>
            <TabsTrigger value="expense" className="flex items-center gap-1">
              <ArrowDown className="h-3 w-3" />
              Expenses
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="rounded-xl bg-white dark:bg-[#1e2030] shadow-sm overflow-hidden mb-4">
        <AnimatePresence mode="wait">
          {sortedDates.length > 0 ? (
            <>
              {sortedDates.map((date) => (
                <div key={date}>
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {format(new Date(date), 'EEEE, MMMM d, yyyy')}
                    </p>
                  </div>
                  <AnimatePresence>
                    {groupedTransactions[date].map((transaction) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <PremiumTransactionItem 
                          transaction={transaction}
                          showDate={false}
                          onClick={() => navigate(`/transaction/${transaction.id}`)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ))}
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 px-4"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No transactions found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setSelectedDateRange({ from: undefined, to: undefined });
                setSelectedTab('all');
              }}>
                Reset Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TransactionsPage;
