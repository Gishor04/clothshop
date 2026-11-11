import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { generateOrganizationSchema } from '../utils/seoHelpers';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-['Plus_Jakarta_Sans',sans-serif]">
      <SEO
        title="Contact WellFIT — Wedding Suit Fitting & Orders"
        description="Get in touch with WellFIT Specialist in Wedding Suits & Men's Wear. Book suit fitting measurements or order on WhatsApp: +94 76 555 4150."
        schema={generateOrganizationSchema()}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest">
          வாங்க இது நம்ம ஊர் கட · Get in Touch with WellFIT
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Wedding Suit Consultations &amp; Customer Care
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-medium">
          Have a question about bespoke wedding suit tailoring, fabric selection, groomsmen packages, or sizes? Reach out to ishaq and the WellFIT team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left Column: Contact Form */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-xl font-black text-stone-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-800" /> Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-stone-700 mb-1 font-bold">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anushka Perera"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 mb-1 font-bold">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. anushka@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1 font-bold">Mobile Phone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="e.g. 077 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 mb-1 font-bold">Your Message *</label>
              <textarea
                required
                rows={5}
                placeholder="How can we assist you with your bag order or inquiry?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-amber-900 hover:bg-amber-800 text-white font-black text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>

            {submitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 font-bold text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your message has been sent. We will respond within 2 hours.</span>
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Contact Details & Google Maps Embed */}
        <div className="space-y-6">
          <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 border border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-400 bg-black flex-shrink-0">
                <img src="/wellfit-logo.jpg" alt="WellFIT" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-black text-amber-200">WellFIT Flagship Store</h2>
                <span className="text-xs text-stone-400 font-bold">வாங்க இது நம்ம ஊர் கட</span>
              </div>
            </div>

            <div className="space-y-4 text-xs font-semibold text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Main Boutique Address</span>
                  <span>WellFIT Specialist in Wedding Suits &amp; Men's Wear, Sri Lanka</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Direct WhatsApp &amp; Business Line</span>
                  <span>+94 76 555 4150 (ishaq / WellFIT Team)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Customer Support Email</span>
                  <span>contact@wellfitsuits.lk / orders@wellfitsuits.lk</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Boutique Operating Hours</span>
                  <span>Monday – Saturday: 9:00 AM – 8:00 PM</span> <br />
                  <span>Sunday: 10:00 AM – 6:00 PM (Wedding fittings by appointment)</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/94765554150?text=Hi%20WellFIT%2C%20I%27d%20like%20to%20order%20or%20inquire%20about%20wedding%20suits."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all uppercase tracking-wider"
              >
                <Phone className="w-4 h-4" /> WhatsApp Order &amp; Consultation (+94 76 555 4150)
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs h-64">
            <iframe
              title="Kottuba Colombo Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7984687799516!2d79.8507!3d6.9147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593f6d71b3e7%3A0x8e8ebbc404285df6!2sGalle%20Rd%2C%20Colombo%2000300!5e0!3m2!1sen!2slk!4v1680000000000!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
