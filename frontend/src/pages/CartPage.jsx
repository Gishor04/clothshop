import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, ArrowRight, Minus, Plus, ArrowLeft } from 'lucide-react';

export const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartSubtotal } = useCart();
  const navigate = useNavigate();

  const shippingCost = cartSubtotal > 75 || cartItems.length === 0 ? 0 : 9.99;
  const tax = cartSubtotal * 0.08;
  const grandTotal = cartSubtotal + shippingCost + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Your Shopping Cart is Empty</h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Looks like you haven't added any clothing items yet. Explore our latest Men's, Women's, and Kids' collections!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Shopping Cart</h1>
          <p className="text-xs text-slate-500 mt-1">Review your selected items before checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, idx) => {
            const product = item.product || {};
            const img = product.images?.[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300';
            const price = product.price || 0;

            return (
              <div
                key={`${item.productId}-${item.size}-${idx}`}
                className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-4 sm:gap-6 items-center"
              >
                <img
                  src={img}
                  alt={product.name}
                  className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-2xl bg-slate-100 flex-shrink-0"
                />

                <div className="flex-1 space-y-1.5 min-w-0">
                  <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                    {product.brand || 'StyleVerse'}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 truncate">{product.name || 'Clothing Item'}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>Size: <strong className="text-slate-900">{item.size}</strong></span>
                    {product.color && <span>Color: <strong className="text-slate-900 capitalize">{product.color}</strong></span>}
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 pt-1">
                    ${price.toFixed(2)}
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      className="p-1 hover:bg-white rounded-lg text-slate-600"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      className="p-1 hover:bg-white rounded-lg text-slate-600"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:underline pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated Shipping</span>
              <span className="font-bold text-slate-900">
                {shippingCost === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Sales Tax (8%)</span>
              <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-black text-slate-900">
              <span>Total</span>
              <span className="text-indigo-600">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
