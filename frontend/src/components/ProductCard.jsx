import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, Eye, Star, Heart, Check, Sparkles } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600';

export const ProductCard = ({ product, onToggleCompare, isCompared }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || '');
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isLiked = isInWishlist(product._id);

  const primaryImage = product.images?.[0] || FALLBACK_IMAGE;
  const secondaryImage = product.images?.[1] || primaryImage;

  const categoryColorMap = {
    men: 'bg-blue-100 text-blue-800',
    women: 'bg-pink-100 text-pink-800',
    boys: 'bg-amber-100 text-amber-800',
    girls: 'bg-purple-100 text-purple-800',
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!selectedSize) return;
    addToCart(product, selectedSize, 1);
  };

  const currentImage = imgError
    ? FALLBACK_IMAGE
    : isHovered
    ? secondaryImage
    : primaryImage;

  // Determine dynamic Patagonia badge
  const isBestseller = product.rating >= 4.8 || (product.numReviews || 0) >= 35;
  const isLimited = product.stockQuantity > 0 && product.stockQuantity <= 5;
  const isNew = product.isNewArrival || product.category === 'men';

  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image & Badges Container */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
        <img
          src={currentImage}
          alt={product.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Pill */}
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase rounded-full shadow-sm z-10 ${
            categoryColorMap[product.category] || 'bg-slate-100 text-slate-800'
          }`}
        >
          {product.category}
        </span>

        {/* Wishlist Heart Icon Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md z-20 ${
            isLiked
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/80 text-slate-700 hover:bg-rose-500 hover:text-white'
          }`}
          title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
        </button>

        {/* Dynamic Patagonia Feature Badges */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-1 z-10">
          {isBestseller && (
            <span className="px-2 py-0.5 text-[9px] font-black bg-amber-400 text-slate-900 rounded-md shadow-sm uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Bestseller
            </span>
          )}
          {isLimited && (
            <span className="px-2 py-0.5 text-[9px] font-black bg-rose-600 text-white rounded-md shadow-sm uppercase tracking-wider animate-pulse">
              Only {product.stockQuantity} left
            </span>
          )}
        </div>

        {/* Quick View Button Overlay */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <Link
            to={`/product/${product._id}`}
            className="p-3 bg-white text-slate-900 rounded-full shadow-lg hover:bg-slate-900 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0"
            title="View Product Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Card Body & Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>{product.brand || 'StyleVerse'}</span>
            
            {/* Color Swatch Preview Dot */}
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full border border-slate-300 shadow-xs inline-block bg-indigo-600" />
              <span className="capitalize text-[11px] text-slate-500">{product.color}</span>
            </div>
          </div>

          <Link
            to={`/product/${product._id}`}
            className="font-bold text-slate-900 text-sm hover:text-indigo-600 line-clamp-2 transition-colors block h-10"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Star Rating Trust Signal */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">{product.rating || 4.8}</span>
            <span className="text-[10px] text-slate-400">({product.numReviews || 24})</span>
          </div>
        </div>

        {/* Size Preview Pills */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Size</div>
          <div className="flex flex-wrap gap-1">
            {product.sizes?.slice(0, 5).map((s) => (
              <button
                key={s.size}
                type="button"
                onClick={() => setSelectedSize(s.size)}
                disabled={s.stock === 0}
                className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border transition-all ${
                  selectedSize === s.size
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                    : s.stock === 0
                    ? 'border-slate-200 text-slate-300 line-through cursor-not-allowed bg-slate-50'
                    : 'border-slate-200 text-slate-700 hover:border-indigo-400 bg-white'
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Price & Add to Cart & Compare Toggle */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Price</span>
            <span className="text-base font-black text-slate-900">
              ${(product.price ?? 0).toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onToggleCompare && (
              <button
                type="button"
                onClick={() => onToggleCompare(product)}
                className={`text-[10px] font-bold px-2 py-1.5 rounded-lg border transition-all ${
                  isCompared
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                    : 'border-slate-200 text-slate-500 hover:border-slate-400'
                }`}
              >
                {isCompared ? '✓ Compared' : '+ Compare'}
              </button>
            )}

            <button
              onClick={handleQuickAdd}
              disabled={product.stockQuantity === 0}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
