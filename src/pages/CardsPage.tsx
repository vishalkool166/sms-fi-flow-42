
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CardsPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cards</h1>
      
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <div className="mb-6">
          <div className="relative h-48 w-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-5 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_70%)]"></div>
            </div>
            <div className="relative z-10 text-white">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="text-xs opacity-80">Current Balance</p>
                  <p className="text-2xl font-bold">₹24,500</p>
                </div>
                <CreditCard className="h-8 w-8" />
              </div>
              <div className="mb-4">
                <p className="text-xs opacity-80 mb-1">Card Number</p>
                <p className="font-medium tracking-wider">**** **** **** 1234</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs opacity-80 mb-1">Card Holder</p>
                  <p className="font-medium">John Doe</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-80 mb-1">Expires</p>
                  <p className="font-medium">12/25</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Due Amount</p>
            <p className="text-xl font-semibold text-expense">₹8,450</p>
            <p className="text-xs text-gray-500 mt-1">Due in 7 days</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Credit Limit</p>
            <p className="text-xl font-semibold">₹50,000</p>
            <p className="text-xs text-gray-500 mt-1">83% available</p>
          </div>
        </div>
        
        <h3 className="font-medium mb-3">Recent Transactions</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
            <div>
              <p className="font-medium">Amazon</p>
              <p className="text-xs text-gray-500">Apr 28, 2025</p>
            </div>
            <p className="font-medium text-expense">₹2,450</p>
          </div>
          <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
            <div>
              <p className="font-medium">Netflix</p>
              <p className="text-xs text-gray-500">Apr 25, 2025</p>
            </div>
            <p className="font-medium text-expense">₹649</p>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full"
        onClick={() => navigate('/add-card')}
      >
        <PlusCircle className="h-4 w-4 mr-2" /> Add New Card
      </Button>
    </div>
  );
};

export default CardsPage;
