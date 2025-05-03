
import { 
  ShoppingBag, 
  Car, 
  Utensils, 
  Film, 
  Home, 
  Stethoscope, 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  HelpCircle
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type CategoryIconType = 
  'shopping' | 'transport' | 'food' | 'entertainment' | 
  'utilities' | 'health' | 'education' | 'salary' | 
  'investment' | 'other';

export interface CategoryIconConfig {
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const CategoryIcons: Record<CategoryIconType, CategoryIconConfig> = {
  shopping: {
    icon: ShoppingBag,
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
  },
  transport: {
    icon: Car,
    color: '#0EA5E9',
    bgColor: '#E0F2FE',
  },
  food: {
    icon: Utensils,
    color: '#F97316',
    bgColor: '#FFEDD5',
  },
  entertainment: {
    icon: Film,
    color: '#EC4899',
    bgColor: '#FCE7F3',
  },
  utilities: {
    icon: Home,
    color: '#6B7280',
    bgColor: '#F3F4F6',
  },
  health: {
    icon: Stethoscope,
    color: '#EF4444',
    bgColor: '#FEE2E2',
  },
  education: {
    icon: GraduationCap,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  salary: {
    icon: Briefcase,
    color: '#10B981',
    bgColor: '#D1FAE5',
  },
  investment: {
    icon: TrendingUp,
    color: '#3B82F6',
    bgColor: '#DBEAFE',
  },
  other: {
    icon: HelpCircle,
    color: '#6B7280',
    bgColor: '#F3F4F6',
  },
};

export const getCategoryIcon = (category: string): CategoryIconConfig => {
  return CategoryIcons[category as CategoryIconType] || CategoryIcons.other;
};

export const PremiumColors = {
  navy: '#1E3B70',
  sky: '#29B6F6',
  dark: '#2D3748',
  medium: '#4A5568',
  light: '#718096',
};
