
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import SMSPreview from '@/components/SMSPreview';
import { MessageSquare, RefreshCw } from 'lucide-react';

const ScanSMSPage: React.FC = () => {
  const { smsMessages, processNewSMS, scanAllUnprocessedSMS } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  const unprocessedSMS = smsMessages.filter(sms => !sms.isProcessed);
  
  const handleScanAll = () => {
    setIsScanning(true);
    setTimeout(() => {
      scanAllUnprocessedSMS();
      setIsScanning(false);
    }, 1500);
  };
  
  const handleProcessSMS = (sms: { id: string }) => {
    setProcessingId(sms.id);
    setTimeout(() => {
      processNewSMS(sms as any);
      setProcessingId(null);
    }, 800);
  };
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Scan SMS</h1>
      <p className="text-gray-500 mb-6">
        Automatically detect transactions from your SMS messages
      </p>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Unprocessed SMS</h2>
          <p className="text-sm text-gray-500">{unprocessedSMS.length} messages found</p>
        </div>
        <Button 
          onClick={handleScanAll} 
          disabled={isScanning || unprocessedSMS.length === 0}
        >
          {isScanning ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>Scan All</>
          )}
        </Button>
      </div>
      
      {unprocessedSMS.length > 0 ? (
        <div className="space-y-4">
          {unprocessedSMS.map(sms => (
            <SMSPreview
              key={sms.id}
              sms={sms}
              onProcess={handleProcessSMS}
              isProcessing={processingId === sms.id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-1">No Unprocessed SMS</h3>
          <p className="text-gray-500">All your messages have been processed</p>
        </div>
      )}
    </div>
  );
};

export default ScanSMSPage;
