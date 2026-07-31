import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { CompareBar } from '../components/CompareBar';
import { CompareModal } from '../components/CompareModal';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { SEO } from '../components/SEO';
import { generateBreadcrumbSchema } from '../utils/seoHelpers';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, ADULT_SIZES } from '../data/mockProducts';
import { Filter, X, SlidersHorizontal, Search, RefreshCw, Ruler } from 'lucide-react';

export const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState(15000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOnSale, setOnlyOnSale] = useState(searchParams.get('onSale') === 'true');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    const s = searchParams.get('search');
    const c = searchParams.get('category');
    const sale = searchParams.get('onSale');
    if (s) setSearchTerm(s);
    if (c) setSelectedCategory(c);
    if (sale === 'true') setOnlyOnSale(true);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : (data.products || []);
          if (list.length > 0) {
            setProducts(list);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.log('Using local clothing dataset fallback...');
      }

      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search term
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchFabric = (product.fabric || '').toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchFabric) return false;
        }

        // Category / Audience
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Size Filter (e.g. M, L, XL, XXL)
        if (selectedSize !== 'all') {
          const hasSize = product.sizes?.some((s) => s.size === selectedSize && s.stock > 0);
          if (!hasSize) return false;
        }

        // Brand
        if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
          return false;
        }

        // Price
        if (product.price > priceRange) {
          return false;
        }

        // Stock
        if (onlyInStock && product.stockQuantity <= 0) {
          return false;
        }

        // On Sale
        if (onlyOnSale && (!product.discount || product.discount === 0)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'bestseller') return (b.numReviews || 0) - (a.numReviews || 0);
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedSize,
    selectedBrand,
    priceRange,
    onlyInStock,
    onlyOnSale,
    sortBy,
  ]);

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSize('all');
    setSelectedBrand('all');
    setPriceRange(15000);
    setOnlyInStock(false);
    setOnlyOnSale(false);
    setSortBy('newest');
    setSearchParams({});
  };

  const hasActiveFilters =
    Boolean(searchTerm) ||
    selectedCategory !== 'all' ||
    selectedSize !== 'all' ||
    selectedBrand !== 'all' ||
    priceRange < 15000 ||
    onlyInStock ||
    onlyOnSale;

  const categoryTitleMap = {
    men: "Adult Men's Collection (M-XXL)",
    women: "Adult Women's Collection (M-XXL)",
    boys: "Boys' Fashion Collection (Child)",
    girls: "Girls' Fashion Collection (Child)",
    all: 'Clothing Catalog'
  };

  const dynamicTitle = categoryTitleMap[selectedCategory] || 'Clothing Catalog';

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
  ];
  if (selectedCategory !== 'all') {
    breadcrumbs.push({ name: dynamicTitle, url: `/products?category=${selectedCategory}` });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <SEO
        title={dynamicTitle}
        description={`Explore Kaithady Boutique's ${dynamicTitle}. Premium fabrics, accurate sizes (M-XXL for Adults), island-wide delivery and COD.`}
        schema={generateBreadcrumbSchema(breadcrumbs)}
      />

      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-stone-800">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest">
            Adult (M, L, XL, XXL) &amp; Kids Apparel
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-amber-100">
            Clothing &amp; Fashion Catalog
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-medium">
            Explore 100% organic cotton tees, Oxford shirts, silk wrap dresses, denim jeans, and kidwear.
          </p>
        </div>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        
        {/* Search Input Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search shirts, dresses, jeans, hoodies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Sort & Mobile Toggle */}
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <button
            onClick={() => setShowSizeGuide(true)}
            className="px-3.5 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Ruler className="w-4 h-4 text-indigo-600" /> Size Chart
          </button>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden px-4 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filter ({filteredProducts.length})
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-extrabold text-stone-800 focus:outline-none focus:border-indigo-600"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="bestseller">Best Selling</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Active Filter Pills Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold">
          <span className="text-stone-400 font-bold uppercase text-[10px]">Active Filters:</span>
          
          {selectedCategory !== 'all' && (
            <span className="px-3 py-1 bg-indigo-100 text-indigo-900 rounded-full flex items-center gap-1 font-bold">
              Department: {selectedCategory}
              <button onClick={() => setSelectedCategory('all')}><X className="w-3 h-3" /></button>
            </span>
          )}

          {selectedSize !== 'all' && (
            <span className="px-3 py-1 bg-rose-100 text-rose-900 rounded-full flex items-center gap-1 font-bold">
              Size: {selectedSize}
              <button onClick={() => setSelectedSize('all')}><X className="w-3 h-3" /></button>
            </span>
          )}

          {onlyOnSale && (
            <span className="px-3 py-1 bg-amber-500 text-stone-950 rounded-full flex items-center gap-1 font-bold">
              Season Sale
              <button onClick={() => setOnlyOnSale(false)}><X className="w-3 h-3" /></button>
            </span>
          )}

          <button
            onClick={resetAllFilters}
            className="text-indigo-600 hover:underline font-extrabold text-xs ml-2 flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Reset All Filters
          </button>
        </div>
      )}

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs h-fit">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="font-black text-sm uppercase tracking-wider text-stone-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" /> Filter Apparel
            </h3>
            {hasActiveFilters && (
              <button onClick={resetAllFilters} className="text-[10px] font-bold text-rose-600 hover:underline">
                Clear All
              </button>
            )}
          </div>

          {/* Audience / Department Filter */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-stone-400 tracking-wider">Department</label>
            <div className="space-y-1 text-xs font-semibold text-stone-700">
              {MOCK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white font-black shadow-sm'
                      : 'hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-70">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Adult Size Filter (M, L, XL, XXL) */}
          <div className="space-y-2 border-t pt-4">
            <label className="text-xs font-black uppercase text-stone-400 tracking-wider">
              Adult Size (M, L, XL, XXL)
            </label>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <button
                onClick={() => setSelectedSize('all')}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  selectedSize === 'all'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
              >
                All Sizes
              </button>
              {ADULT_SIZES.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                    selectedSize === sz
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm font-black'
                      : 'border-stone-200 text-stone-700 hover:border-indigo-500'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between items-center text-xs font-black text-stone-900">
              <span>Max Price:</span>
              <span className="text-indigo-600">Rs. {priceRange.toLocaleString('en-US')}.00</span>
            </div>
            <input
              type="range"
              min={3000}
              max={20000}
              step={500}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-bold text-stone-400">
              <span>Rs. 3,000</span>
              <span>Rs. 20,000</span>
            </div>
          </div>

          {/* Availability Toggles */}
          <div className="space-y-2 border-t pt-4 text-xs font-bold text-stone-800">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-600"
              />
              <span>In Stock Only</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyOnSale}
                onChange={(e) => setOnlyOnSale(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-600"
              />
              <span className="text-amber-600">Avurudu Sale Items Only</span>
            </label>
          </div>

        </aside>

        {/* Product Catalog Grid */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>Showing {filteredProducts.length} clothing items</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-96 bg-stone-200 animate-pulse rounded-3xl" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-stone-900">No Clothing Found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                We couldn't find any items matching your selected criteria. Try adjusting your size or department filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-3 bg-indigo-600 text-white font-bold text-xs rounded-2xl shadow-md hover:bg-indigo-500 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>

      {/* Comparison Tools */}
      <CompareBar />
      <CompareModal />

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
      )}

      {/* Mobile Filter Drawer Overlay */}
      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-black text-base text-stone-900">Filter Apparel</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 text-stone-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-stone-400">Department</label>
              <div className="space-y-1 text-xs font-semibold">
                {MOCK_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setMobileFiltersOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl ${
                      selectedCategory === cat.id ? 'bg-indigo-600 text-white font-bold' : 'text-stone-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3.5 bg-indigo-600 text-white font-bold text-xs rounded-2xl shadow-lg"
            >
              Apply Filters ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
