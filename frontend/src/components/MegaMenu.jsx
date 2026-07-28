import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';

export const MegaMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const clothingCategories = [
    {
      title: 'Adult Men’s Clothing',
      path: '/products?category=men',
      subtitle: 'Sizes: M, L, XL, XXL',
      items: [
        { name: 'Button-Down Oxford Shirts', path: '/products?category=men&subCategory=shirts' },
        { name: 'Slim & Stretch Denim Jeans', path: '/products?category=men&subCategory=pants' },
        { name: 'Heavyweight Cotton Tees', path: '/products?category=men&subCategory=t-shirts' },
        { name: 'Biker Leather Jackets', path: '/products?category=men&subCategory=jackets' },
      ],
    },
    {
      title: 'Adult Women’s Fashion',
      path: '/products?category=women',
      subtitle: 'Sizes: M, L, XL, XXL',
      items: [
        { name: 'Silk Blend Midi Wrap Dresses', path: '/products?category=women&subCategory=dresses' },
        { name: 'Double-Breasted Executive Blazers', path: '/products?category=women&subCategory=jackets' },
        { name: 'High-Waisted Vintage Jeans', path: '/products?category=women&subCategory=pants' },
        { name: 'Chiffon Tops & Blouses', path: '/products?category=women&subCategory=shirts' },
      ],
    },
    {
      title: 'Child Men’s (Boys’ Apparel)',
      path: '/products?category=boys',
      subtitle: 'Ages: 2-3Y, 4-5Y, 6-7Y, 8-9Y',
      items: [
        { name: 'Dino Fleece Hoodies', path: '/products?category=boys&subCategory=hoodies' },
        { name: 'Kids Denim Trucker Jackets', path: '/products?category=boys&subCategory=jackets' },
        { name: 'Active Fleece Joggers', path: '/products?category=boys&subCategory=pants' },
      ],
    },
    {
      title: 'Child Women’s (Girls’ Apparel)',
      path: '/products?category=girls',
      subtitle: 'Ages: 2-3Y, 4-5Y, 6-7Y, 8-9Y',
      items: [
        { name: 'Sunshine Floral Summer Dresses', path: '/products?category=girls&subCategory=dresses' },
        { name: 'Unicorn Sparkle Knit Sweaters', path: '/products?category=girls&subCategory=sweaters' },
        { name: 'Cute Denim Overalls', path: '/products?category=girls&subCategory=pants' },
      ],
    },
  ];

  return (
    <div
      className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-stone-200 shadow-2xl z-50 animate-fade-in font-['Plus_Jakarta_Sans',sans-serif]"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {clothingCategories.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <div>
                <Link
                  to={col.path}
                  onClick={onClose}
                  className="font-black text-stone-900 text-sm hover:text-indigo-600 uppercase tracking-wider block"
                >
                  {col.title}
                </Link>
                <span className="text-[10px] font-bold text-indigo-600 block">{col.subtitle}</span>
              </div>

              <ul className="space-y-2 text-xs text-stone-600 font-semibold pt-1">
                {col.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="hover:text-indigo-600 transition-colors flex items-center justify-between group"
                    >
                      <span>{item.name}</span>
                      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-indigo-600">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};
