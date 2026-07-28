import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SizeGuideModal } from './SizeGuideModal';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Ruler } from 'lucide-react';

export const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || product.color || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const isLiked = isInWishlist(product._id);
  const images = product.images || [];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-8 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-900 hover:text-white transition-colors"
          title="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Gallery */}
        <div className="w-full md:w-1/2 bg-stone-100 p-6 flex flex-col justify-between">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-white mb-4">
            <img
              src={selectedImage || images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img ? 'border-indigo-600 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Clothing Options */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-indigo-700">
                {product.brand || 'StyleVerse Clothing'}
              </span>
              <h2 className="text-2xl font-black text-stone-900 mt-1 leading-snug">{product.name}</h2>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                </div>
                <span className="text-sm font-extrabold text-stone-800">{product.rating || 4.9}</span>
                <span className="text-xs text-stone-400">({product.numReviews || 35} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-stone-900">
                Rs. {(product.price || 0).toLocaleString('en-US')}.00
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through font-medium">
                  Rs. {product.originalPrice.toLocaleString('en-US')}.00
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-normal">{product.description}</p>

            {/* Size Selector (Adults: M, L, XL, XXL) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black uppercase tracking-wider text-stone-800">
                  Select Size: <span className="text-indigo-600 font-bold">{selectedSize}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" /> Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    disabled={s.stock === 0}
                    className={`px-4 py-2 text-xs font-black rounded-xl border transition-all ${
                      selectedSize === s.size
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
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

            {/* Fabric & Fit Details */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
              <div>
                <span className="text-stone-400 font-medium block">Fabric</span>
                <span className="font-bold text-stone-800">{product.fabric || '100% Cotton'}</span>
              </div>
              <div>
                <span className="text-stone-400 font-medium block">Fit Type</span>
                <span className="font-bold text-stone-800">{product.fit || 'Regular Fit'}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-stone-700">Quantity:</span>
              <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-stone-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-stone-600 font-bold hover:bg-stone-200 transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-stone-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-stone-600 font-bold hover:bg-stone-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-stone-100 mt-6">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-stone-900 hover:bg-indigo-600 text-white rounded-2xl text-xs font-extrabold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 uppercase tracking-wider"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Cart</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isLiked ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <Link
              to={`/product/${product._id}`}
              onClick={onClose}
              className="block text-center text-xs font-bold text-indigo-600 hover:underline pt-1"
            >
              View Full Product Page &amp; Detailed Specs &rarr;
            </Link>
          </div>

        </div>
      </div>

      {showSizeGuide && (
        <SizeGuideModal
          isOpen={showSizeGuide}
          onClose={() => setShowSizeGuide(false)}
          category={product.category}
        />
      )}
    </div>
  );
};
