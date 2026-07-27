import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCw,
  Mail,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export const Footer = () => {
  return (
    <>
      {/* Floating WhatsApp Quick Order Button */}
      <a
        href="https://wa.me/919876543210?text=Hi%20StyleVerse!%20I%20have%20an%20inquiry%20or%20want%20to%20place%20an%20order."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center gap-2 font-bold text-xs group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 text-xs">
          Order on WhatsApp
        </span>
      </a>

      <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
        {/* Trust Perks bar */}
        <div className="border-b border-slate-800 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-900/50 text-indigo-400 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Free Express Shipping</h4>
                <p className="text-xs text-slate-400">On all orders above $75. Quick 2-day delivery.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-900/50 text-indigo-400 flex items-center justify-center">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Hassle-Free 30-Day Returns</h4>
                <p className="text-xs text-slate-400">Not satisfied? Return or exchange with zero fees.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-900/50 text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Secure Checkout Guarantee</h4>
                <p className="text-xs text-slate-400">Encrypted transactions & full buyer protection.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white">StyleVerse</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Your premiere clothing shop for high quality apparel across Men's, Women's, Boys', and Girls' collections. Sustainable fabrics, perfect fitting, and friendly customer care.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-white font-bold text-sm mb-4">Shop Categories</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/products?category=men" className="hover:text-indigo-400 transition-colors">Men's Fashion</Link></li>
              <li><Link to="/products?category=women" className="hover:text-indigo-400 transition-colors">Women's Collection</Link></li>
              <li><Link to="/products?category=boys" className="hover:text-indigo-400 transition-colors">Boys' Apparel (Kids)</Link></li>
              <li><Link to="/products?category=girls" className="hover:text-indigo-400 transition-colors">Girls' Wear (Kids)</Link></li>
              <li><Link to="/products?subCategory=pants" className="hover:text-amber-300 font-bold transition-colors">👖 Pants & Jeans Collection</Link></li>
            </ul>
          </div>

          {/* Clothing Shop Location & Contact Details */}
          <div>
            <h5 className="text-white font-bold text-sm mb-4">Store Location & Details</h5>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">StyleVerse Flagship Store</p>
                  <p>123 Fashion Avenue, Grand Plaza</p>
                  <p>Downtown District, NY 10001</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:underline mt-1 font-semibold"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 border-t border-slate-800/80 pt-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-white font-semibold">Phone / WhatsApp</p>
                  <p>+91 98765-43210 / +1 (800) 555-STYLE</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 border-t border-slate-800/80 pt-2.5">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-white font-semibold">Operating Hours</p>
                  <p>Mon - Sat: 9:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h5 className="text-white font-bold text-sm mb-4">Stay Connected</h5>
            <p className="text-xs text-slate-400 mb-3">Subscribe for exclusive discount codes & new arrivals!</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 w-full"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} StyleVerse Clothing Shop. All rights reserved. Crafted with care.
        </div>
      </footer>
    </>
  );
};
