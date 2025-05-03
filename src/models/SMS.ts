
export interface SMS {
  id: string;
  address: string; // Sender (usually bank or merchant)
  body: string;    // SMS content
  date: Date;      // When the SMS was received
  isRead: boolean;
  isProcessed: boolean; // Whether it has been processed for transaction data
}

export interface BankPattern {
  bankName: string;
  senderPatterns: string[]; // Array of regular expressions to match bank's SMS numbers
  transactionPatterns: {
    expense: RegExp[];
    income: RegExp[];
  };
  // Function to extract information like amount, merchant, etc.
  extractInfo: (message: string) => {
    amount?: number;
    merchant?: string;
    type?: 'expense' | 'income';
    date?: Date;
  } | null;
}

// Simple bank pattern example for demonstration
export const BANK_PATTERNS: BankPattern[] = [
  {
    bankName: 'HDFC Bank',
    senderPatterns: ['HDFCBANK', 'HDFC-BANK'],
    transactionPatterns: {
      expense: [/debited|spent|paid|purchase/i],
      income: [/credited|received|deposited/i],
    },
    extractInfo: (message) => {
      const amountMatch = message.match(/(?:INR|Rs\.?|₹)\s?([0-9,]+\.?\d*)/i);
      const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : undefined;
      
      const merchantMatch = message.match(/(?:at|to|from)\s+([A-Za-z0-9\s]+?)(?:\s+on|\.|\s+for)/i);
      const merchant = merchantMatch ? merchantMatch[1].trim() : undefined;
      
      let type: 'expense' | 'income' | undefined;
      if (message.match(/debited|spent|paid|purchase/i)) {
        type = 'expense';
      } else if (message.match(/credited|received|deposited/i)) {
        type = 'income';
      }
      
      return { amount, merchant, type };
    },
  },
  {
    bankName: 'SBI',
    senderPatterns: ['SBIINB', 'SBI'],
    transactionPatterns: {
      expense: [/debited|withdrawn/i],
      income: [/credited/i],
    },
    extractInfo: (message) => {
      const amountMatch = message.match(/(?:INR|Rs\.?|₹)\s?([0-9,]+\.?\d*)/i);
      const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : undefined;
      
      const merchantMatch = message.match(/(?:at|to|from)\s+([A-Za-z0-9\s]+?)(?:\s+on|\.|\s+for)/i);
      const merchant = merchantMatch ? merchantMatch[1].trim() : undefined;
      
      let type: 'expense' | 'income' | undefined;
      if (message.match(/debited|withdrawn/i)) {
        type = 'expense';
      } else if (message.match(/credited/i)) {
        type = 'income';
      }
      
      return { amount, merchant, type };
    },
  },
];

export function parseSMSForTransaction(sms: SMS): { 
  isTransaction: boolean;
  bankName?: string;
  amount?: number;
  merchant?: string;
  type?: 'expense' | 'income';
} {
  // Check if SMS is from a bank
  for (const bank of BANK_PATTERNS) {
    const isBankSMS = bank.senderPatterns.some(pattern => 
      sms.address.toUpperCase().includes(pattern)
    );
    
    if (!isBankSMS) continue;
    
    // Check if it's a transaction SMS
    const isExpense = bank.transactionPatterns.expense.some(pattern => 
      pattern.test(sms.body)
    );
    const isIncome = bank.transactionPatterns.income.some(pattern => 
      pattern.test(sms.body)
    );
    
    if (!isExpense && !isIncome) continue;
    
    // Extract transaction details
    const info = bank.extractInfo(sms.body);
    if (!info || !info.amount) continue;
    
    return {
      isTransaction: true,
      bankName: bank.bankName,
      amount: info.amount,
      merchant: info.merchant,
      type: info.type,
    };
  }
  
  return { isTransaction: false };
}
