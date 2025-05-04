
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Building, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

interface BankForm {
  bankName: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  isPrimary: boolean;
  color: string;
}

const AddBankPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<BankForm>();
  const [selectedColor, setSelectedColor] = useState('blue');
  const [isPrimary, setIsPrimary] = useState(false);
  
  const colors = [
    { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { name: 'Green', value: 'green', class: 'bg-green-500' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Teal', value: 'teal', class: 'bg-teal-500' },
    { name: 'Red', value: 'red', class: 'bg-red-500' },
    { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
    { name: 'Indigo', value: 'indigo', class: 'bg-indigo-500' },
  ];

  const onSubmit = (data: BankForm) => {
    data.color = selectedColor;
    data.isPrimary = isPrimary;
    
    // Save the bank data
    console.log('Bank data:', data);
    
    toast({
      title: "Bank added successfully",
      description: "Your new bank account has been added",
    });
    
    navigate('/banks');
  };

  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Add Bank Account</h1>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name</Label>
          <Input 
            id="bankName" 
            placeholder="Enter bank name"
            {...register("bankName", { required: "Bank name is required" })}
          />
          {errors.bankName && (
            <p className="text-sm text-red-500">{errors.bankName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input 
            id="accountNumber" 
            placeholder="Enter account number"
            {...register("accountNumber", { required: "Account number is required" })}
          />
          {errors.accountNumber && (
            <p className="text-sm text-red-500">{errors.accountNumber.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="accountType">Account Type</Label>
          <Select onValueChange={(value) => register("accountType").onChange({ target: { value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="savings">Savings</SelectItem>
              <SelectItem value="checking">Checking</SelectItem>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="retirement">Retirement</SelectItem>
              <SelectItem value="investment">Investment</SelectItem>
            </SelectContent>
          </Select>
          {errors.accountType && (
            <p className="text-sm text-red-500">{errors.accountType.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="balance">Initial Balance</Label>
          <Input 
            id="balance" 
            type="number" 
            placeholder="0.00"
            {...register("balance", { required: "Balance is required", valueAsNumber: true })}
          />
          {errors.balance && (
            <p className="text-sm text-red-500">{errors.balance.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Card Color</Label>
          <div className="grid grid-cols-4 gap-3">
            {colors.map((color) => (
              <motion.div
                key={color.value}
                className={`${color.class} h-12 rounded-lg cursor-pointer flex items-center justify-center ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                onClick={() => setSelectedColor(color.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedColor === color.value && <Check className="text-white h-5 w-5" />}
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="isPrimary" className="cursor-pointer">Set as Primary Account</Label>
          <Switch 
            id="isPrimary" 
            checked={isPrimary}
            onCheckedChange={setIsPrimary}
          />
        </div>
        
        <div className="pt-4">
          <Button type="submit" className="w-full">
            Add Bank Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBankPage;
