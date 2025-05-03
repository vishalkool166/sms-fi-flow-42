
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
  MessageSquare
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Handle logout logic
    navigate('/onboarding');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="p-6 flex items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-primary flex items-center justify-center text-white text-xl font-bold">
            JD
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-500">Premium User</p>
          </div>
        </div>
        
        <div className="px-6 pb-4">
          <div className="flex items-center text-gray-600 mb-2">
            <Mail className="h-4 w-4 mr-2" />
            <span>johndoe@example.com</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b">
          <h3 className="font-medium">Account Settings</h3>
        </div>
        
        <div className="py-1">
          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => navigate('/edit-profile')}>
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <span>Edit Profile</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => navigate('/notification-settings')}>
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <Bell className="h-5 w-5 text-amber-600" />
              </div>
              <span>Notifications</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => navigate('/privacy-settings')}>
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <span>Privacy & Security</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b">
          <h3 className="font-medium">Preferences</h3>
        </div>
        
        <div className="py-1">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Moon className="h-5 w-5 text-purple-600" />
              </div>
              <span>Dark Mode</span>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <MessageSquare className="h-5 w-5 text-indigo-600" />
              </div>
              <span>SMS Permission</span>
            </div>
            <Switch checked />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b">
          <h3 className="font-medium">Support</h3>
        </div>
        
        <div className="py-1">
          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => navigate('/help-center')}>
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                <HelpCircle className="h-5 w-5 text-teal-600" />
              </div>
              <span>Help Center</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span className="text-gray-600 text-sm font-medium">v1.0.0</span>
              </div>
              <span>App Version</span>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        className="w-full py-3 text-red-500 font-medium bg-white rounded-xl shadow-sm flex items-center justify-center"
        onClick={handleLogout}
      >
        <LogOut className="h-5 w-5 mr-2" />
        Log Out
      </button>
    </div>
  );
};

export default ProfilePage;
