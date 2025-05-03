
import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Check, 
  CalendarIcon, 
  Clock,
  CreditCard,
  Building,
  ShoppingBag,
  Store,
  Utensils,
  Car,
  Film,
  Home,
  DollarSign,
  TrendingUp,
  GraduationCap,
  Stethoscope
} from 'lucide-react';

// Common merchant data with logos
const commonMerchants = [
  { id: 'amazon', name: 'Amazon', logo: 'amazon.png', category: 'shopping' },
  { id: 'flipkart', name: 'Flipkart', logo: 'flipkart.png', category: 'shopping' },
  { id: 'swiggy', name: 'Swiggy', logo: 'swiggy.png', category: 'food' },
  { id: 'zomato', name: 'Zomato', logo: 'zomato.png', category: 'food' },
  { id: 'uber', name: 'Uber', logo: 'uber.png', category: 'transport' },
  { id: 'ola', name: 'Ola', logo: 'ola.png', category: 'transport' },
  { id: 'netflix', name: 'Netflix', logo: 'netflix.png', category: 'entertainment' },
  { id: 'amazon_prime', name: 'Amazon Prime', logo: 'amazon_prime.png', category: 'entertainment' },
  { id: 'hdfc', name: 'HDFC Bank', logo: 'hdfc.png', category: 'other' },
  { id: 'sbi', name: 'SBI Bank', logo: 'sbi.png', category: 'other' },
  { id: 'icici', name: 'ICICI Bank', logo: 'icici.png', category: 'other' },
  { id: 'airtel', name: 'Airtel', logo: 'airtel.png', category: 'utilities' },
  { id: 'jio', name: 'Jio', logo: 'jio.png', category: 'utilities' },
  { id: 'tata_power', name: 'Tata Power', logo: 'tata_power.png', category: 'utilities' },
  { id: 'apollo', name: 'Apollo Pharmacy', logo: 'apollo.png', category: 'health' },
  { id: 'lenskart', name: 'Lenskart', logo: 'lenskart.png', category: 'health' },
];

const AddTransactionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { addTransaction, transactions, updateTransaction } = useApp();
  
  const queryParams = new URLSearchParams(location.search);
  const typeFromQuery = queryParams.get('type') as 'expense' | 'income' || 'expense';
  
  // Find existing transaction if we're editing
  const existingTransaction = id 
    ? transactions.find(t => t.id === id) 
    : undefined;
  
  const [type, setType] = useState<'expense' | 'income'>(
    existingTransaction?.type || typeFromQuery
  );
  const [amount, setAmount] = useState(
    existingTransaction?.amount.toString() || ''
  );
  const [category, setCategory] = useState<CategoryType>(
    existingTransaction?.category || 'other'
  );
  const [description, setDescription] = useState(
    existingTransaction?.description || ''
  );
  const [merchant, setMerchant] = useState(
    existingTransaction?.merchant || ''
  );
  const [date, setDate] = useState<Date>(
    existingTransaction?.date || new Date()
  );
  const [time, setTime] = useState(
    existingTransaction?.date 
      ? format(new Date(existingTransaction.date), 'HH:mm')
      : format(new Date(), 'HH:mm')
  );
  const [note, setNote] = useState('');
  const [selectedMerchantId, setSelectedMerchantId] = useState<string | null>(null);

  // Filter merchants based on selected category
  const filteredMerchants = category 
    ? commonMerchants.filter(m => m.category === category || m.category === 'other')
    : commonMerchants;

  const handleSelectMerchant = (merchantId: string) => {
    const selected = commonMerchants.find(m => m.id === merchantId);
    if (selected) {
      setMerchant(selected.name);
      setSelectedMerchantId(merchantId);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description) {
      return; // Simple validation
    }
    
    // Combine date and time
    const dateTime = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    dateTime.setHours(hours, minutes);
    
    const transactionData: Omit<Transaction, 'id'> = {
      amount: parseFloat(amount),
      type,
      category,
      description,
      merchant: merchant || undefined,
      date: dateTime,
      isAutoDetected: false,
      note: note || undefined
    };
    
    if (existingTransaction && id) {
      updateTransaction({
        ...transactionData,
        id,
        smsId: existingTransaction.smsId,
        bankName: existingTransaction.bankName,
        isAutoDetected: existingTransaction.isAutoDetected
      });
    } else {
      addTransaction(transactionData);
    }
    
    navigate('/');
  };
  
  const expenseCategories: CategoryType[] = [
    'food', 'transport', 'shopping', 'entertainment', 
    'utilities', 'health', 'education', 'other'
  ];
  
  const incomeCategories: CategoryType[] = ['salary', 'investment', 'other'];

  const getCategoryIcon = (cat: CategoryType) => {
    switch (cat) {
      case 'shopping': 
        return <ShoppingBag className="h-4 w-4 mr-2" />;
      case 'food': 
        return <Utensils className="h-4 w-4 mr-2" />;
      case 'transport': 
        return <Car className="h-4 w-4 mr-2" />;
      case 'entertainment': 
        return <Film className="h-4 w-4 mr-2" />;
      case 'utilities': 
        return <Home className="h-4 w-4 mr-2" />;
      case 'health': 
        return <Stethoscope className="h-4 w-4 mr-2" />;
      case 'education': 
        return <GraduationCap className="h-4 w-4 mr-2" />;
      case 'salary': 
        return <DollarSign className="h-4 w-4 mr-2" />;
      case 'investment': 
        return <TrendingUp className="h-4 w-4 mr-2" />;
      default: 
        return <CreditCard className="h-4 w-4 mr-2" />;
    }
  };
  
  return (
    <div className="p-4 max-w-md mx-auto pb-20">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">
          {existingTransaction ? 'Edit' : 'Add'} Transaction
        </h1>
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
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category">
                <div className="flex items-center">
                  {getCategoryIcon(category)}
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {(type === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  <div className="flex items-center">
                    {getCategoryIcon(cat)}
                    <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  </div>
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
            <Label>Merchant</Label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {filteredMerchants.slice(0, 8).map((m) => (
                <div 
                  key={m.id}
                  onClick={() => handleSelectMerchant(m.id)}
                  className={`flex flex-col items-center p-2 rounded-lg cursor-pointer border transition-colors ${
                    selectedMerchantId === m.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                    <Store className="h-4 w-4 text-gray-600" />
                  </div>
                  <span className="text-xs text-center truncate w-full">{m.name}</span>
                </div>
              ))}
            </div>
            <Input
              id="merchant"
              placeholder="Or enter merchant name"
              value={merchant}
              onChange={(e) => {
                setMerchant(e.target.value);
                setSelectedMerchantId(null);
              }}
            />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                id="time"
                type="time"
                value={time}
                onChange={handleTimeChange}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="note">Note (Optional)</Label>
          <Input
            id="note"
            placeholder="Add a note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        
        <Button type="submit" className="w-full">
          <Check className="h-4 w-4 mr-2" />
          {existingTransaction ? 'Update' : 'Save'} Transaction
        </Button>
      </form>
    </div>
  );
};

export default AddTransactionPage;
