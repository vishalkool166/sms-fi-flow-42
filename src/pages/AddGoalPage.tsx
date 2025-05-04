
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  ArrowLeft, 
  Target, 
  Home, 
  Car, 
  Plane, 
  Briefcase, 
  Smartphone, 
  GraduationCap,
  Heart,
  Check,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/utils/formatters';

interface GoalForm {
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  automaticContributions: boolean;
  monthlyContribution?: number;
  color: string;
  icon: string;
  notes?: string;
}

type IconType = "Target" | "Home" | "Car" | "Plane" | "Briefcase" | "Smartphone" | "GraduationCap" | "Heart";

const AddGoalPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<GoalForm>({
    defaultValues: {
      targetAmount: 100000,
      currentAmount: 0,
      automaticContributions: false,
      color: 'blue',
      icon: 'Target'
    }
  });

  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedIcon, setSelectedIcon] = useState<IconType>('Target');
  const [autoContribute, setAutoContribute] = useState(false);
  
  const targetAmount = watch('targetAmount');
  const currentAmount = watch('currentAmount');
  const dueDate = watch('dueDate');
  
  // Calculate percentage complete and days remaining
  const percentComplete = targetAmount > 0 ? Math.round((currentAmount / targetAmount) * 100) : 0;
  const daysRemaining = dueDate ? Math.max(0, Math.floor((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 0;
  
  // Calculate suggested monthly contribution
  const suggestedMonthlyContribution = daysRemaining > 0 
    ? Math.ceil(((targetAmount - currentAmount) / daysRemaining) * 30) 
    : 0;

  const iconComponents = {
    Target,
    Home,
    Car,
    Plane,
    Briefcase,
    Smartphone,
    GraduationCap,
    Heart
  };

  const IconComponent = iconComponents[selectedIcon];

  const colors = [
    { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { name: 'Green', value: 'green', class: 'bg-green-500' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Red', value: 'red', class: 'bg-red-500' },
    { name: 'Yellow', value: 'yellow', class: 'bg-yellow-500' },
    { name: 'Teal', value: 'teal', class: 'bg-teal-500' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
    { name: 'Indigo', value: 'indigo', class: 'bg-indigo-500' },
  ];

  const icons = [
    { name: 'Target', Icon: Target, label: 'General' },
    { name: 'Home', Icon: Home, label: 'Home' },
    { name: 'Car', Icon: Car, label: 'Vehicle' },
    { name: 'Plane', Icon: Plane, label: 'Travel' },
    { name: 'Briefcase', Icon: Briefcase, label: 'Business' },
    { name: 'Smartphone', Icon: Smartphone, label: 'Gadget' },
    { name: 'GraduationCap', Icon: GraduationCap, label: 'Education' },
    { name: 'Heart', Icon: Heart, label: 'Health' }
  ];

  const onSubmit = (data: GoalForm) => {
    data.color = selectedColor;
    data.icon = selectedIcon;
    data.automaticContributions = autoContribute;
    
    // Save the goal data
    console.log('Goal data:', data);
    
    toast({
      title: "Goal added successfully",
      description: "Your new financial goal has been added",
    });
    
    navigate('/goals');
  };

  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5 dark:text-white" />
        </button>
        <h1 className="text-xl font-bold">Add New Goal</h1>
      </div>
      
      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_70%)]"></div>
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">
                  {watch('goalName') || 'New Goal'}
                </h2>
                <p className="text-sm opacity-80 mb-4">
                  {daysRemaining} days remaining
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <IconComponent className="h-6 w-6" />
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{formatCurrency(currentAmount)}</span>
                <span>{formatCurrency(targetAmount)}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5">
                <div 
                  className="bg-white h-2.5 rounded-full" 
                  style={{ width: `${percentComplete}%` }}
                ></div>
              </div>
              <div className="mt-1 text-sm text-right">
                {percentComplete}% complete
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-sm opacity-80">Target amount</span>
              <p className="text-xl font-bold">{formatCurrency(targetAmount)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="goalName">Goal Name</Label>
          <Input 
            id="goalName" 
            placeholder="e.g. Trip to Thailand"
            {...register("goalName", { required: "Goal name is required" })}
          />
          {errors.goalName && (
            <p className="text-sm text-red-500">{errors.goalName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Goal Icon</Label>
          <div className="grid grid-cols-4 gap-3">
            {icons.map((icon) => (
              <motion.div
                key={icon.name}
                className={`flex flex-col items-center p-3 rounded-xl cursor-pointer ${
                  selectedIcon === icon.name 
                    ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/30 text-${selectedColor}-600 dark:text-${selectedColor}-400 ring-2 ring-${selectedColor}-500` 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}
                onClick={() => setSelectedIcon(icon.name as IconType)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <icon.Icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{icon.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Goal Color</Label>
          <div className="grid grid-cols-4 gap-3">
            {colors.map((color) => (
              <motion.div
                key={color.value}
                className={`${color.class} h-12 rounded-lg cursor-pointer flex items-center justify-center ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-black dark:ring-white' : ''}`}
                onClick={() => setSelectedColor(color.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedColor === color.value && <Check className="text-white h-5 w-5" />}
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="targetAmount">Target Amount: {formatCurrency(targetAmount)}</Label>
          <Slider
            value={[targetAmount]}
            min={1000}
            max={1000000}
            step={1000}
            onValueChange={(value) => setValue('targetAmount', value[0])}
          />
          <Input 
            type="number"
            id="targetAmount"
            value={targetAmount}
            onChange={(e) => setValue('targetAmount', Number(e.target.value))}
            className="mt-2"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="currentAmount">Current Amount: {formatCurrency(currentAmount)}</Label>
          <Slider
            value={[currentAmount]}
            min={0}
            max={targetAmount}
            step={1000}
            onValueChange={(value) => setValue('currentAmount', value[0])}
          />
          <Input 
            type="number"
            id="currentAmount"
            value={currentAmount}
            onChange={(e) => setValue('currentAmount', Number(e.target.value))}
            className="mt-2"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dueDate">Target Date</Label>
          <Input 
            id="dueDate" 
            type="date"
            {...register("dueDate", { required: "Target date is required" })}
          />
          {errors.dueDate && (
            <p className="text-sm text-red-500">{errors.dueDate.message}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="automaticContributions" className="cursor-pointer">Enable Automatic Contributions</Label>
          <Switch 
            id="automaticContributions" 
            checked={autoContribute}
            onCheckedChange={setAutoContribute}
          />
        </div>
        
        {autoContribute && (
          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">
              Monthly Contribution: {formatCurrency(watch('monthlyContribution') || suggestedMonthlyContribution)}
            </Label>
            <Slider
              value={[watch('monthlyContribution') || suggestedMonthlyContribution]}
              min={1000}
              max={Math.max(50000, suggestedMonthlyContribution * 2)}
              step={500}
              onValueChange={(value) => setValue('monthlyContribution', value[0])}
            />
            <Input 
              type="number"
              id="monthlyContribution"
              value={watch('monthlyContribution') || suggestedMonthlyContribution}
              onChange={(e) => setValue('monthlyContribution', Number(e.target.value))}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Suggested monthly contribution: {formatCurrency(suggestedMonthlyContribution)}
            </p>
          </div>
        )}
        
        <div className="pt-4">
          <Button type="submit" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddGoalPage;
