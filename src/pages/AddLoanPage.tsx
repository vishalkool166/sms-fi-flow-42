
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import PremiumCard from '@/components/PremiumCard';
import { formatCurrency } from '@/utils/formatters';

interface LoanForm {
  loanName: string;
  loanType: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  startDate: string;
  loanProvider: string;
}

const AddLoanPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<LoanForm>({
    defaultValues: {
      loanAmount: 100000,
      interestRate: 10,
      loanTerm: 36
    }
  });
  
  const loanAmount = watch('loanAmount');
  const interestRate = watch('interestRate');
  const loanTerm = watch('loanTerm');
  
  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    
    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) {
      return 0;
    }
    
    const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    return payment;
  };
  
  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - loanAmount;

  const onSubmit = (data: LoanForm) => {
    // Save the loan data
    console.log('Loan data:', data);
    
    toast({
      title: "Loan added successfully",
      description: "Your new loan has been added to your account",
    });
    
    navigate('/loans');
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
        <h1 className="text-xl font-bold">Add New Loan</h1>
      </div>
      
      <PremiumCard className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium">Loan Summary</h2>
            <p className="text-sm text-gray-500">Calculate your loan payments</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Coins className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Monthly Payment</p>
            <p className="font-semibold text-lg">{formatCurrency(monthlyPayment)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Total Payment</p>
            <p className="font-semibold">{formatCurrency(totalPayment)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Total Interest</p>
            <p className="font-semibold text-expense">{formatCurrency(totalInterest)}</p>
          </div>
        </div>
      </PremiumCard>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="loanName">Loan Name</Label>
          <Input 
            id="loanName" 
            placeholder="e.g. Home Loan, Car Loan"
            {...register("loanName", { required: "Loan name is required" })}
          />
          {errors.loanName && (
            <p className="text-sm text-red-500">{errors.loanName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="loanType">Loan Type</Label>
          <Select onValueChange={(value) => register("loanType").onChange({ target: { value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select loan type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal Loan</SelectItem>
              <SelectItem value="home">Home Loan</SelectItem>
              <SelectItem value="car">Car Loan</SelectItem>
              <SelectItem value="education">Education Loan</SelectItem>
              <SelectItem value="business">Business Loan</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.loanType && (
            <p className="text-sm text-red-500">{errors.loanType.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="loanAmount">Loan Amount: {formatCurrency(loanAmount)}</Label>
          <Slider
            value={[loanAmount]}
            min={10000}
            max={10000000}
            step={10000}
            onValueChange={(value) => setValue('loanAmount', value[0])}
          />
          <Input 
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setValue('loanAmount', Number(e.target.value))}
            className="mt-2"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="interestRate">Interest Rate: {interestRate}%</Label>
          <Slider
            value={[interestRate]}
            min={1}
            max={30}
            step={0.25}
            onValueChange={(value) => setValue('interestRate', value[0])}
          />
          <Input 
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setValue('interestRate', Number(e.target.value))}
            className="mt-2"
            step={0.25}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="loanTerm">Loan Term: {loanTerm} months</Label>
          <Slider
            value={[loanTerm]}
            min={6}
            max={360}
            step={6}
            onValueChange={(value) => setValue('loanTerm', value[0])}
          />
          <Input 
            type="number"
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setValue('loanTerm', Number(e.target.value))}
            className="mt-2"
            step={1}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input 
            id="startDate" 
            type="date"
            {...register("startDate", { required: "Start date is required" })}
          />
          {errors.startDate && (
            <p className="text-sm text-red-500">{errors.startDate.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="loanProvider">Loan Provider</Label>
          <Input 
            id="loanProvider" 
            placeholder="e.g. HDFC Bank"
            {...register("loanProvider", { required: "Loan provider is required" })}
          />
          {errors.loanProvider && (
            <p className="text-sm text-red-500">{errors.loanProvider.message}</p>
          )}
        </div>
        
        <div className="pt-4">
          <Button type="submit" className="w-full">
            Add Loan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLoanPage;
