import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth, authFetch } from '../context/AuthContext';
import {
  CreditCard, DollarSign, Lock, AlertCircle, CheckCircle2,
  Smartphone, ChevronRight, ShieldCheck, Truck
} from 'lucide-react';

/* ─── helpers ─────────────────────────────────────── */
const formatCardNumber = (v) =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

const formatExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

const maskCard = (v) => {
  const digits = v.replace(/\s/g, '');
  return digits.length >= 4
    ? '**** **** **** ' + digits.slice(-4)
    : '**** **** **** ****';
};

/* ─── Mini card preview ───────────────────────────── */
const CardPreview = ({ cardNumber, cardHolder, expiry, cvvFocus }) => (
  <div
    className="relative w-full max-w-sm mx-auto h-48 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-xl"
    style={{
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)',
    }}
  >
    {/* decorative circles */}
    <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
    <div className="absolute -bottom-10 -left-6 w-52 h-52 rounded-full bg-white/5" />

    {/* chip + network logo */}
    <div className="flex items-center justify-between relative z-10">
      <div className="w-10 h-7 rounded-md bg-amber-300/80 flex items-center justify-center">
        <div className="w-7 h-5 rounded-sm border border-amber-500/60 grid grid-cols-2 gap-px p-0.5">
          <div className="bg-amber-500/40 rounded-sm" /><div className="bg-amber-500/40 rounded-sm" />
          <div className="bg-amber-500/40 rounded-sm" /><div className="bg-amber-500/40 rounded-sm" />
        </div>
      </div>
      <span className="text-white/80 font-black text-lg tracking-widest italic">VISA</span>
    </div>

    {/* card number */}
    <div className="relative z-10 text-center">
      <p
        className="text-white font-mono text-lg tracking-[0.25em] transition-all duration-300"
        style={{ filter: cvvFocus ? 'blur(4px)' : 'none' }}
      >
        {cardNumber ? maskCard(cardNumber) : '**** **** **** ****'}
      </p>
    </div>

    {/* holder + expiry */}
    <div className="flex items-end justify-between relative z-10">
      <div>
        <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Card Holder</p>
        <p className="text-white text-sm font-bold uppercase tracking-wider truncate max-w-[160px]">
          {cardHolder || 'YOUR NAME'}
        </p>
      </div>
      <div className="text-right">
        <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Expires</p>
        <p className="text-white text-sm font-bold font-mono">{expiry || 'MM/YY'}</p>
      </div>
    </div>
  </div>
);

