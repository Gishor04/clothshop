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
        title="Contact Us & Customer Support"
        description="Get in touch with Kaithady Clothing Boutique. Contact customer support for sizing guidance, order tracking, and delivery inquiries."
        schema={generateOrganizationSchema()}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-indigo-600 font-extrabold text-xs uppercase tracking-widest">
          Get in Touch with Kaithady Boutique
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          We’d Love to Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-medium">
          Have a question about fabric details, adult & kids sizing, or order delivery? Reach out to our Kaithady support team.
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
            <h2 className="text-xl font-black text-amber-200">Flagship Boutique &amp; Workshop</h2>

            <div className="space-y-4 text-xs font-semibold text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Colombo Store Address</span>
                  <span>123 Galle Road, Kollupitiya, Colombo 03, Sri Lanka</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Direct Phone &amp; WhatsApp Order</span>
                  <span>+94 77 000 0000 / +94 11 234 5678</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Customer Support Email</span>
                  <span>hello@kottuba.lk / orders@kottuba.lk</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Boutique Operating Hours</span>
                  <span>Monday – Saturday: 9:00 AM – 7:00 PM</span> <br />
                  <span>Sunday: 10:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/94770000000?text=Hi%20Kottuba%2C%20I%27d%20like%20to%20order."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all uppercase tracking-wider"
              >
                <Phone className="w-4 h-4" /> WhatsApp Order &amp; Consultation
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
