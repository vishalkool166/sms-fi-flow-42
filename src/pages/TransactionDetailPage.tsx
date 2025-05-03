
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ArrowLeft, Edit, Trash, CalendarClock, Store, Tag, CreditCard } from 'lucide-react';
import { getCategoryIcon } from '@/utils/iconUtils';
import IconBox from '@/components/IconBox';
import PremiumCard from '@/components/PremiumCard';

const TransactionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { transactions, deleteTransaction } = useApp();
  
  const transaction = transactions.find(t => t.id === id);
  
  if (!transaction) {
    return (
      <div className="p-4 max-w-md mx-auto text-center">
        <h1 className="text-xl font-bold mb-4">Transaction Not Found</h1>
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    );
  }
  
  const { 
    type, 
    amount, 
    description, 
    category, 
    date, 
    merchant, 
    note, 
    isAutoDetected,
    bankName
  } = transaction;
  
  const isExpense = type === 'expense';
  const amountClass = isExpense ? 'text-expense' : 'text-income';
  const formattedAmount = isExpense ? `-${formatCurrency(amount)}` : `+${formatCurrency(amount)}`;
  const formattedDate = format(new Date(date), 'PPP');
  const formattedTime = format(new Date(date), 'h:mm a');
  
  // Get category icon config
  const categoryConfig = getCategoryIcon(category);
  const IconComponent = categoryConfig.icon;
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id!);
      navigate('/');
    }
  };
  
  const handleEdit = () => {
    navigate(`/edit-transaction/${id}`);
  };
  
  return (
    <div className="p-4 max-w-md mx-auto pb-24">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Transaction Details</h1>
      </div>
      
      <PremiumCard className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <IconBox 
              icon={IconComponent} 
              color={categoryConfig.color as any}
              size="lg" 
              className="mr-4"
            />
            <div>
              <h2 className="font-value text-xl mb-1">{description}</h2>
              <p className="text-sm text-finance-light">
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {merchant && <span> • {merchant}</span>}
              </p>
            </div>
          </div>
          <p className={`text-2xl font-value ${amountClass}`}>{formattedAmount}</p>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <CalendarClock className="h-5 w-5 text-finance-medium mr-3" />
              <div>
                <p className="text-sm text-finance-dark">{formattedDate}</p>
                <p className="text-xs text-finance-light">{formattedTime}</p>
              </div>
            </div>
            
            {merchant && (
              <div className="flex items-center">
                <Store className="h-5 w-5 text-finance-medium mr-3" />
                <p className="text-sm text-finance-dark">{merchant}</p>
              </div>
            )}
            
            {bankName && (
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-finance-medium mr-3" />
                <div>
                  <p className="text-sm text-finance-dark">{bankName}</p>
                  <p className="text-xs text-finance-light">
                    {isAutoDetected ? 'Auto-detected from SMS' : 'Manually added'}
                  </p>
                </div>
              </div>
            )}
            
            {note && (
              <div className="flex items-start">
                <Tag className="h-5 w-5 text-finance-medium mr-3 mt-0.5" />
                <p className="text-sm text-finance-dark">{note}</p>
              </div>
            )}
          </div>
        </div>
      </PremiumCard>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleDelete}
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TransactionDetailPage;
