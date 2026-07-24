import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          // API returns { products: [...], total, pages } — extract the array
          const list = Array.isArray(data) ? data : (data.products || []);
          setFeaturedProducts(list.slice(0, 8));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    {
      id: 'men',
      name: "Men's Collection",
      tagline: 'Tailored Suits, Casual Shirts & Denim',
      image: 'https://images.unsplash.com/photo-1490578474895-699bc4e2cf59?w=800&auto=format&fit=crop',
      count: '150+ Styles',
      path: '/products?category=men',
      color: 'from-blue-900/80 to-slate-950/90',
    },
    {
      id: 'women',
      name: "Women's Collection",
      tagline: 'Elegance & Contemporary Fashion',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop',
      count: '200+ Styles',
      path: '/products?category=women',
      color: 'from-rose-950/80 to-slate-950/90',
    },
    {
      id: 'boys',
      name: "Boys' Fashion (Kids)",
      tagline: 'Playful, Durable & Comfortable Apparel',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop',
      count: '90+ Styles',
      path: '/products?category=boys',
      color: 'from-amber-950/80 to-slate-950/90',
    },
    {
      id: 'girls',
      name: "Girls' Wear (Kids)",
      tagline: 'Vibrant Dresses, Knits & Cute Outfits',
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop',
      count: '110+ Styles',
      path: '/products?category=girls',
      color: 'from-purple-950/80 to-slate-950/90',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 text-white min-h-[500px] sm:min-h-[580px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl px-6 sm:px-12 lg:px-16 space-y-6 py-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>New Season 2026 Collection Released</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white">
            Redefine Your <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              Everyday Style
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
            Explore curated fashion for Men, Women, and Kids. Exceptional fabrics, perfect sizing options, and fast doorstep delivery.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/products"
              className="px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Shop All Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products?category=women"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold backdrop-blur-md transition-all border border-white/20"
            >
              Explore Women's
            </Link>
          </div>
        </div>
      </section>

      {/* Category Banners Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Browse by Category</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Shop Your Favorite Departments
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.path}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-80 group-hover:opacity-90 transition-opacity`} />

              <div className="relative z-10 text-white space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white inline-block">
                  {cat.count}
                </span>
                <h3 className="text-xl font-extrabold tracking-tight group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1">{cat.tagline}</p>
                <div className="pt-2 flex items-center text-xs font-bold text-indigo-300 group-hover:translate-x-1 transition-transform">
                  Shop Now &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Trending Now
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Arrivals
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Explore Catalog &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-slate-200 animate-pulse rounded-2xl" />
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
    </div>
  );
};
