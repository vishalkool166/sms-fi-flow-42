
import React from 'react';
import { 
  Bell, 
  Lock, 
  CreditCard, 
  HelpCircle, 
  Info, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const SettingItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}> = ({ icon, title, subtitle, onClick }) => (
  <div 
    className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
    <ChevronRight className="h-5 w-5 text-gray-400" />
  </div>
);

const SettingsPage: React.FC = () => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="p-4 flex items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
            <span className="text-2xl font-medium">JD</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-gray-500">johndoe@example.com</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
        <h3 className="font-medium px-4 pt-4 pb-2">App Settings</h3>
        
        <SettingItem 
          icon={<Bell className="h-5 w-5 text-blue-500" />}
          title="Notifications"
          subtitle="Manage alerts and notifications"
        />
        
        <SettingItem 
          icon={<Lock className="h-5 w-5 text-green-500" />}
          title="Privacy & Security"
          subtitle="Manage your data and privacy"
        />
        
        <SettingItem 
          icon={<CreditCard className="h-5 w-5 text-purple-500" />}
          title="Bank Accounts"
          subtitle="Manage connected accounts"
        />
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
        <h3 className="font-medium px-4 pt-4 pb-2">Support</h3>
        
        <SettingItem 
          icon={<HelpCircle className="h-5 w-5 text-amber-500" />}
          title="Help Center"
          subtitle="Get help with the app"
        />
        
        <SettingItem 
          icon={<Info className="h-5 w-5 text-blue-500" />}
          title="About"
          subtitle="App version 1.0.0"
        />
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <SettingItem 
          icon={<LogOut className="h-5 w-5 text-red-500" />}
          title="Log Out"
        />
      </div>
    </div>
  );
};

export default SettingsPage;
