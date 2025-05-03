
import React from 'react';
import { ArrowLeft, Bell, ArrowUp, ArrowDown, PiggyBank, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PremiumCard from '@/components/PremiumCard';
import IconBox from '@/components/IconBox';

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const notifications = [
    {
      id: 1,
      title: 'Credit card payment due soon',
      message: 'Your HDFC credit card payment of ₹8,450 is due in 3 days.',
      time: '2 hours ago',
      icon: CreditCard,
      color: 'red',
      isUnread: true
    },
    {
      id: 2,
      title: 'Large transaction detected',
      message: 'A transaction of ₹12,500 was made at Amazon on your HDFC credit card.',
      time: '5 hours ago',
      icon: ArrowDown,
      color: 'amber',
      isUnread: true
    },
    {
      id: 3,
      title: 'Salary received',
      message: 'You received ₹75,000 from your employer.',
      time: '1 day ago',
      icon: ArrowUp,
      color: 'green',
      isUnread: true
    },
    {
      id: 4,
      title: 'Budget goal achieved',
      message: 'Congratulations! You've stayed under your entertainment budget this month.',
      time: '3 days ago',
      icon: CheckCircle,
      color: 'blue',
      isUnread: false
    },
    {
      id: 5,
      title: 'Savings goal reminder',
      message: 'You're ₹5,000 away from your laptop savings goal.',
      time: '5 days ago',
      icon: PiggyBank,
      color: 'purple',
      isUnread: false
    },
    {
      id: 6,
      title: 'Unusual spending pattern',
      message: 'Your food expenses have increased by 30% this month compared to your average.',
      time: '1 week ago',
      icon: AlertCircle,
      color: 'yellow',
      isUnread: false
    }
  ];
  
  return (
    <div className="p-5 pb-28 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-heading">Notifications</h1>
        </div>
        <button className="text-sm text-finance-navy font-value">Mark all as read</button>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <PremiumCard 
            key={notification.id} 
            className={`animate-hover ${notification.isUnread ? 'border-l-4 border-l-finance-navy' : ''}`}
          >
            <div className="flex">
              <IconBox 
                icon={notification.icon} 
                color={notification.color as any} 
                size="md" 
                className="mr-4 shrink-0" 
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-value">{notification.title}</h3>
                  <span className="text-xs text-finance-light">{notification.time}</span>
                </div>
                <p className="text-finance-medium text-sm">{notification.message}</p>
              </div>
            </div>
          </PremiumCard>
        ))}
      </div>
      
      <div className="h-6" />
    </div>
  );
};

export default NotificationsPage;
