import React from 'react';
import { SeoMeta } from '../components/SeoMeta';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';

export const AboutUsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-['Plus_Jakarta_Sans',sans-serif]">
      <SeoMeta
        title="Our Heritage & Craftsmanship — Kottuba Sri Lanka"
        description="Learn about Kottuba's journey of crafting premium handcrafted full-grain leather bags in Colombo since 2018."
      />

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white p-8 sm:p-16 shadow-2xl border border-stone-800 flex flex-col items-center text-center space-y-4">
        <span className="px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-widest">
          Est. 2018 · Colombo, Sri Lanka
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-amber-100 tracking-tight leading-tight max-w-3xl">
          Crafting Premium Carry-Wear Across the Pearl
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
          Kottuba was founded with a singular purpose: to bring world-class, handcrafted full-grain leather bags to Sri Lanka and the world, built to endure a lifetime of journeys.
        </p>
      </div>

      {/* Story Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
          <span className="text-amber-800 font-extrabold text-xs uppercase tracking-widest">The Colombo Workshop</span>
          <h2 className="text-3xl font-black text-stone-900 tracking-tight">Artisanal Precision in Every Stitch</h2>
          <p>
            Every Kottuba bag begins its journey in our master workshop in Colombo. We source only top-tier full-grain bovine hides, tanned with natural vegetable dyes to preserve organic texture and grain depth.
          </p>
          <p>
            Unlike mass-produced synthetic bags, full-grain leather develops a rich patina over time — reflecting your travels, daily commutes, and lifestyle.
          </p>
        </div>

        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-stone-100 border border-stone-200">
          <img
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&auto=format&fit=crop"
            alt="Kottuba Leather Craftsman"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Core Values Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-800 flex items-center justify-center font-black">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">Uncompromising Materials</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            We use solid YKK brass zippering, heavy-duty 1000D canvas linings, and double-stitched nylon threading on every bag.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-800 flex items-center justify-center font-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">Lifetime Warranty</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            We stand by our craftsmanship. Every Kottuba product includes a 1-Year comprehensive warranty on stitching and hardware.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-800 flex items-center justify-center font-black">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">Proudly Sri Lankan</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Supporting local artisans, fair wage workshops, and sustainable leather crafting practices across Sri Lanka.
          </p>
        </div>
      </div>

      <div className="text-center pt-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-4 bg-amber-900 text-white font-black text-xs rounded-2xl shadow-xl hover:bg-amber-800 transition-all uppercase tracking-wider"
        >
          <span>Explore Our Leather Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
