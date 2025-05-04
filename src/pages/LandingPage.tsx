
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, ArrowRight, CreditCard, Wallet, ChevronRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import PremiumCard from '@/components/PremiumCard';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };
  
  const features = [
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
      title: "SMS Transaction Detection",
      description: "Automatically detect and categorize transactions from your SMS messages"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-purple-500" />,
      title: "Multiple Account Support",
      description: "Track all your bank accounts and credit cards in one place"
    },
    {
      icon: <Wallet className="h-6 w-6 text-green-500" />,
      title: "Expense Tracking",
      description: "Smart categorization of your expenses for better financial planning"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <header className="p-4 flex justify-center">
        <div className="flex items-center">
          <div className="premium-gradient w-10 h-10 rounded-full flex items-center justify-center text-white">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold ml-2 premium-text">SMS-Fi Flow</h1>
        </div>
      </header>
      
      <main className="container max-w-md mx-auto px-4 pb-24 pt-8">
        <section className="mb-12 text-center">
          <motion.h1 
            className="text-4xl font-bold mb-4 premium-text"
            variants={fadeInUpVariant}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Manage Your Finances Smarter
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8 dark:text-gray-300"
            variants={fadeInUpVariant}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Track expenses automatically from your SMS notifications and gain valuable insights into your spending habits.
          </motion.p>
          
          <motion.div
            className="flex flex-col gap-4"
            variants={fadeInUpVariant}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <Button 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/onboarding')}
            >
              Get Started <ChevronRight className="ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/login')}
            >
              I Already Have an Account
            </Button>
          </motion.div>
        </section>
        
        <section className="mb-12">
          <motion.div
            className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 relative h-56"
            variants={fadeInUpVariant}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-500 opacity-10"></div>
            <div className="absolute top-0 right-0 p-6 opacity-20">
              <MessageSquare className="h-32 w-32 text-white" />
            </div>
            <div className="relative h-full flex items-center justify-center p-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-center premium-text">SMS Tracking Magic</h3>
                <p className="text-center text-gray-600 dark:text-gray-300">Turn transaction notifications into financial insights automatically</p>
                <div className="flex justify-center mt-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <ArrowRight className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Key Features</h2>
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start p-4 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
                variants={fadeInUpVariant}
                initial="hidden"
                animate="visible"
                custom={index + 4}
              >
                <div className="mr-4 p-2 rounded-full bg-gray-50 dark:bg-gray-700">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium mb-1 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        <motion.section 
          className="mb-6"
          variants={fadeInUpVariant}
          initial="hidden"
          animate="visible"
          custom={8}
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-600">Secure & Private</p>
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Your data stays on your device. We don't store your financial information in the cloud.
          </p>
        </motion.section>
        
        <motion.div
          className="text-center"
          variants={fadeInUpVariant}
          initial="hidden"
          animate="visible"
          custom={9}
        >
          <Button 
            onClick={() => navigate('/onboarding')} 
            className="w-full premium-gradient text-white border-0"
          >
            Start Your Financial Journey <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default LandingPage;
