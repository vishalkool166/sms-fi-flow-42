
import React from 'react';
import { Transaction } from '@/models/Transaction';
import { formatCurrency } from '@/utils/formatters';
import { format } from 'date-fns';
import { getCategoryIcon } from '@/utils/iconUtils';
import IconBox from './IconBox';

interface TransactionItemProps {
  transaction: Transaction;
  onClick?: () => void;
}

const PremiumTransactionItem: React.FC<TransactionItemProps> = ({ transaction, onClick }) => {
  const { description, amount, type, date, category, merchant } = transaction;
  const isExpense = type === 'expense';
  const amountClass = isExpense ? 'text-expense' : 'text-income';
  const formattedAmount = isExpense ? `-${formatCurrency(amount)}` : `+${formatCurrency(amount)}`;
  const formattedDate = date ? format(new Date(date), 'MMM d') : 'N/A';
  
  // Get category icon config
  const categoryConfig = getCategoryIcon(category);
  const IconComponent = categoryConfig.icon;
  
  const getColorClass = (category: string): string => {
    const colorMap: Record<string, string> = {
      food: 'red',
      transport: 'blue',
      shopping: 'purple',
      entertainment: 'pink',
      utilities: 'gray',
      health: 'red',
      education: 'yellow',
      salary: 'green',
      investment: 'teal',
      other: 'gray',
    };
    
    return colorMap[category] || 'gray';
  };

  return (
    <div 
      className="p-4 border-b border-gray-100 flex items-center hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <IconBox 
        icon={IconComponent} 
        color={getColorClass(category)} 
        className="mr-3"
      />
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-value">{description}</h3>
          <p className={`font-value ${amountClass}`}>{formattedAmount}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-finance-light">
            {merchant ? merchant : category[0].toUpperCase() + category.slice(1)}
          </p>
          <p className="text-sm text-finance-light">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumTransactionItem;
