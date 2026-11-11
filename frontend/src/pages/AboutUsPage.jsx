import React from 'react';
import { SEO } from '../components/SEO';
import { generateOrganizationSchema } from '../utils/seoHelpers';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Heart, Sparkles, ArrowRight, Phone } from 'lucide-react';

export const AboutUsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-['Plus_Jakarta_Sans',sans-serif]">
      <SEO
        title="About WellFIT — Specialist in Wedding Suits & Men's Wear"
        description="Learn about WellFIT - Specialist in Wedding Suits & Men's Wear. Bespoke groom tailoring, 3-piece tuxedos, royal sherwanis and celebration attire. வாங்க இது நம்ம ஊர் கட."
        schema={generateOrganizationSchema()}
      />

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white p-8 sm:p-16 shadow-2xl border border-stone-800 flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 bg-black shadow-xl">
          <img src="/wellfit-logo.jpg" alt="WellFIT" className="w-full h-full object-cover" />
        </div>

        <span className="px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-widest">
          வாங்க இது நம்ம ஊர் கட · WellFIT Sri Lanka
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl">
          Specialist in Wedding Suits &amp; Men's Wear
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
          WellFIT was founded with a passion for dressing grooms and gentlemen in bespoke excellence. We bring together world-class Italian wool blends, opulent micro-velvets, handcrafted metallic zari sherwanis, and precision custom measurements.
        </p>

        <div className="pt-2 flex items-center gap-4">
          <a
            href="https://wa.me/94765554150?text=Hi%20WellFIT%2C%20I%20want%20to%20know%20more%20about%20your%20wedding%20suit%20fittings."
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg"
          >
            <Phone className="w-4 h-4" /> WhatsApp Consultation (+94 76 555 4150)
          </a>
        </div>
      </div>

      {/* Story Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
          <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest">Master Bespoke Tailoring</span>
          <h2 className="text-3xl font-black text-stone-900 tracking-tight">Artisanal Precision in Every Stitch</h2>
          <p>
            At WellFIT, every suit represents an uncompromising commitment to perfection. From our signature 3-piece wedding tuxedos with silk peak lapels to our handcrafted imperial sherwanis, our master tailors focus on every seam, buttonhole, and shoulder curve.
          </p>
          <p>
            Whether you are the groom taking center stage, the best man, or an esteemed guest, our apparel ensures you feel confident, comfortable, and undeniably distinguished.
          </p>
        </div>

        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-stone-100 border border-stone-200">
          <img
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop"
            alt="WellFIT Wedding Suit Tailoring"
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
          <h3 className="font-extrabold text-base text-stone-900">Luxury Fabrics</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            We source Italian Super 140s wool blends, pure Egyptian Giza cottons, rich micro-velvets, and breathable Bemberg linings for lasting comfort.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center font-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">Guaranteed Perfect Fit</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            We provide free in-store sleeve and waist adjustments, plus remote video/WhatsApp measurement guidance for island-wide clients.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-800 flex items-center justify-center font-black">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">வாங்க இது நம்ம ஊர் கட</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Proudly homegrown, serving Sri Lankan families with warm hospitality, honest pricing, and custom celebration packages.
          </p>
        </div>
      </div>

      <div className="text-center pt-6">
        <Link
          to="/products?category=men"
          className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-black text-xs rounded-2xl shadow-xl hover:bg-red-500 transition-all uppercase tracking-wider"
        >
          <span>Explore Wedding Suits &amp; Men's Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
