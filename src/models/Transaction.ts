
export type TransactionType = 'expense' | 'income';
export type CategoryType = 
  | 'food' 
  | 'transport' 
  | 'shopping' 
  | 'entertainment' 
  | 'utilities' 
  | 'health' 
  | 'education' 
  | 'salary' 
  | 'investment' 
  | 'other';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: CategoryType;
  description: string;
  merchant?: string;
  date: Date;
  isAutoDetected: boolean;
  smsId?: string;
  bankName?: string;
}

export const getCategoryColor = (category: CategoryType): string => {
  switch (category) {
    case 'food':
      return 'bg-orange-100 text-orange-700';
    case 'transport':
      return 'bg-blue-100 text-blue-700';
    case 'shopping':
      return 'bg-purple-100 text-purple-700';
    case 'entertainment':
      return 'bg-pink-100 text-pink-700';
    case 'utilities':
      return 'bg-gray-100 text-gray-700';
    case 'health':
      return 'bg-red-100 text-red-700';
    case 'education':
      return 'bg-yellow-100 text-yellow-700';
    case 'salary':
      return 'bg-green-100 text-green-700';
    case 'investment':
      return 'bg-indigo-100 text-indigo-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const getCategoryIcon = (category: CategoryType): string => {
  switch (category) {
    case 'food':
      return '🍕';
    case 'transport':
      return '🚗';
    case 'shopping':
      return '🛍️';
    case 'entertainment':
      return '🎬';
    case 'utilities':
      return '💡';
    case 'health':
      return '⚕️';
    case 'education':
      return '📚';
    case 'salary':
      return '💰';
    case 'investment':
      return '📈';
    default:
      return '📎';
  }
};
