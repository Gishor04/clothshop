import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { generateFaqSchema } from '../utils/seoHelpers';
import { ChevronDown, Search, HelpCircle, Phone } from 'lucide-react';

export const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does Cash on Delivery (COD) work across Sri Lanka?',
      a: 'We offer Cash on Delivery (COD) island-wide. When our courier delivers your clothing package to your doorstep, you simply pay the total cash amount. No credit card or online payment is required in advance.',
    },
    {
      q: 'What is the standard delivery timeframe?',
      a: 'Delivery takes 1-2 business days within Colombo and Jaffna districts, and 2-3 business days for all other districts across Sri Lanka. Express delivery is available.',
    },
    {
      q: 'Is shipping free for orders over Rs. 10,000?',
      a: 'Yes! All clothing orders with a total value of Rs. 10,000 or more qualify for FREE island-wide standard delivery.',
    },
    {
      q: 'What sizes are available for Adult Men & Adult Women?',
      a: 'Adult Men and Adult Women clothing are available in standard sizes: M, L, XL, and XXL. Please check our interactive Size Guide for exact chest, waist, and length measurements.',
    },
    {
      q: 'What is your 14-day Return & Exchange policy?',
      a: 'If you wish to exchange your apparel item for a different size or color, simply contact us within 14 days of receiving your package. Provided the item is unused with original tags intact, we will arrange an exchange.',
    },
    {
      q: 'How do I care for and wash my 100% cotton apparel?',
      a: 'Machine wash cold with like colors using a mild detergent. Tumble dry low or line dry in shade to maintain fabric texture and color brightness.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <SEO
        title="Frequently Asked Questions (FAQ) — Delivery, COD & Sizing"
        description="Got questions about sizing (M-XXL), island-wide Cash on Delivery (COD), shipping, or returns? Find answers to FAQs at Kaithady Boutique."
        schema={generateFaqSchema(faqs)}
      />

      <div className="text-center space-y-2">
        <span className="text-amber-800 font-extrabold text-xs uppercase tracking-widest">
          Help &amp; Support Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-medium">
          Have questions about your order, delivery, or leather care? Find instant answers below.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search questions (e.g. COD, Shipping, Leather)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-amber-800 shadow-xs"
        />
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4 pt-4">
        {filteredFaqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-stone-200/80 shadow-2xs overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              className="w-full p-5 text-left flex items-center justify-between font-extrabold text-sm text-stone-900 gap-4 hover:text-amber-800"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-800 flex-shrink-0" />
                {faq.q}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-stone-400 transition-transform ${
                  openIdx === idx ? 'rotate-180 text-amber-800' : ''
                }`}
              />
            </button>

            {openIdx === idx && (
              <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Need More Assistance Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 text-center space-y-4 border border-stone-800">
        <h3 className="text-xl font-black text-amber-200">Still Have Questions?</h3>
        <p className="text-xs text-stone-300 max-w-sm mx-auto">
          Our customer service team in Colombo is available Mon-Sat to assist you via WhatsApp or phone.
        </p>
        <a
          href="https://wa.me/94770000000?text=Hi%20Kottuba%2C%20I%27d%20like%20to%20ask%20a%20question."
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-2xl shadow-lg"
        >
          <Phone className="w-4 h-4" /> Ask via WhatsApp
        </a>
      </div>

    </div>
  );
};
