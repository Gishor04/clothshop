import React from 'react';
import { useCompare } from '../context/CompareContext';
import { ArrowRightLeft, X, Check } from 'lucide-react';

export const CompareBar = () => {
  const { compareItems, removeFromCompare, clearCompare, setIsCompareOpen } = useCompare();

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-stone-900 text-white px-5 py-3.5 rounded-3xl shadow-2xl border border-stone-800 flex items-center gap-4 max-w-2xl w-11/12 animate-fade-in backdrop-blur-md">
      <div className="flex items-center gap-2">
        <ArrowRightLeft className="w-5 h-5 text-amber-400" />
        <div>
          <span className="text-xs font-black tracking-wide block">Compare Bags ({compareItems.length}/4)</span>
          <span className="text-[10px] text-stone-400">Side-by-side spec comparison</span>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto flex-1 py-1">
        {compareItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-1.5 bg-stone-800 px-2.5 py-1 rounded-xl text-xs border border-stone-700 flex-shrink-0"
          >
            <span className="font-semibold truncate max-w-[100px] text-[11px]">{item.name}</span>
            <button
              onClick={() => removeFromCompare(item._id)}
              className="text-stone-400 hover:text-white"
              title="Remove item"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsCompareOpen(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 flex-shrink-0"
        >
          Compare Now
        </button>

        <button
          onClick={clearCompare}
          className="text-stone-400 hover:text-stone-200 text-[10px] font-bold underline px-1"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
