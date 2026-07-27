import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { MegaMenu } from './MegaMenu';
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  ShieldAlert,
  Package,
  LogOut,
  ChevronDown,
  Sparkles,
  Heart,
  Flame,
  Clock
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItemCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const searchRef = useRef(null);

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem('cloth_shop_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Live autocomplete search effect
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery.trim())}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : (data.products || []);
          setSearchResults(list);
          setShowDropdown(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = searchQuery.trim();
      // Add to recent searches
      const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('cloth_shop_recent_searches', JSON.stringify(updated));

      navigate(`/products?search=${encodeURIComponent(query)}`);
      setShowDropdown(false);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navCategories = [
    { name: 'Men', path: '/products?category=men', megaKey: 'men' },
    { name: 'Women', path: '/products?category=women', megaKey: 'women' },
    { name: "Boys & Girls (Kids)", path: '/products?category=boys', megaKey: 'kids' },
    { name: 'All Collection', path: '/products', megaKey: null },
  ];

  const subCategoryQuickLinks = [
    { label: '👖 Pants & Jeans', subCategory: 'pants' },
    { label: '👔 Shirts', subCategory: 'shirts' },
    { label: '👗 Dresses', subCategory: 'dresses' },
    { label: '🧥 Jackets & Blazers', subCategory: 'jackets' },
    { label: '👕 T-Shirts & Tops', subCategory: 't-shirts' },
    { label: '🧥 Hoodies', subCategory: 'hoodies' },
  ];

  const trendingSearches = ['Denim Jeans', 'Cotton Shirt', 'Silk Dress', 'Leather Jacket'];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Banner Announcement */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Summer Fashion Sale: Extra 20% OFF with code <strong className="text-amber-300">STYLE20</strong> | Free Shipping over $75</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
              StyleVerse
            </span>
          </Link>

          {/* Desktop Category Navigation with MegaMenu Triggers */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold relative">
            {navCategories.map((cat) => {
              const isActive = location.pathname + location.search === cat.path;
              return (
                <div
                  key={cat.name}
                  onMouseEnter={() => cat.megaKey && setActiveMegaCategory(cat.megaKey)}
                  className="py-6"
                >
                  <Link
                    to={cat.path}
                    className={`transition-colors py-1 relative ${
                      isActive ? 'text-indigo-600' : 'text-slate-700 hover:text-indigo-600'
                    }`}
                  >
                    {cat.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Search Bar & User Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Desktop Search Bar with Live Autocomplete & History */}
            <div className="hidden md:block relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search pants, shirts, dresses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  className="w-48 lg:w-64 pl-9 pr-4 py-2 text-xs rounded-full bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </form>

              {/* Search Suggestions & Trending Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 p-3 space-y-3 w-80">
                  {searchQuery.trim().length >= 2 ? (
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        {isSearching ? 'Searching...' : searchResults.length > 0 ? 'Matching Products' : 'No Results Found'}
                      </div>

                      {searchResults.map((item) => (
                        <Link
                          key={item._id}
                          to={`/product/${item._id}`}
                          onClick={() => {
                            setShowDropdown(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <img
                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200'}
                            alt=""
                            className="w-10 h-12 object-cover rounded-lg bg-slate-100 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                            <p className="text-[10px] text-slate-500 capitalize">{item.brand} &bull; {item.category}</p>
                          </div>
                          <span className="text-xs font-extrabold text-indigo-600">${item.price?.toFixed(2)}</span>
                        </Link>
                      ))}

                      {searchQuery.trim() && (
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full text-center text-xs font-bold text-indigo-600 hover:bg-indigo-50 py-2 rounded-xl transition-colors mt-1"
                        >
                          See all results for "{searchQuery}" &rarr;
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs">
                      {/* Recent searches */}
                      {recentSearches.length > 0 && (
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" /> Recent Searches
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {recentSearches.map((term) => (
                              <button
                                key={term}
                                onClick={() => {
                                  setSearchQuery(term);
                                  navigate(`/products?search=${encodeURIComponent(term)}`);
                                  setShowDropdown(false);
                                }}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Trending searches */}
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-500" /> Trending Searches
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {trendingSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => {
                                setSearchQuery(term);
                                navigate(`/products?search=${encodeURIComponent(term)}`);
                                setShowDropdown(false);
                              }}
                              className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-bold"
                            >
                              🔥 {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/products"
              className="p-2.5 rounded-full hover:bg-slate-100 text-slate-700 relative transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Icon (Triggers Cart Drawer) */}
            <button
              onClick={openCartDrawer}
              className="p-2.5 rounded-full hover:bg-slate-100 text-slate-700 relative transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* User Account / Auth Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-xs"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-slate-500 truncate">{user.email}</p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 font-bold rounded text-[10px]">
                          Admin Access
                        </span>
                      )}
                    </div>

                    <Link
                      to="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      My Orders
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-rose-600 hover:bg-rose-50 font-medium transition-colors border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition-all shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>

        {/* SubCategory Quick Navigation Bar */}
        <div className="border-t border-slate-100 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2 text-xs">
          <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px] shrink-0 mr-1">
            Popular Types:
          </span>
          {subCategoryQuickLinks.map((item) => (
            <Link
              key={item.subCategory}
              to={`/products?subCategory=${item.subCategory}`}
              className="shrink-0 px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 font-bold transition-all text-[11px]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* MegaMenu Dropdown */}
      {activeMegaCategory && (
        <MegaMenu
          category={activeMegaCategory}
          onClose={() => setActiveMegaCategory(null)}
        />
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-4 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search pants, shirts, dresses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </form>

          <nav className="space-y-1">
            {navCategories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
