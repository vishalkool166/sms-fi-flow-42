
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, TrendingUp, TrendingDown, AlertCircle, Clock, Calendar } from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';
import EnhancedChart from '@/components/EnhancedChart';
import { formatCurrency } from '@/utils/formatters';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

// Component for insight cards
const InsightCard = ({ title, description, icon: Icon, color, onClick }) => {
  return (
    <motion.div 
      className="mb-4 cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <PremiumCard className="p-4">
        <div className="flex items-start">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-${color}-100`}>
            <Icon className={`h-5 w-5 text-${color}-600`} />
          </div>
          <div>
            <h3 className="font-medium mb-1">{title}</h3>
            <p className="text-sm text-finance-medium">{description}</p>
          </div>
        </div>
      </PremiumCard>
    </motion.div>
  );
};

const FinancialInsightsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('spending');
  
  // Sample spending categories data
  const categoryData = [
    { name: 'Food', value: 4800, color: '#F97316' },
    { name: 'Shopping', value: 3200, color: '#8B5CF6' },
    { name: 'Transport', value: 2100, color: '#0EA5E9' },
    { name: 'Entertainment', value: 1800, color: '#EC4899' },
    { name: 'Utilities', value: 3200, color: '#6B7280' },
  ];
  
  // Monthly expense and income data for charts
  const monthlyData = [
    { name: 'Jan', food: 3800, shopping: 2200, transport: 1500, entertainment: 1200, utilities: 2800 },
    { name: 'Feb', food: 4200, shopping: 2800, transport: 1800, entertainment: 1500, utilities: 2700 },
    { name: 'Mar', food: 3900, shopping: 2400, transport: 1600, entertainment: 1300, utilities: 2900 },
    { name: 'Apr', food: 4500, shopping: 3000, transport: 2000, entertainment: 1700, utilities: 3000 },
    { name: 'May', food: 4800, shopping: 3200, transport: 2100, entertainment: 1800, utilities: 3200 },
    { name: 'Jun', food: 4600, shopping: 3100, transport: 1900, entertainment: 1600, utilities: 3100 },
  ];
  
  // Sample monthly spending data
  const spendingTrends = [
    { month: 'Jan', amount: 12000 },
    { month: 'Feb', amount: 13500 },
    { month: 'Mar', amount: 12800 },
    { month: 'Apr', amount: 14200 },
    { month: 'May', amount: 15100 },
    { month: 'Jun', amount: 14800 },
  ];
  
  // Sample insights
  const insights = [
    {
      title: "Spending Pattern",
      description: "Your food expenses have increased by 15% this month compared to your average.",
      icon: TrendingUp,
      color: "amber"
    },
    {
      title: "Savings Opportunity",
      description: "Reducing your entertainment expenses by 10% could save you ₹15,000 annually.",
      icon: TrendingDown,
      color: "green"
    },
    {
      title: "Budget Alert",
      description: "You're on track to exceed your shopping budget this month.",
      icon: AlertCircle,
      color: "red"
    },
    {
      title: "Recurring Expenses",
      description: "Your recurring subscriptions account for 12% of your monthly expenses.",
      icon: Clock,
      color: "blue"
    },
    {
      title: "Seasonal Trends",
      description: "Your Q2 expenses are consistently higher than Q1, based on 2-year data.",
      icon: Calendar,
      color: "purple"
    },
  ];
  
  return (
    <motion.div 
      className="p-4 max-w-md mx-auto pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <motion.button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>
        <h1 className="text-xl font-bold">Financial Insights</h1>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="spending" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
            <TabsTrigger value="insights">Personalized Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="spending" className="mt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PremiumCard className="mb-6">
                <h2 className="text-lg font-medium mb-4">Monthly Spending Trends</h2>
                <div className="h-60">
                  <EnhancedChart 
                    data={spendingTrends} 
                    type="bar"
                    lines={[
                      { dataKey: 'amount', stroke: '#8B5CF6', fill: '#8B5CF6', fillOpacity: 0.8 }
                    ]}
                    height={220}
                  />
                </div>
              </PremiumCard>
              
              <PremiumCard className="mb-6">
                <h2 className="text-lg font-medium mb-4">Spending by Category</h2>
                <div className="h-60">
                  <EnhancedChart 
                    data={categoryData} 
                    type="pie"
                    lines={[
                      { dataKey: 'value', stroke: '#ffffff', fill: 'color' }
                    ]}
                    height={220}
                  />
                </div>
                <div className="mt-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <p className="text-sm">{category.name}</p>
                      </div>
                      <p className="text-sm font-medium">{formatCurrency(category.value)}</p>
                    </div>
                  ))}
                </div>
              </PremiumCard>
              
              <PremiumCard>
                <h2 className="text-lg font-medium mb-4">Category Breakdown by Month</h2>
                <div className="h-60">
                  <EnhancedChart 
                    data={monthlyData} 
                    type="bar"
                    lines={[
                      { dataKey: 'food', stroke: '#F97316', fill: '#F97316', fillOpacity: 0.8 },
                      { dataKey: 'shopping', stroke: '#8B5CF6', fill: '#8B5CF6', fillOpacity: 0.8 },
                      { dataKey: 'transport', stroke: '#0EA5E9', fill: '#0EA5E9', fillOpacity: 0.8 },
                      { dataKey: 'entertainment', stroke: '#EC4899', fill: '#EC4899', fillOpacity: 0.8 },
                      { dataKey: 'utilities', stroke: '#6B7280', fill: '#6B7280', fillOpacity: 0.8 }
                    ]}
                    height={220}
                    stacked={true}
                  />
                </div>
                <div className="mt-4 flex flex-wrap">
                  {['Food', 'Shopping', 'Transport', 'Entertainment', 'Utilities'].map((name, index) => {
                    const colors = ['#F97316', '#8B5CF6', '#0EA5E9', '#EC4899', '#6B7280'];
                    return (
                      <div key={index} className="flex items-center mr-4 mb-2">
                        <div 
                          className="w-3 h-3 rounded-full mr-1" 
                          style={{ backgroundColor: colors[index] }}
                        ></div>
                        <p className="text-xs">{name}</p>
                      </div>
                    );
                  })}
                </div>
              </PremiumCard>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="insights" className="mt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {insights.map((insight, index) => (
                <InsightCard
                  key={index}
                  title={insight.title}
                  description={insight.description}
                  icon={insight.icon}
                  color={insight.color}
                  onClick={() => navigate('/ai-insights')}
                />
              ))}
              
              <div className="mt-4">
                <motion.div
                  className="w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => navigate('/ai-insights')}
                  >
                    View All AI Insights
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

const Button = ({ variant = 'default', className, children, ...props }) => {
  const variantClasses = {
    default: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border border-primary text-primary bg-transparent hover:bg-primary/10',
    ghost: 'bg-transparent hover:bg-gray-100',
  };
  
  return (
    <button 
      className={`py-2 px-4 rounded-md font-medium transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default FinancialInsightsPage;
