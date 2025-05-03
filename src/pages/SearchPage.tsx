
import React, { useState } from 'react';
import { ArrowLeft, Search, Calendar, BarChart3, Tag, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PremiumCard from '@/components/PremiumCard';
import IconBox from '@/components/IconBox';
import { Input } from '@/components/ui/input';
import TransactionItem from '@/components/TransactionItem';
import { useApp } from '@/context/AppContext';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { getFilteredTransactions } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample recent searches
  const recentSearches = ['amazon', 'netflix', 'grocery', 'taxi'];
  
  const searchResults = searchQuery ? 
    getFilteredTransactions(transaction => 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.merchant && transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase()))
    ) : [];
  
  return (
    <div className="p-5 pb-28 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-heading">Search Transactions</h1>
      </div>
      
      <div className="relative mb-6">
        <Input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search transactions, merchants..."
          className="pl-10 py-6 font-medium rounded-xl border-gray-200"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-finance-medium" />
      </div>
      
      {!searchQuery && (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-heading mb-4">Recent Searches</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button 
                  key={index} 
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-heading mb-4">Filter By</h2>
            <div className="grid grid-cols-2 gap-3">
              <PremiumCard className="flex items-center p-4 animate-hover">
                <IconBox icon={Calendar} color="blue" className="mr-3" />
                <span className="font-medium">Date</span>
              </PremiumCard>
              <PremiumCard className="flex items-center p-4 animate-hover">
                <IconBox icon={BarChart3} color="green" className="mr-3" />
                <span className="font-medium">Amount</span>
              </PremiumCard>
              <PremiumCard className="flex items-center p-4 animate-hover">
                <IconBox icon={Tag} color="purple" className="mr-3" />
                <span className="font-medium">Category</span>
              </PremiumCard>
              <PremiumCard className="flex items-center p-4 animate-hover">
                <IconBox icon={Clock} color="amber" className="mr-3" />
                <span className="font-medium">Recent</span>
              </PremiumCard>
            </div>
          </div>
        </>
      )}
      
      {searchQuery && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-heading">Search Results</h2>
            <p className="text-sm text-finance-medium">
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
          
          {searchResults.length > 0 ? (
            <PremiumCard className="p-0 overflow-hidden">
              {searchResults.map(transaction => (
                <TransactionItem 
                  key={transaction.id} 
                  transaction={transaction} 
                  onClick={() => navigate(`/transaction/${transaction.id}`)}
                />
              ))}
            </PremiumCard>
          ) : (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-finance-medium" />
              </div>
              <h3 className="font-value mb-1">No results found</h3>
              <p className="text-finance-medium text-sm">
                Try searching for something else
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
