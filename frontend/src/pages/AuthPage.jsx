import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SeoMeta } from '../components/SeoMeta';
import { Lock, Mail, User, Phone } from 'lucide-react';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, error, setError } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password, formData.phone, formData.role);
      }

      navigate(redirect ? `/${redirect}` : '/');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4 font-['Plus_Jakarta_Sans',sans-serif]">
      <SeoMeta title="Sign In or Register — Kaithady Clothing Boutique" />

      <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-6">
        
        {/* Header Logo & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-700 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
            K
          </div>
          <h2 className="text-2xl font-black text-stone-900">
            {isLogin ? 'Welcome to Kaithady' : 'Create Kaithady Account'}
          </h2>
          <p className="text-xs text-stone-500 font-medium">
            {isLogin ? 'Sign in to access your clothing cart, saved wishlist, and orders.' : 'Join Kaithady Clothing Boutique for exclusive Adults (M-XXL) & Kids drops.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-stone-100 p-1 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(null); }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              isLogin ? 'bg-white text-indigo-700 shadow-sm' : 'text-stone-600'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(null); }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              !isLogin ? 'bg-white text-indigo-700 shadow-sm' : 'text-stone-600'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Anushka Perera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-indigo-700"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-indigo-700"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-indigo-700"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Mobile Phone (Sri Lanka)</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="077 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-indigo-700"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Account Type</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-indigo-700 font-semibold"
                >
                  <option value="customer">Customer Account</option>
                  <option value="admin">Store Admin Account</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-indigo-700 hover:bg-indigo-600 text-white font-black text-xs shadow-lg shadow-indigo-900/20 transition-all active:scale-95 disabled:bg-stone-300 uppercase tracking-wider"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In to Kaithady' : 'Create Account'}
          </button>
        </form>

      </div>
    </div>
  );
};
