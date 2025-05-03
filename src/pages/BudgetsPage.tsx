
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, ShoppingBag, Utensils, Car, Home, Film } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';

const BudgetsPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Budgets</h1>
      
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Monthly Budgets</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/add-budget')}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Create Budget
          </Button>
        </div>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <ShoppingBag className="h-4 w-4 text-orange-600" />
                </div>
                <span className="font-medium">Shopping</span>
              </div>
              <div className="text-right">
                <p className="font-medium">₹5,200 / ₹8,000</p>
                <p className="text-xs text-gray-500">65% used</p>
              </div>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <Utensils className="h-4 w-4 text-red-600" />
                </div>
                <span className="font-medium">Food</span>
              </div>
              <div className="text-right">
                <p className="font-medium">₹4,800 / ₹6,000</p>
                <p className="text-xs text-gray-500">80% used</p>
              </div>
            </div>
            <Progress value={80} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Car className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium">Transport</span>
              </div>
              <div className="text-right">
                <p className="font-medium">₹2,100 / ₹3,000</p>
                <p className="text-xs text-gray-500">70% used</p>
              </div>
            </div>
            <Progress value={70} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Home className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-medium">Utilities</span>
              </div>
              <div className="text-right">
                <p className="font-medium">₹3,200 / ₹5,000</p>
                <p className="text-xs text-gray-500">64% used</p>
              </div>
            </div>
            <Progress value={64} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                  <Film className="h-4 w-4 text-pink-600" />
                </div>
                <span className="font-medium">Entertainment</span>
              </div>
              <div className="text-right">
                <p className="font-medium">₹1,800 / ₹2,000</p>
                <p className="text-xs text-gray-500">90% used</p>
              </div>
            </div>
            <Progress value={90} className="h-2" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Total Budget</p>
          <p className="text-xl font-semibold">₹24,000</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Spent</p>
          <p className="text-xl font-semibold">₹17,100</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetsPage;
