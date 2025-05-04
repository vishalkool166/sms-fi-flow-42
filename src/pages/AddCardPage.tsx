
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Check, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

interface CardForm {
  cardName: string;
  cardNumber: string;
  cardType: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  creditLimit?: number;
  color: string;
}

const AddCardPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CardForm>();
  const [selectedColor, setSelectedColor] = useState('blue');
  const [isCredit, setIsCredit] = useState(true);
  
  const colors = [
    { name: 'Blue', value: 'blue', class: 'bg-gradient-to-r from-blue-700 to-blue-500' },
    { name: 'Purple', value: 'purple', class: 'bg-gradient-to-r from-purple-700 to-purple-500' },
    { name: 'Green', value: 'green', class: 'bg-gradient-to-r from-green-700 to-green-500' },
    { name: 'Red', value: 'red', class: 'bg-gradient-to-r from-red-700 to-red-500' },
    { name: 'Indigo', value: 'indigo', class: 'bg-gradient-to-r from-indigo-700 to-indigo-500' },
    { name: 'Teal', value: 'teal', class: 'bg-gradient-to-r from-teal-700 to-teal-500' },
    { name: 'Pink', value: 'pink', class: 'bg-gradient-to-r from-pink-700 to-pink-500' },
    { name: 'Orange', value: 'orange', class: 'bg-gradient-to-r from-orange-700 to-orange-500' },
  ];

  const formattedCardNumber = (value: string) => {
    const cardNumber = value?.replace(/\D/g, '') || '';
    const formatted = cardNumber.match(/.{1,4}/g)?.join(' ') || '';
    return formatted.substr(0, 19); // To ensure it doesn't exceed 16 digits + spaces
  };

  const watchCardNumber = watch("cardNumber", "");
  const maskedCardNumber = watchCardNumber ? 
    formattedCardNumber(watchCardNumber) : "**** **** **** ****";
    
  const watchCardHolder = watch("cardHolder", "");
  const displayName = watchCardHolder || "Card Holder";

  const watchCardType = watch("cardType", "");
  
  const onCardTypeChange = (value: string) => {
    setIsCredit(value === 'credit');
    register("cardType").onChange({ target: { value } });
  };

  const onSubmit = (data: CardForm) => {
    data.color = selectedColor;
    
    // Save the card data
    console.log('Card data:', data);
    
    toast({
      title: "Card added successfully",
      description: "Your new card has been added",
    });
    
    navigate('/cards');
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
        <h1 className="text-xl font-bold">Add New Card</h1>
      </div>
      
      <div className="mb-6">
        <motion.div 
          className={`relative h-48 w-full ${colors.find(c => c.value === selectedColor)?.class || colors[0].class} rounded-xl p-5 overflow-hidden`}
          initial={{ rotateY: 0 }}
          whileHover={{ rotateY: 15 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_70%)]"></div>
          </div>
          <div className="relative z-10 text-white">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-xs opacity-80">Card Type</p>
                <p className="text-base font-medium">{watchCardType === 'credit' ? 'Credit' : watchCardType === 'debit' ? 'Debit' : 'Card'}</p>
              </div>
              <CreditCard className="h-8 w-8" />
            </div>
            <div className="mb-4">
              <p className="text-xs opacity-80 mb-1">Card Number</p>
              <p className="font-medium tracking-wider text-lg">{maskedCardNumber}</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-xs opacity-80 mb-1">Card Holder</p>
                <p className="font-medium">{displayName}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-80 mb-1">Expires</p>
                <p className="font-medium">{watch("expiryMonth") || "MM"}/{watch("expiryYear") || "YY"}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="cardName">Card Name</Label>
          <Input 
            id="cardName" 
            placeholder="e.g. My Credit Card"
            {...register("cardName", { required: "Card name is required" })}
          />
          {errors.cardName && (
            <p className="text-sm text-red-500">{errors.cardName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cardType">Card Type</Label>
          <Select onValueChange={onCardTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select card type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit">Credit Card</SelectItem>
              <SelectItem value="debit">Debit Card</SelectItem>
            </SelectContent>
          </Select>
          {errors.cardType && (
            <p className="text-sm text-red-500">{errors.cardType.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input 
            id="cardNumber" 
            maxLength={19}
            placeholder="Enter card number"
            value={formattedCardNumber(watchCardNumber)}
            onChange={(e) => register("cardNumber").onChange({ 
              target: { value: e.target.value.replace(/\s/g, '') }
            })}
          />
          {errors.cardNumber && (
            <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cardHolder">Card Holder</Label>
          <Input 
            id="cardHolder" 
            placeholder="Enter name on card"
            {...register("cardHolder", { required: "Card holder name is required" })}
          />
          {errors.cardHolder && (
            <p className="text-sm text-red-500">{errors.cardHolder.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Expiry Date</Label>
            <div className="flex space-x-2">
              <Select onValueChange={(value) => register("expiryMonth").onChange({ target: { value } })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(12)].map((_, i) => {
                    const month = (i + 1).toString().padStart(2, '0');
                    return (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              
              <Select onValueChange={(value) => register("expiryYear").onChange({ target: { value } })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="YY" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => {
                    const year = (new Date().getFullYear() + i).toString().slice(-2);
                    return (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input 
              id="cvv" 
              maxLength={3}
              placeholder="123"
              {...register("cvv", { 
                required: "CVV is required",
                pattern: {
                  value: /^\d{3}$/,
                  message: "CVV must be 3 digits"
                }
              })}
            />
            {errors.cvv && (
              <p className="text-sm text-red-500">{errors.cvv.message}</p>
            )}
          </div>
        </div>
        
        {isCredit && (
          <div className="space-y-2">
            <Label htmlFor="creditLimit">Credit Limit</Label>
            <Input 
              id="creditLimit" 
              type="number" 
              placeholder="50000"
              {...register("creditLimit", { valueAsNumber: true })}
            />
            {errors.creditLimit && (
              <p className="text-sm text-red-500">{errors.creditLimit.message}</p>
            )}
          </div>
        )}
        
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
        
        <div className="pt-4">
          <Button type="submit" className="w-full">
            Add Card
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCardPage;
