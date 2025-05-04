
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Bell, 
  Lock, 
  CreditCard, 
  HelpCircle, 
  Info, 
  LogOut,
  ChevronRight,
  User,
  Moon,
  Sun,
  Languages,
  Smartphone,
  Share2,
  Shield,
  CloudCog,
  AlertTriangle,
  FileText,
  Download,
  Trash2,
  Building,
  Calculator,
  Wallet
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import PremiumCard from '@/components/PremiumCard';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SettingItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
  className?: string;
}> = ({ icon, title, subtitle, onClick, rightElement, className = '' }) => (
  <motion.div 
    className={`flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer ${className}`}
    onClick={onClick}
    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
    whileTap={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
  >
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>
    </div>
    {rightElement ? rightElement : <ChevronRight className="h-5 w-5 text-gray-400" />}
  </motion.div>
);

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme, isDark } = useTheme();
  const [language, setLanguage] = useState('english');
  
  return (
    <div className="p-4 max-w-md mx-auto pb-20">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5 dark:text-white" />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>
      
      <PremiumCard className="mb-6">
        <div className="p-4 flex items-center" onClick={() => navigate('/profile')}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white text-2xl font-medium mr-4"
          >
            JD
          </motion.div>
          <div>
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-gray-500 dark:text-gray-400">johndoe@example.com</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Member since May 2023</p>
          </div>
        </div>
      </PremiumCard>
      
      <div className="bg-white dark:bg-[#1e2030] rounded-xl overflow-hidden shadow-sm mb-6">
        <h3 className="font-medium px-4 pt-4 pb-2 dark:text-gray-300">Appearance</h3>
        
        <SettingItem 
          icon={isDark ? (
            <Moon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-500" />
          )}
          title="Theme"
          subtitle="Light, Dark, or System"
          rightElement={
            <div className="flex items-center">
              <Select
                value={theme}
                onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        />
        
        <SettingItem 
          icon={<Languages className="h-5 w-5 text-green-500 dark:text-green-400" />}
          title="Language"
          subtitle="Choose your preferred language"
          rightElement={
            <div className="flex items-center">
              <Select
                value={language}
                onValueChange={setLanguage}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        />
      </div>
      
      <div className="bg-white dark:bg-[#1e2030] rounded-xl overflow-hidden shadow-sm mb-6">
        <h3 className="font-medium px-4 pt-4 pb-2 dark:text-gray-300">Account Settings</h3>
        
        <SettingItem 
          icon={<User className="h-5 w-5 text-purple-500 dark:text-purple-400" />}
          title="Personal Information"
          subtitle="Manage your personal details"
          onClick={() => navigate('/profile')}
        />
        
        <SettingItem 
          icon={<Lock className="h-5 w-5 text-green-500 dark:text-green-400" />}
          title="Security Settings"
          subtitle="Passwords and security options"
        />
        
        <SettingItem 
          icon={<Bell className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          title="Notification Preferences"
          subtitle="Manage alerts and notifications"
          onClick={() => navigate('/notifications-settings')}
        />
        
        <SettingItem 
          icon={<Smartphone className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
          title="Connected Devices"
          subtitle="Manage device access"
        />
      </div>
      
      <div className="bg-white dark:bg-[#1e2030] rounded-xl overflow-hidden shadow-sm mb-6">
        <h3 className="font-medium px-4 pt-4 pb-2 dark:text-gray-300">Finance Management</h3>
        
        <SettingItem 
          icon={<Building className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          title="Banks & Accounts"
          subtitle="Manage connected bank accounts"
          onClick={() => navigate('/banks')}
        />
        
        <SettingItem 
          icon={<CreditCard className="h-5 w-5 text-purple-500 dark:text-purple-400" />}
          title="Cards"
          subtitle="Manage credit and debit cards"
          onClick={() => navigate('/cards')}
        />
        
        <SettingItem 
          icon={<Calculator className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />}
          title="Budgets"
          subtitle="Configure your budgeting preferences"
          onClick={() => navigate('/budgets')}
        />
        
        <SettingItem 
          icon={<Wallet className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
          title="Debts & Loans"
          subtitle="Manage your debts and loans"
          onClick={() => navigate('/debts')}
        />
        
        <SettingItem 
          icon={<Download className="h-5 w-5 text-teal-500 dark:text-teal-400" />}
          title="Export Data"
          subtitle="Download your financial data"
        />
      </div>
      
      <div className="bg-white dark:bg-[#1e2030] rounded-xl overflow-hidden shadow-sm mb-6">
        <h3 className="font-medium px-4 pt-4 pb-2 dark:text-gray-300">Privacy & Security</h3>
        
        <SettingItem 
          icon={<Shield className="h-5 w-5 text-amber-500 dark:text-amber-400" />}
          title="Privacy Settings"
          subtitle="Manage your data and privacy"
        />
        
        <SettingItem 
          icon={<CloudCog className="h-5 w-5 text-sky-500 dark:text-sky-400" />}
          title="Data Storage"
          subtitle="Sync and backup settings"
        />
        
        <SettingItem 
          icon={<FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
          title="Terms of Service"
          subtitle="Review our terms"
        />
        
        <SettingItem 
          icon={<Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          title="Privacy Policy"
          subtitle="Review our privacy policy"
        />
      </div>
      
      <div className="bg-white dark:bg-[#1e2030] rounded-xl overflow-hidden shadow-sm mb-6">
        <h3 className="font-medium px-4 pt-4 pb-2 dark:text-gray-300">Support</h3>
        
        <SettingItem 
          icon={<HelpCircle className="h-5 w-5 text-amber-500 dark:text-amber-400" />}
          title="Help Center"
          subtitle="Get help with the app"
        />
        
        <SettingItem 
          icon={<AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />}
          title="Report an Issue"
          subtitle="Report bugs or problems"
        />
        
        <SettingItem 
          icon={<Share2 className="h-5 w-5 text-green-500 dark:text-green-400" />}
          title="Share Feedback"
          subtitle="Help us improve the app"
        />
        
        <SettingItem 
          icon={<Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          title="About"
          subtitle="App version 1.0.0"
          rightElement={null}
        />
      </div>
      
      <div className="bg-white dark:bg-[#1e2030] rounded-xl overflow-hidden shadow-sm mb-6">
        <SettingItem 
          icon={<Trash2 className="h-5 w-5 text-red-500" />}
          title="Delete Account"
          subtitle="Permanently delete your account"
          className="border-none"
        />
      </div>
      
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

export default SettingsPage;
