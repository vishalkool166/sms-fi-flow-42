
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Save, 
  CalendarIcon, 
  Wallet, 
  ShoppingBag, 
  Utensils, 
  Car, 
  Home, 
  Smartphone, 
  HeartPulse, 
  GraduationCap, 
  Film, 
  Coffee
} from 'lucide-react';
import IconBox from '@/components/IconBox';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'teal' | 'orange' | 'pink';
}

const categories: Category[] = [
  { id: 'food', name: 'Food & Dining', icon: Utensils, color: 'orange' },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'purple' },
  { id: 'transport', name: 'Transport', icon: Car, color: 'blue' },
  { id: 'entertainment', name: 'Entertainment', icon: Film, color: 'pink' },
  { id: 'utilities', name: 'Utilities', icon: Home, color: 'teal' },
  { id: 'health', name: 'Health', icon: HeartPulse, color: 'red' },
  { id: 'education', name: 'Education', icon: GraduationCap, color: 'yellow' },
  { id: 'misc', name: 'Miscellaneous', icon: Coffee, color: 'green' },
];

const AddBudgetPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [period, setPeriod] = useState('monthly');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [rollover, setRollover] = useState(false);
  const [alerts, setAlerts] = useState(true);
  const [alarmThreshold, setAlarmThreshold] = useState('80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically save the budget to your state or database
    console.log({
      name,
      amount: parseFloat(amount),
      category,
      period,
      startDate,
      endDate,
      rollover,
      alerts,
      alarmThreshold: parseInt(alarmThreshold),
    });

    toast({
      title: "Budget created",
      description: `${name} budget of ₹${amount} has been created.`,
    });
    
    navigate('/budgets');
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
        <h1 className="text-xl font-bold">Create Budget</h1>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Budget Name</Label>
            <Input
              id="name"
              placeholder="e.g., Monthly Food Budget"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Budget Amount</Label>
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
            <Label>Category</Label>
            <div className="grid grid-cols-4 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all ${
                    category === cat.id
                      ? 'bg-gray-100 scale-105 shadow-sm'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <IconBox icon={cat.icon} color={cat.color} size="sm" />
                  <span className="text-xs mt-2 text-center">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="period">Budget Period</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="custom">Custom Period</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(startDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(endDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    initialFocus
                    disabled={(date) => date < startDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="threshold">Alert Threshold (%)</Label>
            <Input
              id="threshold"
              type="number"
              min="1"
              max="100"
              value={alarmThreshold}
              onChange={(e) => setAlarmThreshold(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              You'll be notified when you've spent {alarmThreshold}% of your budget.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rollover"
              checked={rollover}
              onChange={(e) => setRollover(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="rollover" className="text-sm cursor-pointer">
              Roll over remaining amount to next period
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="alerts"
              checked={alerts}
              onChange={(e) => setAlerts(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="alerts" className="text-sm cursor-pointer">
              Enable budget notifications
            </Label>
          </div>
          
          <Button type="submit" className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Create Budget
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBudgetPage;
