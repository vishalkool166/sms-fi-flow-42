
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DebtsPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Debts & Receivables</h1>
      
      <div className="flex justify-between mb-4">
        <Button 
          variant={`default`}
          size="sm" 
          className="flex-1 mr-2"
        >
          I Owe
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 ml-2"
        >
          Owed to Me
        </Button>
      </div>
      
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">I Owe</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/add-debt')}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add New
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">Rajesh</h3>
                  <p className="font-medium text-expense">₹5,000</p>
                </div>
                <p className="text-xs text-gray-500">Due by May 15, 2025</p>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-500">Personal Loan</p>
              <Button variant="outline" size="sm">Pay</Button>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">Priya</h3>
                  <p className="font-medium text-expense">₹2,500</p>
                </div>
                <p className="text-xs text-gray-500">Due by May 20, 2025</p>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-500">Lunch</p>
              <Button variant="outline" size="sm">Pay</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebtsPage;
