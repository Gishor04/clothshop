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
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 bg-black flex-shrink-0 shadow-md">
              <img src="/wellfit-logo.jpg" alt="WellFIT" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white block leading-none">
                <span className="text-amber-400">Well</span><span className="text-red-600">FIT</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-stone-300 font-extrabold block">
                Specialist in Wedding Suits &amp; Men's Wear
              </span>
              <span className="text-[11px] font-bold text-amber-400">
                வாங்க இது நம்ம ஊர் கட
              </span>
            </div>
          </Link>

          <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
            WellFIT — Specialist in Wedding Suits &amp; Men's Wear. Curated 3-piece groom tuxedos, royal zari sherwanis, executive blazers, formal trousers, and celebratory apparel for the whole family. Delivered across Sri Lanka.
          </p>

          <div className="space-y-2 text-xs text-stone-400 font-medium">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Flagship Store: Main Street, Sri Lanka</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp &amp; Orders: +94 76 555 4150</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>contact@wellfitsuits.lk / orders@wellfitsuits.lk</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/94765554150?text=Hi%20WellFIT%2C%20I%27d%20like%20to%20order%20or%20inquire%20about%20wedding%20suits."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-2xl shadow-lg transition-all"
            >
              <Phone className="w-4 h-4" /> WhatsApp: +94 76 555 4150
            </a>
          </div>
        </div>

        {/* Shop Column */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Collections</h4>
          <ul className="space-y-2 text-xs text-stone-400 font-medium">
            <li><Link to="/products?category=men" className="hover:text-white transition-colors text-amber-300 font-bold">Wedding Suits &amp; Tuxedos</Link></li>
            <li><Link to="/products?category=men" className="hover:text-white transition-colors">Adult Men's Wear (M-XXL)</Link></li>
            <li><Link to="/products?category=women" className="hover:text-white transition-colors">Women's Gowns &amp; Suits</Link></li>
            <li><Link to="/products?category=boys" className="hover:text-white transition-colors">Boys' Wedding Suits</Link></li>
            <li><Link to="/products?category=girls" className="hover:text-white transition-colors">Girls' Dresses</Link></li>
            <li><Link to="/products?onSale=true" className="hover:text-amber-400 font-bold transition-colors">Special Offers</Link></li>
          </ul>
        </div>

        {/* Assistance Column */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Assistance</h4>
          <ul className="space-y-2 text-xs text-stone-400 font-medium">
            <li><Link to="/faq" className="hover:text-white transition-colors">Suit Sizing &amp; Measurement Guide</Link></li>
            <li><Link to="/policies" className="hover:text-white transition-colors">Shipping &amp; Delivery Info</Link></li>
            <li><Link to="/policies" className="hover:text-white transition-colors">Free Fitting Adjustments</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ &amp; Dry Cleaning Tips</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact WellFIT Team</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">WellFIT Insider</h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Subscribe for early notifications on new Wedding Suit arrivals, bespoke fabrics &amp; festival discounts.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {subscribed && (
              <p className="text-[11px] text-emerald-400 font-bold">
                Thank you for subscribing to WellFIT Insider!
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-stone-900 bg-stone-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 WellFIT — Specialist in Wedding Suits Sri Lanka. வாங்க இது நம்ம ஊர் கட. All Rights Reserved.</p>

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
