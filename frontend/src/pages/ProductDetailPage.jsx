import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  Star,
  CheckCircle,
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setSelectedImage(data.images?.[0] || '');
          // Default select first size with stock > 0
          const available = data.sizes?.find((s) => s.stock > 0);
          if (available) setSelectedSize(available.size);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
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
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-slate-100 rounded-3xl overflow-hidden shadow-sm border border-slate-100">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img ? 'border-indigo-600 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-3">
              {product.brand} &bull; {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
          </div>

          {/* Rating & Color */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-slate-700 ml-1">4.9 (48 reviews)</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-semibold capitalize">Color: <strong className="text-slate-900">{product.color}</strong></span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900">${product.price?.toFixed(2)}</span>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
              In Stock & Ready to Ship
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-b border-slate-100 py-4">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-900">Select Size:</span>
              {selectedSize && (
                <span className="text-slate-500 font-normal">
                  {sizeStock > 0 ? `${sizeStock} items left in size ${selectedSize}` : 'Out of stock'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.sizes?.map((s) => (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => setSelectedSize(s.size)}
                  disabled={s.stock === 0}
                  className={`py-3 text-xs font-bold rounded-xl border transition-all flex flex-col items-center justify-center gap-0.5 ${
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

          {/* Quantity Controls & Add to Cart */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
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

            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || sizeStock === 0}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Cart</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>Fast 2-Day Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-indigo-600" />
              <span>Free 30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
