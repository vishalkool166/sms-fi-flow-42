
import { Transaction, CategoryType } from '../models/Transaction';
import { SMS } from '../models/SMS';
import { v4 as uuidv4 } from 'uuid';

// Generate realistic mock transactions for the demo
export function generateMockTransactions(count = 30): Transaction[] {
  const transactions: Transaction[] = [];
  const categories: CategoryType[] = [
    'food', 'transport', 'shopping', 
    'entertainment', 'utilities', 'health', 
    'education', 'salary', 'investment', 'other'
  ];
  const merchants = [
    'Amazon', 'Uber', 'Starbucks', 'Netflix', 
    'Walmart', 'Target', 'Spotify', 'McDonald\'s',
    'Apple Store', 'CVS Pharmacy', 'Shell Gas'
  ];
  const banks = ['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank'];
  
  // Start date: 30 days ago
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  
  for (let i = 0; i < count; i++) {
    const isExpense = Math.random() > 0.3; // 70% chance of being an expense
    const transactionDate = new Date(startDate);
    transactionDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
    
    const category = isExpense 
      ? categories[Math.floor(Math.random() * (categories.length - 2))] 
      : (Math.random() > 0.5 ? 'salary' : 'investment');
    
    transactions.push({
      id: uuidv4(),
      amount: isExpense 
        ? Math.round(Math.random() * 5000) + 100 
        : Math.round(Math.random() * 50000) + 10000,
      type: isExpense ? 'expense' : 'income',
      category,
      description: isExpense 
        ? `Purchase at ${merchants[Math.floor(Math.random() * merchants.length)]}`
        : category === 'salary' ? 'Monthly Salary' : 'Investment Return',
      merchant: isExpense ? merchants[Math.floor(Math.random() * merchants.length)] : undefined,
      date: transactionDate,
      isAutoDetected: Math.random() > 0.2,
      bankName: banks[Math.floor(Math.random() * banks.length)]
    });
  }
  
  // Sort by date (most recent first)
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
}

// Generate mock SMS
export function generateMockSMS(count = 20): SMS[] {
  const sms: SMS[] = [];
  const bankSenders = ['HDFCBANK', 'SBIINB', 'ICICIBNK', 'AXISBK'];
  
  const smsTemplates = [
    "Your a/c XX1234 is debited with INR {amount} on {date} at {merchant}. Avl Bal INR 28,492.50",
    "INR {amount} debited from a/c XX1234 to {merchant} on {date}. Avl Bal: INR 42,731.25",
    "Alert! Rs.{amount} has been debited from your A/c {date} for purchase at {merchant}.",
    "Your account XX1234 has been credited with INR {amount} on {date}. Available balance: INR 105,843.76",
    "Credit alert: INR {amount} credited to your account XX1234 on {date}. Updated balance: INR 67,291.30",
  ];
  
  // Non-transaction messages
  const nonTransactionSMS = [
    "Your OTP for transaction is 472913. Valid for 10 minutes.",
    "Dear customer, your card ending 1234 has been dispatched.",
    "Reminder: Your EMI of Rs.5,200 is due on 15-May-2023.",
    "Avail 10% discount on shopping with your credit card this weekend!",
    "Your mobile banking password has been successfully changed."
  ];
  
  const merchants = [
    'Amazon.in', 'Swiggy', 'Flipkart', 'Netflix', 
    'Uber', 'Zomato', 'Myntra', 'BigBasket',
    'TATA Cliq', 'PharmEasy', 'BookMyShow'
  ];
  
  // Start date: 30 days ago
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  
  for (let i = 0; i < count; i++) {
    const isTransactionSMS = Math.random() > 0.3; // 70% chance of being a transaction SMS
    const smsDate = new Date(startDate);
    smsDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
    
    let body;
    if (isTransactionSMS) {
      const isExpense = Math.random() > 0.3; // 70% chance of being an expense
      const template = isExpense 
        ? smsTemplates[Math.floor(Math.random() * 3)] 
        : smsTemplates[3 + Math.floor(Math.random() * 2)];
      
      const amount = isExpense 
        ? Math.round(Math.random() * 5000) + 100 
        : Math.round(Math.random() * 50000) + 10000;
      const formattedAmount = amount.toLocaleString('en-IN');
      
      const merchant = merchants[Math.floor(Math.random() * merchants.length)];
      const dateStr = `${smsDate.getDate()}-${smsDate.toLocaleString('default', { month: 'short' })}-${smsDate.getFullYear()}`;
      
      body = template
        .replace('{amount}', formattedAmount)
        .replace('{date}', dateStr)
        .replace('{merchant}', merchant);
    } else {
      body = nonTransactionSMS[Math.floor(Math.random() * nonTransactionSMS.length)];
    }
    
    sms.push({
      id: uuidv4(),
      address: isTransactionSMS ? 
        bankSenders[Math.floor(Math.random() * bankSenders.length)] : 
        'VM-ALERTS',
      body,
      date: smsDate,
      isRead: Math.random() > 0.3,
      isProcessed: Math.random() > 0.5
    });
  }
  
  // Sort by date (most recent first)
  return sms.sort((a, b) => b.date.getTime() - a.date.getTime());
}
