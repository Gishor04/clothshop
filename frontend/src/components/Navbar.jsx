import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { MegaMenu } from './MegaMenu';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  Phone,
  Sparkles,
  ArrowRightLeft,
  ChevronDown,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItemCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareItems } = useCompare();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFiltered, setSearchFiltered] = useState([]);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.fabric || '').toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
      setSearchFiltered(filtered);
    } else {
      setSearchFiltered([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Announcement Bar */}
      <div className="bg-stone-950 text-stone-200 text-[11px] font-semibold py-2 px-4 flex items-center justify-between border-b border-stone-800">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1 text-amber-400 font-bold">
              <Sparkles className="w-3 h-3" /> Kaithady Avurudu Sale: Save 25% with Code AVURUDU25
            </span>
            <span className="inline-flex items-center gap-1 text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Free Island-Wide Shipping over Rs. 10,000
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-stone-400">
            <a
              href="https://wa.me/94770000000?text=Hi%20Kaithady%20Clothing%20Boutique%2C%20I%27d%20like%20to%20order."
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1 font-bold transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" /> WhatsApp Order: +94 77 000 0000
            </a>
            <Link to="/contact" className="hover:text-white transition-colors hidden md:inline">
              Store Locator
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-stone-200 py-3'
            : 'bg-white border-b border-stone-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="group flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-700 text-white font-black text-xl flex items-center justify-center shadow-md group-hover:bg-indigo-600 transition-all">
                K
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-stone-900 leading-none group-hover:text-indigo-700 transition-colors">
                  KAITHADY
                </span>
                <span className="text-[9px] uppercase tracking-widest font-black text-indigo-700">
                  Clothing Boutique
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 text-xs font-black uppercase tracking-wider text-stone-700">
              <Link to="/products" className="hover:text-indigo-700 transition-colors">
                Shop All
              </Link>
              
              <button
                onMouseEnter={() => setMegaMenuOpen(true)}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="flex items-center gap-1 hover:text-indigo-700 transition-colors py-2"
              >
                <span>Departments</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <Link to="/products?category=men" className="hover:text-indigo-700 transition-colors text-indigo-950 font-black">
                Adult Men (M-XXL)
              </Link>
              <Link to="/products?category=women" className="hover:text-rose-700 transition-colors text-rose-950 font-black">
                Adult Women (M-XXL)
              </Link>
              <Link to="/products?category=boys" className="hover:text-amber-700 transition-colors text-amber-950">
                Child Men (Boys)
              </Link>
              <Link to="/products?category=girls" className="hover:text-purple-700 transition-colors text-purple-950">
                Child Women (Girls)
              </Link>

              <Link
                to="/products?onSale=true"
                className="text-amber-600 hover:text-amber-800 flex items-center gap-1 transition-colors font-black"
              >
                <Tag className="w-3.5 h-3.5" /> Special Offers
              </Link>
            </div>
          </div>

          {/* Right Actions Bar */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-stone-100 text-stone-700 transition-colors"
              title="Search Clothing"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/wishlist"
              className="p-2.5 rounded-full hover:bg-stone-100 text-stone-700 transition-colors relative"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {compareItems.length > 0 && (
              <button
                onClick={() => navigate('/products')}
                className="p-2.5 rounded-full hover:bg-stone-100 text-stone-700 transition-colors relative hidden sm:block"
                title="Compare Apparel"
              >
                <ArrowRightLeft className="w-5 h-5 text-indigo-700" />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-700 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  {compareItems.length}
                </span>
              </button>
            )}

            <button
              onClick={openCartDrawer}
              className="p-2.5 rounded-2xl bg-indigo-700 hover:bg-indigo-600 text-white transition-all shadow-md flex items-center gap-2 active:scale-95"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-black hidden sm:inline">{totalItemCount}</span>
            </button>

            {/* User Account Menu */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-stone-100 text-stone-800 font-bold text-xs"
                >
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-black text-xs flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline line-clamp-1">{user.name}</span>
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="p-2.5 rounded-full hover:bg-stone-100 text-stone-700 transition-colors block"
                  title="Sign In / Register"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              {profileDropdownOpen && user && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-fade-in text-xs font-semibold"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="font-extrabold text-stone-900">{user.name}</p>
                    <p className="text-[10px] text-stone-400 truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/orders"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="block px-4 py-2 text-stone-700 hover:bg-stone-50 hover:text-indigo-700"
                  >
                    My Kaithady Orders
                  </Link>

                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-indigo-700 font-bold hover:bg-indigo-50"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-bold"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full hover:bg-stone-100 text-stone-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-700 text-white font-black flex items-center justify-center text-base">
                    K
                  </div>
                  <span className="font-black text-lg text-stone-900">KAITHADY BOUTIQUE</span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-stone-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-3 font-extrabold text-sm text-stone-800">
                <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b">
                  Shop All Apparel
                </Link>
                <Link to="/products?category=men" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b text-indigo-700">
                  Adult Men's Collection (M, L, XL, XXL)
                </Link>
                <Link to="/products?category=women" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b text-rose-700">
                  Adult Women's Collection (M, L, XL, XXL)
                </Link>
                <Link to="/products?category=boys" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b text-amber-700">
                  Child Men's Fashion (Boys)
                </Link>
                <Link to="/products?category=girls" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b text-purple-700">
                  Child Women's Wear (Girls)
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b">
                  Store Hours &amp; Location
                </Link>
              </nav>
            </div>

            <div className="space-y-3 pt-6 border-t">
              <a
                href="https://wa.me/94770000000?text=Hi%20Kaithady%20Clothing%20Boutique%2C%20I%27d%20like%20to%20order."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <Phone className="w-4 h-4" /> Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Live Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200">
            <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
              <Search className="w-5 h-5 text-stone-400" />
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <input
                  type="text"
                  autoFocus
                  placeholder="Search Kaithady clothing (e.g. Oxford, Silk Dress, Jeans, Hoodie)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-stone-900 focus:outline-none"
                />
              </form>
              <button onClick={() => setSearchOpen(false)} className="p-2 text-stone-400 hover:text-stone-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {searchQuery.trim().length <= 1 ? (
                <div className="py-6 text-center text-xs text-stone-400 font-semibold">
                  Search Kaithady Adult (M-XXL) &amp; Kids clothing collection...
                </div>
              ) : searchFiltered.length === 0 ? (
                <div className="py-8 text-center text-xs text-stone-500 font-bold">
                  No matching apparel found for "{searchQuery}".
                </div>
              ) : (
                searchFiltered.map((p) => (
                  <Link
                    key={p._id}
                    to={`/product/${p._id}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200"
                  >
                    <img src={p.images?.[0]} alt={p.name} className="w-14 h-16 object-cover rounded-xl bg-stone-100" />
                    <div>
                      <h4 className="font-extrabold text-xs text-stone-900">{p.name}</h4>
                      <span className="text-[10px] text-indigo-700 capitalize font-bold">{p.targetAudience || p.category}</span>
                      <span className="font-black text-xs text-stone-900 block mt-0.5">
                        Rs. {(p.price || 0).toLocaleString('en-US')}.00
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
