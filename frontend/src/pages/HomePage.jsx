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
      name: "Adult Men's Collection",
      tagline: 'Tailored Oxford Shirts, Flex Denim Jeans & Heavyweight Tees',
      sizeInfo: 'Adult Sizes: M, L, XL, XXL',
      image: 'https://images.unsplash.com/photo-1490578474895-699bc4e2cf59?w=800&auto=format&fit=crop',
      path: '/products?category=men',
      color: 'from-indigo-950/90 to-stone-950/95',
    },
    {
      id: 'women',
      name: "Adult Women's Fashion",
      tagline: 'Silk Wrap Midi Dresses, Tailored Blazers & High-Rise Jeans',
      sizeInfo: 'Adult Sizes: M, L, XL, XXL',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop',
      path: '/products?category=women',
      color: 'from-rose-950/90 to-stone-950/95',
    },
    {
      id: 'boys',
      name: "Child Men's (Boys' Fashion)",
      tagline: 'Dino Fleece Hoodies, Denim Trucker Jackets & Active Joggers',
      sizeInfo: 'Child Ages: 2-3Y, 4-5Y, 6-7Y, 8-9Y',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop',
      path: '/products?category=boys',
      color: 'from-amber-950/90 to-stone-950/95',
    },
    {
      id: 'girls',
      name: "Child Women's (Girls' Wear)",
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
        title="Kaithady Clothing Boutique — Adults (M-XXL) & Kids Fashion"
        description="Shop premium clothing for Adult Men (M-XXL), Adult Women (M-XXL), Boys, and Girls at Kaithady Boutique. Enjoy free island-wide delivery and Cash on Delivery."
        schema={[generateOrganizationSchema(), generateWebSiteSchema()]}
      />

      {/* 1. Hero Lifestyle Banner Section */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl bg-stone-950 text-white min-h-[540px] sm:min-h-[620px] flex items-center border border-stone-800 mx-4 sm:mx-6 lg:mx-8 mt-4">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop"
            alt="StyleVerse Clothing Collection"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl px-6 sm:px-12 lg:px-16 space-y-6 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-black backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Adults (M, L, XL, XXL) &amp; Kids 2026 Collection</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
            Redefine Everyday <br />
            <span className="bg-gradient-to-r from-indigo-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
              Fashion For All.
            </span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
            Curated apparel for Adult Men, Adult Women, Child Men (Boys), and Child Women (Girls). Premium fabrics, accurate sizing, and fast doorstep delivery.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/products"
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all active:scale-95 uppercase tracking-wider"
            >
              <span>Shop All Apparel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setShowSizeGuide(true)}
              className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold backdrop-blur-md transition-all border border-white/20 uppercase tracking-wider flex items-center gap-2"
            >
              <Ruler className="w-4 h-4 text-indigo-400" /> View Size Chart (M-XXL)
            </button>

            <a
              href="https://wa.me/94770000000?text=Hi%20StyleVerse%2C%20I%27d%20like%20to%20order."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-extrabold backdrop-blur-md transition-all flex items-center gap-2 border border-emerald-400/30"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Order</span>
            </a>
          </div>

          {/* Trust Value Badges */}
          <div className="pt-6 border-t border-stone-800/80 flex flex-wrap items-center gap-6 text-xs text-stone-300 font-semibold">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Adult Sizes: M, L, XL, XXL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Free Ship &gt; Rs 10,000</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Cash on Delivery</span>
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

      {/* 3. Avurudu Season Sale Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-rose-950 text-white p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-indigo-800/40">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-400/30">
              <Tag className="w-3.5 h-3.5 text-amber-400" /> Season Clothing Special
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-amber-200">
              Avurudu Fashion Sale · Save up to 25%
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-medium">
              Upgrade your wardrobe with premium apparel for Adult Men, Adult Women, Boys, and Girls. Use promo code <span className="font-black text-amber-300 underline">AVURUDU25</span> for 25% OFF. Cash on Delivery available island-wide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              to="/products?onSale=true"
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs rounded-2xl shadow-xl transition-all uppercase tracking-wider"
            >
              Shop Season Sale
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
