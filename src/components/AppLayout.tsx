
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  PieChart, 
  Plus, 
  Settings, 
  ArrowDown, 
  ArrowUp, 
  MessageSquare, 
  Edit, 
  UserRound,
  CreditCard,
  Building,
  Calculator,
  BarChart3,
  Goal,
  Users // Added this import
} from 'lucide-react';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h1 className="text-lg font-bold ml-2">SMS-Fi Flow</h1>
        </div>
        <div 
          onClick={() => navigate('/settings')}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
        >
          <UserRound className="h-5 w-5 text-gray-600" />
        </div>
      </header>
      
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
            <div className="grid grid-cols-3 gap-3">
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
                to="/banks"
                className="flex flex-col items-center p-3 bg-purple-50 rounded-lg"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm">Banks</span>
              </Link>
              <Link 
                to="/cards"
                className="flex flex-col items-center p-3 bg-yellow-50 rounded-lg"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-1">
                  <CreditCard className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-sm">Cards</span>
              </Link>
              <Link 
                to="/budgets"
                className="flex flex-col items-center p-3 bg-teal-50 rounded-lg"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-1">
                  <Calculator className="h-5 w-5 text-teal-600" />
                </div>
                <span className="text-sm">Budget</span>
              </Link>
              <Link 
                to="/loans"
                className="flex flex-col items-center p-3 bg-orange-50 rounded-lg"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-1">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-sm">Loans</span>
              </Link>
              <Link 
                to="/debts"
                className="flex flex-col items-center p-3 bg-indigo-50 rounded-lg"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-1">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-sm">Debts</span>
              </Link>
              <Link 
                to="/manual-entry"
                className="flex flex-col items-center p-3 bg-pink-50 rounded-lg"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mb-1">
                  <Edit className="h-5 w-5 text-pink-600" />
                </div>
                <span className="text-sm">Manual</span>
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
            
            <Link to="/insights" className={`flex flex-col items-center p-2 ${isActive('/insights') ? 'text-primary' : 'text-gray-500'}`}>
              <PieChart className="h-6 w-6" />
              <span className="text-xs mt-1">Insights</span>
            </Link>
            
            <div className="absolute left-1/2 -translate-x-1/2 -top-6 z-10">
              <button 
                onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                className="w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center text-white"
              >
                <Plus className="h-6 w-6" />
              </button>
            </div>
            
            <div className="w-12"></div> {/* Spacer */}
            
            <Link to="/analytics" className={`flex flex-col items-center p-2 ${isActive('/analytics') ? 'text-primary' : 'text-gray-500'}`}>
              <BarChart3 className="h-6 w-6" />
              <span className="text-xs mt-1">Analytics</span>
            </Link>
            
            <Link to="/accounts" className={`flex flex-col items-center p-2 ${isActive('/accounts') || isActive('/banks') || isActive('/cards') ? 'text-primary' : 'text-gray-500'}`}>
              <CreditCard className="h-6 w-6" />
              <span className="text-xs mt-1">Accounts</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AppLayout;
