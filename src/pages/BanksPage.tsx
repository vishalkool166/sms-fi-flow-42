
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Building, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BanksPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Banks & Accounts</h1>
      
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Banks</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/add-bank')}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add Bank
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center p-4 border border-gray-100 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">HDFC Bank</h3>
              <p className="text-sm text-gray-500">Savings Account</p>
            </div>
            <p className="font-medium">₹24,500</p>
          </div>
          
          <div className="flex items-center p-4 border border-gray-100 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">SBI Bank</h3>
              <p className="text-sm text-gray-500">Current Account</p>
            </div>
            <p className="font-medium">₹18,320</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Cards</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/add-card')}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add Card
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center p-4 border border-gray-100 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">HDFC Credit Card</h3>
              <p className="text-sm text-gray-500">**** 1234</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-expense">₹8,450</p>
              <p className="text-xs text-gray-500">Due in 7 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanksPage;
