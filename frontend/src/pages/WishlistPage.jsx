import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { SeoMeta } from '../components/SeoMeta';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <SeoMeta
        title="Your Saved Wishlist — Kottuba Leather Sri Lanka"
        description="View your saved Kottuba handcrafted leather bags and accessories."
      />

      <div className="border-b border-stone-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-2">
            <Heart className="w-7 h-7 text-rose-600 fill-rose-600" /> Saved Bags Wishlist
          </h1>
          <p className="text-xs text-stone-500 mt-1">Keep track of your favorite Kottuba carry-wear styles.</p>
        </div>

        <span className="px-3.5 py-1 bg-stone-100 text-stone-800 rounded-full text-xs font-bold">
          {wishlist.length} Items Saved
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4 shadow-sm max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-stone-900">Your Wishlist is Empty</h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Click the heart icon on any bag card to save items for future viewing or purchasing.
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3.5 bg-amber-900 text-white font-bold text-xs rounded-2xl shadow-lg hover:bg-amber-800 transition-all uppercase tracking-wider"
          >
            Explore Leather Bags &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
