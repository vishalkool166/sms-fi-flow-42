
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  User, 
  Settings, 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  Lock, 
  Smartphone, 
  Share2,
  Building,
  Wallet,
  Target,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  ChevronRight,
  Pencil,
  Camera
} from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';
import { motion } from 'framer-motion';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

const SettingItem: React.FC<SettingItemProps> = ({ 
  icon, title, subtitle, onClick, className = ''
}) => (
  <motion.div 
    className={`flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer ${className}`}
    onClick={onClick}
    whileHover={{ scale: 1.01 }}
  >
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3 text-finance-navy dark:text-gray-300">
        {icon}
      </div>
      <div>
        <span>{title}</span>
        {subtitle && <p className="text-xs text-finance-light dark:text-gray-500">{subtitle}</p>}
      </div>
    </div>
    <ChevronRight className="h-5 w-5 text-finance-light" />
  </motion.div>
);

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  // Demo user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, India',
    avatar: 'JD',
    joinDate: 'May 2023',
  };
  
  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5 dark:text-white" />
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
      </div>
      
      <PremiumCard className="mb-6" variant="default">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-finance-navy to-finance-sky flex items-center justify-center text-white font-bold text-3xl mb-3 relative">
              {user.avatar}
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow flex items-center justify-center">
                <Camera className="h-4 w-4 text-finance-medium dark:text-gray-300" />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
            >
              <Pencil className="h-4 w-4 text-finance-medium dark:text-gray-300" />
            </motion.button>
          </div>
          <h2 className="text-xl font-bold mb-1">{user.name}</h2>
          <p className="text-finance-medium dark:text-gray-400">{user.email}</p>
          <p className="text-xs text-finance-light dark:text-gray-500">Member since {user.joinDate}</p>
          
          <div className="w-full mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate('/edit-profile')}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </PremiumCard>
      
      <h2 className="text-lg font-medium mb-3">Personal Information</h2>
      <PremiumCard className="mb-6" animated>
        <div className="space-y-4 p-3">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-finance-navy dark:text-blue-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-finance-navy dark:text-blue-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-finance-navy dark:text-blue-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
              <p className="font-medium">{user.address}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-finance-navy dark:text-blue-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Joined On</p>
              <p className="font-medium">{user.joinDate}</p>
            </div>
          </div>
        </div>
      </PremiumCard>
      
      <h2 className="text-lg font-medium mb-3">Quick Access</h2>
      <PremiumCard className="mb-6">
        <div className="space-y-2">
          <SettingItem 
            icon={<Building className="h-5 w-5" />}
            title="Banks & Accounts"
            onClick={() => navigate('/banks')}
          />
          
          <SettingItem 
            icon={<CreditCard className="h-5 w-5" />}
            title="Cards"
            onClick={() => navigate('/cards')}
          />
          
          <SettingItem 
            icon={<Wallet className="h-5 w-5" />}
            title="Budgets"
            onClick={() => navigate('/budgets')}
          />
          
          <SettingItem 
            icon={<Target className="h-5 w-5" />}
            title="Financial Goals"
            onClick={() => navigate('/goals')}
          />
        </div>
      </PremiumCard>
      
      <h2 className="text-lg font-medium mb-3">Security & Privacy</h2>
      <PremiumCard className="mb-6">
        <div className="space-y-2">
          <SettingItem 
            icon={<Lock className="h-5 w-5" />}
            title="Security Settings"
            subtitle="Passwords and authentication"
          />
          
          <SettingItem 
            icon={<Bell className="h-5 w-5" />}
            title="Notification Preferences"
            onClick={() => navigate('/notifications-settings')}
          />
          
          <SettingItem 
            icon={<Smartphone className="h-5 w-5" />}
            title="Connected Devices"
            subtitle="Manage device access"
          />
        </div>
      </PremiumCard>
      
      <div className="flex space-x-3 mb-6">
        <Button 
          variant="outline" 
          className="flex-1 flex items-center justify-center"
          onClick={() => navigate('/help')}
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Help & Support
        </Button>
        
        <Button 
          variant="destructive" 
          className="flex-1 flex items-center justify-center"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      
      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        App Version 1.0.0
      </p>
    </div>
  );
};

export default ProfilePage;
