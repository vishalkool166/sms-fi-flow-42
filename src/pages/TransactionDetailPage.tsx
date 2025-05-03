
import React from 'react';
import { ArrowLeft, Edit, Trash2, Receipt, MapPin, Tag, CalendarDays, HelpCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/formatters';
import { format } from 'date-fns';
import PremiumCard from '@/components/PremiumCard';
import IconBox from '@/components/IconBox';

const TransactionDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getTransactionById, deleteTransaction } = useApp();
  
  const transaction = getTransactionById(id || '');
  
  if (!transaction) {
    return (
      <div className="p-5 pb-28 max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button 
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-heading">Transaction Not Found</h1>
        </div>
        <div className="text-center">
          <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-finance-medium mb-4">The transaction you're looking for doesn't exist.</p>
          <button 
            className="button-premium"
            onClick={() => navigate('/')}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }
  
  const isExpense = transaction.type === 'expense';
  const amountClass = isExpense ? 'text-expense' : 'text-income';
  const amountSign = isExpense ? '-' : '+';
  const dateFormatted = transaction.date ? format(new Date(transaction.date), 'MMMM d, yyyy') : 'N/A';
  const timeFormatted = transaction.date ? format(new Date(transaction.date), 'h:mm a') : '';
  
  const handleEdit = () => {
    navigate(`/edit-transaction/${id}`);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(transaction.id);
      navigate('/');
    }
  };
  
  // Determine color based on category
  const getCategoryColor = () => {
    const categoryColorMap: Record<string, string> = {
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
    
    return categoryColorMap[transaction.category] || 'gray';
  };
  
  return (
    <div className="p-5 pb-28 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-heading">Transaction Details</h1>
        </div>
        <div className="flex">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 mr-1"
            onClick={handleEdit}
          >
            <Edit className="h-5 w-5 text-finance-navy" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={handleDelete}
          >
            <Trash2 className="h-5 w-5 text-red-500" />
          </button>
        </div>
      </div>
      
      <PremiumCard className="mb-6">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4">
            <IconBox 
              icon={isExpense ? ArrowLeft : ArrowLeft}  
              color={isExpense ? "red" : "green"}
              size="lg"
              className="mx-auto"
            />
          </div>
          <p className="text-finance-medium mb-2">{transaction.description}</p>
          <h2 className={`text-3xl font-value ${amountClass}`}>
            {amountSign} {formatCurrency(transaction.amount)}
          </h2>
        </div>
        
        <div className="border-t border-gray-100 pt-5">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <IconBox icon={CalendarDays} color="blue" size="sm" className="mr-3" />
              <div>
                <p className="text-sm text-finance-medium font-label">Date & Time</p>
                <p className="font-medium">{dateFormatted} at {timeFormatted}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <IconBox icon={Tag} color={getCategoryColor() as any} size="sm" className="mr-3" />
              <div>
                <p className="text-sm text-finance-medium font-label">Category</p>
                <p className="font-medium capitalize">{transaction.category}</p>
              </div>
            </div>
            
            {transaction.merchant && (
              <div className="flex items-center">
                <IconBox icon={Receipt} color="purple" size="sm" className="mr-3" />
                <div>
                  <p className="text-sm text-finance-medium font-label">Merchant</p>
                  <p className="font-medium">{transaction.merchant}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <IconBox icon={MapPin} color="amber" size="sm" className="mr-3" />
              <div>
                <p className="text-sm text-finance-medium font-label">Location</p>
                <p className="font-medium">Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>
      </PremiumCard>
      
      <PremiumCard className="mb-6">
        <h3 className="text-lg font-heading mb-3">Similar Transactions</h3>
        <div className="text-center text-sm text-finance-medium py-6">
          No similar transactions found.
        </div>
      </PremiumCard>
      
      <div className="flex space-x-3">
        <button 
          className="button-premium flex-1 flex justify-center items-center"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Transaction
        </button>
        <button 
          className="button-outline flex-1 flex justify-center items-center"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailPage;
