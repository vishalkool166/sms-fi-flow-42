
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, CreditCard, Check } from 'lucide-react';

const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const steps = [
    {
      title: "Welcome to SMS-Fi Flow",
      description: "Track your expenses automatically by analyzing your SMS messages.",
      image: "📱"
    },
    {
      title: "SMS Detection",
      description: "We'll scan your transaction SMS messages and categorize them automatically.",
      image: <MessageSquare className="h-16 w-16 text-primary" />
    },
    {
      title: "Financial Insights",
      description: "Get a clear picture of your spending habits and financial health.",
      image: <CreditCard className="h-16 w-16 text-primary" />
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
  
  const renderImage = (image: React.ReactNode | string) => {
    if (typeof image === 'string') {
      return <div className="text-6xl mb-6">{image}</div>;
    }
    return <div className="mb-6">{image}</div>;
  };
  
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {renderImage(steps[currentStep].image)}
        
        <h1 className="text-2xl font-bold mb-3">{steps[currentStep].title}</h1>
        <p className="text-gray-600 mb-8 max-w-xs">
          {steps[currentStep].description}
        </p>
        
        <div className="flex space-x-2 mb-8">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep 
                  ? 'bg-primary' 
                  : index < currentStep 
                    ? 'bg-primary/50' 
                    : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <Button 
          className="w-full" 
          size="lg" 
          onClick={handleNext}
        >
          {currentStep < steps.length - 1 ? (
            <>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Get Started <Check className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        
        {currentStep < steps.length - 1 && (
          <button 
            className="w-full text-center mt-4 text-gray-500"
            onClick={() => navigate('/')}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
