import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

export const SizeGuideModal = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState('men');

  if (!isOpen) return null;

  const sizeTables = {
    men: [
      { size: 'XS', chest: '34 - 36', waist: '28 - 30', neck: '14 - 14.5' },
      { size: 'S', chest: '36 - 38', waist: '30 - 32', neck: '15 - 15.5' },
      { size: 'M', chest: '38 - 40', waist: '32 - 34', neck: '16 - 16.5' },
      { size: 'L', chest: '41 - 43', waist: '35 - 37', neck: '17 - 17.5' },
      { size: 'XL', chest: '44 - 46', waist: '38 - 40', neck: '18 - 18.5' },
      { size: 'XXL', chest: '47 - 49', waist: '41 - 43', neck: '19 - 19.5' },
    ],
    women: [
      { size: 'XS', bust: '31 - 32', waist: '24 - 25', hip: '34 - 35' },
      { size: 'S', bust: '33 - 34', waist: '26 - 27', hip: '36 - 37' },
      { size: 'M', bust: '35 - 36', waist: '28 - 29', hip: '38 - 39' },
      { size: 'L', bust: '37 - 39', waist: '30 - 32', hip: '40 - 42' },
      { size: 'XL', bust: '40 - 42', waist: '33 - 35', hip: '43 - 45' },
      { size: 'XXL', bust: '43 - 45', waist: '36 - 38', hip: '46 - 48' },
    ],
    kids: [
      { size: '2-3Y', height: '35 - 38', chest: '20 - 21', waist: '19 - 20' },
      { size: '4-5Y', height: '39 - 43', chest: '22 - 23', waist: '21 - 21.5' },
      { size: '6-7Y', height: '44 - 48', chest: '24 - 25', waist: '22 - 22.5' },
      { size: '8-9Y', height: '49 - 53', chest: '26 - 27', waist: '23 - 24' },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 z-10">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Sizing Guide & Fit Chart</h3>
              <p className="text-xs text-slate-500">All measurements provided in inches (in)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 text-xs font-bold">
          {['men', 'women', 'kids'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 capitalize border-b-2 transition-all ${
                tab === t
                  ? 'border-indigo-600 text-indigo-600 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {t}'s Sizing
            </button>
          ))}
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-extrabold">
                <th className="p-3 rounded-l-xl">Size</th>
                {tab === 'men' && (
                  <>
                    <th className="p-3">Chest (in)</th>
                    <th className="p-3">Waist (in)</th>
                    <th className="p-3 rounded-r-xl">Neck (in)</th>
                  </>
                )}
                {tab === 'women' && (
                  <>
                    <th className="p-3">Bust (in)</th>
                    <th className="p-3">Waist (in)</th>
                    <th className="p-3 rounded-r-xl">Hip (in)</th>
                  </>
                )}
                {tab === 'kids' && (
                  <>
                    <th className="p-3">Height (in)</th>
                    <th className="p-3">Chest (in)</th>
                    <th className="p-3 rounded-r-xl">Waist (in)</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
              {sizeTables[tab].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-extrabold text-indigo-600">{row.size}</td>
                  {tab === 'men' && (
                    <>
                      <td className="p-3">{row.chest}</td>
                      <td className="p-3">{row.waist}</td>
                      <td className="p-3">{row.neck}</td>
                    </>
                  )}
                  {tab === 'women' && (
                    <>
                      <td className="p-3">{row.bust}</td>
                      <td className="p-3">{row.waist}</td>
                      <td className="p-3">{row.hip}</td>
                    </>
                  )}
                  {tab === 'kids' && (
                    <>
                      <td className="p-3">{row.height}</td>
                      <td className="p-3">{row.chest}</td>
                      <td className="p-3">{row.waist}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl text-[11px] text-slate-500 leading-relaxed">
          💡 <strong>Fit Tip:</strong> If your body measurements fall between two sizes, order the smaller size for a tighter, slim fit or the larger size for a relaxed, comfortable fit.
        </div>
      </div>
    </div>
  );
};
