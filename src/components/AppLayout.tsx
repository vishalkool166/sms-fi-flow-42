
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, PieChart, Plus, Settings, ArrowDown, ArrowUp, MessageSquare, Edit } from 'lucide-react';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <main className="flex-1 overflow-auto pb-16">
        <Outlet />
      </main>
      
      <div className="fixed bottom-0 w-full">
        {isAddMenuOpen && (
          <div className="bg-white rounded-t-2xl shadow-lg p-4 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Add New</h3>
              <button 
                className="text-gray-400" 
                onClick={() => setIsAddMenuOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link 
                to="/add-transaction?type=expense" 
                className="flex flex-col items-center p-3 bg-red-50 rounded-lg"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-1">
                  <ArrowDown className="h-5 w-5 text-expense" />
                </div>
                <span className="text-sm">Expense</span>
              </Link>
              <Link 
                to="/add-transaction?type=income"
                className="flex flex-col items-center p-3 bg-green-50 rounded-lg"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-1">
                  <ArrowUp className="h-5 w-5 text-income" />
                </div>
                <span className="text-sm">Income</span>
              </Link>
              <Link 
                to="/scan-sms"
                className="flex flex-col items-center p-3 bg-blue-50 rounded-lg"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm">Scan SMS</span>
              </Link>
              <Link 
                to="/manual-entry"
                className="flex flex-col items-center p-3 bg-purple-50 rounded-lg"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                  <Edit className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm">Manual Entry</span>
              </Link>
            </div>
          </div>
        )}
        
        <nav className="bg-white border-t border-gray-200 px-6 py-2">
          <div className="flex justify-around items-center relative">
            <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}>
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            
            <Link to="/analytics" className={`flex flex-col items-center p-2 ${isActive('/analytics') ? 'text-primary' : 'text-gray-500'}`}>
              <PieChart className="h-6 w-6" />
              <span className="text-xs mt-1">Analytics</span>
            </Link>
            
            <div className="absolute left-1/2 -translate-x-1/2 -top-6">
              <button 
                onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                className="w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center text-white"
              >
                <Plus className="h-6 w-6" />
              </button>
            </div>
            
            <div className="w-12"></div> {/* Spacer */}
            
            <Link to="/settings" className={`flex flex-col items-center p-2 ${isActive('/settings') ? 'text-primary' : 'text-gray-500'}`}>
              <Settings className="h-6 w-6" />
              <span className="text-xs mt-1">Settings</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AppLayout;
