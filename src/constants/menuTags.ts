import { Tag, Star, Clock, Flame, Award } from 'lucide-react';

export const MENU_TAGS = [
  // Dietary Tags
  { id: 'vegan', label: 'Vegan', color: 'green', icon: Tag },
  { id: 'vegetarian', label: 'Vegetarian', color: 'emerald', icon: Tag },
  { id: 'gluten-free', label: 'Gluten-Free', color: 'yellow', icon: Tag },
  { id: 'dairy-free', label: 'Dairy-Free', color: 'blue', icon: Tag },
  { id: 'keto', label: 'Keto', color: 'purple', icon: Tag },
  { id: 'halal', label: 'Halal', color: 'indigo', icon: Tag },
  { id: 'kosher', label: 'Kosher', color: 'violet', icon: Tag },
  
  // Special Tags
  { id: 'popular', label: 'Popular', color: 'amber', icon: Star },
  { id: 'new', label: 'New', color: 'blue', icon: Clock },
  { id: 'spicy', label: 'Spicy', color: 'red', icon: Flame },
  { id: 'special', label: 'Special', color: 'purple', icon: Award }
] as const;

export type MenuTagId = typeof MENU_TAGS[number]['id'];