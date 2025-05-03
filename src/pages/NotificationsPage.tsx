
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, CreditCard, Calendar, AlertCircle, CheckCircle, TrendingUp, TrendingDown, Target } from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';
import { formatCurrency } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import IconBox from '@/components/IconBox';
import { format, subDays } from 'date-fns';

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Demo notifications
  const notifications = [
    {
      id: 1,
      type: 'transaction',
      title: 'Transaction Detected',
      description: 'New expense of ₹2,500 detected from Amazon',
      icon: CreditCard,
      color: 'purple',
      time: subDays(new Date(), 0),
      isRead: false,
      link: '/transaction/123'
    },
    {
      id: 2,
      type: 'bill',
      title: 'Bill Due Soon',
      description: 'Your credit card bill of ₹12,500 is due in 2 days',
      icon: Calendar,
      color: 'amber',
      time: subDays(new Date(), 0),
      isRead: false,
      link: '/bills'
    },
    {
      id: 3,
      type: 'insight',
      title: 'Spending Alert',
      description: 'Your food expenses are 20% higher than your usual spending',
      icon: TrendingUp,
      color: 'red',
      time: subDays(new Date(), 1),
      isRead: false,
      link: '/ai-insights'
    },
    {
      id: 4,
      type: 'goal',
      title: 'Goal Progress',
      description: "You're 75% of the way to your vacation savings goal",
      icon: Target,
      color: 'green',
      time: subDays(new Date(), 2),
      isRead: true,
      link: '/goals'
    },
    {
      id: 5,
      type: 'transaction',
      title: 'Large Transaction',
      description: 'Unusual expense of ₹8,000 at Electronics Store',
      icon: AlertCircle,
      color: 'red',
      time: subDays(new Date(), 2),
      isRead: true,
      link: '/transaction/456'
    },
    {
      id: 6,
      type: 'insight',
      title: 'Budget Status',
      description: "You've stayed under your shopping budget this month",
      icon: CheckCircle,
      color: 'green',
      time: subDays(new Date(), 3),
      isRead: true,
      link: '/budgets'
    },
    {
      id: 7,
      type: 'investment',
      title: 'Investment Update',
      description: 'Your investments grew by 5.2% this month',
      icon: TrendingUp,
      color: 'teal',
      time: subDays(new Date(), 4),
      isRead: true,
      link: '/investments'
    },
  ];
  
  const formatNotificationTime = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${format(date, 'h:mm a')}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${format(date, 'h:mm a')}`;
    } else {
      return format(date, 'MMM d, h:mm a');
    }
  };
  
  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Notifications</h1>
        </div>
        <Button variant="ghost" size="sm">Mark all as read</Button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-sm font-medium text-finance-medium mb-3">New</h2>
        {notifications
          .filter(n => !n.isRead)
          .map(notification => (
            <PremiumCard 
              key={notification.id} 
              className="mb-3 animate-hover"
              onClick={() => navigate(notification.link)}
            >
              <div className="flex items-start">
                <IconBox 
                  icon={notification.icon} 
                  color={notification.color as any} 
                  className="mr-3 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-value mb-1">{notification.title}</h3>
                    <span className="text-xs text-finance-light">
                      {formatNotificationTime(notification.time)}
                    </span>
                  </div>
                  <p className="text-sm text-finance-medium">{notification.description}</p>
                </div>
              </div>
            </PremiumCard>
          ))
        }
      </div>
      
      <div>
        <h2 className="text-sm font-medium text-finance-medium mb-3">Earlier</h2>
        {notifications
          .filter(n => n.isRead)
          .map(notification => (
            <PremiumCard 
              key={notification.id} 
              className="mb-3 animate-hover bg-gray-50"
              onClick={() => navigate(notification.link)}
            >
              <div className="flex items-start">
                <IconBox 
                  icon={notification.icon} 
                  color="gray" 
                  className="mr-3 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-value mb-1">{notification.title}</h3>
                    <span className="text-xs text-finance-light">
                      {formatNotificationTime(notification.time)}
                    </span>
                  </div>
                  <p className="text-sm text-finance-medium">{notification.description}</p>
                </div>
              </div>
            </PremiumCard>
          ))
        }
      </div>
    </div>
  );
};

export default NotificationsPage;
