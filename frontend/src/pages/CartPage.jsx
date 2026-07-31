import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SEO } from '../components/SEO';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Heart,
  Truck,
  RotateCcw,
  Phone
} from 'lucide-react';

export const CartPage = () => {
  const {
    cartItems,
    savedForLater,
    updateQuantity,
    removeFromCart,
    saveForLaterItem,
    moveToCartFromSaved,
    cartSubtotal,
    deliveryFee,
    discountAmount,
    couponCode,
    applyCoupon,
    removeCoupon,
    cartTotal,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [district, setDistrict] = useState('Colombo');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <SEO
        title="Your Shopping Cart & Order Summary"
        description="Review your selected clothing items, apply promo codes, and proceed to checkout."
        robots="noindex, follow"
      />

      {/* Page Header */}
      <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Shopping Bag &amp; Order Summary</h1>
          <p className="text-xs text-stone-500 mt-1">Review your selected items before proceeding to secure checkout.</p>
        </div>

        <Link
          to="/products"
          className="text-xs font-black text-amber-800 hover:text-amber-950 flex items-center gap-1.5"
        >
          &larr; Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4 shadow-sm max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-black text-stone-900">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Discover Kottuba's handcrafted leather bags designed in Colombo and delivered across Sri Lanka.
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3.5 bg-amber-900 text-white font-bold text-xs rounded-2xl shadow-lg hover:bg-amber-800 transition-all uppercase tracking-wider"
          >
            Explore Leather Bags Catalog &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left Column: Cart Items List & Saved Items */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-6">
              <h2 className="text-base font-black text-stone-900 border-b border-stone-100 pb-3 flex items-center justify-between">
                <span>Items in Your Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
                <span className="text-xs text-emerald-700 font-bold">Free Shipping &gt; Rs 10,000</span>
              </h2>

              <div className="space-y-4 divide-y divide-stone-100">
                {cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'}
                        alt={item.product?.name}
                        className="w-20 h-24 object-cover rounded-2xl bg-stone-100 border border-stone-200 flex-shrink-0"
                      />

                      <div className="space-y-1">
                        <Link
                          to={`/product/${item.productId}`}
                          className="font-extrabold text-sm text-stone-900 hover:text-amber-800 transition-colors line-clamp-1"
                        >
                          {item.product?.name}
                        </Link>
                        <span className="text-[11px] text-stone-400 block capitalize">
                          Color: {item.product?.color || 'Classic'} • Material: {item.product?.material?.split(' ')[0] || 'Leather'}
                        </span>
                        <span className="font-black text-amber-900 text-sm block">
                          Rs. {(item.product?.price || 0).toLocaleString('en-US')}.00
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-stone-300 rounded-2xl overflow-hidden bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          className="px-3 py-1 text-stone-600 font-bold hover:bg-stone-200 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-extrabold text-stone-900 text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="px-3 py-1 text-stone-600 font-bold hover:bg-stone-200 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => saveForLaterItem(item)}
                          className="p-2 text-stone-400 hover:text-amber-800 transition-colors text-xs font-semibold flex items-center gap-1"
                          title="Save for later"
                        >
                          <Heart className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => removeFromCart(item.productId, item.size)}
                          className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved For Later Section */}
            {savedForLater.length > 0 && (
              <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6 space-y-4">
                <h3 className="text-sm font-black text-stone-900">Saved For Later ({savedForLater.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedForLater.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center gap-3"
                    >
                      <img
                        src={item.product?.images?.[0]}
                        alt={item.product?.name}
                        className="w-14 h-16 object-cover rounded-xl bg-stone-100"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-xs text-stone-900 truncate">{item.product?.name}</h4>
                        <span className="text-xs font-black text-amber-800 block">
                          Rs. {(item.product?.price || 0).toLocaleString('en-US')}.00
                        </span>
                        <button
                          onClick={() => moveToCartFromSaved(item)}
                          className="mt-1 text-[10px] font-bold text-amber-900 hover:underline"
                        >
                          Move Back to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Coupon Code & Order Summary */}
          <div className="space-y-6">
            
            {/* Coupon Box */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-stone-900 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-amber-800" /> Apply Coupon Code
              </h3>

              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. AVURUDU25"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs uppercase font-extrabold focus:outline-none focus:border-amber-800"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-stone-900 text-white font-bold text-xs rounded-xl hover:bg-amber-900 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs font-bold text-amber-900">
                  <span>✓ {appliedCoupon.label}</span>
                  <button onClick={removeCoupon} className="text-rose-600 hover:underline text-xs">
                    Remove
                  </button>
                </div>
              )}
              <p className="text-[10px] text-stone-400">Try <span className="font-bold text-stone-600">AVURUDU25</span> for 25% OFF or <span className="font-bold text-stone-600">KOTTUBA10</span> for 10% OFF</p>
            </div>

            {/* Shipping Estimator */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-stone-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-800" /> Sri Lanka Shipping District
              </h3>

              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-800 focus:outline-none"
              >
                <option value="Colombo">Colombo District (1-2 Days)</option>
                <option value="Kandy">Kandy District (2-3 Days)</option>
                <option value="Galle">Galle District (2-3 Days)</option>
                <option value="Gampaha">Gampaha District (1-2 Days)</option>
                <option value="Jaffna">Jaffna District (2-3 Days)</option>
                <option value="Other">Other Island-wide Locations (2-4 Days)</option>
              </select>
            </div>

            {/* Order Summary Financial Box */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
              <h3 className="font-black text-base text-stone-900 border-b pb-3">Order Summary</h3>

              <div className="space-y-2 text-xs font-semibold text-stone-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-stone-900">Rs. {cartSubtotal.toLocaleString('en-US')}.00</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Avurudu Discount</span>
                    <span>- Rs. {discountAmount.toLocaleString('en-US')}.00</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Island-wide Courier ({district})</span>
                  <span className="text-stone-900">
                    {estimatedShipping === 0 ? 'FREE' : `Rs. ${estimatedShipping}.00`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-stone-900 pt-3 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="text-amber-900">Rs. {cartTotal.toLocaleString('en-US')}.00</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  to="/checkout"
                  className="w-full py-4 bg-amber-900 hover:bg-amber-800 text-white font-black text-xs rounded-2xl shadow-xl shadow-amber-950/20 flex items-center justify-center gap-2 transition-all active:scale-95 uppercase tracking-wider"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/94770000000?text=Hi%20Kottuba%2C%20I%27d%20like%20to%20place%20an%20order%20for%20items%20totaling%20Rs.%20${cartTotal}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-2xl shadow-md flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Fast WhatsApp Order
                </a>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 font-semibold pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted &amp; Cash on Delivery Protected</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
