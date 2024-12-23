export interface TextContent {
  items: Array<{
    str: string;
    transform: number[];
    width?: number;
    height?: number;
  }>;
}

export interface MenuSection {
  name: string;
  items: string[];
}

export interface ProcessedText {
  sections: MenuSection[];
  errors: string[];
}