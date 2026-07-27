import React from 'react';
import { X, Layers, Star, ShoppingBag, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CompareModal = ({ compareList, isOpen, onClose }) => {
  const { addToCart } = useCart();
  if (!isOpen || !compareList || compareList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 sm:p-8 space-y-6 z-10 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Compare Products</h2>
              <p className="text-xs text-slate-500">Side-by-side comparison of selected apparel items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 overflow-x-auto">
          {compareList.map((product) => (
            <div
              key={product._id}
              className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-xs">
                  <img
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400'}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-full inline-block mb-1">
                    {product.brand}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{product.name}</h3>
                  <p className="text-lg font-black text-slate-900 mt-1">${product.price?.toFixed(2)}</p>
                </div>

                {/* Specs List */}
                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">Category:</span>
                    <span className="font-bold capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">SubCategory:</span>
                    <span className="font-bold capitalize">{product.subCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">Color:</span>
                    <span className="font-bold capitalize">{product.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">Rating:</span>
                    <span className="font-bold text-amber-500 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {product.rating || 4.8} ({product.numReviews || 24})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">Stock:</span>
                    <span className="font-bold text-emerald-600">
                      {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">Sizes:</span>
                    <span className="font-bold text-slate-800">
                      {product.sizes?.map((s) => s.size).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  const firstAvailableSize = product.sizes?.find((s) => s.stock > 0)?.size;
                  if (firstAvailableSize) {
                    addToCart(product, firstAvailableSize, 1);
                  }
                }}
                disabled={product.stockQuantity === 0}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
