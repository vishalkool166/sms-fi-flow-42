
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Transaction, CategoryType } from '@/models/Transaction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowLeft, Check } from 'lucide-react';

const AddTransactionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addTransaction } = useApp();
  
  const queryParams = new URLSearchParams(location.search);
  const typeFromQuery = queryParams.get('type') as 'expense' | 'income' || 'expense';
  
  const [type, setType] = useState<'expense' | 'income'>(typeFromQuery);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryType>('other');
  const [description, setDescription] = useState('');
  const [merchant, setMerchant] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description) {
      return; // Simple validation
    }
    
    const newTransaction: Omit<Transaction, 'id'> = {
      amount: parseFloat(amount),
      type,
      category,
      description,
      merchant: merchant || undefined,
      date: new Date(),
      isAutoDetected: false,
    };
    
    addTransaction(newTransaction);
    navigate('/');
  };
  
  const expenseCategories: CategoryType[] = [
    'food', 'transport', 'shopping', 'entertainment', 
    'utilities', 'health', 'education', 'other'
  ];
  
  const incomeCategories: CategoryType[] = ['salary', 'investment', 'other'];
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Add Transaction</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <button
            type="button"
            className={`py-3 rounded-lg text-center font-medium ${
              type === 'expense' 
                ? 'bg-expense/10 border-2 border-expense text-expense' 
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setType('expense')}
          >
            Expense
          </button>
          <button
            type="button"
            className={`py-3 rounded-lg text-center font-medium ${
              type === 'income' 
                ? 'bg-income/10 border-2 border-income text-income' 
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setType('income')}
          >
            Income
          </button>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-8"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={category} 
            onValueChange={(value) => setCategory(value as CategoryType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {(type === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        {type === 'expense' && (
          <div className="space-y-2">
            <Label htmlFor="merchant">Merchant (Optional)</Label>
            <Input
              id="merchant"
              placeholder="Enter merchant name"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
            />
          </div>
        )}
        
        <Button type="submit" className="w-full">
          <Check className="h-4 w-4 mr-2" />
          Save Transaction
        </Button>
      </form>
    </div>
  );
};

export default AddTransactionPage;
