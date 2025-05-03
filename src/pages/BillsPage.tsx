
import React from 'react';
import { ArrowLeft, Calendar, Clock, AlertCircle, CheckCircle, Wallet, DollarSign, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PremiumCard from '@/components/PremiumCard';
import IconBox from '@/components/IconBox';
import PremiumButton from '@/components/PremiumButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BillsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Sample bills data
  const upcomingBills = [
    {
      id: 1,
      name: 'Credit Card Bill',
      amount: 12500,
      dueDate: '2025-05-06',
      status: 'pending',
      category: 'credit card',
      isRecurring: true,
    },
    {
      id: 2,
      name: 'Rent',
      amount: 22000,
      dueDate: '2025-05-10',
      status: 'pending',
      category: 'housing',
      isRecurring: true,
    },
    {
      id: 3,
      name: 'Electricity Bill',
      amount: 3200,
      dueDate: '2025-05-15',
      status: 'pending',
      category: 'utility',
      isRecurring: true,
    },
    {
      id: 4,
      name: 'Internet Bill',
      amount: 1499,
      dueDate: '2025-05-20',
      status: 'pending',
      category: 'utility',
      isRecurring: true,
    }
  ];
  
  const paidBills = [
    {
      id: 5,
      name: 'Water Bill',
      amount: 850,
      dueDate: '2025-04-25',
      paidDate: '2025-04-24',
      status: 'paid',
      category: 'utility',
      isRecurring: true,
    },
    {
      id: 6,
      name: 'Mobile Bill',
      amount: 999,
      dueDate: '2025-04-20',
      paidDate: '2025-04-18',
      status: 'paid',
      category: 'utility',
      isRecurring: true,
    },
    {
      id: 7,
      name: 'Netflix Subscription',
      amount: 649,
      dueDate: '2025-04-15',
      paidDate: '2025-04-15',
      status: 'paid',
      category: 'entertainment',
      isRecurring: true,
    }
  ];
  
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const getBillStatus = (bill: any) => {
    const daysRemaining = getDaysRemaining(bill.dueDate);
    
    if (bill.status === 'paid') {
      return {
        icon: CheckCircle,
        color: 'green',
        text: `Paid on ${formatDate(bill.paidDate)}`,
      };
    }
    
    if (daysRemaining <= 0) {
      return {
        icon: AlertCircle,
        color: 'red',
        text: 'Overdue',
      };
    }
    
    if (daysRemaining <= 3) {
      return {
        icon: Clock,
        color: 'amber',
        text: daysRemaining === 1 ? 'Due tomorrow' : `Due in ${daysRemaining} days`,
      };
    }
    
    return {
      icon: Calendar,
      color: 'blue',
      text: `Due on ${formatDate(bill.dueDate)}`,
    };
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'credit card':
        return Wallet;
      case 'utility':
        return DollarSign;
      default:
        return DollarSign;
    }
  };
  
  return (
    <div className="p-5 pb-28 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-heading">Bills & Subscriptions</h1>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <PremiumCard className="text-center">
          <h3 className="font-label text-finance-medium mb-1">Upcoming</h3>
          <p className="text-2xl font-value">₹39,199</p>
          <p className="text-sm text-finance-light">4 bills remaining</p>
        </PremiumCard>
        <PremiumCard className="text-center">
          <h3 className="font-label text-finance-medium mb-1">Paid This Month</h3>
          <p className="text-2xl font-value">₹2,498</p>
          <p className="text-sm text-finance-light">3 bills paid</p>
        </PremiumCard>
      </div>
      
      <Tabs defaultValue="upcoming" className="mb-6">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="space-y-4">
            {upcomingBills.map(bill => {
              const status = getBillStatus(bill);
              const CategoryIcon = getCategoryIcon(bill.category);
              
              return (
                <PremiumCard key={bill.id} className="animate-hover">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IconBox 
                        icon={CategoryIcon} 
                        color="blue" 
                        size="md" 
                        className="mr-3" 
                      />
                      <div>
                        <h3 className="font-value">{bill.name}</h3>
                        <div className="flex items-center">
                          <IconBox 
                            icon={status.icon} 
                            color={status.color as any} 
                            size="sm" 
                            className="mr-1" 
                          />
                          <span className="text-xs text-finance-light">{status.text}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-value text-expense">₹{bill.amount}</p>
                      <PremiumButton variant="primary" size="sm" className="mt-1">
                        Pay Now
                      </PremiumButton>
                    </div>
                  </div>
                </PremiumCard>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="paid">
          <div className="space-y-4">
            {paidBills.map(bill => {
              const status = getBillStatus(bill);
              const CategoryIcon = getCategoryIcon(bill.category);
              
              return (
                <PremiumCard key={bill.id} className="animate-hover">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IconBox 
                        icon={CategoryIcon} 
                        color="green" 
                        size="md" 
                        className="mr-3" 
                      />
                      <div>
                        <h3 className="font-value">{bill.name}</h3>
                        <div className="flex items-center">
                          <IconBox 
                            icon={status.icon} 
                            color={status.color as any} 
                            size="sm" 
                            className="mr-1" 
                          />
                          <span className="text-xs text-finance-light">{status.text}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-value">₹{bill.amount}</p>
                      <span className="text-xs text-green-500 font-medium">PAID</span>
                    </div>
                  </div>
                </PremiumCard>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
      
      <PremiumButton fullWidth>
        <Plus className="h-4 w-4 mr-2" />
        Add New Bill
      </PremiumButton>
    </div>
  );
};

export default BillsPage;
