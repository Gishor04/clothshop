import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';

export const MegaMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const clothingCategories = [
    {
      title: 'Wedding Suits & Tuxedos',
      path: '/products?category=men',
      subtitle: 'Specialist Bespoke Suits',
      items: [
        { name: 'Royal Velvet 3-Piece Tuxedos', path: '/products?category=men' },
        { name: 'Imperial Gold Zari Sherwanis', path: '/products?category=men' },
        { name: 'Italian Double-Breasted Suits', path: '/products?category=men' },
        { name: 'Velvet Shawl Lapel Blazers', path: '/products?category=men' },
      ],
    },
    {
      title: 'Men’s Shirts & Formal Trousers',
      path: '/products?category=men',
      subtitle: 'Sizes: M, L, XL, XXL',
      items: [
        { name: 'Egyptian Cotton French-Cuff Shirts', path: '/products?category=men' },
        { name: 'Button-Down Oxford Shirts', path: '/products?category=men' },
        { name: 'Stretch Formal Dress Trousers', path: '/products?category=men' },
        { name: 'Slim & Flex Denim Jeans', path: '/products?category=men' },
      ],
    },
    {
      title: 'Adult Women’s Fashion',
      path: '/products?category=women',
      subtitle: 'Sizes: M, L, XL, XXL',
      items: [
        { name: 'Bridal Georgette & Silk Gowns', path: '/products?category=women' },
        { name: 'Silk Blend Midi Wrap Dresses', path: '/products?category=women' },
        { name: 'Double-Breasted Executive Blazers', path: '/products?category=women' },
        { name: 'High-Waisted Vintage Flare Jeans', path: '/products?category=women' },
      ],
    },
    {
      title: 'Kids Wedding & Party Wear',
      path: '/products?category=boys',
      subtitle: 'Ages: 2-3Y, 4-5Y, 6-7Y, 8-9Y',
      items: [
        { name: 'Junior Royal Prince 3-Piece Suits', path: '/products?category=boys' },
        { name: 'Sunshine Floral Twirl Dresses', path: '/products?category=girls' },
        { name: 'Kids Denim Trucker Jackets', path: '/products?category=boys' },
        { name: 'Unicorn Sparkle Knit Sweaters', path: '/products?category=girls' },
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
