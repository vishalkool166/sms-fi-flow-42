
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  Lock, 
  Smartphone, 
  Share2,
  Moon,
  ChevronRight,
  FileText,
  Building,
  Wallet,
  Target
} from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Demo user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'JD',
    joinDate: 'May 2023',
  };
  
  return (
    <div className="p-4 max-w-md mx-auto pb-24">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <PremiumCard className="mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-finance-navy to-finance-sky flex items-center justify-center text-white font-bold text-xl mr-4">
            {user.avatar}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-finance-medium">{user.email}</p>
            <p className="text-xs text-finance-light">Member since {user.joinDate}</p>
          </div>
        </div>
      </PremiumCard>
      
      <h2 className="text-lg font-medium mb-3">Account Settings</h2>
      <PremiumCard className="mb-6">
        <div className="space-y-2">
          <div 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => navigate('/edit-profile')}
          >
            <div className="flex items-center">
              <User className="h-5 w-5 text-finance-navy mr-3" />
              <span>Personal Information</span>
            </div>
            <ChevronRight className="h-5 w-5 text-finance-light" />
          </div>
          
          <div 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => navigate('/security')}
          >
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-finance-navy mr-3" />
              <span>Security Settings</span>
            </div>
            <ChevronRight className="h-5 w-5 text-finance-light" />
          </div>
          
          <div 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => navigate('/notifications-settings')}
          >
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-finance-navy mr-3" />
              <span>Notification Preferences</span>
            </div>
            <ChevronRight className="h-5 w-5 text-finance-light" />
          </div>
        </div>
      </PremiumCard>
      
      <h2 className="text-lg font-medium mb-3">Finance Management</h2>
      <PremiumCard className="mb-6">
        <div className="space-y-2">
          <div 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => navigate('/banks')}
          >
            <div className="flex items-center">
              <Building className="h-5 w-5 text-finance-navy mr-3" />
              <span>Banks & Accounts</span>
            </div>
            <ChevronRight className="h-5 w-5 text-finance-light" />
          </div>
          
          <div 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => navigate('/cards')}
          >
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-finance-navy mr-3" />
              <span>Cards</span>
            </div>
            <ChevronRight className="h-5 w-5 text-finance-light" />
          </div>
          
          <div 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => navigate('/budgets')}
          >
            <div className="flex items-center">
              <Wallet className="h-5 w-5 text-finance-navy mr-3" />
              <span>Budgets</span>
            </div>
            <ChevronRight className="h-5 w-5 text-finance-light" />
          </div>
          
          <div 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => navigate('/goals')}
          >
            <div className="flex items-center">
              <Target className="h-5 w-5 text-finance-navy mr-3" />
              <span>Financial Goals</span>
            </div>
            <ChevronRight className="h-5 w-5 text-finance-light" />
          </div>
        </div>
      </PremiumCard>
      
      <h2 className="text-lg font-medium mb-3">App Settings</h2>
      <PremiumCard className="mb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center">
              <Moon className="h-5 w-5 text-finance-navy mr-3" />
              <span>Dark Mode</span>
            </div>
            <Switch id="dark-mode" />
          </div>
          
          <div 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => navigate('/app-settings')}
          >
            <div className="flex items-center">
              <Settings className="h-5 w-5 text-finance-navy mr-3" />
              <span>General Settings</span>
            </div>
            <ChevronRight className="h-5 w-5 text-finance-light" />
          </div>
          
          <div 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => navigate('/help')}
          >
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 text-finance-navy mr-3" />
              <span>Help & Support</span>
            </div>
            <ChevronRight className="h-5 w-5 text-finance-light" />
          </div>
        </div>
      </PremiumCard>
      
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center text-finance-medium mb-3"
        onClick={() => navigate('/help')}
      >
        <HelpCircle className="h-4 w-4 mr-2" />
        Help & Support
      </Button>
      
      <Button 
        variant="destructive" 
        className="w-full flex items-center justify-center"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default ProfilePage;
