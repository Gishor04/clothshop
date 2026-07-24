import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      {/* Perks bar */}
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

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-xl font-extrabold text-white">StyleVerse</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Your destination for trendy fashion across Men's, Women's, and Kids' apparel. Quality craftsmanship meets contemporary design.
          </p>
        </div>

        <div>
          <h5 className="text-white font-bold text-sm mb-4">Categories</h5>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/products?category=men" className="hover:text-indigo-400 transition-colors">Men's Fashion</Link></li>
            <li><Link to="/products?category=women" className="hover:text-indigo-400 transition-colors">Women's Collection</Link></li>
            <li><Link to="/products?category=boys" className="hover:text-indigo-400 transition-colors">Boys' Apparel (Kids)</Link></li>
            <li><Link to="/products?category=girls" className="hover:text-indigo-400 transition-colors">Girls' Wear (Kids)</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold text-sm mb-4">Customer Support</h5>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Order Tracking</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Shipping & Delivery Info</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Size Guide & Fit Chart</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">FAQs & Support Center</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold text-sm mb-4">Stay Connected</h5>
          <p className="text-xs text-slate-400 mb-3">Subscribe to get secret discount codes & new arrivals!</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-slate-800 text-white text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 w-full"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} StyleVerse E-Commerce. All rights reserved. Crafted with care.
      </div>
    </footer>
  );
};
