
import React from 'react';
import { ChevronRight, Home, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PageView, Product } from '../types';

interface BreadcrumbItem {
  label: string;
  view?: PageView;
  product?: Product;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  const { navigateTo } = useStore();
  const maxItems = 4;
  const isTruncated = items.length > maxItems;

  // SEO: BreadcrumbList Schema.org
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://premiumkits.bd/${item.view || ''}` // Conceptual URL
    }))
  };

  const handleNavigation = (item: BreadcrumbItem) => {
    if (item.view) {
      navigateTo(item.view, item.product);
    }
  };

  const renderItems = () => {
    if (!isTruncated) return items;
    
    // Logic: Keep first item, last two items, and ellipsis in middle
    return [
      items[0],
      { label: '...', isSeparator: true },
      items[items.length - 2],
      items[items.length - 1]
    ];
  };

  return (
    <nav aria-label="Breadcrumb" className={`flex flex-col gap-4 ${className}`}>
      {/* SEO Script */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Mobile Back Button - UX Optimization for small screens */}
      <div className="lg:hidden">
        {items.length > 1 && (
          <button 
            onClick={() => handleNavigation(items[items.length - 2])}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-brand-crimson transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to {items[items.length - 2].label}
          </button>
        )}
      </div>

      {/* Desktop/Tablet Breadcrumb List */}
      <ol className="hidden lg:flex items-center flex-wrap gap-2 list-none">
        {/* Always include Home icon as start */}
        <li className="flex items-center">
          <button 
            onClick={() => navigateTo('home')}
            className="p-1 rounded-md text-gray-400 hover:text-brand-dark hover:bg-gray-100 transition-all flex items-center justify-center"
            aria-label="Home"
          >
            <Home size={14} />
          </button>
          <ChevronRight size={12} className="mx-2 text-gray-300" />
        </li>

        {renderItems().map((item, index, array) => {
          const isLast = index === array.length - 1;
          const isSeparator = (item as any).isSeparator;

          if (isSeparator) {
            return (
              <li key="ellipsis" className="flex items-center">
                <span className="p-1 text-gray-400">
                  <MoreHorizontal size={14} />
                </span>
                <ChevronRight size={12} className="mx-2 text-gray-300" />
              </li>
            );
          }

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {isLast ? (
                <span 
                  className="text-xs font-bold text-brand-dark border-b-2 border-brand-crimson pb-0.5"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <button 
                    onClick={() => handleNavigation(item)}
                    className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-brand-dark transition-all"
                  >
                    {item.label}
                  </button>
                  <ChevronRight size={12} className="mx-2 text-gray-300" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
