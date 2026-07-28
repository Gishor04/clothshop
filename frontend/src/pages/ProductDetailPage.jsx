import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { ProductCard } from '../components/ProductCard';
import { ReviewsSection } from '../components/ReviewsSection';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { SeoMeta } from '../components/SeoMeta';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import {
  ShoppingBag,
  Heart,
  ArrowRightLeft,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  ZoomIn,
  Check,
  Phone,
  Ruler
} from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [activeTab, setActiveTab] = useState('specs');
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setSelectedImage(data.images?.[0] || FALLBACK_IMAGE);
          setSelectedSize(data.sizes?.[0]?.size || 'M');
          setSelectedColor(data.colors?.[0]?.name || data.color || 'Standard');

          const relRes = await fetch('/api/products');
          if (relRes.ok) {
            const relData = await relRes.json();
            const list = Array.isArray(relData) ? relData : (relData.products || []);
            setRelatedProducts(list.filter((p) => p._id !== data._id).slice(0, 4));
          }
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log('Using local clothing dataset fallback...');
      }

      // Local fallback
      const found = MOCK_PRODUCTS.find((p) => p._id === id) || MOCK_PRODUCTS[0];
      setProduct(found);
      setSelectedImage(found.images?.[0] || FALLBACK_IMAGE);
      setSelectedSize(found.sizes?.[0]?.size || 'M');
      setSelectedColor(found.colors?.[0]?.name || found.color || 'Standard');

      setRelatedProducts(MOCK_PRODUCTS.filter((p) => p._id !== found._id).slice(0, 4));
      setLoading(false);
    };

    fetchProductDetails();
  }, [id]);

  if (loading || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-stone-500 font-bold">Loading clothing details...</p>
      </div>
    );
  }

  const isLiked = isInWishlist(product._id);
  const isCompared = isInCompare(product._id);
  const images = product.images?.length > 0 ? product.images : [FALLBACK_IMAGE];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 font-['Plus_Jakarta_Sans',sans-serif]">
      <SeoMeta
        title={`${product.name} — ${product.targetAudience || 'Apparel'} | StyleVerse`}
        description={`${product.description} Fabric: ${product.fabric}. Available Adult Sizes: M, L, XL, XXL.`}
        ogImage={selectedImage || images[0]}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-semibold">
        <Link to="/" className="hover:text-stone-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link to="/products" className="hover:text-stone-900">Products</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link to={`/products?category=${product.category}`} className="hover:text-stone-900 capitalize">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Photo Gallery with Lightbox Zoom */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-stone-100 rounded-3xl overflow-hidden shadow-lg border border-stone-200 group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
              onClick={() => setIsZoomOpen(true)}
            />

            <button
              onClick={() => setIsZoomOpen(true)}
              className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-md text-stone-800 hover:bg-stone-900 hover:text-white transition-colors"
              title="Click to Zoom Fullscreen"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          {/* Gallery Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-stone-100 ${
                    selectedImage === img ? 'border-indigo-600 shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Controls & Specs */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-indigo-700 font-extrabold uppercase tracking-widest mb-1">
              <span>{product.brand || 'StyleVerse Apparel'}</span>
              <span className="text-stone-400 capitalize">{product.targetAudience || product.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="text-xs font-black text-stone-900">{product.rating || 4.9}</span>
              </div>
              <span className="text-xs text-stone-500 font-bold">
                ({product.numReviews || 38} verified customer reviews)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-baseline gap-3">
            <span className="text-3xl font-black text-stone-900">
              Rs. {(product.price || 0).toLocaleString('en-US')}.00
            </span>
            {product.originalPrice && (
              <span className="text-sm text-stone-400 line-through font-semibold">
                Rs. {product.originalPrice.toLocaleString('en-US')}.00
              </span>
            )}
            {product.discount > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-black bg-indigo-600 text-white rounded-full uppercase tracking-wider ml-auto">
                Save {product.discount}%
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">{product.description}</p>

          {/* Size Selector (Adults: M, L, XL, XXL) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase text-stone-800">
                Select Size: <span className="text-indigo-600 font-bold">{selectedSize}</span>
              </label>
              <button
                type="button"
                onClick={() => setShowSizeGuide(true)}
                className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
              >
                <Ruler className="w-4 h-4 text-indigo-600" /> Size Chart
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((s) => (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => setSelectedSize(s.size)}
                  disabled={s.stock === 0}
                  className={`px-4 py-2.5 text-xs font-black rounded-2xl border transition-all ${
                    selectedSize === s.size
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                      : s.stock === 0
                      ? 'border-stone-200 text-stone-300 line-through cursor-not-allowed bg-stone-50'
                      : 'border-stone-200 text-stone-700 hover:border-indigo-500 bg-white'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric & Fit Pills */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">Fabric Composition</span>
              <span className="font-extrabold text-stone-900 truncate block">{product.fabric || '100% Cotton'}</span>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">Fit Profile</span>
              <span className="font-extrabold text-stone-900 truncate block">{product.fit || 'Regular Fit'}</span>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-stone-700">Quantity:</span>
              <div className="flex items-center border border-stone-300 rounded-2xl overflow-hidden bg-stone-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-stone-600 font-bold hover:bg-stone-200 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-black text-stone-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2 text-stone-600 font-bold hover:bg-stone-200 transition-colors"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-emerald-700 font-extrabold">✓ In Stock</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className="flex-1 py-4 bg-stone-900 hover:bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 uppercase tracking-wider"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Cart</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded-2xl border transition-all ${
                  isLiked ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600' : ''}`} />
              </button>

              <button
                onClick={() => toggleCompare(product)}
                className={`p-4 rounded-2xl border transition-all ${
                  isCompared ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
                title="Compare Specs"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>

            <a
              href={`https://wa.me/94770000000?text=Hi%20StyleVerse%2C%20I%27d%20like%20to%20order%20the%20${encodeURIComponent(product.name)}%20in%20size%20${selectedSize}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Phone className="w-4 h-4" /> Order This Outfit via WhatsApp
            </a>
          </div>

          {/* Delivery & Guarantee Accordions */}
          <div className="space-y-3 pt-6 border-t border-stone-200">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-stone-900">
                <Truck className="w-4 h-4 text-indigo-600" />
                <span>Island-Wide Delivery Information</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Standard delivery takes 1-3 business days across Sri Lanka (Free over Rs. 10,000). Cash on Delivery (COD) available island-wide.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-stone-900">
                <RotateCcw className="w-4 h-4 text-emerald-700" />
                <span>14-Day Free Size Exchange</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                If the size is not perfect, we offer 14-day hassle-free exchanges with free return pickup across Sri Lanka.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Reviews Section */}
      <ReviewsSection rating={product.rating || 4.9} numReviews={product.numReviews || 38} />

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">Complete Your Wardrobe</h2>
            <Link to="/products" className="text-xs font-black text-indigo-600 hover:underline">
              View All Apparel &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <SizeGuideModal
          isOpen={showSizeGuide}
          onClose={() => setShowSizeGuide(false)}
          category={product.category}
        />
      )}

      {/* Zoom Lightbox */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 text-white text-sm font-bold bg-white/10 p-3 rounded-full hover:bg-white/20"
          >
            Close ✕
          </button>
          <img src={selectedImage} alt={product.name} className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
        </div>
      )}

    </div>
  );
};
