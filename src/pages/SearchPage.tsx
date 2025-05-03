
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Transaction } from '@/models/Transaction';
import { ArrowLeft, Search, X, CreditCard, BarChart2, CalendarClock, Target } from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';
import PremiumTransactionItem from '@/components/PremiumTransactionItem';
import { formatCurrency } from '@/utils/formatters';
import { Button } from '@/components/ui/button';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { transactions } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Transaction[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  // Recent searches (demo data)
  const recentSearches = ['Amazon', 'Food', 'Swiggy', 'Rent'];
  
  // Quick links
  const quickLinks = [
    { name: 'Transactions', icon: CreditCard, path: '/home' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Bills', icon: CalendarClock, path: '/bills' },
    { name: 'Goals', icon: Target, path: '/goals' },
  ];
  
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    const results = transactions.filter(t => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.merchant && t.merchant.toLowerCase().includes(searchTerm.toLowerCase())) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
    setShowResults(true);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
  };
  
  const handleQuickSearch = (term: string) => {
    setSearchTerm(term);
    setTimeout(() => handleSearch(), 100);
  };
  
  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Search</h1>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search transactions, categories..."
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {!showResults && (
        <>
          {recentSearches.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-medium text-finance-medium">Recent Searches</h2>
                <Button variant="ghost" size="sm" className="h-6 text-xs">Clear All</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-finance-medium hover:bg-gray-200 text-sm"
                    onClick={() => handleQuickSearch(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h2 className="text-sm font-medium text-finance-medium mb-3">Quick Access</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link, index) => (
                <PremiumCard 
                  key={index} 
                  className="p-4 animate-hover"
                  onClick={() => navigate(link.path)}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <link.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span>{link.name}</span>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        </>
      )}
      
      {showResults && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-medium text-finance-medium">
              Results for "{searchTerm}" ({searchResults.length})
            </h2>
            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearSearch}>
              Clear
            </Button>
          </div>
          
          {searchResults.length > 0 ? (
            <PremiumCard className="mb-6">
              {searchResults.map((transaction) => (
                <PremiumTransactionItem 
                  key={transaction.id}
                  transaction={transaction}
                  onClick={() => navigate(`/transaction/${transaction.id}`)}
                />
              ))}
            </PremiumCard>
          ) : (
            <div className="text-center py-10">
              <div className="flex justify-center mb-4">
                <Search className="h-12 w-12 text-gray-300" />
              </div>
              <p className="text-lg font-medium mb-2">No results found</p>
              <p className="text-finance-medium mb-4">
                We couldn't find any transactions matching "{searchTerm}"
              </p>
              <Button onClick={clearSearch} variant="outline">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
