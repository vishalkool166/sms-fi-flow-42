
import React from 'react';
import { Transaction } from '@/models/Transaction';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { getTransactionIcon } from '@/utils/iconUtils';
import IconBox from './IconBox';
import { cn } from '@/lib/utils';

type TransactionIconColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'navy' | 'sky' | 'teal' | 'amber' | 'indigo' | 'pink' | 'orange' | 'gray';

interface PremiumTransactionItemProps {
  transaction: Transaction;
  showDate?: boolean;
  onClick?: () => void;
  className?: string;
  animated?: boolean;
}

const PremiumTransactionItem: React.FC<PremiumTransactionItemProps> = ({
  transaction,
  showDate = true,
  onClick,
  className,
  animated = false
}) => {
  // Map categories to colors
  const categoryColorMap: Record<string, TransactionIconColor> = {
    'food': 'orange',
    'groceries': 'green',
    'shopping': 'purple',
    'entertainment': 'pink',
    'transportation': 'blue',
    'health': 'red',
    'education': 'amber',
    'bills': 'navy',
    'housing': 'indigo',
    'salary': 'sky',
    'investment': 'teal',
    'other': 'gray',
  };
  
  const getIconColor = (category: string): TransactionIconColor => {
    return categoryColorMap[category.toLowerCase()] || 'blue';
  };
  
  const getTransactionTypeStyles = () => {
    if (transaction.type === 'expense') {
      return 'text-expense';
    } else {
      return 'text-income';
    }
  };
  
  const getAmountPrefix = () => {
    return transaction.type === 'expense' ? '-' : '+';
  };
  
  // Format the transaction date
  const formattedDate = formatDate(new Date(transaction.date));
  
  return (
    <div 
      className={cn(
        "border-b border-gray-100 dark:border-gray-800 p-3 flex justify-between items-center transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <IconBox 
          icon={getTransactionIcon(transaction.category)} 
          color={getIconColor(transaction.category)} 
          className="mr-3" 
        />
        <div>
          <p className="text-base font-value dark:text-white">{transaction.description}</p>
          {showDate && (
            <p className="text-xs text-finance-light dark:text-gray-500">{formattedDate}</p>
          )}
          {transaction.paymentMethod && !showDate && (
            <p className="text-xs text-finance-light dark:text-gray-500">{transaction.paymentMethod}</p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className={`font-value font-semibold ${getTransactionTypeStyles()}`}>
          {getAmountPrefix()}{formatCurrency(transaction.amount)}
        </p>
        {transaction.paymentMethod && showDate && (
          <p className="text-xs text-finance-light dark:text-gray-500">{transaction.paymentMethod}</p>
        )}
      </div>
    </div>
  );
};

export default PremiumTransactionItem;
