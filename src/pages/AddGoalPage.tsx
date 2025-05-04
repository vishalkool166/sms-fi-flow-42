
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { format, addMonths } from 'date-fns';
import PremiumProgress from '@/components/PremiumProgress';
import { 
  ArrowLeft, 
  Save, 
  CalendarIcon, 
  Target, 
  Home, 
  Car, 
  Plane, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Smartphone, 
  Gift
} from 'lucide-react';
import IconBox from '@/components/IconBox';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface GoalType {
  id: string;
  name: string;
  icon: React.ElementType;
  color: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'teal' | 'orange' | 'pink';
}

const goalTypes: GoalType[] = [
  { id: 'house', name: 'Home', icon: Home, color: 'blue' },
  { id: 'car', name: 'Car', icon: Car, color: 'green' },
  { id: 'vacation', name: 'Travel', icon: Plane, color: 'teal' },
  { id: 'education', name: 'Education', icon: GraduationCap, color: 'yellow' },
  { id: 'wedding', name: 'Wedding', icon: Heart, color: 'pink' },
  { id: 'gadget', name: 'Electronics', icon: Smartphone, color: 'purple' },
  { id: 'business', name: 'Business', icon: Briefcase, color: 'orange' },
  { id: 'gift', name: 'Gift', icon: Gift, color: 'red' },
];

const AddGoalPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [goalType, setGoalType] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetDate, setTargetDate] = useState<Date>(addMonths(new Date(), 6));
  const [description, setDescription] = useState('');
  const [recurringContribution, setRecurringContribution] = useState('');
  const [contributionFrequency, setContributionFrequency] = useState('monthly');
  
  // Calculate the progress percentage
  const progressPercentage = currentAmount && targetAmount 
    ? Math.min(Math.round((parseFloat(currentAmount) / parseFloat(targetAmount)) * 100), 100) 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically save the goal to your state or database
    console.log({
      name,
      goalType,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount || '0'),
      targetDate,
      description,
      recurringContribution: recurringContribution ? parseFloat(recurringContribution) : 0,
      contributionFrequency,
    });

    toast({
      title: "Goal created",
      description: `${name} goal of ₹${targetAmount} has been created.`,
    });
    
    navigate('/goals');
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
        <h1 className="text-xl font-bold">Create Goal</h1>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Goal Name</Label>
            <Input
              id="name"
              placeholder="e.g., Dream Vacation"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Goal Type</Label>
            <div className="grid grid-cols-4 gap-3">
              {goalTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setGoalType(type.id)}
                  className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all ${
                    goalType === type.id
                      ? 'bg-gray-100 scale-105 shadow-sm'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <IconBox icon={type.icon} color={type.color} size="sm" />
                  <span className="text-xs mt-2 text-center">{type.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <Input
                id="targetAmount"
                type="number"
                placeholder="0.00"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="pl-8"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currentAmount">Current Savings (Optional)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <Input
                id="currentAmount"
                type="number"
                placeholder="0.00"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          {currentAmount && targetAmount && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Progress</span>
                <span className="text-sm">{progressPercentage}%</span>
              </div>
              <PremiumProgress 
                value={progressPercentage} 
                className="h-2" 
                color="sky" 
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">₹{currentAmount}</span>
                <span className="text-xs text-gray-500">₹{targetAmount}</span>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Target Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(targetDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={targetDate}
                  onSelect={(date) => date && setTargetDate(date)}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your goal..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recurringContribution">Regular Contribution (Optional)</Label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <Input
                  id="recurringContribution"
                  type="number"
                  placeholder="0.00"
                  value={recurringContribution}
                  onChange={(e) => setRecurringContribution(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={contributionFrequency} onValueChange={setContributionFrequency}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Create Goal
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddGoalPage;
