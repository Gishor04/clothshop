import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { QuickViewModal } from './QuickViewModal';
import { ShoppingBag, Eye, Star, Heart, Sparkles, ArrowRightLeft } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || 'M');
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const isLiked = isInWishlist(product._id);
  const isCompared = isInCompare(product._id);

  const primaryImage = product.images?.[0] || FALLBACK_IMAGE;
  const secondaryImage = product.images?.[1] || primaryImage;

  const currentImage = imgError
    ? FALLBACK_IMAGE
    : isHovered
    ? secondaryImage
    : primaryImage;

  const formattedPrice = `Rs. ${(product.price || 0).toLocaleString('en-US')}.00`;
  const formattedOriginalPrice = product.originalPrice
    ? `Rs. ${product.originalPrice.toLocaleString('en-US')}.00`
    : null;

  const categoryColorMap = {
    men: 'bg-indigo-900 text-white',
    women: 'bg-rose-900 text-white',
    boys: 'bg-amber-900 text-white',
    girls: 'bg-purple-900 text-white',
  };

  const categoryLabelMap = {
    men: "Men's (Adult)",
    women: "Women's (Adult)",
    boys: "Boys (Child)",
    girls: "Girls (Child)",
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product, selectedSize, 1);
  };

  return (
    <>
      <div
        className="group relative bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden h-full font-['Plus_Jakarta_Sans',sans-serif]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
          <Link to={`/product/${product._id}`} className="block w-full h-full">
            <img
              src={currentImage}
              alt={product.name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
          </Link>

          {/* Category Pill */}
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-black tracking-wider uppercase rounded-full shadow-md z-10 ${
              categoryColorMap[product.category] || 'bg-stone-900 text-white'
            }`}
          >
            {categoryLabelMap[product.category] || product.category}
          </span>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
              }}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                isLiked
                  ? 'bg-rose-600 text-white scale-110'
                  : 'bg-white/80 text-stone-700 hover:bg-rose-600 hover:text-white'
              }`}
              title={isLiked ? 'Remove from Wishlist' : 'Save to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                toggleCompare(product);
              }}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                isCompared
                  ? 'bg-indigo-700 text-white scale-110'
                  : 'bg-white/80 text-stone-700 hover:bg-indigo-700 hover:text-white'
              }`}
              title="Compare Apparel"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Quick View Button on Hover */}
          <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
            <button
              type="button"
              onClick={() => setShowQuickView(true)}
              className="px-4 py-2.5 bg-white/95 text-stone-900 font-extrabold text-xs rounded-2xl shadow-xl hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <Eye className="w-4 h-4" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 font-semibold mb-1">
              <span className="uppercase tracking-widest text-[10px] text-indigo-700 font-extrabold">
                {product.brand || 'StyleVerse'}
              </span>
              <span className="text-[11px] text-stone-400 capitalize">{product.fabric?.split(' ')[0]}</span>
            </div>

            <Link
              to={`/product/${product._id}`}
              className="font-extrabold text-stone-900 text-sm hover:text-indigo-600 line-clamp-2 transition-colors block h-10"
              title={product.name}
            >
              {product.name}
            </Link>

            {/* Rating Stars */}
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
              </div>
              <span className="text-xs font-bold text-stone-800">{product.rating || 4.8}</span>
              <span className="text-xs text-stone-400">({product.numReviews || 24})</span>
            </div>
          </div>

          {/* Available Sizes Pills */}
          <div>
            <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-1.5 flex justify-between">
              <span>Select Size:</span>
              <span className="text-indigo-700 font-bold">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.sizes?.map((s) => (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => setSelectedSize(s.size)}
                  disabled={s.stock === 0}
                  className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg border transition-all ${
                    selectedSize === s.size
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                      : s.stock === 0
                      ? 'border-stone-200 text-stone-300 line-through cursor-not-allowed bg-stone-50'
                      : 'border-stone-200 text-stone-700 hover:border-indigo-500 bg-white'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Add to Cart Footer */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black text-stone-900 tracking-tight">
                  {formattedPrice}
                </span>
                {formattedOriginalPrice && (
                  <span className="text-xs text-stone-400 line-through font-medium">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-emerald-700 font-bold block">In Stock</span>
            </div>

            <button
              onClick={handleQuickAdd}
              disabled={product.stockQuantity === 0}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-stone-900 hover:bg-indigo-600 text-white text-xs font-bold disabled:bg-stone-300 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
};
