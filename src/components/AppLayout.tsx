
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
  Users,
  Target,
  Bell,
  Search,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import IconBox from '@/components/IconBox';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] font-sf-pro">
      <header className="bg-white p-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center">
          <div className="premium-gradient w-10 h-10 rounded-full flex items-center justify-center text-white">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold ml-2 premium-text">SMS-Fi Flow</h1>
        </div>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full mr-2 relative"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="h-5 w-5 text-finance-dark" />
            <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-red-500">3</Badge>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full mr-4"
            onClick={() => navigate('/search')}
          >
            <Search className="h-5 w-5 text-finance-dark" />
          </Button>
          <div 
            onClick={() => navigate('/profile')}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-finance-navy to-finance-sky flex items-center justify-center cursor-pointer text-white font-bold"
          >
            JD
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-auto pb-16">
        <Outlet />
      </main>
      
      <div className="fixed bottom-0 w-full">
        {isAddMenuOpen && (
          <div className="bg-white rounded-t-2xl shadow-premium p-5 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-lg">Quick Actions</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full text-finance-dark" 
                onClick={() => setIsAddMenuOpen(false)}
              >
                ×
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-2">
              <Link 
                to="/add-transaction?type=expense" 
                className="flex flex-col items-center p-3 bg-red-50 rounded-xl animate-hover"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <IconBox icon={ArrowDown} color="red" />
                <span className="text-caption mt-2 font-label">Expense</span>
              </Link>
              <Link 
                to="/add-transaction?type=income"
                className="flex flex-col items-center p-3 bg-green-50 rounded-xl animate-hover"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <IconBox icon={ArrowUp} color="green" />
                <span className="text-caption mt-2 font-label">Income</span>
              </Link>
              <Link 
                to="/scan-sms"
                className="flex flex-col items-center p-3 bg-blue-50 rounded-xl animate-hover"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <IconBox icon={MessageSquare} color="blue" />
                <span className="text-caption mt-2 font-label">Scan SMS</span>
              </Link>
              <Link 
                to="/banks"
                className="flex flex-col items-center p-3 bg-purple-50 rounded-xl animate-hover"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <IconBox icon={Building} color="purple" />
                <span className="text-caption mt-2 font-label">Banks</span>
              </Link>
              <Link 
                to="/cards"
                className="flex flex-col items-center p-3 bg-yellow-50 rounded-xl animate-hover"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <IconBox icon={CreditCard} color="yellow" />
                <span className="text-caption mt-2 font-label">Cards</span>
              </Link>
              <Link 
                to="/budgets"
                className="flex flex-col items-center p-3 bg-teal-50 rounded-xl animate-hover"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <IconBox icon={Calculator} color="teal" />
                <span className="text-caption mt-2 font-label">Budget</span>
              </Link>
              <Link 
                to="/loans"
                className="flex flex-col items-center p-3 bg-orange-50 rounded-xl animate-hover"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <IconBox icon={BarChart3} color="orange" />
                <span className="text-caption mt-2 font-label">Loans</span>
              </Link>
              <Link 
                to="/debts"
                className="flex flex-col items-center p-3 bg-indigo-50 rounded-xl animate-hover"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <IconBox icon={Users} color="indigo" />
                <span className="text-caption mt-2 font-label">Debts</span>
              </Link>
              <Link 
                to="/goals"
                className="flex flex-col items-center p-3 bg-cyan-50 rounded-xl animate-hover"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <IconBox icon={Target} color="sky" />
                <span className="text-caption mt-2 font-label">Goals</span>
              </Link>
            </div>
            <div className="px-2 pt-3 border-t border-gray-100">
              <Link
                to="/ai-insights"
                className="flex items-center justify-center p-2 bg-gradient-to-r from-finance-navy to-finance-sky text-white rounded-xl"
                onClick={() => setIsAddMenuOpen(false)}
              >
                <Zap className="mr-2 h-4 w-4" />
                <span className="font-value">AI Financial Insights</span>
              </Link>
            </div>
          </div>
        )}
        
        <nav className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex justify-around items-center relative">
            <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/') ? 'premium-text' : 'text-finance-medium'}`}>
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1 font-label">Home</span>
            </Link>
            
            <Link to="/insights" className={`flex flex-col items-center p-2 ${isActive('/insights') ? 'premium-text' : 'text-finance-medium'}`}>
              <PieChart className="h-6 w-6" />
              <span className="text-xs mt-1 font-label">Insights</span>
            </Link>
            
            <div className="absolute left-1/2 -translate-x-1/2 -top-6 z-10">
              <button 
                onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                className="w-14 h-14 rounded-full premium-gradient shadow-lg flex items-center justify-center text-white transition-transform hover:scale-[0.98] active:scale-95"
              >
                <Plus className="h-7 w-7" />
              </button>
            </div>
            
            <div className="w-12"></div> {/* Spacer */}
            
            <Link to="/analytics" className={`flex flex-col items-center p-2 ${isActive('/analytics') ? 'premium-text' : 'text-finance-medium'}`}>
              <BarChart3 className="h-6 w-6" />
              <span className="text-xs mt-1 font-label">Analytics</span>
            </Link>
            
            <Link to="/profile" className={`flex flex-col items-center p-2 ${isActive('/profile') ? 'premium-text' : 'text-finance-medium'}`}>
              <UserRound className="h-6 w-6" />
              <span className="text-xs mt-1 font-label">Profile</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AppLayout;
