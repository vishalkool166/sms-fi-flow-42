
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import PremiumCard from '@/components/PremiumCard';
import { formatCurrency } from '@/utils/formatters';

interface DebtForm {
  debtName: string;
  debtType: 'owed' | 'lent';
  personName: string;
  amount: number;
  deadline: string;
  notes: string;
  reminderEnabled: boolean;
}

const AddDebtPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DebtForm>({
    defaultValues: {
      debtType: 'owed',
      reminderEnabled: true,
      amount: 0
    }
  });
  
  const debtType = watch('debtType');
  const amount = watch('amount');
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const onSubmit = (data: DebtForm) => {
    data.reminderEnabled = reminderEnabled;
    
    // Save the debt data
    console.log('Debt data:', data);
    
    toast({
      title: "Debt added successfully",
      description: `Your ${data.debtType === 'owed' ? 'debt' : 'loan'} to ${data.personName} has been added`,
    });
    
    navigate('/debts');
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
        <h1 className="text-xl font-bold">{debtType === 'owed' ? 'Add Debt' : 'Add Lent Money'}</h1>
      </div>
      
      <div className="mb-6">
        <Label>Type</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <Button 
            type="button"
            variant={debtType === 'owed' ? 'default' : 'outline'}
            className={`h-20 flex flex-col items-center justify-center ${debtType === 'owed' ? 'bg-red-500 hover:bg-red-600' : ''}`}
            onClick={() => setValue('debtType', 'owed')}
          >
            <User className="h-6 w-6 mb-2" />
            <span>I Owe</span>
          </Button>
          <Button 
            type="button"
            variant={debtType === 'lent' ? 'default' : 'outline'}
            className={`h-20 flex flex-col items-center justify-center ${debtType === 'lent' ? 'bg-green-500 hover:bg-green-600' : ''}`}
            onClick={() => setValue('debtType', 'lent')}
          >
            <Users className="h-6 w-6 mb-2" />
            <span>I Lent</span>
          </Button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <PremiumCard className="border-none shadow-md" variant={debtType === 'owed' ? 'default' : 'default'}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">
                {debtType === 'owed' ? 'Debt Details' : 'Loan Details'}
              </h3>
              <p className="text-sm text-gray-500">
                {debtType === 'owed' ? 'Money you owe to someone' : 'Money someone owes you'}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${debtType === 'owed' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {debtType === 'owed' ? <User className="h-5 w-5" /> : <Users className="h-5 w-5" />}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="debtName">{debtType === 'owed' ? 'Debt Name' : 'Loan Name'}</Label>
              <Input 
                id="debtName" 
                placeholder={debtType === 'owed' ? 'e.g. Money borrowed for rent' : 'e.g. Money lent for shopping'}
                {...register("debtName", { required: "Name is required" })}
              />
              {errors.debtName && (
                <p className="text-sm text-red-500">{errors.debtName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="personName">{debtType === 'owed' ? 'Lender Name' : 'Borrower Name'}</Label>
              <Input 
                id="personName" 
                placeholder="Enter name"
                {...register("personName", { required: "Person name is required" })}
              />
              {errors.personName && (
                <p className="text-sm text-red-500">{errors.personName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <Input 
                  id="amount" 
                  type="number"
                  className="pl-8"
                  placeholder="0.00"
                  {...register("amount", { 
                    required: "Amount is required",
                    valueAsNumber: true,
                    validate: value => value > 0 || "Amount must be greater than zero"
                  })}
                />
              </div>
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deadline">Due Date</Label>
              <Input 
                id="deadline" 
                type="date"
                {...register("deadline")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="reminderEnabled" className="cursor-pointer">Enable Reminders</Label>
              <Switch 
                id="reminderEnabled" 
                checked={reminderEnabled}
                onCheckedChange={setReminderEnabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Add details about this transaction"
                {...register("notes")}
                rows={3}
              />
            </div>
          </div>
        </PremiumCard>
        
        <div className="pt-4">
          <Button type="submit" className="w-full">
            {debtType === 'owed' ? 'Add Debt' : 'Add Loan'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddDebtPage;
