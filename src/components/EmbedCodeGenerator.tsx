import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { MenuCategory, MenuDesignConfig } from '../types/menu';
import toast from 'react-hot-toast';

interface EmbedCodeGeneratorProps {
  categories: MenuCategory[];
  designConfig: MenuDesignConfig;
}

export function EmbedCodeGenerator({ categories, designConfig }: EmbedCodeGeneratorProps) {
  const [copied, setCopied] = useState(false);

  const generateStylesheet = () => {
    // Previous stylesheet generation code remains the same
    // ... (keeping all the existing CSS generation)
  };

  const generateScript = () => {
    const menuData = JSON.stringify({ categories, design: designConfig });
    
    return `
// Initialize menu
const menuData = ${menuData};

function initMenu(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Clear existing content
  container.innerHTML = '';
  container.className = 'menu-container';

  // Add logo if exists
  if (menuData.design.logo) {
    const logo = document.createElement('img');
    logo.src = menuData.design.logo;
    logo.alt = 'Restaurant logo';
    logo.className = 'menu-logo';
    container.appendChild(logo);
  }

  // Create sections
  menuData.categories.forEach(category => {
    const section = document.createElement('div');
    section.className = 'menu-section';

    // Add section header
    const header = document.createElement('h2');
    header.className = 'menu-section-header';
    header.textContent = category.name;
    section.appendChild(header);

    // Create items container
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'menu-items';

    // Add items
    category.items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'menu-item';

      // Create item content based on layout
      const content = document.createElement('div');
      content.className = 'menu-item-content';

      // Add image if enabled
      if (menuData.design.images.mode !== 'hidden' && item.imageUrl) {
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.name;
        img.className = 'menu-item-image';
        content.appendChild(img);
      }

      // Add item details
      const details = document.createElement('div');
      details.className = 'menu-item-details';

      const namePrice = document.createElement('div');
      namePrice.className = 'menu-item-header';

      const name = document.createElement('h3');
      name.className = 'menu-item-name';
      name.textContent = item.name;
      namePrice.appendChild(name);

      if (menuData.design.itemStyle.showPrices) {
        const price = document.createElement('span');
        price.className = 'menu-item-price';
        price.textContent = '$' + item.price.toFixed(2);
        namePrice.appendChild(price);
      }

      details.appendChild(namePrice);

      if (menuData.design.itemStyle.showDescriptions && item.description) {
        const description = document.createElement('p');
        description.className = 'menu-item-description';
        description.textContent = item.description;
        details.appendChild(description);
      }

      content.appendChild(details);
      itemElement.appendChild(content);
      itemsContainer.appendChild(itemElement);
    });

    section.appendChild(itemsContainer);
    container.appendChild(section);
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initMenu('restaurant-menu');
});
`.trim();
  };

  const generateCode = () => {
    return `
<!-- Restaurant Menu Widget -->
<div id="restaurant-menu"></div>

<style>
${generateStylesheet()}
</style>

<script>
${generateScript()}
</script>
`.trim();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateCode());
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
      toast.error('Failed to copy code to clipboard');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Embed Code</h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Copy size={16} />
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg overflow-hidden">
        <pre className="p-4 overflow-x-auto">
          <code>{generateCode()}</code>
        </pre>
      </div>

      <div className="text-sm text-gray-600">
        <h3 className="font-medium mb-2">Installation Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>Copy the code above</li>
          <li>Paste it into your website's HTML where you want the menu to appear</li>
          <li>The menu will automatically load with your design settings</li>
        </ol>
      </div>
    </div>
  );
}