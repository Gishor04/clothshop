import React from 'react';

export const ProductSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-slate-100 p-4 space-y-4 animate-pulse"
        >
          <div className="aspect-[3/4] bg-slate-200 rounded-xl w-full" />
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200 rounded w-3/4" />
            <div className="h-3 bg-slate-200 rounded w-1/2" />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="h-5 bg-slate-200 rounded w-16" />
            <div className="h-8 bg-slate-200 rounded-xl w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};
