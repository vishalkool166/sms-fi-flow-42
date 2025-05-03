
import React from 'react';
import { Transaction } from '@/models/Transaction';
import { formatCurrency } from '@/utils/formatters';
import { format } from 'date-fns';
import { getCategoryIcon, getCategoryIconComponent } from '@/utils/iconUtils';
import IconBox from './IconBox';
import { 
  ShoppingBag, 
  Utensils, 
  Car, 
  Film, 
  Home, 
  Stethoscope, 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  CreditCard,
  Store
} from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
  onClick?: () => void;
}

const PremiumTransactionItem: React.FC<TransactionItemProps> = ({ transaction, onClick }) => {
  const { description, amount, type, date, category, merchant, note } = transaction;
  const isExpense = type === 'expense';
  const amountClass = isExpense ? 'text-expense' : 'text-income';
  const formattedAmount = isExpense ? `-${formatCurrency(amount)}` : `+${formatCurrency(amount)}`;
  const formattedDate = date ? format(new Date(date), 'MMM d, h:mm a') : 'N/A';
  
  // Get category icon component
  const getCategoryIconByName = (cat: string) => {
    switch (cat) {
      case 'shopping': return ShoppingBag;
      case 'food': return Utensils;
      case 'transport': return Car;
      case 'entertainment': return Film;
      case 'utilities': return Home;
      case 'health': return Stethoscope;
      case 'education': return GraduationCap;
      case 'salary': return DollarSign;
      case 'investment': return TrendingUp;
      default: return CreditCard;
    }
  };

  const IconComponent = getCategoryIconByName(category);
  
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
            {note && <span className="text-xs ml-2 text-finance-light">• {note}</span>}
          </p>
          <p className="text-sm text-finance-light">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumTransactionItem;
