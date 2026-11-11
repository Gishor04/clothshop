import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { SEO } from '../components/SEO';
import { generateOrganizationSchema, generateWebSiteSchema } from '../utils/seoHelpers';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Phone,
  Tag,
  CheckCircle,
  Ruler
} from 'lucide-react';

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : (data.products || []);
          if (list.length > 0) {
            setFeaturedProducts(list.filter((p) => p.isFeatured).slice(0, 4));
            setBestsellerProducts(list.filter((p) => p.isBestseller || p.rating >= 4.8).slice(0, 4));
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.log('Using local clothing dataset fallback...');
      }

      setFeaturedProducts(MOCK_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4));
      setBestsellerProducts(MOCK_PRODUCTS.filter((p) => p.isBestseller).slice(0, 4));
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const categories = [
    {
      id: 'men',
      name: "Wedding Suits & Men's Wear",
      tagline: '3-Piece Tuxedos, Bespoke Groom Sherwanis, Blazers & Oxford Shirts',
      sizeInfo: 'Specialist in Wedding Suits (M-XXL)',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop',
      path: '/products?category=men',
      color: 'from-stone-950/95 via-red-950/80 to-stone-950/95',
    },
    {
      id: 'women',
      name: "Women's Reception & Elegance",
      tagline: 'Embellished Silk Gowns, Wrap Midi Dresses & Chic Blazers',
      sizeInfo: 'Adult Sizes: M, L, XL, XXL',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop',
      path: '/products?category=women',
      color: 'from-rose-950/90 to-stone-950/95',
    },
    {
      id: 'boys',
      name: "Boys' Wedding & Casual Suits",
      tagline: 'Junior Prince 3-Piece Tuxedos, Denim Jackets & Hoodies',
      sizeInfo: 'Child Ages: 2-3Y, 4-5Y, 6-7Y, 8-9Y',
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&auto=format&fit=crop',
      path: '/products?category=boys',
      color: 'from-amber-950/90 to-stone-950/95',
    },
    {
      id: 'girls',
      name: "Girls' Celebration Wear",
      tagline: 'Sunshine Twirl Summer Dresses, Sparkle Sweaters & Overalls',
      sizeInfo: 'Child Ages: 2-3Y, 4-5Y, 6-7Y, 8-9Y',
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop',
      path: '/products?category=girls',
      color: 'from-purple-950/90 to-stone-950/95',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 font-['Plus_Jakarta_Sans',sans-serif]">
      <SEO
        title="WellFIT — Specialist in Wedding Suits & Men's Wear | வாங்க இது நம்ம ஊர் கட"
        description="WellFIT - Specialist in Wedding Suits, Groom 3-Piece Tuxedos, Handcrafted Sherwanis, Blazers, Executive Shirts & Family Fashion in Sri Lanka. Contact WhatsApp +94 76 555 4150."
        schema={[generateOrganizationSchema(), generateWebSiteSchema()]}
      />

      {/* 1. Hero Lifestyle Banner Section */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl bg-stone-950 text-white min-h-[560px] sm:min-h-[640px] flex items-center border border-stone-800 mx-4 sm:mx-6 lg:mx-8 mt-4">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1600&auto=format&fit=crop"
            alt="WellFIT Wedding Suits and Men's Wear"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-950/40" />
        </div>

        <div className="relative z-10 max-w-3xl px-6 sm:px-12 lg:px-16 space-y-6 py-12">
          {/* Logo Badge in Hero */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 bg-black shadow-lg flex-shrink-0">
              <img src="/wellfit-logo.jpg" alt="WellFIT" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-black backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Specialist in Wedding Suits · வாங்க இது நம்ம ஊர் கட</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
            <span className="text-amber-400">Well</span><span className="text-red-600">FIT</span> Suits &amp; <br />
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-red-400 bg-clip-text text-transparent">
              Wedding Men's Wear.
            </span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
            Sri Lanka’s destination for Bespoke Wedding Tuxedos, 3-Piece Groom Suits, Handcrafted Royal Sherwanis, Blazers, Executive Shirts, and Family Occasion Wear.
          </p>

          {/* Slogan Pill */}
          <div className="inline-block px-4 py-1.5 rounded-2xl bg-stone-900/90 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-lg">
            ✨ வாங்க இது நம்ம ஊர் கட — High Quality &amp; Custom Fitting Guaranteed!
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/products?category=men"
              className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow-xl shadow-red-600/30 flex items-center gap-2 transition-all active:scale-95 uppercase tracking-wider"
            >
              <span>Explore Wedding Suits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/94765554150?text=Hi%20WellFIT%2C%20I%20am%20interested%20in%20consulting%20for%20wedding%20suits%20and%20groom%20fitting%20(+94765554150)."
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black shadow-xl flex items-center gap-2 transition-all active:scale-95 uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Fitting (+94 76 555 4150)</span>
            </a>

            <button
              onClick={() => setShowSizeGuide(true)}
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold backdrop-blur-md transition-all border border-white/20 uppercase tracking-wider flex items-center gap-2"
            >
              <Ruler className="w-4 h-4 text-amber-400" /> Size Chart
            </button>
          </div>

          {/* Trust Value Badges */}
          <div className="pt-6 border-t border-stone-800/80 flex flex-wrap items-center gap-6 text-xs text-stone-300 font-semibold">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Specialist Bespoke Groom Tailoring</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Free Island-Wide Delivery &gt; Rs 10,000</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>Direct WhatsApp Support: 076 555 4150</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Wedding Suit Specialist VIP Showcase Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-stone-900 to-red-950 border-2 border-amber-500/30 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider">
                👑 The Groom’s Choice
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Specialist in Wedding Suits &amp; Formal Elegance
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-medium">
                Make your wedding day unforgettable with WellFIT’s signature 3-piece velvet tuxedos, imperial zari embroidered sherwanis, and Italian cut double-breasted suits. We provide bespoke sleeve adjustments, shoulder structuring, and groomsmen ensemble coordination.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-amber-400 font-black block text-sm">3-Piece Suits</span>
                  <span className="text-stone-400 text-[11px]">Tuxedo, Vest &amp; Trouser</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-red-400 font-black block text-sm">Royal Sherwanis</span>
                  <span className="text-stone-400 text-[11px]">Handcrafted Zari Detailing</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-emerald-400 font-black block text-sm">Bespoke Fit</span>
                  <span className="text-stone-400 text-[11px]">Custom Measurements</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/94765554150?text=Hi%20WellFIT%2C%20I%20would%20like%20to%20order%20or%20book%20a%20wedding%20suit%20fitting%20consultation."
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black shadow-lg flex items-center gap-2 uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4" /> Book Groom Fitting on WhatsApp
                </a>
                <Link
                  to="/products?category=men"
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-black border border-white/20 transition-all uppercase tracking-wider"
                >
                  View Suits Collection &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-amber-500/20">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop"
                  alt="Royal Wedding Suit"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-amber-500/20 mt-6">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop"
                  alt="Italian Cut Suit"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Four Main Category Banners Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-indigo-600 font-extrabold text-xs uppercase tracking-widest">
              Shop by Audience &amp; Fit
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight mt-1">
              Select Your Department
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-900 transition-colors uppercase tracking-wider"
          >
            View All Departments <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.path}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 border border-stone-200"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-85 group-hover:opacity-95 transition-opacity`} />

              <div className="relative z-10 text-white space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white inline-block shadow-sm">
                  {cat.sizeInfo}
                </span>
                <h3 className="text-xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2">{cat.tagline}</p>
                <div className="pt-2 flex items-center text-xs font-black text-amber-400 group-hover:translate-x-1.5 transition-transform">
                  Explore Department &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Wedding & Festive Season Sale Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-red-950 to-stone-950 text-white p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-amber-500/30">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-400/30">
              <Tag className="w-3.5 h-3.5 text-amber-400" /> WellFIT Exclusive Special
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-amber-200">
              Wedding Season Sale · Save up to 25%
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-medium">
              Upgrade your wedding and formal wardrobe with bespoke tuxedos, groom sherwanis, blazers, and luxury cotton shirts. Use promo code <span className="font-black text-amber-300 underline">WELLFIT25</span> for 25% OFF. WhatsApp orders welcome!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              to="/products?onSale=true"
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs rounded-2xl shadow-xl transition-all uppercase tracking-wider"
            >
              Shop Wedding Offers
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Trending Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-indigo-600 font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              New Season Apparel
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
              Featured Arrivals
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-black text-indigo-600 hover:text-indigo-900 transition-colors uppercase tracking-wider"
          >
            Explore Catalog &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 bg-stone-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-indigo-600 font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Most Popular Clothes
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
              Best Selling Styles
            </h2>
          </div>
          <Link
            to="/products?sort=bestseller"
            className="text-xs font-black text-indigo-600 hover:text-indigo-900 transition-colors uppercase tracking-wider"
          >
            View All Best Sellers &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellerProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
      )}

    </div>
  );
};
