
import React from 'react';
import { ArrowLeft, Brain, TrendingUp, TrendingDown, Zap, AlertCircle, Lightbulb, DollarSign, Target, PiggyBank } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PremiumCard from '@/components/PremiumCard';
import IconBox from '@/components/IconBox';

const AIInsightsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Sample AI insights
  const insights = [
    {
      id: 1,
      title: 'Spending Pattern Alert',
      description: 'Your food expenses increased by 35% this month compared to your average. Consider setting a budget.',
      icon: AlertCircle,
      color: 'red',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Saving Opportunity',
      description: 'Based on your income pattern, you can save ₹5,000 more each month by optimizing subscriptions.',
      icon: Lightbulb,
      color: 'yellow',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Investment Recommendation',
      description: 'With your current savings rate, investing ₹10,000/month could yield ₹15L in 5 years at 12% returns.',
      icon: TrendingUp,
      color: 'green',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Budget Achievement',
      description: "Congratulations! You've stayed under your entertainment budget for 3 consecutive months.",
      icon: Target,
      color: 'blue',
      priority: 'low'
    },
    {
      id: 5,
      title: 'Expense Forecast',
      description: 'Based on your patterns, expect higher expenses next month due to annual insurance renewals.',
      icon: TrendingDown,
      color: 'purple',
      priority: 'medium'
    },
    {
      id: 6,
      title: 'Bill Payment Alert',
      description: 'Your electricity bill appears higher than usual. Consider reviewing your usage patterns.',
      icon: AlertCircle,
      color: 'amber',
      priority: 'medium'
    },
    {
      id: 7,
      title: 'Goal Progress',
      description: "At your current savings rate, you'll reach your vacation goal 2 months ahead of schedule.",
      icon: PiggyBank,
      color: 'teal',
      priority: 'low'
    }
  ];
  
  return (
    <div className="p-5 pb-28 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-heading">AI Financial Insights</h1>
      </div>
      
      <PremiumCard variant="gradient" className="mb-6 flex items-center" withPattern>
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
          <Brain className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-value text-lg mb-1">Financial Health Score</h3>
          <div className="flex items-center">
            <span className="text-2xl font-heading mr-2">78</span>
            <span className="text-sm opacity-90">/ 100</span>
            <div className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
              Good
            </div>
          </div>
        </div>
      </PremiumCard>
      
      <div className="mb-6">
        <h2 className="text-xl font-heading mb-4">Personalized Insights</h2>
        
        <div className="space-y-4">
          {insights.map(insight => (
            <PremiumCard key={insight.id} className="animate-hover">
              <div className="flex">
                <IconBox 
                  icon={insight.icon} 
                  color={insight.color as any} 
                  size="md" 
                  className="mr-4 shrink-0" 
                />
                <div>
                  <div className="flex items-center mb-1">
                    <h3 className="font-value mr-2">{insight.title}</h3>
                    {insight.priority === 'high' && (
                      <span className="bg-red-100 text-red-600 text-xs py-0.5 px-2 rounded-full">
                        High Priority
                      </span>
                    )}
                  </div>
                  <p className="text-finance-medium text-sm">{insight.description}</p>
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>
      </div>
      
      <PremiumCard className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading">Ask AI Assistant</h3>
          <IconBox icon={Zap} color="yellow" />
        </div>
        <p className="text-finance-medium mb-4">
          Get personalized financial advice and insights by asking questions.
        </p>
        <div className="relative">
          <input 
            type="text"
            placeholder="Ask about your finances..."
            className="w-full py-3 px-4 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-finance-navy"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-gradient-to-r from-finance-navy to-finance-sky rounded-full text-white">
            <Zap className="h-5 w-5" />
          </button>
        </div>
      </PremiumCard>
    </div>
  );
};

export default AIInsightsPage;
