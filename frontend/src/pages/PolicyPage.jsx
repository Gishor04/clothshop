import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';

export const PolicyPage = () => {
  const [activeTab, setActiveTab] = useState('shipping');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <SEO
        title="Store Policies, Shipping & Returns"
        description="Read Kaithady Clothing Boutique's official shipping, COD, returns, exchange, privacy, and warranty policies."
      />

      <div className="text-center space-y-2">
        <span className="text-amber-800 font-extrabold text-xs uppercase tracking-widest">
          Legal &amp; Customer Guarantees
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Store Policies &amp; Terms
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-medium">
          Transparent, customer-first terms for every purchase across Sri Lanka.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-stone-200 justify-center gap-4 text-xs font-black uppercase tracking-wider overflow-x-auto">
        <button
          onClick={() => setActiveTab('shipping')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'shipping' ? 'border-amber-800 text-amber-800' : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <Truck className="w-4 h-4" /> Shipping Policy
        </button>

        <button
          onClick={() => setActiveTab('returns')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'returns' ? 'border-amber-800 text-amber-800' : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <RotateCcw className="w-4 h-4" /> Returns &amp; Exchange
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'privacy' ? 'border-amber-800 text-amber-800' : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Privacy Policy
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'terms' ? 'border-amber-800 text-amber-800' : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <FileText className="w-4 h-4" /> Terms of Service
        </button>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-6 text-xs text-stone-700 leading-relaxed">
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-stone-900">Island-Wide Shipping &amp; Delivery</h2>
            <p>
              We ship to all 25 districts across Sri Lanka via our reliable courier network. All orders above Rs. 10,000 qualify for FREE standard delivery.
            </p>
            <h3 className="font-extrabold text-stone-900 text-sm">Delivery Timelines:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Colombo &amp; Gampaha:</strong> 1 - 2 Business Days</li>
              <li><strong>Outstation Districts (Kandy, Galle, Jaffna, etc.):</strong> 2 - 3 Business Days</li>
              <li><strong>Colombo Express Next-Day:</strong> Rs. 600 flat rate</li>
            </ul>
            <p>
              Cash on Delivery (COD) is available for all destinations across the island.
            </p>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-stone-900">14-Day Return &amp; Exchange Policy</h2>
            <p>
              We want you to love your Kottuba leather bag. If you receive an item and wish to swap colors or models, you may return it within 14 days of delivery.
            </p>
            <h3 className="font-extrabold text-stone-900 text-sm">Conditions for Return:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Item must be unused in its original state with cotton dust bag and tags attached.</li>
              <li>Proof of purchase (Order ID or invoice) must be provided.</li>
              <li>Exchanges are processed free of courier charge for defective items.</li>
            </ul>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-stone-900">Privacy &amp; Data Protection</h2>
            <p>
              Your privacy is paramount. Kottuba Sri Lanka does not sell, rent, or trade your personal information or contact details to any third parties.
            </p>
            <p>
              All online credit card transactions are processed securely via encrypted SSL bank gateways. Phone numbers provided for COD delivery are used solely by courier dispatchers to confirm delivery times.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-stone-900">Terms of Service</h2>
            <p>
              By accessing and placing an order on Kottuba (sl-bag-boutique.lovable.app), you agree to our terms of service. All leather products are guaranteed authentic. Prices displayed are in Sri Lankan Rupees (Rs. / LKR) inclusive of local taxes.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
