
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SMS } from '@/models/SMS';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { ArrowLeft, MessageSquare, Search, Loader2, Scan, CheckCircle, AlertCircle } from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';
import SMSPreview from '@/components/SMSPreview';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ScanSMSPage: React.FC = () => {
  const navigate = useNavigate();
  const { smsMessages, processNewSMS, scanAllUnprocessedSMS } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  const unprocessedSMS = smsMessages
    .filter(sms => !sms.isProcessed)
    .filter(sms => 
      searchTerm === '' || 
      sms.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sms.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  const processedSMS = smsMessages
    .filter(sms => sms.isProcessed)
    .filter(sms => 
      searchTerm === '' || 
      sms.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sms.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5); // Only show the latest 5 processed messages
  
  const handleProcessSMS = (sms: SMS) => {
    setProcessingId(sms.id);
    setTimeout(() => {
      const result = processNewSMS(sms);
      if (result) {
        toast({
          title: "Transaction Detected",
          description: "Successfully extracted transaction details.",
        });
      } else {
        toast({
          title: "No Transaction Found",
          description: "Could not detect a transaction in this SMS.",
          variant: "destructive",
        });
      }
      setProcessingId(null);
    }, 1000); // Simulate API call
  };
  
  const handleScanAll = () => {
    setIsScanning(true);
    setTimeout(() => {
      const detectedCount = scanAllUnprocessedSMS();
      setIsScanning(false);
      
      if (detectedCount > 0) {
        toast({
          title: "Scan Complete",
          description: `Detected ${detectedCount} new transactions.`,
        });
      } else {
        toast({
          title: "Scan Complete",
          description: "No new transactions were found.",
        });
      }
    }, 2000); // Simulate API call
  };
  
  return (
    <motion.div 
      className="p-4 max-w-md mx-auto pb-20"
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
        <h1 className="text-xl font-bold">Scan SMS</h1>
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <PremiumCard variant="gradient" className="mb-6" withPattern>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1">SMS Scanner</h2>
              <p className="text-sm opacity-90">
                Scan your SMS messages to automatically detect and track your expenses
              </p>
            </div>
          </div>
        </PremiumCard>
      </motion.div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search SMS..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">
          Unprocessed SMS <span className="text-sm text-gray-500">({unprocessedSMS.length})</span>
        </h2>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={handleScanAll} 
            disabled={isScanning || unprocessedSMS.length === 0}
            size="sm"
          >
            {isScanning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Scanning...
              </>
            ) : (
              <>
                <Scan className="h-4 w-4 mr-2" /> Scan All
              </>
            )}
          </Button>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {unprocessedSMS.length > 0 ? (
          <motion.div 
            className="space-y-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {unprocessedSMS.map((sms) => (
              <motion.div 
                key={sms.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <SMSPreview 
                  sms={sms} 
                  onProcess={handleProcessSMS} 
                  isProcessing={processingId === sms.id}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <PremiumCard className="mb-6 text-center py-10">
            {searchTerm ? (
              <>
                <div className="flex justify-center mb-4">
                  <AlertCircle className="h-12 w-12 text-gray-300" />
                </div>
                <p className="text-finance-medium mb-2">No SMS messages match your search</p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <p className="font-medium text-lg text-green-600">All Messages Processed</p>
                <p className="text-finance-medium">You've processed all available SMS messages</p>
              </>
            )}
          </PremiumCard>
        )}
      </AnimatePresence>
      
      {processedSMS.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              Recently Processed <span className="text-sm text-gray-500">({processedSMS.length})</span>
            </h2>
            {processedSMS.length > 5 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-finance-medium"
                onClick={() => navigate('/processed-sms')}
              >
                View All
              </Button>
            )}
          </div>
          
          <motion.div 
            className="space-y-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {processedSMS.map((sms) => (
              <motion.div 
                key={sms.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SMSPreview 
                  key={sms.id} 
                  sms={sms} 
                  onProcess={handleProcessSMS}
                />
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3">How It Works</h3>
        <PremiumCard className="mb-4">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
              1
            </div>
            <div>
              <h4 className="font-medium mb-1">Grant SMS Permission</h4>
              <p className="text-sm text-finance-medium">
                Allow the app to read your SMS messages to detect transactions
              </p>
            </div>
          </div>
        </PremiumCard>
        
        <PremiumCard className="mb-4">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
              2
            </div>
            <div>
              <h4 className="font-medium mb-1">Scan Messages</h4>
              <p className="text-sm text-finance-medium">
                The app will scan your messages for bank transactions
              </p>
            </div>
          </div>
        </PremiumCard>
        
        <PremiumCard>
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
              3
            </div>
            <div>
              <h4 className="font-medium mb-1">Auto-Track Your Expenses</h4>
              <p className="text-sm text-finance-medium">
                Transactions are automatically added to your expense tracker
              </p>
            </div>
          </div>
        </PremiumCard>
      </div>
    </motion.div>
  );
};

export default ScanSMSPage;
