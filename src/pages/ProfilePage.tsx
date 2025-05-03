
import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Moon,
  MessageSquare,
  CreditCard,
  Settings,
  Gift,
  Star
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useNavigate } from 'react-router-dom';
import PremiumCard from '@/components/PremiumCard';
import IconBox from '@/components/IconBox';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Handle logout logic
    navigate('/onboarding');
  };

  return (
    <div className="p-5 pb-28 max-w-md mx-auto">
      <h1 className="text-heading mb-6">Profile</h1>
      
      <PremiumCard className="mb-6">
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-finance-navy to-finance-sky flex items-center justify-center text-white text-xl font-bold">
            JD
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-value">John Doe</h2>
            <div className="flex items-center">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-600 text-white text-xs py-1 px-2 rounded-full font-medium mr-2">
                Premium
              </span>
              <Star className="h-3 w-3 text-yellow-400" />
              <Star className="h-3 w-3 text-yellow-400" />
              <Star className="h-3 w-3 text-yellow-400" />
            </div>
          </div>
          <IconBox 
            icon={Edit} 
            color="blue" 
            size="md" 
            onClick={() => navigate('/edit-profile')}
          />
        </div>
        
        <div className="mt-5 pt-5 border-t border-gray-100">
          <div className="flex items-center text-finance-medium mb-3">
            <Mail className="h-4 w-4 mr-2" />
            <span>johndoe@example.com</span>
          </div>
          <div className="flex items-center text-finance-medium">
            <Phone className="h-4 w-4 mr-2" />
            <span>+91 98765 43210</span>
          </div>
        </div>
      </PremiumCard>
      
      <div className="mb-6">
        <h2 className="text-lg font-heading mb-4">Account Settings</h2>
        <PremiumCard className="p-0">
          <div className="py-1">
            <div className="flex items-center justify-between p-4 cursor-pointer border-b border-gray-100" onClick={() => navigate('/edit-profile')}>
              <div className="flex items-center">
                <IconBox icon={User} color="blue" className="mr-3" />
                <span className="font-medium">Personal Details</span>
              </div>
              <ChevronRight className="h-4 w-4 text-finance-medium" />
            </div>
            
            <div className="flex items-center justify-between p-4 cursor-pointer border-b border-gray-100" onClick={() => navigate('/notification-settings')}>
              <div className="flex items-center">
                <IconBox icon={Bell} color="amber" className="mr-3" />
                <span className="font-medium">Notifications</span>
              </div>
              <ChevronRight className="h-4 w-4 text-finance-medium" />
            </div>
            
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => navigate('/privacy-settings')}>
              <div className="flex items-center">
                <IconBox icon={Shield} color="green" className="mr-3" />
                <span className="font-medium">Privacy & Security</span>
              </div>
              <ChevronRight className="h-4 w-4 text-finance-medium" />
            </div>
          </div>
        </PremiumCard>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-heading mb-4">Subscription</h2>
        <PremiumCard withPattern variant="gradient" className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-value text-lg">Premium Plan</h3>
            <div className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
              Active
            </div>
          </div>
          <p className="opacity-90 mb-3">Access to all premium features</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1" />
              <span>Renews on June 3, 2025</span>
            </div>
            <button className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
              Manage
            </button>
          </div>
        </PremiumCard>
        
        <PremiumCard className="p-0">
          <div className="flex items-center justify-between p-4 cursor-pointer border-b border-gray-100" onClick={() => navigate('/payment-methods')}>
            <div className="flex items-center">
              <IconBox icon={CreditCard} color="purple" className="mr-3" />
              <span className="font-medium">Payment Methods</span>
            </div>
            <ChevronRight className="h-4 w-4 text-finance-medium" />
          </div>
          
          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => navigate('/refer-friend')}>
            <div className="flex items-center">
              <IconBox icon={Gift} color="pink" className="mr-3" />
              <span className="font-medium">Refer a Friend</span>
            </div>
            <ChevronRight className="h-4 w-4 text-finance-medium" />
          </div>
        </PremiumCard>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-heading mb-4">Preferences</h2>
        <PremiumCard className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center">
              <IconBox icon={Moon} color="purple" className="mr-3" />
              <span className="font-medium">Dark Mode</span>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <IconBox icon={MessageSquare} color="indigo" className="mr-3" />
              <span className="font-medium">SMS Permission</span>
            </div>
            <Switch checked />
          </div>
        </PremiumCard>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-heading mb-4">Support</h2>
        <PremiumCard className="p-0">
          <div className="flex items-center justify-between p-4 cursor-pointer border-b border-gray-100" onClick={() => navigate('/help-center')}>
            <div className="flex items-center">
              <IconBox icon={HelpCircle} color="teal" className="mr-3" />
              <span className="font-medium">Help Center</span>
            </div>
            <ChevronRight className="h-4 w-4 text-finance-medium" />
          </div>
          
          <div className="flex items-center justify-between p-4 cursor-pointer border-b border-gray-100" onClick={() => navigate('/settings')}>
            <div className="flex items-center">
              <IconBox icon={Settings} color="gray" className="mr-3" />
              <span className="font-medium">App Settings</span>
            </div>
            <ChevronRight className="h-4 w-4 text-finance-medium" />
          </div>
          
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span className="text-finance-medium text-sm font-medium">1.0</span>
              </div>
              <span className="font-medium">App Version</span>
            </div>
          </div>
        </PremiumCard>
      </div>
      
      <button 
        className="button-outline w-full py-3 text-red-500 font-medium flex items-center justify-center"
        onClick={handleLogout}
      >
        <LogOut className="h-5 w-5 mr-2" />
        Log Out
      </button>
    </div>
  );
};

export default ProfilePage;
