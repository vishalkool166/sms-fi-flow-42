
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Target, Check, ArrowUpRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';

const GoalsPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Financial Goals</h1>
      
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Active Goals</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/add-goal')}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Create Goal
          </Button>
        </div>
        
        <div className="space-y-5">
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">New Laptop</h3>
                  <div className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                    In Progress
                  </div>
                </div>
                <p className="text-xs text-gray-500">Target: Sep 2025</p>
              </div>
            </div>
            
            <div className="flex justify-between text-sm mb-1">
              <span>₹45,000 / ₹80,000</span>
              <span className="font-medium">56%</span>
            </div>
            <Progress value={56} className="h-2 mb-3" />
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Monthly: ₹5,000</span>
              <span className="text-blue-600 flex items-center cursor-pointer">
                <span>Details</span>
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">Emergency Fund</h3>
                  <div className="ml-2 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                    Almost Done
                  </div>
                </div>
                <p className="text-xs text-gray-500">Target: Jul 2025</p>
              </div>
            </div>
            
            <div className="flex justify-between text-sm mb-1">
              <span>₹95,000 / ₹100,000</span>
              <span className="font-medium">95%</span>
            </div>
            <Progress value={95} className="h-2 mb-3" />
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Monthly: ₹10,000</span>
              <span className="text-green-600 flex items-center cursor-pointer">
                <span>Details</span>
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Check className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">New Phone</h3>
                  <div className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                    Completed
                  </div>
                </div>
                <p className="text-xs text-gray-500">Completed: Mar 2025</p>
              </div>
            </div>
            
            <div className="flex justify-between text-sm mb-1">
              <span>₹35,000 / ₹35,000</span>
              <span className="font-medium">100%</span>
            </div>
            <Progress value={100} className="h-2 mb-3" />
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Achieved in 5 months</span>
              <span className="text-purple-600 flex items-center cursor-pointer">
                <span>Details</span>
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Goal Summary</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Goals</p>
            <p className="text-xl font-semibold">3</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <p className="text-xl font-semibold">1</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Saved</p>
            <p className="text-xl font-semibold">₹1,75,000</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500 mb-1">Monthly Saving</p>
            <p className="text-xl font-semibold">₹15,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;
