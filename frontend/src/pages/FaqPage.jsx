import React, { useState } from 'react';
import { SeoMeta } from '../components/SeoMeta';
import { ChevronDown, Search, HelpCircle, Phone } from 'lucide-react';

export const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does Cash on Delivery (COD) work across Sri Lanka?',
      a: 'We offer Cash on Delivery (COD) island-wide. When our courier delivers your package to your doorstep, you simply pay the total cash amount. No credit card or online payment is required in advance.',
    },
    {
      q: 'What is the standard delivery timeframe?',
      a: 'Delivery takes 1-2 business days within Colombo and Gampaha districts, and 2-3 business days for all other districts across Sri Lanka (Kandy, Galle, Jaffna, Matara, etc.). Express Next-Day Delivery is available for Colombo 01-15.',
    },
    {
      q: 'Is shipping free for orders over Rs. 10,000?',
      a: 'Yes! All orders with a total value of Rs. 10,000 or more qualify for FREE island-wide standard delivery.',
    },
    {
      q: 'Are Kottuba bags made from genuine real leather?',
      a: 'Yes, 100%. All our flagship bags are crafted from premium top-grain or full-grain bovine leather sourced ethically. We do not use cheap bonded or PU synthetic leather for our core collection.',
    },
    {
      q: 'What is your 14-day Return & Exchange policy?',
      a: 'If you wish to exchange your bag for a different color or model, simply contact us within 14 days of receiving your package. Provided the item is unused with original tags intact, we will arrange a complimentary pickup and swap.',
    },
    {
      q: 'How do I care for and clean my leather bag?',
      a: 'Wipe off dust with a soft micro-fiber cloth. Apply natural mink oil or beeswax leather balm twice a year to keep the leather hydrated and water-repellent.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <SeoMeta
        title="Frequently Asked Questions (FAQ) — Kottuba Sri Lanka"
        description="Find answers to common questions about Kottuba handcrafted leather bags, island-wide Cash on Delivery, shipping, and leather care."
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
