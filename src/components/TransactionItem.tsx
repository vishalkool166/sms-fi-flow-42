
import React from 'react';
import { Transaction, getCategoryColor, getCategoryIcon } from '@/models/Transaction';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { ArrowUp, ArrowDown, CreditCard } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
  onClick?: (transaction: Transaction) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onClick }) => {
  const isExpense = transaction.type === 'expense';
  const categoryStyle = getCategoryColor(transaction.category);
  const categoryIcon = getCategoryIcon(transaction.category);
  
  return (
    <div 
      className="transaction-item hover:bg-gray-50 cursor-pointer"
      onClick={() => onClick?.(transaction)}
    >
      <div className="flex items-center">
        <div className="mr-3 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
          {isExpense ? (
            <ArrowDown className="text-expense h-5 w-5" />
          ) : (
            <ArrowUp className="text-income h-5 w-5" />
          )}
        </div>
        <div className="flex flex-col">
          <div className="font-medium">{transaction.description}</div>
          <div className="text-sm text-gray-500">
            {transaction.merchant && <span>{transaction.merchant} • </span>}
            <span>{formatDate(transaction.date)}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className={isExpense ? 'expense-amount' : 'income-amount'}>
          {isExpense ? '- ' : '+ '}{formatCurrency(transaction.amount)}
        </div>
        <div className={`category-badge ${categoryStyle}`}>
          <span>{categoryIcon} {transaction.category}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
