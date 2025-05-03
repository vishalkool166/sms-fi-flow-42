
import { format, isValid } from 'date-fns';

// Currency formatter
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Simple date formatter (DD/MM/YYYY)
export const formatDate = (date: Date | string | number): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  if (!isValid(dateObj)) return 'Invalid Date';
  
  return format(dateObj, 'dd/MM/yyyy');
};

// Time formatter (HH:MM)
export const formatTime = (date: Date | string | number): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  if (!isValid(dateObj)) return 'Invalid Time';
  
  return format(dateObj, 'HH:mm');
};

// Date and time formatter (DD/MM/YYYY HH:MM)
export const formatDateTime = (date: Date | string | number): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  if (!isValid(dateObj)) return 'Invalid Date/Time';
  
  return format(dateObj, 'dd/MM/yyyy HH:mm');
};

// Friendly date formatter (Today, Yesterday, or DD MMM)
export const formatFriendlyDate = (date: Date | string | number): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  if (!isValid(dateObj)) return 'Invalid Date';
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (dateObj.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (dateObj.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return format(dateObj, 'dd MMM');
  }
};

// Full date formatter (DD MMMM, YYYY)
export const formatFullDate = (date: Date | string | number): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  if (!isValid(dateObj)) return 'Invalid Date';
  
  return format(dateObj, 'dd MMMM, yyyy');
};

// Month Year formatter (MMMM YYYY)
export const formatMonthYear = (date: Date | string | number): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  if (!isValid(dateObj)) return 'Invalid Date';
  
  return format(dateObj, 'MMMM yyyy');
};

// Format percentage
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Format large number with K, M, B suffixes
export const formatCompactNumber = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  } else {
    return value.toString();
  }
};
