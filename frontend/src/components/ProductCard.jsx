import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Eye, Star } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || '');
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600';
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

  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image & Badges */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Pill */}
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase rounded-full shadow-sm ${
            categoryColorMap[product.category] || 'bg-slate-100 text-slate-800'
          }`}
        >
          {product.category}
        </span>

        {/* Stock Status Badge */}
        {product.stockQuantity === 0 ? (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full">
            Out of Stock
          </span>
        ) : (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-sm rounded-full">
            In Stock
          </span>
        )}

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

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>{product.brand}</span>
            <span className="capitalize">{product.color}</span>
          </div>

          <Link
            to={`/product/${product._id}`}
            className="font-bold text-slate-900 text-sm hover:text-indigo-600 line-clamp-1 transition-colors"
          >
            {product.name}
          </Link>
        </div>

        {/* Size Selection Pill Bar */}
        <div className="mt-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Select Size</div>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes?.map((s) => (
              <button
                key={s.size}
                type="button"
                onClick={() => setSelectedSize(s.size)}
                disabled={s.stock === 0}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded-md border transition-all ${
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

        {/* Footer Price & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block -mb-0.5">Price</span>
            <span className="text-base font-extrabold text-slate-900">${product.price?.toFixed(2)}</span>
          </div>

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
  );
};
