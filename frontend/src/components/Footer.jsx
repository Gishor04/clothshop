import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 font-['Plus_Jakarta_Sans',sans-serif] border-t border-stone-800">
      
      {/* Top Value Proposition Bar */}
      <div className="border-b border-stone-800 bg-stone-900/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0 border border-indigo-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Free Island-Wide Delivery</h4>
              <p className="text-xs text-stone-400 mt-0.5">On all orders over Rs. 10,000 across Sri Lanka</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Cash on Delivery (COD)</h4>
              <p className="text-xs text-stone-400 mt-0.5">Pay safely at your doorstep when package arrives</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Adult Sizes: M, L, XL, XXL</h4>
              <p className="text-xs text-stone-400 mt-0.5">Accurate fits for Adult Men, Women &amp; Kids</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">14-Day Free Size Swap</h4>
              <p className="text-xs text-stone-400 mt-0.5">Hassle-free size or color exchange policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-700 text-white font-black text-xl flex items-center justify-center shadow-md">
              K
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white block leading-none">KAITHADY</span>
              <span className="text-[9px] uppercase tracking-widest text-indigo-400 font-extrabold">Clothing Boutique</span>
            </div>
          </Link>

          <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
            Kaithady Clothing Boutique. Curated apparel for Adult Men (M-XXL), Adult Women (M-XXL), Child Men (Boys), and Child Women (Girls). Delivered across Sri Lanka.
          </p>

          <div className="space-y-2 text-xs text-stone-400 font-medium">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Flagship Boutique: Kaithady, Jaffna &amp; Colombo 03, Sri Lanka</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Direct Support: +94 77 000 0000 / +94 11 234 5678</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>hello@kaithadyclothing.lk / orders@kaithadyclothing.lk</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/94770000000?text=Hi%20Kaithady%20Clothing%20Boutique%2C%20I%27d%20like%20to%20order."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all"
            >
              <Phone className="w-4 h-4" /> Direct WhatsApp Order
            </a>
          </div>
        </div>

        {/* Shop Column */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Departments</h4>
          <ul className="space-y-2 text-xs text-stone-400 font-medium">
            <li><Link to="/products?category=men" className="hover:text-white transition-colors">Adult Men (M, L, XL, XXL)</Link></li>
            <li><Link to="/products?category=women" className="hover:text-white transition-colors">Adult Women (M, L, XL, XXL)</Link></li>
            <li><Link to="/products?category=boys" className="hover:text-white transition-colors">Child Men (Boys)</Link></li>
            <li><Link to="/products?category=girls" className="hover:text-white transition-colors">Child Women (Girls)</Link></li>
            <li><Link to="/products?onSale=true" className="hover:text-amber-400 font-bold transition-colors">Avurudu Sale (Up to 25% OFF)</Link></li>
          </ul>
        </div>

        {/* Assistance Column */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Assistance</h4>
          <ul className="space-y-2 text-xs text-stone-400 font-medium">
            <li><Link to="/faq" className="hover:text-white transition-colors">Size Chart Guide (M-XXL)</Link></li>
            <li><Link to="/policies" className="hover:text-white transition-colors">Shipping &amp; Delivery Info</Link></li>
            <li><Link to="/policies" className="hover:text-white transition-colors">14-Day Free Size Swap</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ &amp; Care Instructions</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Boutique</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Kaithady Insider</h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Subscribe for early notifications on new seasonal apparel drops &amp; festival discounts.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {subscribed && (
              <p className="text-[11px] text-emerald-400 font-bold">
                Thank you for subscribing to Kaithady Insider!
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-stone-900 bg-stone-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Kaithady Clothing Boutique Sri Lanka. All Rights Reserved.</p>

          <div className="flex items-center gap-3 font-semibold text-[11px]">
            <span className="px-2.5 py-1 rounded bg-stone-900 text-stone-300 border border-stone-800">Visa / Mastercard</span>
            <span className="px-2.5 py-1 rounded bg-stone-900 text-emerald-400 border border-stone-800 font-bold">Cash on Delivery</span>
            <span className="px-2.5 py-1 rounded bg-stone-900 text-amber-400 border border-stone-800 font-bold">Koko / Mintpay</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
