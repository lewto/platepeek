import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { MenuCategory } from '../types/menu';

interface CodeGeneratorProps {
  categories: MenuCategory[];
}

export function CodeGenerator({ categories }: CodeGeneratorProps) {
  const [copied, setCopied] = useState(false);

  const generateCode = () => {
    const menuData = JSON.stringify(categories);
    
    return `
<!-- Restaurant Menu Plugin -->
<div id="restaurant-menu"></div>
<style>
  .menu-item {
    position: relative;
    padding: 1rem;
    margin: 0.5rem 0;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease;
  }
  
  .menu-item:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .menu-item-preview {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
    pointer-events: none;
  }
  
  .menu-item:hover .menu-item-preview {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    .menu-item-preview {
      display: none;
    }
  }
</style>
<script>
  (function() {
    const menuData = ${menuData};
    const container = document.getElementById('restaurant-menu');
    
    function renderMenu() {
      menuData.forEach(category => {
        const categoryEl = document.createElement('div');
        categoryEl.className = 'menu-category';
        categoryEl.innerHTML = \`
          <h2 style="font-size: 1.5rem; font-weight: bold; margin: 1rem 0;">
            \${category.name}
          </h2>
        \`;
        
        const itemsGrid = document.createElement('div');
        itemsGrid.style.display = 'grid';
        itemsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
        itemsGrid.style.gap = '1rem';
        
        category.items.forEach(item => {
          const itemEl = document.createElement('div');
          itemEl.className = 'menu-item';
          itemEl.innerHTML = \`
            <div style="display: flex; justify-content: space-between;">
              <div>
                <h3 style="font-weight: 600;">\${item.name}</h3>
                <p style="color: #666; font-size: 0.875rem;">\${item.description}</p>
              </div>
              <span style="font-weight: 500;">$\${item.price.toFixed(2)}</span>
            </div>
            <div class="menu-item-preview">
              <img src="\${item.imageUrl}" alt="\${item.name}" 
                   style="width: 200px; height: 200px; object-fit: cover; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            </div>
          \`;
          itemsGrid.appendChild(itemEl);
        });
        
        categoryEl.appendChild(itemsGrid);
        container.appendChild(categoryEl);
      });
    }
    
    renderMenu();
  })();
</script>
    `.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Generated Code</h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Copy size={16} />
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <code>{generateCode()}</code>
      </pre>
    </div>
  );
}