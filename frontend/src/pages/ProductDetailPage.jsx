import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { ReviewsSection } from '../components/ReviewsSection';
import { ProductCard } from '../components/ProductCard';
import {
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  Star,
  CheckCircle,
  ChevronRight,
  Minus,
  Plus,
  MessageCircle,
  Zap,
  Ruler,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers
} from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeTabAccordion, setActiveTabAccordion] = useState('specs'); // 'specs' | 'shipping' | 'care'

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setSelectedImage(data.images?.[0] || FALLBACK_IMAGE);
          const available = data.sizes?.find((s) => s.stock > 0);
          if (available) setSelectedSize(available.size);

          // Save to Recently Viewed in localStorage
          const savedRecent = localStorage.getItem('cloth_shop_recent') || '[]';
          try {
            const list = JSON.parse(savedRecent).filter((item) => item._id !== data._id);
            localStorage.setItem('cloth_shop_recent', JSON.stringify([data, ...list].slice(0, 6)));
          } catch (e) {}

          // Fetch similar products
          const simRes = await fetch(`/api/products?category=${data.category}&limit=4`);
          if (simRes.ok) {
            const simData = await simRes.json();
            const list = Array.isArray(simData) ? simData : (simData.products || []);
            setSimilarProducts(list.filter((item) => item._id !== data._id).slice(0, 3));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-[500px] bg-slate-200 rounded-3xl" />
          <div className="space-y-6">
            <div className="h-8 bg-slate-200 rounded-xl w-3/4" />
            <div className="h-6 bg-slate-200 rounded-xl w-1/4" />
            <div className="h-32 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <Link to="/products" className="text-indigo-600 font-bold hover:underline">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const selectedSizeObj = product.sizes?.find((s) => s.size === selectedSize);
  const sizeStock = selectedSizeObj ? selectedSizeObj.stock : 0;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, quantity);
    navigate('/checkout');
  };

  const handleWhatsAppOrder = () => {
    const messageText = `Hi StyleVerse! I would like to order:\n🛍️ *Product:* ${product.name}\n📏 *Size:* ${selectedSize || 'Not specified'}\n🔢 *Quantity:* ${quantity}\n💵 *Total Price:* $${((product.price || 0) * quantity).toFixed(2)}\n🔗 *Item Link:* ${window.location.href}`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Estimated delivery date calculator (3-4 business days)
  const deliveryDateStart = new Date();
  deliveryDateStart.setDate(deliveryDateStart.getDate() + 3);
  const deliveryDateEnd = new Date();
  deliveryDateEnd.setDate(deliveryDateEnd.getDate() + 5);

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 pb-24 lg:pb-12">
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 capitalize">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/products?category=${product.category}`} className="hover:text-indigo-600">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Image Gallery with Hover Magnifier */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-slate-100 rounded-3xl overflow-hidden shadow-sm border border-slate-100 relative group">
            <img
              src={imgError ? FALLBACK_IMAGE : selectedImage}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Image Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(img);
                    setImgError(false);
                  }}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img ? 'border-indigo-600 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" onError={(e) => (e.target.src = FALLBACK_IMAGE)} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-3">
              {product.brand || 'StyleVerse'} &bull; {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
          </div>

          {/* Rating & Review Summary */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-slate-900 font-extrabold ml-1">{product.rating || 4.8}</span>
              <span className="text-slate-500">({product.numReviews || 38} reviews)</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-semibold capitalize">Color: <strong className="text-slate-900">{product.color}</strong></span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900">${product.price?.toFixed(2)}</span>
            {product.stockQuantity === 0 ? (
              <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2.5 py-1 rounded-md">
                Out of Stock
              </span>
            ) : product.stockQuantity <= 5 ? (
              <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-md animate-pulse">
                ⚡ Only {product.stockQuantity} items remaining!
              </span>
            ) : (
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                ✓ In Stock & Ready to Ship
              </span>
            )}
          </div>

          {/* Estimated Delivery Date Indicator */}
          <div className="flex items-center gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-700 font-semibold">
            <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              Estimated Express Delivery:{' '}
              <strong className="text-slate-900 font-bold">
                {formatDate(deliveryDateStart)} – {formatDate(deliveryDateEnd)}
              </strong>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-b border-slate-100 py-4">
            {product.description}
          </p>

          {/* Size Selector + Size Guide Popup Button */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-900">Select Size:</span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-indigo-600 hover:underline flex items-center gap-1 font-extrabold text-[11px]"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide & Chart</span>
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {product.sizes?.map((s) => (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => setSelectedSize(s.size)}
                  disabled={s.stock === 0}
                  className={`py-2.5 text-xs font-bold rounded-xl border transition-all flex flex-col items-center justify-center gap-0.5 ${
                    selectedSize === s.size
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                      : s.stock === 0
                      ? 'border-slate-200 bg-slate-50 text-slate-300 line-through cursor-not-allowed'
                      : 'border-slate-200 text-slate-800 hover:border-indigo-400 bg-white'
                  }`}
                >
                  <span>{s.size}</span>
                  <span className="text-[9px] opacity-75 font-normal">
                    {s.stock > 0 ? `${s.stock} left` : 'Sold'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-bold text-slate-900">Quantity:</span>
            <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-sm text-slate-900">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(sizeStock || 10, quantity + 1))}
                className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || sizeStock === 0}
                className="py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-indigo-700 text-white font-bold text-xs shadow-md disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!selectedSize || sizeStock === 0}
                className="py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-200 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>Buy Now (Instant Checkout)</span>
              </button>
            </div>

            {/* Direct WhatsApp Order Option */}
            <button
              onClick={handleWhatsAppOrder}
              type="button"
              className="w-full py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-100 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order via WhatsApp Direct</span>
            </button>
          </div>

          {/* Specifications Accordion Tabs */}
          <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
            <div className="border border-slate-100 rounded-2xl overflow-hidden">
              <button
                onClick={() =>
                  setActiveTabAccordion(activeTabAccordion === 'specs' ? '' : 'specs')
                }
                className="w-full p-4 text-left font-bold text-slate-900 bg-slate-50 flex justify-between items-center"
              >
                <span>Material & Fabric Care Specifications</span>
                {activeTabAccordion === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeTabAccordion === 'specs' && (
                <div className="p-4 bg-white text-slate-600 leading-relaxed space-y-1">
                  <p>• <strong>Material:</strong> 100% Sustainable Organic Cotton / Premium Denim Blend</p>
                  <p>• <strong>Fit Type:</strong> Tailored Modern Regular Fit</p>
                  <p>• <strong>Care Instructions:</strong> Machine wash cold with like colors, tumble dry low</p>
                </div>
              )}
            </div>

            <div className="border border-slate-100 rounded-2xl overflow-hidden">
              <button
                onClick={() =>
                  setActiveTabAccordion(activeTabAccordion === 'shipping' ? '' : 'shipping')
                }
                className="w-full p-4 text-left font-bold text-slate-900 bg-slate-50 flex justify-between items-center"
              >
                <span>Shipping Info & Free 30-Day Returns</span>
                {activeTabAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeTabAccordion === 'shipping' && (
                <div className="p-4 bg-white text-slate-600 leading-relaxed space-y-1">
                  <p>• <strong>Free Express Shipping:</strong> Available on orders over $75</p>
                  <p>• <strong>Returns Policy:</strong> Return or exchange within 30 days zero hassle</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together Bundle */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold">Frequently Bought Together</h3>
            <p className="text-xs text-slate-300">Bundle and save 15% on your complete outfit</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex items-center gap-4">
            <img
              src={selectedImage}
              alt=""
              className="w-20 h-24 object-cover rounded-xl bg-white border border-slate-700"
            />
            <span className="text-2xl font-bold text-amber-300">+</span>
            <img
              src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200"
              alt=""
              className="w-20 h-24 object-cover rounded-xl bg-white border border-slate-700"
            />
          </div>

          <div className="space-y-2 flex-1">
            <p className="text-sm font-bold">Total Bundle Price: <span className="text-amber-300 text-lg">${((product.price || 0) + 49.99).toFixed(2)}</span></p>
            <p className="text-xs text-slate-300">Includes {product.name} + Slim Fit Denim Pants</p>
            <button
              onClick={() => {
                addToCart(product, selectedSize || 'M', 1);
              }}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md"
            >
              Add Complete Bundle to Cart
            </button>
          </div>
        </div>
      </div>

      {/* You May Also Like / Similar Products */}
      {similarProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Customer Reviews Section */}
      <ReviewsSection rating={product.rating || 4.8} numReviews={product.numReviews || 38} />

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 block font-bold uppercase">Price</span>
          <span className="text-lg font-black text-slate-900">${product.price?.toFixed(2)}</span>
        </div>
        <div className="flex gap-2 flex-1">
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || sizeStock === 0}
            className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!selectedSize || sizeStock === 0}
            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
