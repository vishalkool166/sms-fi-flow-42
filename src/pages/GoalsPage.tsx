
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PremiumCard from '@/components/PremiumCard';
import PremiumProgress from '@/components/PremiumProgress';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';
import { 
  ArrowLeft, 
  PlusCircle, 
  Target, 
  Home, 
  Car, 
  Plane, 
  Briefcase, 
  Calendar 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Goal {
  id: number;
  name: string;
  icon: JSX.Element;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  daysLeft: number;
  color: string;
}

const GoalsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const goals: Goal[] = [
    {
      id: 1,
      name: 'Trip to Thailand',
      icon: <Plane className="h-5 w-5" />,
      targetAmount: 150000,
      currentAmount: 92500,
      dueDate: '2025-10-15',
      daysLeft: 130,
      color: 'blue'
    },
    {
      id: 2,
      name: 'New Car',
      icon: <Car className="h-5 w-5" />,
      targetAmount: 800000,
      currentAmount: 320000,
      dueDate: '2026-05-20',
      daysLeft: 380,
      color: 'green'
    },
    {
      id: 3,
      name: 'Home Down Payment',
      icon: <Home className="h-5 w-5" />,
      targetAmount: 2500000,
      currentAmount: 1100000,
      dueDate: '2027-01-10',
      daysLeft: 610,
      color: 'purple'
    }
  ];
  
  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Financial Goals</h1>
        </div>
        
        <Button onClick={() => navigate('/add-goal')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>
      
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <PremiumCard className="cursor-pointer hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full bg-${goal.color}-100 flex items-center justify-center mr-3`}>
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{goal.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{goal.daysLeft} days left</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">
                    {formatCurrency(goal.currentAmount)}
                  </div>
                  <div className="text-xs text-gray-500">
                    of {formatCurrency(goal.targetAmount)}
                  </div>
                </div>
              </div>
              
              <PremiumProgress
                value={(goal.currentAmount / goal.targetAmount) * 100}
                color="navy"
                animated
                showLabel
              />
              
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {Math.round((goal.currentAmount / goal.targetAmount) * 100)}% achieved
                </span>
                <Button size="sm" variant="outline">
                  Add Money
                </Button>
              </div>
            </PremiumCard>
          </motion.div>
        ))}
        
        {goals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <Target className="h-16 w-16 text-gray-300 mb-3" />
            <h3 className="font-medium text-gray-500 mb-1">No goals yet</h3>
            <p className="text-gray-400 text-sm text-center max-w-xs mb-4">
              Start setting your financial goals to track your progress
            </p>
            <Button onClick={() => navigate('/add-goal')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Your First Goal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;