/* ─── Main Component ──────────────────────────────── */
export const CheckoutPage = () => {
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  /* shipping */
  const [shipping, setShipping] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
  });

  /* payment method */
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'cod'

  /* card details */
  const [card, setCard] = useState({ number: '', holder: '', expiry: '', cvv: '' });
  const [cvvFocus, setCvvFocus] = useState(false);

  /* upi */
  const [upiId, setUpiId] = useState('');

  const [step, setStep] = useState(1); // 1 = shipping, 2 = payment, 3 = success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shippingCost = cartSubtotal > 75 ? 0 : 9.99;
  const tax = cartSubtotal * 0.08;
  const grandTotal = cartSubtotal + shippingCost + tax;

  /* ── validation ── */
  const validateShipping = () => {
    if (!shipping.name || !shipping.phone || !shipping.street || !shipping.city || !shipping.zipCode) {
      setError('Please fill in all required shipping fields.');
      return false;
    }
    setError('');
    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === 'card') {
      const raw = card.number.replace(/\s/g, '');
      if (raw.length < 16) { setError('Enter a valid 16-digit card number.'); return false; }
      if (!card.holder.trim()) { setError('Enter the card holder name.'); return false; }
      if (card.expiry.length < 5) { setError('Enter a valid expiry date (MM/YY).'); return false; }
      if (card.cvv.length < 3) { setError('Enter a valid CVV (3 digits).'); return false; }
    }
    if (paymentMethod === 'upi') {
      if (!upiId.includes('@')) { setError('Enter a valid UPI ID (e.g. name@upi).'); return false; }
    }
    setError('');
    return true;
  };

  /* ── place order ── */
  const handlePlaceOrder = async () => {
    if (!validatePayment()) return;
    setLoading(true);

    try {
      if (!user) {
        navigate('/auth?redirect=checkout');
        return;
      }

      const orderProducts = cartItems.map((item) => ({
        productId: item.productId,
        name: item.product?.name,
        image: item.product?.images?.[0],
        size: item.size,
        quantity: item.quantity,
        price: item.product?.price,
      }));

      const res = await authFetch(
        '/api/orders',
        {
          method: 'POST',
          body: JSON.stringify({
            products: orderProducts,
            shippingAddress: { ...shipping },
            paymentMethod,
          }),
        },
        () => {
          // 401 callback: clear session and send user to sign-in
          navigate('/auth?redirect=checkout');
        }
      );

      let data;
      try { data = await res.json(); } catch { throw new Error(`Server error ${res.status}`); }
      if (!res.ok) throw new Error(data.message || 'Failed to place order');

      clearCart();
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ── shared input style ── */
  const inp = 'w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition';

  /* ══════════════════════════════════════════════════
     STEP 3 – SUCCESS
  ══════════════════════════════════════════════════ */
  if (step === 3) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto shadow-lg shadow-emerald-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-black text-slate-900">Order Confirmed! 🎉</h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Thank you for shopping at <strong>StyleVerse</strong>. Your order has been placed and is being prepared for dispatch.
        </p>
        <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-2 border border-slate-100 text-xs">
          <div className="flex justify-between text-slate-600"><span>Order Total</span><span className="font-black text-indigo-600 text-base">${grandTotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-slate-600"><span>Payment</span><span className="font-bold capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI' : 'Credit / Debit Card'}</span></div>
          <div className="flex justify-between text-slate-600"><span>Ship To</span><span className="font-bold">{shipping.city}, {shipping.state}</span></div>
        </div>
        <button
          onClick={() => navigate('/orders')}
          className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
        >
          View My Orders <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════
     STEPS 1 & 2
  ══════════════════════════════════════════════════ */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* ── Page Header ── */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Secure Checkout</h1>
          <p className="text-xs text-slate-500 mt-0.5">256-bit SSL encrypted · Your data is safe</p>
        </div>
        <ShieldCheck className="w-6 h-6 text-emerald-500 ml-auto flex-shrink-0" />
      </div>

      {/* ── Step indicator ── */}
      <div className="flex items-center gap-3 text-xs font-bold">
        {['Shipping', 'Payment'].map((label, i) => {
          const active = step === i + 1;
          const done = step > i + 1;
          return (
            <React.Fragment key={label}>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                active ? 'border-indigo-600 bg-indigo-50 text-indigo-700' :
                done ? 'border-emerald-500 bg-emerald-50 text-emerald-700' :
                'border-slate-200 text-slate-400'
              }`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  active ? 'bg-indigo-600 text-white' : done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                }`}>{done ? '✓' : i + 1}</span>
                {label}
              </div>
              {i < 1 && <div className="flex-1 h-0.5 bg-slate-200 rounded" />}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* ══ Left column ══════════════════════════════ */}
        <div className="lg:col-span-2 space-y-6">

          {/* ─────── STEP 1: SHIPPING ─────── */}
          {step === 1 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900 border-b pb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-indigo-500" /> Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input className={inp} placeholder="Jane Doe" value={shipping.name}
                    onChange={e => setShipping({ ...shipping, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input className={inp} placeholder="+91 98765 43210" value={shipping.phone}
                    onChange={e => setShipping({ ...shipping, phone: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Street Address *</label>
                <input className={inp} placeholder="123 Fashion Street, Apt 4B" value={shipping.street}
                  onChange={e => setShipping({ ...shipping, street: e.target.value })} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                  <input className={inp} placeholder="Mumbai" value={shipping.city}
                    onChange={e => setShipping({ ...shipping, city: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State *</label>
                  <input className={inp} placeholder="MH" value={shipping.state}
                    onChange={e => setShipping({ ...shipping, state: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">PIN / ZIP *</label>
                  <input className={inp} placeholder="400001" value={shipping.zipCode}
                    onChange={e => setShipping({ ...shipping, zipCode: e.target.value })} />
                </div>
              </div>

              <button
                onClick={() => { if (validateShipping()) setStep(2); }}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition active:scale-95 flex items-center justify-center gap-2"
              >
                Continue to Payment <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ─────── STEP 2: PAYMENT ─────── */}
          {step === 2 && (
            <div className="space-y-5">

              {/* Payment Method Tabs */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-5">
                <h2 className="text-lg font-extrabold text-slate-900 border-b pb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-500" /> Payment Method
                </h2>

                {/* Option cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', icon: <CreditCard className="w-5 h-5" />, label: 'Card', sub: 'Credit / Debit' },
                    { id: 'upi', icon: <Smartphone className="w-5 h-5" />, label: 'UPI', sub: 'GPay / PhonePe' },
                    { id: 'cod', icon: <DollarSign className="w-5 h-5" />, label: 'COD', sub: 'Cash on Delivery' },
                  ].map(({ id, icon, label, sub }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => { setPaymentMethod(id); setError(''); }}
                      className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl border-2 transition-all text-center ${
                        paymentMethod === id
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <span className={paymentMethod === id ? 'text-indigo-600' : 'text-slate-400'}>{icon}</span>
                      <span className="text-xs font-extrabold">{label}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{sub}</span>
                    </button>
                  ))}
                </div>

                {/* ── CARD form ── */}
                {paymentMethod === 'card' && (
                  <div className="space-y-5 pt-2">
                    <CardPreview
                      cardNumber={card.number}
                      cardHolder={card.holder}
                      expiry={card.expiry}
                      cvvFocus={cvvFocus}
                    />

                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                        <input
                          className={inp + ' font-mono tracking-widest'}
                          placeholder="1234 5678 9012 3456"
                          value={card.number}
                          maxLength={19}
                          onChange={e => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Card Holder Name</label>
                        <input
                          className={inp + ' uppercase'}
                          placeholder="JANE DOE"
                          value={card.holder}
                          onChange={e => setCard({ ...card, holder: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                          <input
                            className={inp + ' font-mono'}
                            placeholder="MM/YY"
                            value={card.expiry}
                            maxLength={5}
                            onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">CVV</label>
                          <input
                            className={inp + ' font-mono tracking-widest'}
                            placeholder="•••"
                            type="password"
                            value={card.cvv}
                            maxLength={4}
                            onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                            onFocus={() => setCvvFocus(true)}
                            onBlur={() => setCvvFocus(false)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Accepted cards */}
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-[10px] text-slate-400 font-semibold">Accepted:</span>
                      {['VISA', 'MC', 'AMEX', 'RuPay'].map(n => (
                        <span key={n} className="px-2.5 py-1 bg-slate-100 rounded-lg text-[10px] font-extrabold text-slate-600">{n}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── UPI form ── */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 pt-2">
                    <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-5 text-center space-y-2">
                      <Smartphone className="w-10 h-10 text-indigo-500 mx-auto" />
                      <p className="text-xs font-bold text-slate-900">Pay via UPI</p>
                      <p className="text-[11px] text-slate-500">Enter your UPI ID to pay instantly via GPay, PhonePe, Paytm, or BHIM</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">UPI ID</label>
                      <input
                        className={inp}
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                        <span key={app} className="px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-full text-[11px] font-bold shadow-sm">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── COD info ── */}
                {paymentMethod === 'cod' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4 items-start">
                    <DollarSign className="w-8 h-8 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs">
                      <p className="font-extrabold text-slate-900">Cash on Delivery</p>
                      <p className="text-slate-600 leading-relaxed">
                        Pay in cash when your order is delivered to your doorstep. Our delivery partner will collect the exact amount. No extra charge.
                      </p>
                      <p className="text-amber-700 font-semibold mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Available across all major cities
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Back + Place Order buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setStep(1); setError(''); }}
                  className="px-6 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="flex-1 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition active:scale-95 disabled:bg-slate-300 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {loading ? 'Processing Payment...' : `Pay $${grandTotal.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ══ Right column: Order summary ══════════════ */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5 sticky top-28">
          <h2 className="text-base font-extrabold text-slate-900 border-b pb-3">Order Summary</h2>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {cartItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <img src={item.product?.images?.[0]} alt=""
                  className="w-12 h-14 object-cover rounded-xl bg-slate-100 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 truncate">{item.product?.name}</p>
                  <p className="text-slate-500">Size: {item.size} · Qty: {item.quantity}</p>
                </div>
                <span className="font-bold text-slate-900">${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span className={`font-bold ${shippingCost === 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax (8%)</span>
              <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-black text-slate-900">
              <span>Total</span>
              <span className="text-indigo-600">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment badge */}
          {step === 2 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-[11px] text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>All transactions are secured with 256-bit SSL encryption</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
