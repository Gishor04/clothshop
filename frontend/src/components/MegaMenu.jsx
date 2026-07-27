import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Tag } from 'lucide-react';

export const MegaMenu = ({ category, onClose }) => {
  const megaMenuData = {
    men: {
      title: "Men's Apparel & Gear",
      featuredImage:
        'https://images.unsplash.com/photo-1490578474895-699bc4e2cf59?w=600&auto=format&fit=crop',
      featuredTitle: 'New Summer Linen & Denim',
      featuredLink: '/products?category=men',
      columns: [
        {
          title: 'Top Apparel',
          links: [
            { label: 'Classic Oxford Shirts', path: '/products?category=men&subCategory=shirts' },
            { label: 'Slim & Regular Fit Jeans', path: '/products?category=men&subCategory=pants' },
            { label: 'Heavyweight T-Shirts', path: '/products?category=men&subCategory=t-shirts' },
            { label: 'Leather Jackets & Blazers', path: '/products?category=men&subCategory=jackets' },
          ],
        },
        {
          title: 'Featured Pants & Outerwear',
          links: [
            { label: '👖 All Pants & Denim', path: '/products?category=men&subCategory=pants' },
            { label: '🧥 Biker Jackets', path: '/products?category=men&subCategory=jackets' },
            { label: '🔥 New Arrivals 2026', path: '/products?category=men&sort=newest' },
          ],
        },
      ],
    },
    women: {
      title: "Women's Fashion & Dresses",
      featuredImage:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop',
      featuredTitle: 'Silk Wraps & Tailored Blazers',
      featuredLink: '/products?category=women',
      columns: [
        {
          title: 'Collections',
          links: [
            { label: 'Midi Silk & Twirl Dresses', path: '/products?category=women&subCategory=dresses' },
            { label: 'High-Waisted Flare Jeans', path: '/products?category=women&subCategory=pants' },
            { label: 'Double-Breasted Blazers', path: '/products?category=women&subCategory=jackets' },
            { label: 'Boho Chiffon Shirts', path: '/products?category=women&subCategory=shirts' },
          ],
        },
        {
          title: 'Trending Fits',
          links: [
            { label: '👗 Silk Evening Dresses', path: '/products?category=women&subCategory=dresses' },
            { label: '👖 Flared Ankle Denim', path: '/products?category=women&subCategory=pants' },
            { label: '✨ Bestsellers', path: '/products?category=women&sort=price_desc' },
          ],
        },
      ],
    },
    kids: {
      title: "Boys' & Girls' Wear (Kids)",
      featuredImage:
        'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop',
      featuredTitle: 'Playful Dino & Floral Outfits',
      featuredLink: '/products?category=boys',
      columns: [
        {
          title: "Boys' Apparel",
          links: [
            { label: 'Graphic Dino Hoodies', path: '/products?category=boys&subCategory=hoodies' },
            { label: 'Kids Denim Trucker Jackets', path: '/products?category=boys&subCategory=jackets' },
            { label: 'Active Fleece Joggers', path: '/products?category=boys&subCategory=pants' },
          ],
        },
        {
          title: "Girls' Collection",
          links: [
            { label: 'Floral Twirl Summer Dresses', path: '/products?category=girls&subCategory=dresses' },
            { label: 'Unicorn Sparkle Sweaters', path: '/products?category=girls&subCategory=sweaters' },
            { label: 'Denim Bib Overalls', path: '/products?category=girls&subCategory=pants' },
          ],
        },
      ],
    },
  };

  const data = megaMenuData[category];
  if (!data) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl border-t border-slate-100 py-8 z-40 animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Featured Image Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-md group h-48">
          <img
            src={data.featuredImage}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full inline-block">
              Featured
            </span>
            <p className="font-extrabold text-xs">{data.featuredTitle}</p>
            <Link
              to={data.featuredLink}
              onClick={onClose}
              className="text-[11px] text-amber-300 font-bold flex items-center gap-1 hover:underline"
            >
              Shop Collection <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Dynamic Nav Columns */}
        {data.columns.map((col, idx) => (
          <div key={idx} className="space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              {col.title}
            </h4>
            <ul className="space-y-2 text-xs">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className="text-slate-600 hover:text-indigo-600 font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Quick Tag Promo */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Member Benefits</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Enjoy 30-day hassle-free returns, free express shipping over $75, and 20% off with promo code <strong className="text-slate-900">STYLE20</strong>.
          </p>
          <Link
            to="/products"
            onClick={onClose}
            className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600 hover:underline"
          >
            Explore All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
