import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, X, Search, RotateCcw } from 'lucide-react';

export const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Filter States
  const categoryParam = searchParams.get('category') || '';
  const subCategoryParam = searchParams.get('subCategory') || '';
  const sizeParam = searchParams.get('size') || '';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategoryParam);
  const [selectedSize, setSelectedSize] = useState(sizeParam);
  const [selectedColor, setSelectedColor] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setSelectedSubCategory(searchParams.get('subCategory') || '');
    setSelectedSize(searchParams.get('size') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory) queryParams.set('category', selectedCategory);
        if (selectedSubCategory) queryParams.set('subCategory', selectedSubCategory);
        if (selectedSize) queryParams.set('size', selectedSize);
        if (selectedColor) queryParams.set('color', selectedColor);
        if (maxPrice < 200) queryParams.set('maxPrice', maxPrice);
        if (searchParam) queryParams.set('search', searchParam);
        if (sortBy) queryParams.set('sort', sortBy);
        queryParams.set('page', currentPage);
        queryParams.set('limit', 12);

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          // API returns { products: [...], total, pages } — always extract the array
          const list = Array.isArray(data) ? data : (data.products || []);
          setProducts(list);
          setTotalPages(data.pages || 1);
          setTotalCount(data.total || list.length);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategory, selectedSubCategory, selectedSize, selectedColor, maxPrice, searchParam, sortBy, currentPage]);

  // Reset to page 1 when filters change
  const resetPage = () => setCurrentPage(1);

  const updateCategoryFilter = (cat) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat) params.set('category', cat);
    else params.delete('category');
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedSize('');
    setSelectedColor('');
    setMaxPrice(200);
    setSortBy('newest');
    setSearchParams({});
  };

  const categories = [
    { label: 'All Categories', value: '' },
    { label: "Men's Clothing", value: 'men' },
    { label: "Women's Clothing", value: 'women' },
    { label: "Boys' (Kids Male)", value: 'boys' },
    { label: "Girls' (Kids Female)", value: 'girls' },
  ];

  const subCategories = [
    'shirts',
    'pants',
    'dresses',
    'jackets',
    'hoodies',
    't-shirts',
    'sweaters',
  ];

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '2-3Y', '4-5Y', '6-7Y', '8-9Y'];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header & Search Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 capitalize">
            {selectedCategory ? `${selectedCategory}'s Collection` : 'All Apparel & Clothing'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing <span className="font-bold text-slate-900">{products.length}</span> items
            {searchParam && <span> matching "{searchParam}"</span>}
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 text-slate-900 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6 sticky top-28">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-rose-500 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Categories Filter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Category</h3>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => updateCategoryFilter(cat.value)}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* SubCategories Filter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Type</h3>
            <div className="flex flex-wrap gap-1.5">
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(selectedSubCategory === sub ? '' : sub)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize border transition-all ${
                    selectedSubCategory === sub
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Size</h3>
            <div className="grid grid-cols-3 gap-1.5">
              {availableSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(selectedSize === sz ? '' : sz)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    selectedSize === sz
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-200 text-slate-700 hover:border-indigo-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Max Price</span>
              <span className="text-indigo-600">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-96 bg-slate-200 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Products Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find any clothing items matching your selected criteria. Try resetting filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-8 text-xs">
                  <span className="text-slate-500">
                    Showing <span className="font-bold text-slate-900">{products.length}</span> of <span className="font-bold text-slate-900">{totalCount}</span> items
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-4 py-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition"
                    >
                      Previous
                    </button>
                    <span className="px-3 font-bold text-slate-900">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="px-4 py-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-bold text-slate-900 text-sm">Filter Products</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">Category</h4>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      updateCategoryFilter(cat.value);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg ${
                      selectedCategory === cat.value ? 'bg-indigo-600 text-white' : 'text-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                clearAllFilters();
                setMobileFilterOpen(false);
              }}
              className="w-full py-2.5 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
