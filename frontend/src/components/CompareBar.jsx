import React from 'react';
import { Layers, X, ArrowRight } from 'lucide-react';

export const CompareBar = ({ compareList, onClear, onOpenModal, onRemoveItem }) => {
  if (!compareList || compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-6 animate-bounce">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <p className="font-extrabold text-xs">Product Comparison ({compareList.length}/3)</p>
          <p className="text-[10px] text-slate-400">Select products to compare specs side-by-side</p>
        </div>
      </div>

      {/* Selected product thumbnails */}
      <div className="flex items-center gap-2">
        {compareList.map((item) => (
          <div key={item._id} className="relative group">
            <img
              src={item.images?.[0]}
              alt=""
              className="w-9 h-11 object-cover rounded-lg border border-slate-700 bg-slate-800"
            />
            <button
              onClick={() => onRemoveItem(item._id)}
              className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-0.5 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenModal}
          disabled={compareList.length < 2}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <span>Compare Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onClear}
          className="text-xs text-slate-400 hover:text-white font-bold p-2"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
