
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  PieChart, 
  Plus, 
  X,
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
  Zap,
  ChevronDown,
  MoreHorizontal,
  Wallet,
  Award,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import IconBox from '@/components/IconBox';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] font-sf-pro relative">
      <header className="bg-white p-4 shadow-sm flex justify-between items-center z-20">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div 
                className="w-9 h-9 rounded-full bg-gradient-to-r from-finance-navy to-finance-sky flex items-center justify-center cursor-pointer text-white font-bold"
              >
                JD
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <div className="flex items-center p-3 border-b">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-finance-navy to-finance-sky flex items-center justify-center text-white font-bold mr-3">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-sm">John Doe</p>
                  <p className="text-xs text-finance-medium">john.doe@example.com</p>
                </div>
              </div>
              <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                <UserRound className="h-4 w-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                <Settings className="h-4 w-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/ai-insights')} className="cursor-pointer">
                <Zap className="h-4 w-4 mr-2" />
                <span>AI Insights</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/goals')} className="cursor-pointer">
                <Target className="h-4 w-4 mr-2" />
                <span>Goals</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/banks')} className="cursor-pointer">
                <Building className="h-4 w-4 mr-2" />
                <span>Banks & Cards</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/bills')} className="cursor-pointer">
                <Calculator className="h-4 w-4 mr-2" />
                <span>Bills & Payments</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <HelpCircle className="h-4 w-4 mr-2" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      <main className="flex-1 overflow-auto pb-24 z-10">
        <Outlet />
      </main>
      
      <div className="fixed bottom-0 w-full z-30">
        <AnimatePresence>
          {isAddMenuOpen && (
            <motion.div 
              className="bg-white rounded-t-2xl shadow-premium p-5"
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-lg">Quick Actions</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full text-finance-dark" 
                  onClick={() => setIsAddMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <Link 
                  to="/add-transaction?type=expense" 
                  className="flex flex-col items-center p-3 bg-red-50 rounded-xl hover:scale-105 transition-transform duration-200"
                  onClick={() => setIsAddMenuOpen(false)}
                >
                  <IconBox icon={ArrowDown} color="red" />
                  <span className="text-caption mt-2 font-label">Expense</span>
                </Link>
                <Link 
                  to="/add-transaction?type=income"
                  className="flex flex-col items-center p-3 bg-green-50 rounded-xl hover:scale-105 transition-transform duration-200"
                  onClick={() => setIsAddMenuOpen(false)}
                >
                  <IconBox icon={ArrowUp} color="green" />
                  <span className="text-caption mt-2 font-label">Income</span>
                </Link>
                <Link 
                  to="/scan-sms"
                  className="flex flex-col items-center p-3 bg-blue-50 rounded-xl hover:scale-105 transition-transform duration-200"
                  onClick={() => setIsAddMenuOpen(false)}
                >
                  <IconBox icon={MessageSquare} color="blue" />
                  <span className="text-caption mt-2 font-label">Scan SMS</span>
                </Link>
                <Link 
                  to="/banks"
                  className="flex flex-col items-center p-3 bg-purple-50 rounded-xl hover:scale-105 transition-transform duration-200"
                  onClick={() => setIsAddMenuOpen(false)}
                >
                  <IconBox icon={Building} color="purple" />
                  <span className="text-caption mt-2 font-label">Banks</span>
                </Link>
                <Link 
                  to="/cards"
                  className="flex flex-col items-center p-3 bg-yellow-50 rounded-xl hover:scale-105 transition-transform duration-200"
                  onClick={() => setIsAddMenuOpen(false)}
                >
                  <IconBox icon={CreditCard} color="yellow" />
                  <span className="text-caption mt-2 font-label">Cards</span>
                </Link>
                <Link 
                  to="/budgets"
                  className="flex flex-col items-center p-3 bg-teal-50 rounded-xl hover:scale-105 transition-transform duration-200"
                  onClick={() => setIsAddMenuOpen(false)}
                >
                  <IconBox icon={Calculator} color="teal" />
                  <span className="text-caption mt-2 font-label">Budget</span>
                </Link>
                <Link 
                  to="/loans"
                  className="flex flex-col items-center p-3 bg-orange-50 rounded-xl hover:scale-105 transition-transform duration-200"
                  onClick={() => setIsAddMenuOpen(false)}
                >
                  <IconBox icon={BarChart3} color="orange" />
                  <span className="text-caption mt-2 font-label">Loans</span>
                </Link>
                <Link 
                  to="/debts"
                  className="flex flex-col items-center p-3 bg-indigo-50 rounded-xl hover:scale-105 transition-transform duration-200"
                  onClick={() => setIsAddMenuOpen(false)}
                >
                  <IconBox icon={Users} color="indigo" />
                  <span className="text-caption mt-2 font-label">Debts</span>
                </Link>
                <Link 
                  to="/goals"
                  className="flex flex-col items-center p-3 bg-cyan-50 rounded-xl hover:scale-105 transition-transform duration-200"
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
            </motion.div>
          )}
        </AnimatePresence>
        
        <nav className="bg-white border-t border-gray-200 px-6 py-3 shadow-lg">
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
              <motion.button 
                onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                className="w-14 h-14 rounded-full premium-gradient shadow-lg flex items-center justify-center text-white hover:scale-[0.98] active:scale-95"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isAddMenuOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isAddMenuOpen ? <X className="h-7 w-7" /> : <Plus className="h-7 w-7" />}
                </motion.div>
              </motion.button>
            </div>
            
            <div className="w-12"></div> {/* Spacer */}
            
            <Link to="/analytics" className={`flex flex-col items-center p-2 ${isActive('/analytics') ? 'premium-text' : 'text-finance-medium'}`}>
              <BarChart3 className="h-6 w-6" />
              <span className="text-xs mt-1 font-label">Analytics</span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className={`flex flex-col items-center p-2 cursor-pointer ${isActive('/more') ? 'premium-text' : 'text-finance-medium'}`}>
                  <MoreHorizontal className="h-6 w-6" />
                  <span className="text-xs mt-1 font-label">More</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <UserRound className="h-4 w-4 mr-2" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/banks')}>
                  <Building className="h-4 w-4 mr-2" />
                  <span>Banks</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/cards')}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>Cards</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/budgets')}>
                  <Calculator className="h-4 w-4 mr-2" />
                  <span>Budgets</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/goals')}>
                  <Target className="h-4 w-4 mr-2" />
                  <span>Goals</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AppLayout;
