
import React from 'react';
import { SMS } from '@/models/SMS';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate, formatTime } from '@/utils/formatters';

interface SMSPreviewProps {
  sms: SMS;
  onProcess: (sms: SMS) => void;
  isProcessing?: boolean;
}

const SMSPreview: React.FC<SMSPreviewProps> = ({ 
  sms, 
  onProcess, 
  isProcessing = false 
}) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between mb-2">
          <div className="font-semibold">{sms.address}</div>
          <div className="text-sm text-gray-500">
            {formatDate(sms.date)} {formatTime(sms.date)}
          </div>
        </div>
        <p className="text-sm mb-3">{sms.body}</p>
        <div className="flex justify-between items-center">
          <div className={`text-xs ${sms.isProcessed ? 'text-green-600' : 'text-amber-600'}`}>
            {sms.isProcessed ? '✓ Processed' : '• Not processed'}
          </div>
          
          {!sms.isProcessed && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onProcess(sms)}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Extract Transaction'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SMSPreview;
