
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Home, Car } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';

const LoansPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Loans</h1>
      
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Active Loans</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/add-loan')}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add Loan
          </Button>
        </div>
        
        <div className="space-y-6">
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Home className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Home Loan</h3>
                <p className="text-xs text-gray-500">HDFC Bank</p>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span className="font-medium">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Outstanding</p>
                <p className="font-medium">₹24,50,000</p>
              </div>
              <div>
                <p className="text-gray-500">EMI</p>
                <p className="font-medium">₹22,450</p>
              </div>
              <div>
                <p className="text-gray-500">Interest Rate</p>
                <p className="font-medium">8.5%</p>
              </div>
              <div>
                <p className="text-gray-500">Next Payment</p>
                <p className="font-medium">May 5, 2025</p>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Car className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Car Loan</h3>
                <p className="text-xs text-gray-500">SBI Bank</p>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span className="font-medium">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Outstanding</p>
                <p className="font-medium">₹3,20,000</p>
              </div>
              <div>
                <p className="text-gray-500">EMI</p>
                <p className="font-medium">₹12,500</p>
              </div>
              <div>
                <p className="text-gray-500">Interest Rate</p>
                <p className="font-medium">9.2%</p>
              </div>
              <div>
                <p className="text-gray-500">Next Payment</p>
                <p className="font-medium">May 10, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoansPage;
