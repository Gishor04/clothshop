import React from 'react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Star, Check, Trash2 } from 'lucide-react';

export const CompareModal = () => {
  const { compareItems, isCompareOpen, setIsCompareOpen, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  if (!isCompareOpen || compareItems.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-900/10 my-8 p-6 sm:p-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-stone-900">Product Comparison</h2>
            <p className="text-xs text-stone-500 mt-0.5">Compare specs, materials, dimensions, and craftsmanship across items.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-900 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-400 w-1/5">Attribute</th>
                {compareItems.map((product) => (
                  <th key={product._id} className="p-3 w-1/4 align-top">
                    <div className="relative group">
                      <button
                        onClick={() => removeFromCompare(product._id)}
                        className="absolute top-0 right-0 p-1 bg-stone-100 text-stone-500 hover:bg-rose-600 hover:text-white rounded-full transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full aspect-[4/5] object-cover rounded-2xl bg-stone-100 mb-2 shadow-sm"
                      />
                      <h3 className="font-extrabold text-sm text-stone-900 line-clamp-1">{product.name}</h3>
                      <span className="text-xs font-bold text-amber-800">
                        Rs. {(product.price || 0).toLocaleString('en-US')}.00
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              <tr>
                <td className="p-3 font-extrabold text-stone-700 bg-stone-50/50">Brand</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3 font-semibold text-stone-800">{item.brand || 'Kottuba Leather'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-extrabold text-stone-700 bg-stone-50/50">Category</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3 capitalize font-semibold text-stone-800">{item.category}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-extrabold text-stone-700 bg-stone-50/50">Material</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3 font-semibold text-stone-800">{item.material || 'Full-Grain Leather'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-extrabold text-stone-700 bg-stone-50/50">Dimensions</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3 font-semibold text-stone-800">{item.dimensions || '38 x 28 x 10 cm'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-extrabold text-stone-700 bg-stone-50/50">Weight</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3 font-semibold text-stone-800">{item.weight || '1.1 kg'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-extrabold text-stone-700 bg-stone-50/50">Capacity</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3 font-semibold text-stone-800">{item.capacity || '14 L'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-extrabold text-stone-700 bg-stone-50/50">Rating</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3">
                    <div className="flex items-center gap-1 font-bold text-stone-800">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{item.rating || 4.9}</span>
                      <span className="text-[10px] text-stone-400 font-normal">({item.numReviews || 24})</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-extrabold text-stone-700 bg-stone-50/50">Stock Status</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                      item.stockQuantity > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {item.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-extrabold text-stone-700 bg-stone-50/50">Action</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3">
                    <button
                      onClick={() => {
                        addToCart(item);
                        setIsCompareOpen(false);
                      }}
                      className="w-full py-2 bg-amber-900 hover:bg-amber-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
