
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, CreditCard, Check, Wallet, ChevronRight, PieChart, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeableCards from '@/components/SwipeableCards';
import { useTheme } from '@/providers/ThemeProvider';

const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  const steps = [
    {
      title: "Welcome to SMS-Fi Flow",
      description: "Track your expenses automatically by analyzing your SMS messages.",
      image: <MessageSquare className="h-16 w-16 text-white" />,
      color: "from-blue-600 to-blue-400",
      bgPattern: "radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 70%)"
    },
    {
      title: "Intelligent Expense Tracking",
      description: "We'll scan your transaction SMS messages and categorize them automatically.",
      image: <Wallet className="h-16 w-16 text-white" />,
      color: "from-purple-600 to-purple-400",
      bgPattern: "radial-gradient(circle at bottom left, rgba(255,255,255,0.2), transparent 70%)"
    },
    {
      title: "Financial Insights",
      description: "Get a clear picture of your spending habits and financial health.",
      image: <PieChart className="h-16 w-16 text-white" />,
      color: "from-teal-600 to-teal-400",
      bgPattern: "radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%)"
    },
    {
      title: "Smart AI Analysis",
      description: "Use AI-powered insights to make better financial decisions.",
      image: <Zap className="h-16 w-16 text-white" />,
      color: "from-amber-600 to-orange-400",
      bgPattern: "radial-gradient(circle at top left, rgba(255,255,255,0.2), transparent 70%)"
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      navigate('/');
    }
  };
  
  const handleCardChange = (index: number) => {
    setCurrentStep(index);
  };
  
  const stepCards = steps.map((step, index) => (
    <div key={index} className="flex items-center justify-center">
      <div className="text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mb-8 mx-auto w-40 h-40 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color} shadow-lg relative overflow-hidden`}
        >
          <div className="absolute inset-0" style={{ backgroundImage: step.bgPattern }}></div>
          <div className="relative z-10">{step.image}</div>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold mb-3"
        >
          {step.title}
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 mb-8 max-w-xs mx-auto dark:text-gray-300"
        >
          {step.description}
        </motion.p>
      </div>
    </div>
  ));
  
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <SwipeableCards onChangeIndex={handleCardChange}>
            {stepCards}
          </SwipeableCards>
          
          <div className="flex justify-center space-x-2 mb-8 mt-4">
            {steps.map((_, index) => (
              <motion.div 
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: index === currentStep ? 1.2 : 1,
                  backgroundColor: index === currentStep 
                    ? isDark ? '#60a5fa' : '#3b82f6'
                    : index < currentStep 
                      ? isDark ? '#60a5fa80' : '#3b82f680'
                      : isDark ? '#374151' : '#e5e7eb'
                }}
                className={`w-2 h-2 rounded-full cursor-pointer`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              className="w-full mb-4" 
              size="lg" 
              onClick={handleNext}
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Continue <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Get Started <Check className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            
            {currentStep < steps.length - 1 && (
              <button 
                className="w-full text-center text-gray-500 dark:text-gray-400"
                onClick={() => navigate('/')}
              >
                Skip
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingPage;
