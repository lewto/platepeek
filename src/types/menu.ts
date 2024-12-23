export interface MenuDesignConfig {
  logo?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    border: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    priceFont: string;
    scale: 'compact' | 'regular' | 'spacious';
  };
  layout: {
    style: 'list' | 'grid' | 'cards' | 'minimal';
    columns: 1 | 2 | 3 | 4;
    spacing: 'tight' | 'normal' | 'relaxed';
  };
  images: {
    mode: 'hover' | 'side' | 'grid' | 'hidden';
    size: 'small' | 'medium' | 'large';
    hoverEffect: 'fade' | 'slide' | 'zoom';
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
    aspectRatio: '1:1' | '4:3' | '16:9';
  };
  itemStyle: {
    showPrices: boolean;
    showDescriptions: boolean;
    highlightSpecials: boolean;
    dividerStyle: 'none' | 'line' | 'dots';
    priceAlignment: 'left' | 'right' | 'inline';
  };
  sectionStyle: {
    headerAlignment: 'left' | 'center' | 'right';
    headerStyle: 'simple' | 'underline' | 'boxed' | 'accent';
    spacing: 'compact' | 'normal' | 'spacious';
  };
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  dietary?: string[];
  isSpicy?: boolean;
  spicyLevel?: 1 | 2 | 3;
  isPopular?: boolean;
  isNew?: boolean;
  ingredients?: string[];
  isSpecial?: boolean;
  originalPrice?: number;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}