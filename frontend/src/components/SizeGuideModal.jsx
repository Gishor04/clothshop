import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';

export const SizeGuideModal = ({ isOpen, onClose, category = 'men' }) => {
  const [activeTab, setActiveTab] = useState(
    category === 'women' ? 'women' : category === 'boys' ? 'boys' : category === 'girls' ? 'girls' : 'men'
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-6 h-6 text-indigo-600" />
            <div>
              <h2 className="text-xl font-black text-stone-900">Official Clothing Size Chart</h2>
              <p className="text-xs text-stone-500">Find your ideal fit for Adult &amp; Kids collections.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-900 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex bg-stone-100 p-1 rounded-2xl text-xs font-bold gap-1">
          <button
            onClick={() => setActiveTab('men')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'men' ? 'bg-indigo-600 text-white shadow-sm font-black' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Adult Men (M, L, XL, XXL)
          </button>

          <button
            onClick={() => setActiveTab('women')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'women' ? 'bg-rose-600 text-white shadow-sm font-black' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Adult Women (M, L, XL, XXL)
          </button>

          <button
            onClick={() => setActiveTab('boys')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'boys' ? 'bg-amber-600 text-white shadow-sm font-black' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Child Men (Boys)
          </button>

          <button
            onClick={() => setActiveTab('girls')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'girls' ? 'bg-purple-600 text-white shadow-sm font-black' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Child Women (Girls)
          </button>
        </div>

        {/* Size Chart Tables */}
        <div className="overflow-x-auto">
          {activeTab === 'men' && (
            <div className="space-y-3">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-indigo-700">
                Adult Men Size Chart (Inches / cm)
              </h3>
              <table className="w-full text-left text-xs border-collapse border border-stone-200">
                <thead>
                  <tr className="bg-stone-900 text-white">
                    <th className="p-3">Size Tag</th>
                    <th className="p-3">Chest (inches)</th>
                    <th className="p-3">Waist (inches)</th>
                    <th className="p-3">Neck (inches)</th>
                    <th className="p-3">Body Length (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-medium">
                  <tr className="bg-stone-50/50">
                    <td className="p-3 font-black text-indigo-700">M (Medium)</td>
                    <td className="p-3">38" - 40"</td>
                    <td className="p-3">32" - 34"</td>
                    <td className="p-3">15.5"</td>
                    <td className="p-3">72 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-indigo-700">L (Large)</td>
                    <td className="p-3">41" - 43"</td>
                    <td className="p-3">35" - 37"</td>
                    <td className="p-3">16.5"</td>
                    <td className="p-3">74 cm</td>
                  </tr>
                  <tr className="bg-stone-50/50">
                    <td className="p-3 font-black text-indigo-700">XL (Extra Large)</td>
                    <td className="p-3">44" - 46"</td>
                    <td className="p-3">38" - 40"</td>
                    <td className="p-3">17.5"</td>
                    <td className="p-3">76 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-indigo-700">XXL (Double XL)</td>
                    <td className="p-3">47" - 49"</td>
                    <td className="p-3">41" - 43"</td>
                    <td className="p-3">18.5"</td>
                    <td className="p-3">78 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'women' && (
            <div className="space-y-3">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-rose-700">
                Adult Women Size Chart (Inches / cm)
              </h3>
              <table className="w-full text-left text-xs border-collapse border border-stone-200">
                <thead>
                  <tr className="bg-stone-900 text-white">
                    <th className="p-3">Size Tag</th>
                    <th className="p-3">Bust (inches)</th>
                    <th className="p-3">Waist (inches)</th>
                    <th className="p-3">Hips (inches)</th>
                    <th className="p-3">Dress Length (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-medium">
                  <tr className="bg-stone-50/50">
                    <td className="p-3 font-black text-rose-700">M (Medium / UK 10-12)</td>
                    <td className="p-3">34" - 36"</td>
                    <td className="p-3">28" - 30"</td>
                    <td className="p-3">37" - 39"</td>
                    <td className="p-3">102 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-rose-700">L (Large / UK 14)</td>
                    <td className="p-3">37" - 39"</td>
                    <td className="p-3">31" - 33"</td>
                    <td className="p-3">40" - 42"</td>
                    <td className="p-3">104 cm</td>
                  </tr>
                  <tr className="bg-stone-50/50">
                    <td className="p-3 font-black text-rose-700">XL (Extra Large / UK 16)</td>
                    <td className="p-3">40" - 42"</td>
                    <td className="p-3">34" - 36"</td>
                    <td className="p-3">43" - 45"</td>
                    <td className="p-3">106 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-rose-700">XXL (Double XL / UK 18)</td>
                    <td className="p-3">43" - 45"</td>
                    <td className="p-3">37" - 39"</td>
                    <td className="p-3">46" - 48"</td>
                    <td className="p-3">108 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'boys' && (
            <div className="space-y-3">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-700">
                Child Men (Boys) Size Chart
              </h3>
              <table className="w-full text-left text-xs border-collapse border border-stone-200">
                <thead>
                  <tr className="bg-stone-900 text-white">
                    <th className="p-3">Age Group</th>
                    <th className="p-3">Height (cm)</th>
                    <th className="p-3">Chest (inches)</th>
                    <th className="p-3">Waist (inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-medium">
                  <tr className="bg-stone-50/50">
                    <td className="p-3 font-black text-amber-700">2 - 3 Years</td>
                    <td className="p-3">92 - 98 cm</td>
                    <td className="p-3">21" - 22"</td>
                    <td className="p-3">20" - 21"</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-amber-700">4 - 5 Years</td>
                    <td className="p-3">104 - 110 cm</td>
                    <td className="p-3">23" - 24"</td>
                    <td className="p-3">21.5" - 22.5"</td>
                  </tr>
                  <tr className="bg-stone-50/50">
                    <td className="p-3 font-black text-amber-700">6 - 7 Years</td>
                    <td className="p-3">116 - 122 cm</td>
                    <td className="p-3">25" - 26"</td>
                    <td className="p-3">23" - 24"</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-amber-700">8 - 9 Years</td>
                    <td className="p-3">128 - 134 cm</td>
                    <td className="p-3">27" - 28"</td>
                    <td className="p-3">24.5" - 25.5"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'girls' && (
            <div className="space-y-3">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-purple-700">
                Child Women (Girls) Size Chart
              </h3>
              <table className="w-full text-left text-xs border-collapse border border-stone-200">
                <thead>
                  <tr className="bg-stone-900 text-white">
                    <th className="p-3">Age Group</th>
                    <th className="p-3">Height (cm)</th>
                    <th className="p-3">Chest (inches)</th>
                    <th className="p-3">Waist (inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-medium">
                  <tr className="bg-stone-50/50">
                    <td className="p-3 font-black text-purple-700">2 - 3 Years</td>
                    <td className="p-3">92 - 98 cm</td>
                    <td className="p-3">20.5" - 21.5"</td>
                    <td className="p-3">20" - 21"</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-purple-700">4 - 5 Years</td>
                    <td className="p-3">104 - 110 cm</td>
                    <td className="p-3">22.5" - 23.5"</td>
                    <td className="p-3">21.5" - 22.5"</td>
                  </tr>
                  <tr className="bg-stone-50/50">
                    <td className="p-3 font-black text-purple-700">6 - 7 Years</td>
                    <td className="p-3">116 - 122 cm</td>
                    <td className="p-3">24.5" - 25.5"</td>
                    <td className="p-3">23" - 24"</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-purple-700">8 - 9 Years</td>
                    <td className="p-3">128 - 134 cm</td>
                    <td className="p-3">26.5" - 27.5"</td>
                    <td className="p-3">24.5" - 25.5"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tip Box */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs text-indigo-900 font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>If you fall between two sizes, we recommend selecting the larger size for a relaxed comfortable fit. Free exchanges within 14 days!</span>
        </div>

      </div>
    </div>
  );
};
