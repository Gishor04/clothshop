import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const phone = '94765554150';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hi WellFIT, I'm interested in your Wedding Suits & Men's Wear collection! (Specialist in Wedding Suits)"
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Pop-up bubble teaser */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-3 bg-stone-950/95 text-white pl-4 pr-3 py-2.5 rounded-2xl shadow-2xl border border-stone-800 backdrop-blur-md animate-fade-in text-xs">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-extrabold text-emerald-400">WellFIT Wedding Support</span>
            </div>
            <span className="text-[11px] text-stone-300 font-medium">
              Order or Book Suit Fitting on WhatsApp
            </span>
            <span className="text-[10px] text-amber-300 font-bold">
              வாங்க இது நம்ம ஊர் கட (+94 76 555 4150)
            </span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="p-1 text-stone-400 hover:text-white transition-colors"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        title="Chat with WellFIT on WhatsApp (+94 76 555 4150)"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>

        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.101-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.176.2-.352.226-.653.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.676-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.633-.929-2.238-.244-.59-.493-.51-.678-.52l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.513 1.079 2.914 1.23 3.115c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.377.198 1.896.12.578-.088 1.78-.728 2.03-1.431.251-.703.251-1.306.176-1.431-.075-.126-.276-.201-.577-.352z" />
          <path d="M12 2C6.486 2 2 6.486 2 12c0 1.942.553 3.758 1.514 5.305L2.08 21.684a.75.75 0 0 0 .937.937l4.379-1.434A9.957 9.957 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 18.5a8.45 8.45 0 0 1-4.306-1.173.75.75 0 0 0-.555-.078l-3.328 1.09.84-2.887a.75.75 0 0 0-.098-.636A8.46 8.46 0 0 1 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
        </svg>
      </a>
    </div>
  );
};
