import { MenuCategory, MenuDesignConfig } from '../types/menu';

interface MenuData {
  categories: MenuCategory[];
  design: MenuDesignConfig;
  restaurantId: string;
  restaurantName: string;
}

export class MenuHostingService {
  private static BASE_URL = 'https://menu.yourservice.com';

  static generateMenuUrl(restaurantId: string): string {
    return `${this.BASE_URL}/m/${restaurantId}`;
  }

  static generateEmbedCode(menuData: MenuData): string {
    const encodedData = encodeURIComponent(JSON.stringify(menuData));
    
    return `
<!-- Restaurant Menu Widget -->
<div id="restaurant-menu-${menuData.restaurantId}"></div>
<script src="${this.BASE_URL}/embed.js"></script>
<script>
  RestaurantMenu.init({
    containerId: 'restaurant-menu-${menuData.restaurantId}',
    menuId: '${menuData.restaurantId}',
    name: '${menuData.restaurantName}'
  });
</script>
    `.trim();
  }

  static generateClickThroughCode(menuData: MenuData): string {
    const menuUrl = this.generateMenuUrl(menuData.restaurantId);
    
    return `
<!-- Restaurant Menu Link -->
<a href="${menuUrl}" 
   class="restaurant-menu-link"
   target="_blank"
   rel="noopener noreferrer"
>
  View Our Menu
</a>
    `.trim();
  }
}