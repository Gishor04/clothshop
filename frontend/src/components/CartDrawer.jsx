import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Bookmark,
  Tag,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    cartItems,
    savedForLater,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    saveForLaterItem,
    moveToCartFromSaved,
    cartSubtotal,
  } = useCart();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cart'); // 'cart' | 'saved'
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isCartDrawerOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 75;
  const progressPercent = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    if (promoCode.trim().toUpperCase() === 'STYLE20') {
      setDiscountPercent(20);
      setPromoSuccess('20% discount applied!');
    } else {
      setPromoError('Invalid coupon code. Try STYLE20');
    }
  };

  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  const handleCheckoutClick = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCartDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-extrabold text-base tracking-tight">Your Shopping Cart</h2>
                <p className="text-[11px] text-slate-300">
                  {cartItems.reduce((a, b) => a + b.quantity, 0)} items selected
                </p>
              </div>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-indigo-50/80 px-6 py-3 border-b border-indigo-100/60">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
              <span className="flex items-center gap-1.5 text-indigo-700">
                <Truck className="w-4 h-4" />
                {amountRemaining === 0 ? (
                  <strong className="text-emerald-700">🎉 You unlocked FREE Shipping!</strong>
                ) : (
                  <span>
                    Add <strong className="text-indigo-900">${amountRemaining.toFixed(2)}</strong> more for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-[10px] text-slate-500 font-extrabold">{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Tabs: Cart / Saved for later */}
          <div className="flex border-b border-slate-100 text-xs font-bold bg-slate-50">
            <button
              onClick={() => setActiveTab('cart')}
              className={`flex-1 py-3 text-center border-b-2 transition-all ${
                activeTab === 'cart'
                  ? 'border-indigo-600 text-indigo-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Cart Items ({cartItems.length})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-3 text-center border-b-2 transition-all ${
                activeTab === 'saved'
                  ? 'border-indigo-600 text-indigo-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Saved for Later ({savedForLater.length})
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeTab === 'cart' ? (
              cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Your Cart is Empty</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Looks like you haven't added any clothing items yet. Check out our latest arrivals!
                  </p>
                  <button
                    onClick={() => {
                      closeCartDrawer();
                      navigate('/products');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-all"
                  >
                    Explore Clothing Catalog
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 relative group"
                  >
                    <img
                      src={
                        item.product?.images?.[0] ||
                        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200'
                      }
                      alt={item.product?.name}
                      className="w-20 h-24 object-cover rounded-xl bg-white flex-shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-xs text-slate-900 truncate">
                            {item.product?.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.productId, item.size)}
                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Size: <strong className="text-slate-800">{item.size}</strong> &bull; Color:{' '}
                          <strong className="text-slate-800 capitalize">{item.product?.color}</strong>
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => saveForLaterItem(item)}
                            className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-0.5"
                          >
                            <Bookmark className="w-3 h-3" /> Save
                          </button>
                          <span className="text-sm font-extrabold text-slate-900">
                            ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
            ) : savedForLater.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                No items saved for later.
              </div>
            ) : (
              savedForLater.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product?.images?.[0]}
                      alt=""
                      className="w-12 h-14 object-cover rounded-lg bg-white"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{item.product?.name}</h4>
                      <p className="text-[10px] text-slate-500">Size: {item.size}</p>
                      <span className="text-xs font-extrabold text-indigo-600">
                        ${item.product?.price?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => moveToCartFromSaved(item)}
                    className="px-3 py-1.5 bg-indigo-600 text-white text-[11px] font-bold rounded-lg hover:bg-indigo-500"
                  >
                    Move to Cart
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && activeTab === 'cart' && (
            <div className="p-6 border-t border-slate-100 bg-white space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. STYLE20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold uppercase"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && (
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {promoSuccess}
                  </p>
                )}
                {promoError && <p className="text-[11px] text-rose-500 font-bold">{promoError}</p>}
              </form>

              {/* Totals Breakdown */}
              <div className="space-y-1.5 text-xs border-t border-b border-slate-100 py-3 text-slate-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount (20%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {amountRemaining === 0 ? (
                      <strong className="text-emerald-600">FREE</strong>
                    ) : (
                      '$5.99'
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    ${(finalTotal + (amountRemaining === 0 ? 0 : 5.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
