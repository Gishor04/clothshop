import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Phone,
  CheckCircle,
  ArrowLeft,
  Lock,
  Building,
  UserCheck
} from 'lucide-react';

export const CheckoutPage = () => {
  const { cartItems, cartSubtotal, discountAmount, estimatedShipping, cartTotal, clearCart, appliedCoupon } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Guest or Auth state
  const [isGuest, setIsGuest] = useState(!user);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || 'Colombo 03',
    district: user?.address?.state || 'Colombo',
    zipCode: user?.address?.zipCode || '00300',
    notes: '',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const finalShippingFee =
    shippingMethod === 'express'
      ? 600
      : estimatedShipping;

  const finalOrderTotal = cartSubtotal - discountAmount + finalShippingFee;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.street) {
      alert('Please fill out all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    const newOrder = {
      orderId: `KTB-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cartItems,
      shippingAddress: formData,
      paymentMethod,
      shippingMethod,
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee: finalShippingFee,
      totalAmount: finalOrderTotal,
      createdAt: new Date().toISOString(),
    };

    // Try backend order endpoint
    const token = localStorage.getItem('cloth_shop_token');
    if (token) {
      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newOrder),
        });
      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderConfirmed(newOrder);
      clearCart();
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
        <SEO title="Order Confirmed" robots="noindex, nofollow" />

        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="px-3.5 py-1 bg-indigo-100 text-indigo-900 rounded-full text-xs font-black uppercase tracking-wider">
            Order ID: {orderConfirmed.orderId}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900">Thank You for Your Order!</h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Your Kaithady clothing order has been received. Our dispatch team will contact you shortly via SMS / phone to verify delivery.
          </p>
        </div>

        {/* Order Details Summary Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm text-left max-w-lg mx-auto space-y-4 text-xs">
          <h3 className="font-black text-stone-900 border-b pb-2">Delivery Summary</h3>
          
          <div className="space-y-1 text-stone-600 font-semibold">
            <p><span className="text-stone-400">Recipient:</span> {orderConfirmed.shippingAddress.name} ({orderConfirmed.shippingAddress.phone})</p>
            <p><span className="text-stone-400">Address:</span> {orderConfirmed.shippingAddress.street}, {orderConfirmed.shippingAddress.city}, {orderConfirmed.shippingAddress.district}</p>
            <p><span className="text-stone-400">Payment:</span> <span className="uppercase text-indigo-900 font-black">{orderConfirmed.paymentMethod}</span></p>
          </div>

          <div className="border-t pt-3 flex justify-between font-black text-stone-900 text-sm">
            <span>Total Payable</span>
            <span className="text-indigo-900">Rs. {orderConfirmed.totalAmount.toLocaleString('en-US')}.00</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            to="/products"
            className="px-8 py-3.5 bg-indigo-600 text-white font-bold text-xs rounded-2xl shadow-md hover:bg-indigo-500 transition-all uppercase"
          >
            Continue Shopping Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <SEO
        title="Secure Checkout"
        description="Complete your clothing order with Cash on Delivery or Card payment."
        robots="noindex, nofollow"
      />

      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div className="flex items-center gap-3">
          <Link to="/cart" className="p-2 rounded-full hover:bg-stone-100 text-stone-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-black text-stone-900">Checkout &amp; Order Delivery</h1>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
          <Lock className="w-4 h-4" /> 256-Bit SSL Encrypted
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-stone-500 text-xs font-bold">Your cart is empty. Please add items before checking out.</p>
          <Link to="/products" className="mt-4 inline-block px-6 py-3 bg-amber-900 text-white font-bold text-xs rounded-2xl">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left Columns: Customer Information & Delivery Address */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Guest / Account Toggle Banner */}
            {!user && (
              <div className="bg-amber-50 rounded-3xl border border-amber-200 p-4 flex items-center justify-between text-xs font-bold text-amber-900">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-amber-800" />
                  <span>Checking out as Guest. Already have an account?</span>
                </div>
                <Link to="/auth" className="px-3 py-1.5 bg-amber-900 text-white rounded-xl text-xs hover:bg-amber-800">
                  Sign In
                </Link>
              </div>
            )}

            {/* Shipping Address Form */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-stone-900 border-b pb-3 flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-800" /> 1. Delivery &amp; Contact Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div className="sm:col-span-2">
                  <label className="block text-stone-700 mb-1 font-bold">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Anushka Perera"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-bold">Mobile Phone Number (For COD &amp; Delivery) *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 077 123 4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-bold">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. anushka@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 mb-1 font-bold">Street Address / House No. *</label>
                  <input
                    type="text"
                    name="street"
                    required
                    placeholder="e.g. 123 Galle Road, Flat 4B"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-bold">City / Area *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Colombo 03"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-bold">District *</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl focus:outline-none focus:border-amber-800"
                  >
                    <option value="Colombo">Colombo</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Galle">Galle</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kalutara">Kalutara</option>
                    <option value="Kurunegala">Kurunegala</option>
                    <option value="Other">Other District</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Shipping Method Options */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-stone-900 border-b pb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-800" /> 2. Shipping Option
              </h2>

              <div className="space-y-3 text-xs font-semibold">
                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  shippingMethod === 'standard' ? 'border-amber-800 bg-amber-50/50 shadow-sm' : 'border-stone-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="w-4 h-4 text-amber-800 focus:ring-amber-800"
                    />
                    <div>
                      <span className="font-extrabold text-stone-900 block">Standard Island-wide Delivery (1-3 Days)</span>
                      <span className="text-[11px] text-stone-500">Delivered directly to your door across Sri Lanka</span>
                    </div>
                  </div>
                  <span className="font-black text-stone-900">
                    {estimatedShipping === 0 ? 'FREE' : `Rs. ${estimatedShipping}.00`}
                  </span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  shippingMethod === 'express' ? 'border-amber-800 bg-amber-50/50 shadow-sm' : 'border-stone-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="w-4 h-4 text-amber-800 focus:ring-amber-800"
                    />
                    <div>
                      <span className="font-extrabold text-stone-900 block">Colombo Next-Day Express Delivery</span>
                      <span className="text-[11px] text-stone-500">Guaranteed next-day dispatch for Colombo 01-15</span>
                    </div>
                  </div>
                  <span className="font-black text-stone-900">Rs. 600.00</span>
                </label>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-stone-900 border-b pb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-800" /> 3. Payment Method
              </h2>

              <div className="space-y-3 text-xs font-semibold">
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-amber-800 bg-amber-50/50 shadow-sm' : 'border-stone-200'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="w-4 h-4 text-amber-800 focus:ring-amber-800 mt-1"
                  />
                  <div>
                    <span className="font-extrabold text-stone-900 block flex items-center gap-2">
                      Cash on Delivery (COD) <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px]">Most Popular</span>
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      Pay cash when the courier hands over your Kottuba leather package. No advance payment required.
                    </span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-amber-800 bg-amber-50/50 shadow-sm' : 'border-stone-200'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-4 h-4 text-amber-800 focus:ring-amber-800 mt-1"
                  />
                  <div>
                    <span className="font-extrabold text-stone-900 block">Credit / Debit Card (Visa, Mastercard)</span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      Secure payment gateway redirection upon placing order.
                    </span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'koko' ? 'border-amber-800 bg-amber-50/50 shadow-sm' : 'border-stone-200'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="koko"
                    checked={paymentMethod === 'koko'}
                    onChange={() => setPaymentMethod('koko')}
                    className="w-4 h-4 text-amber-800 focus:ring-amber-800 mt-1"
                  />
                  <div>
                    <span className="font-extrabold text-amber-900 block">Koko Pay / Mintpay 3 Interest-Free Installments</span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      Split total into 3 easy monthly installments with 0% interest.
                    </span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Final Payment Summary */}
          <div className="space-y-6">
            <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 border border-stone-800">
              <h3 className="font-black text-lg border-b border-stone-800 pb-3 text-amber-200">
                Order Summary ({cartItems.length} Bags)
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <span className="font-bold truncate max-w-[140px] text-stone-200">{item.product?.name}</span>
                    </div>
                    <span className="font-bold text-amber-300">
                      Rs. {((item.product?.price || 0) * item.quantity).toLocaleString('en-US')}.00
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-800 pt-3 space-y-2 text-xs text-stone-300 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {cartSubtotal.toLocaleString('en-US')}.00</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Coupon Discount</span>
                    <span>- Rs. {discountAmount.toLocaleString('en-US')}.00</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{finalShippingFee === 0 ? 'FREE' : `Rs. ${finalShippingFee}.00`}</span>
                </div>

                <div className="flex justify-between text-lg font-black text-white pt-3 border-t border-stone-800">
                  <span>Total Amount</span>
                  <span className="text-amber-400">Rs. {finalOrderTotal.toLocaleString('en-US')}.00</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-2xl shadow-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Kottuba Order...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirm Order (Rs. {finalOrderTotal.toLocaleString('en-US')})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 font-semibold pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Satisfaction &amp; Genuine Leather Guarantee</span>
              </div>
            </div>
          </div>

        </form>
      )}

    </div>
  );
};
