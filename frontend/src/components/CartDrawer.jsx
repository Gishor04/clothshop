import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Heart } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    saveForLaterItem,
    cartSubtotal,
    discountAmount,
    estimatedShipping,
    cartTotal,
    couponCode,
    setCouponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={closeCartDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-800" />
              <h2 className="text-lg font-black text-stone-900">Your Shopping Cart</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={closeCartDrawer}
              className="p-2 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-200 transition-colors"
              title="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-stone-900">Your Cart is Empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our handcrafted Sri Lankan leather bag collection and find your perfect companion.
                </p>
                <Link
                  to="/products"
                  onClick={closeCartDrawer}
                  className="inline-block px-6 py-3 bg-amber-900 text-white font-bold text-xs rounded-2xl shadow-md hover:bg-amber-800 transition-all"
                >
                  Browse Bag Catalog &rarr;
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4 p-4 rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-white transition-colors"
                >
                  <img
                    src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'}
                    alt={item.product?.name}
                    className="w-20 h-24 object-cover rounded-xl bg-stone-100 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-extrabold text-stone-900 text-xs line-clamp-1">
                          {item.product?.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId, item.size)}
                          className="text-stone-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[10px] text-stone-500 block capitalize mt-0.5">
                        Color: {item.product?.color || 'Classic'}
                      </span>

                      <span className="font-bold text-amber-900 block mt-1">
                        Rs. {(item.product?.price || 0).toLocaleString('en-US')}.00
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          className="px-2 py-0.5 font-bold text-stone-600 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 font-bold text-stone-900 text-[11px]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="px-2 py-0.5 font-bold text-stone-600 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => saveForLaterItem(item)}
                        className="text-[10px] font-semibold text-stone-500 hover:text-amber-800 flex items-center gap-0.5"
                      >
                        <Heart className="w-3 h-3" /> Save for later
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Order Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-3">
              {/* Coupon Form */}
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon Code (AVURUDU25)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-xl bg-white text-xs uppercase focus:outline-none focus:border-amber-800"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white font-bold text-xs rounded-xl hover:bg-amber-900 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-700" /> {appliedCoupon.label}
                  </span>
                  <button onClick={removeCoupon} className="text-rose-600 hover:underline text-[10px]">
                    Remove
                  </button>
                </div>
              )}

              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 font-semibold pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-900">Rs. {cartSubtotal.toLocaleString('en-US')}.00</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>- Rs. {discountAmount.toLocaleString('en-US')}.00</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Island-wide Shipping</span>
                  <span className="text-stone-900">
                    {estimatedShipping === 0 ? 'FREE' : `Rs. ${estimatedShipping}.00`}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="text-amber-900">Rs. {cartTotal.toLocaleString('en-US')}.00</span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  to="/checkout"
                  onClick={closeCartDrawer}
                  className="w-full py-3.5 bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold rounded-2xl shadow-lg shadow-amber-950/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/cart"
                  onClick={closeCartDrawer}
                  className="block text-center text-xs font-bold text-stone-600 hover:text-stone-900 py-1"
                >
                  View Full Shopping Cart Page
                </Link>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 font-semibold pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bank-Grade 256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
