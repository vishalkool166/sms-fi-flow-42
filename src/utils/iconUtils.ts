
import { 
  ShoppingBag, 
  Utensils, 
  Car, 
  Film, 
  Home, 
  Stethoscope, 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  CreditCard,
  LucideIcon
} from 'lucide-react';
import { CategoryType } from '@/models/Transaction';

export const getCategoryIcon = (category: CategoryType): { icon: LucideIcon; color: string } => {
  switch (category) {
    case 'food':
      return { icon: Utensils, color: 'red' };
    case 'transport':
      return { icon: Car, color: 'blue' };
    case 'shopping':
      return { icon: ShoppingBag, color: 'purple' };
    case 'entertainment':
      return { icon: Film, color: 'pink' };
    case 'utilities':
      return { icon: Home, color: 'gray' };
    case 'health':
      return { icon: Stethoscope, color: 'red' };
    case 'education':
      return { icon: GraduationCap, color: 'yellow' };
    case 'salary':
      return { icon: DollarSign, color: 'green' };
    case 'investment':
      return { icon: TrendingUp, color: 'teal' };
    default:
      return { icon: CreditCard, color: 'gray' };
  }
};

export const getCategoryColor = (category: CategoryType): string => {
  const colorMap: Record<string, string> = {
    food: 'red',
    transport: 'blue',
    shopping: 'purple',
    entertainment: 'pink',
    utilities: 'gray',
    health: 'red',
    education: 'yellow',
    salary: 'green',
    investment: 'teal',
    other: 'gray',
  };
  
  return colorMap[category] || 'gray';
};

// Map color strings to valid color types
export const mapColorToType = (color: string): "blue" | "green" | "red" | "yellow" | "purple" | "navy" | "sky" | "teal" | "amber" | "indigo" | "pink" | "orange" | "gray" => {
  const validColors: Record<string, "blue" | "green" | "red" | "yellow" | "purple" | "navy" | "sky" | "teal" | "amber" | "indigo" | "pink" | "orange" | "gray"> = {
    'red': 'red',
    'blue': 'blue',
    'green': 'green',
    'purple': 'purple',
    'yellow': 'yellow',
    'navy': 'navy',
    'sky': 'sky',
    'teal': 'teal',
    'amber': 'amber',
    'indigo': 'indigo',
    'pink': 'pink',
    'orange': 'orange',
    'gray': 'gray',
  };
  
  return validColors[color] || 'gray';
};
