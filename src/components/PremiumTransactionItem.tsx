
import React, { useState, useEffect } from 'react';
import { Transaction } from '@/models/Transaction';
import { formatCurrency } from '@/utils/formatters';
import { format } from 'date-fns';
import { getCategoryIcon } from '@/utils/iconUtils';
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
import { motion } from 'framer-motion';

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
  const [merchantLogo, setMerchantLogo] = useState<string | null>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
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

  // Dynamically fetch merchant logo
  useEffect(() => {
    if (merchant) {
      // Sanitize merchant name for URL (remove spaces, special chars, etc)
      const sanitizedMerchant = merchant.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      
      // Set initial logo URL (fallback to category icon if not found)
      const clearbitUrl = `https://logo.clearbit.com/${sanitizedMerchant}.com`;
      
      // Create image to test loading
      const img = new Image();
      img.onload = () => {
        setMerchantLogo(clearbitUrl);
        setLogoLoaded(true);
        setLogoError(false);
      };
      img.onerror = () => {
        // Try with alternative URL or fallback
        const brandfetchUrl = `https://api.brandfetch.io/v2/brands/${sanitizedMerchant}.com/icon`;
        const altImg = new Image();
        altImg.onload = () => {
          setMerchantLogo(brandfetchUrl);
          setLogoLoaded(true);
          setLogoError(false);
        };
        altImg.onerror = () => {
          setMerchantLogo(null);
          setLogoLoaded(false);
          setLogoError(true);
        };
        altImg.src = brandfetchUrl;
      };
      img.src = clearbitUrl;
    }
  }, [merchant]);

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
    <motion.div 
      className="p-4 border-b border-gray-100 flex items-center hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {merchantLogo && logoLoaded ? (
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-100 flex-shrink-0">
          <img 
            src={merchantLogo} 
            alt={merchant || category} 
            className="w-full h-full object-contain p-1"
            onError={(e) => {
              setLogoError(true);
              setLogoLoaded(false);
            }}
          />
        </div>
      ) : (
        <IconBox 
          icon={IconComponent} 
          color={getColorClass(category)} 
          className="mr-3"
        />
      )}
      
      <div className="flex-1">
        <motion.div 
          className="flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="font-value">{description}</h3>
          <p className={`font-value ${amountClass}`}>{formattedAmount}</p>
        </motion.div>
        <div className="flex justify-between">
          <p className="text-sm text-finance-light">
            {merchant ? merchant : category[0].toUpperCase() + category.slice(1)}
            {note && <span className="text-xs ml-2 text-finance-light">• {note}</span>}
          </p>
          <p className="text-sm text-finance-light">{formattedDate}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumTransactionItem;
