import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, authFetch } from '../context/AuthContext';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Layers,
  Tag, Image, Star, Settings, LogOut, Menu, X, TrendingUp,
  AlertTriangle, CheckCircle2, XCircle, Edit3, Trash2, Plus,
  ChevronDown, Search, Eye, Download, ToggleLeft, ToggleRight,
  BarChart2, RefreshCw, ShieldCheck, Lock, Unlock
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

/* ── shared helpers ──────────────────────────────────── */
const api = (url, opts = {}, logout) => authFetch(url, opts, logout);
const fmt = (n) => `Rs. ${Number(n || 0).toLocaleString('en-US')}.00`;
const badge = (status) => {
  const m = {
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-rose-100 text-rose-700',
    paid: 'bg-emerald-100 text-emerald-700',
    failed: 'bg-rose-100 text-rose-700',
    approved: 'bg-emerald-100 text-emerald-700',
    flagged: 'bg-rose-100 text-rose-700',
    'out of stock': 'bg-red-100 text-red-700',
  };
  return `px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${m[status] || 'bg-slate-100 text-slate-600'}`;
};

/* ═══════════════════════════════════════════════════════
   PANEL 1 — DASHBOARD OVERVIEW
══════════════════════════════════════════════════════ */
const AdminOverview = ({ logout }) => {
  const [summary, setSummary] = useState(null);
  const [sales, setSales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [catSales, setCatSales] = useState([]);
  const PIE_COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];

  useEffect(() => {
    const load = async () => {
      try {
        const [s, sl, tp, cs] = await Promise.all([
          api('/api/analytics/summary', {}, logout).then(r => r.json()),
          api('/api/analytics/sales', {}, logout).then(r => r.json()),
          api('/api/analytics/top-products', {}, logout).then(r => r.json()),
          api('/api/analytics/category-sales', {}, logout).then(r => r.json()),
        ]);
        setSummary(s); setSales(sl); setTopProducts(tp); setCatSales(cs);
      } catch {}
    };
    load();
  }, []);

  const kpis = summary ? [
    { label: 'Total Revenue', value: fmt(summary.totalRevenue), icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Orders', value: summary.totalOrders, icon: ShoppingBag, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Customers', value: summary.totalCustomers, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Products', value: summary.totalProducts, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Pending Orders', value: summary.pendingOrders, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Low Stock Items', value: summary.lowStockProducts, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ] : [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black text-slate-900">Dashboard Overview</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {summary ? kpis.map((k, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-2">
            <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center`}>
              <k.icon className={`w-5 h-5 ${k.color}`} />
            </div>
            <p className="text-xs text-slate-500 font-medium">{k.label}</p>
            <p className="text-lg font-black text-slate-900">{k.value}</p>
          </div>
        )) : Array(6).fill(0).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm h-24 animate-pulse bg-slate-100" />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales line chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 mb-4">Revenue — Last 30 Days</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d.slice(5)} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${v}`} />
              <Tooltip formatter={v => [fmt(v), 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={catSales} dataKey="revenue" nameKey="category" cx="50%" cy="50%" outerRadius={70} label={({ category }) => category}>
                {catSales.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={v => fmt(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      {topProducts.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 mb-4">Top Selling Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {topProducts.slice(0, 8).map((p, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                {p.image && <img src={p.image} alt="" className="w-10 h-12 object-cover rounded-lg flex-shrink-0" />}
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-900 truncate">{p.name}</p>
                  <p className="text-[10px] text-indigo-600 font-black">{p.totalSold} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PANEL 2 — PRODUCTS
══════════════════════════════════════════════════════ */
const ADULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const KIDS_SIZES = ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'];

const emptyProduct = () => ({
  name: '', description: '', category: 'men', subCategory: 'shirts',
  price: '', discount: 0, color: '', brand: 'StyleVerse',
  images: [''], isFeatured: false, isNewArrival: false, isOutOfStock: false,
  sizes: ADULT_SIZES.map(s => ({ size: s, stock: 0 })),
});

const AdminProducts = ({ logout }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyProduct());
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (search) params.set('search', search);
      if (catFilter) params.set('category', catFilter);
      const res = await api(`/api/products?${params}`, {}, logout);
      const data = await res.json();
      setProducts(data.products || []);
      setTotalPages(data.pages || 1);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { loadProducts(); }, [page, catFilter]);

  const openNew = () => { setForm(emptyProduct()); setEditId(null); setError(''); setShowModal(true); };
  const openEdit = (p) => {
    setForm({ ...p, images: p.images?.length ? p.images : [''], discount: p.discount || 0 });
    setEditId(p._id); setError(''); setShowModal(true);
  };

  const handleSizeStock = (size, val) => {
    setForm(f => ({
      ...f,
      sizes: f.sizes.map(s => s.size === size ? { ...s, stock: Number(val) } : s),
    }));
  };

  const handleCategoryChange = (cat) => {
    const isKids = cat === 'boys' || cat === 'girls';
    setForm(f => ({
      ...f, category: cat,
      sizes: isKids
        ? KIDS_SIZES.map(s => ({ size: s, stock: 0 }))
        : ADULT_SIZES.map(s => ({ size: s, stock: 0 })),
    }));
  };

  const saveProduct = async () => {
    if (!form.name || !form.price) { setError('Name and price are required'); return; }
    setSaving(true);
    try {
      const body = { ...form, images: form.images.filter(Boolean) };
      const res = await api(
        editId ? `/api/products/${editId}` : '/api/products',
        { method: editId ? 'PUT' : 'POST', body: JSON.stringify(body) },
        logout
      );
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      setShowModal(false); loadProducts();
    } catch (e) { setError(e.message); }
    setSaving(false);
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    await api(`/api/products/${id}`, { method: 'DELETE' }, logout);
    loadProducts();
  };

  const toggleFlag = async (p, flag) => {
    await api(`/api/products/${p._id}`, {
      method: 'PUT',
      body: JSON.stringify({ [flag]: !p[flag] }),
    }, logout);
    loadProducts();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-black text-slate-900">Products</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search products..." value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && loadProducts()} />
        </div>
        {['', 'men', 'women', 'boys', 'girls'].map(c => (
          <button key={c} onClick={() => { setCatFilter(c); setPage(1); }}
            className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition ${catFilter === c ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            {c || 'All'}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Product', 'Category', 'Price', 'Discount', 'Stock', 'Flags', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}><td colSpan={7} className="px-4 py-3"><div className="h-8 bg-slate-100 rounded animate-pulse" /></td></tr>
                ))
              ) : products.map(p => (
                <tr key={p._id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0]} alt="" className="w-10 h-12 object-cover rounded-lg bg-slate-100 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-slate-900 max-w-[180px] truncate">{p.name}</p>
                        <p className="text-slate-400">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize"><span className={badge(p.category)}>{p.category}</span></td>
                  <td className="px-4 py-3 font-bold text-slate-900">{fmt(p.price)}</td>
                  <td className="px-4 py-3">{p.discount > 0 ? <span className="text-rose-600 font-bold">{p.discount}% OFF</span> : <span className="text-slate-400">—</span>}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${p.stockQuantity === 0 ? 'text-rose-500' : p.stockQuantity <= 5 ? 'text-amber-500' : 'text-emerald-600'}`}>
                      {p.stockQuantity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {p.isFeatured && <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold">⭐ Featured</span>}
                      {p.isNewArrival && <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">🆕 New</span>}
                      {p.isOutOfStock && <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded text-[10px] font-bold">❌ OOS</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => deleteProduct(p._id)} className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => toggleFlag(p, 'isFeatured')} title="Toggle Featured" className={`p-1.5 rounded-lg transition ${p.isFeatured ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400'}`}>⭐</button>
                      <button onClick={() => toggleFlag(p, 'isNewArrival')} title="Toggle New Arrival" className={`p-1.5 rounded-lg transition ${p.isNewArrival ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>🆕</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50">Prev</button>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">{editId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {error && <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-3 font-semibold">{error}</p>}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Name *</label>
                  <input className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Classic Cotton Shirt" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                  <textarea rows={3} className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={form.category} onChange={e => handleCategoryChange(e.target.value)}>
                    {['men', 'women', 'boys', 'girls'].map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sub Category *</label>
                  <input className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={form.subCategory} onChange={e => setForm(f => ({ ...f, subCategory: e.target.value }))} placeholder="shirts / pants / dresses" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹) *</label>
                  <input type="number" min="0" className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Discount %</label>
                  <input type="number" min="0" max="100" className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={form.discount} onChange={e => setForm(f => ({ ...f, discount: Number(e.target.value) }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Color</label>
                  <input className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} placeholder="e.g. Navy Blue" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand</label>
                  <input className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} />
                </div>
              </div>

              {/* Image URLs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Image URLs</label>
                {form.images.map((img, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={img} placeholder="https://..." onChange={e => {
                        const imgs = [...form.images]; imgs[i] = e.target.value;
                        setForm(f => ({ ...f, images: imgs }));
                      }} />
                    {i === form.images.length - 1 && (
                      <button onClick={() => setForm(f => ({ ...f, images: [...f.images, ''] }))}
                        className="px-3 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-bold hover:bg-indigo-100">+ Add</button>
                    )}
                  </div>
                ))}
              </div>

              {/* Sizes & Stock */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Sizes & Stock</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {form.sizes.map(s => (
                    <div key={s.size} className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-black text-slate-700">{s.size}</span>
                      <input type="number" min="0"
                        className="w-full text-center text-xs py-1 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        value={s.stock} onChange={e => handleSizeStock(s.size, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Flags */}
              <div className="flex flex-wrap gap-4">
                {[['isFeatured', '⭐ Featured'], ['isNewArrival', '🆕 New Arrival'], ['isOutOfStock', '❌ Out of Stock']].map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                      className="accent-indigo-600 w-4 h-4" />
                    <span className="text-xs font-semibold text-slate-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50">Cancel</button>
              <button onClick={saveProduct} disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 disabled:bg-slate-300 transition">
                {saving ? 'Saving...' : editId ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PANEL 3 — ORDERS
══════════════════════════════════════════════════════ */
const AdminOrders = ({ logout }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (statusFilter) params.set('status', statusFilter);
      const res = await api(`/api/orders/all?${params}`, {}, logout);
      const data = await res.json();
      setOrders(data.orders || []); setTotalPages(data.pages || 1);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { loadOrders(); }, [page, statusFilter]);

  const updateStatus = async (id, orderStatus) => {
    setUpdatingId(id);
    await api(`/api/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ orderStatus }) }, logout);
    setUpdatingId(null); loadOrders();
    if (selectedOrder?._id === id) setSelectedOrder(o => ({ ...o, orderStatus }));
  };

  const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-black text-slate-900">Orders</h2>
      <div className="flex flex-wrap gap-2">
        {['', ...STATUS_OPTIONS].map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition ${statusFilter === s ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            {s || 'All'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? Array(5).fill(0).map((_, i) => (
                <tr key={i}><td colSpan={8} className="px-4 py-3"><div className="h-8 bg-slate-100 rounded animate-pulse" /></td></tr>
              )) : orders.map(o => (
                <tr key={o._id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">#{o._id.slice(-6).toUpperCase()}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{o.userId?.name || 'N/A'}</p>
                    <p className="text-slate-400">{o.userId?.email || ''}</p>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-700">{o.products?.length}</td>
                  <td className="px-4 py-3 font-black text-indigo-600">{fmt(o.totalAmount)}</td>
                  <td className="px-4 py-3"><span className={badge(o.paymentStatus)}>{o.paymentStatus}</span></td>
                  <td className="px-4 py-3">
                    <select value={o.orderStatus} disabled={updatingId === o._id}
                      onChange={e => updateStatus(o._id, e.target.value)}
                      className="text-xs px-2 py-1 rounded-lg border border-slate-200 bg-white focus:outline-none cursor-pointer font-bold capitalize">
                      {STATUS_OPTIONS.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelectedOrder(o)} className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"><Eye className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50">Prev</button>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-black text-slate-900">Order #{selectedOrder._id.slice(-6).toUpperCase()}</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-100 rounded-xl"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-slate-500 mb-1">Customer</p>
                  <p className="font-bold text-slate-900">{selectedOrder.userId?.name}</p>
                  <p className="text-slate-500">{selectedOrder.userId?.email}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-slate-500 mb-1">Shipping To</p>
                  <p className="font-bold text-slate-900">{selectedOrder.shippingAddress?.name}</p>
                  <p className="text-slate-500">{selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.city}</p>
                </div>
              </div>
              <div>
                <p className="font-black text-slate-900 mb-2">Items</p>
                {selectedOrder.products?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                    {item.image && <img src={item.image} alt="" className="w-10 h-12 object-cover rounded-lg bg-slate-100" />}
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-slate-500">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <p className="font-black text-indigo-600">{fmt(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="bg-indigo-50 rounded-xl p-3 flex justify-between">
                <span className="font-black text-slate-900">Total</span>
                <span className="font-black text-indigo-600 text-sm">{fmt(selectedOrder.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PANEL 4 — CUSTOMERS
══════════════════════════════════════════════════════ */
const AdminCustomers = ({ logout }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [toggling, setToggling] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.set('search', search);
      const res = await api(`/api/auth/customers?${params}`, {}, logout);
      const data = await res.json();
      setCustomers(data.customers || []); setTotalPages(data.pages || 1);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, [page]);

  const toggleBlock = async (id) => {
    setToggling(id);
    await api(`/api/auth/customers/${id}/block`, { method: 'PUT' }, logout);
    setToggling(null); load();
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-black text-slate-900">Customers</h2>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search name or email..." value={search} onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && load()} />
        </div>
        <button onClick={load} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
          <Search className="w-4 h-4" /> Search
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Customer', 'Email', 'Phone', 'Orders', 'Total Spent', 'Joined', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? Array(5).fill(0).map((_, i) => (
                <tr key={i}><td colSpan={8} className="px-4 py-3"><div className="h-8 bg-slate-100 rounded animate-pulse" /></td></tr>
              )) : customers.map(c => (
                <tr key={c._id} className={`hover:bg-slate-50 transition ${c.isBlocked ? 'opacity-60' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm flex-shrink-0">
                        {c.name?.[0]?.toUpperCase()}
                      </div>
                      <span className="font-bold text-slate-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{c.email}</td>
                  <td className="px-4 py-3 text-slate-600">{c.phone || '—'}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{c.orderCount}</td>
                  <td className="px-4 py-3 font-black text-indigo-600">{fmt(c.totalSpent)}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <span className={badge(c.isBlocked ? 'cancelled' : 'delivered')}>{c.isBlocked ? 'Blocked' : 'Active'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button disabled={toggling === c._id} onClick={() => toggleBlock(c._id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-bold transition ${c.isBlocked ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'}`}>
                      {c.isBlocked ? <><Unlock className="w-3 h-3" /> Unblock</> : <><Lock className="w-3 h-3" /> Block</>}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50">Prev</button>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PANEL 5 — INVENTORY
══════════════════════════════════════════════════════ */
const AdminInventory = ({ logout }) => {
  const [products, setProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [pRes, lRes] = await Promise.all([
          api('/api/products?limit=50', {}, logout).then(r => r.json()),
          api('/api/products/low-stock?threshold=10', {}, logout).then(r => r.json()),
        ]);
        setProducts(pRes.products || []); setLowStock(lRes || []);
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black text-slate-900">Inventory & Stock</h2>

      {/* Low Stock Alerts */}
      {lowStock.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="text-sm font-black text-amber-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Low Stock Alert ({lowStock.length} items)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStock.map(p => (
              <div key={p._id} className="bg-white border border-amber-200 rounded-xl p-3 flex items-center gap-3">
                <img src={p.images?.[0]} alt="" className="w-10 h-12 object-cover rounded-lg bg-slate-100 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{p.name}</p>
                  <p className="text-xs text-amber-700 font-black">{p.stockQuantity} units left</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Stock Grid */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">Total Stock</th>
                <th className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">Size Breakdown</th>
                <th className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? Array(5).fill(0).map((_, i) => (
                <tr key={i}><td colSpan={5} className="px-4 py-3"><div className="h-8 bg-slate-100 rounded animate-pulse" /></td></tr>
              )) : products.map(p => (
                <tr key={p._id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0]} alt="" className="w-8 h-10 object-cover rounded-lg bg-slate-100 flex-shrink-0" />
                      <span className="font-bold text-slate-900 max-w-[180px] truncate">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-600">{p.category}</td>
                  <td className="px-4 py-3">
                    <span className={`text-base font-black ${p.stockQuantity === 0 ? 'text-rose-500' : p.stockQuantity <= 5 ? 'text-amber-500' : 'text-emerald-600'}`}>
                      {p.stockQuantity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.sizes?.map(s => (
                        <span key={s.size} className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${s.stock === 0 ? 'border-rose-200 bg-rose-50 text-rose-600' : s.stock <= 3 ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                          {s.size}: {s.stock}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={badge(p.isOutOfStock ? 'out of stock' : 'delivered')}>
                      {p.isOutOfStock ? 'Out of Stock' : 'In Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PANEL 6 — COUPONS
══════════════════════════════════════════════════════ */
const emptyCoupon = () => ({ code: '', type: 'percentage', value: '', minOrderAmount: 0, maxUses: '', expiryDate: '', description: '', isActive: true });

const AdminCoupons = ({ logout }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyCoupon());
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => { setLoading(true); try { const r = await api('/api/coupons', {}, logout); setCoupons(await r.json()); } catch {} setLoading(false); };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.code || !form.value) { setError('Code and value are required'); return; }
    setSaving(true);
    try {
      const body = { ...form, maxUses: form.maxUses || null, expiryDate: form.expiryDate || null };
      const r = await api(editId ? `/api/coupons/${editId}` : '/api/coupons', { method: editId ? 'PUT' : 'POST', body: JSON.stringify(body) }, logout);
      if (!r.ok) { const d = await r.json(); throw new Error(d.message); }
      setShowModal(false); load();
    } catch (e) { setError(e.message); }
    setSaving(false);
  };

  const del = async (id) => { if (!confirm('Delete coupon?')) return; await api(`/api/coupons/${id}`, { method: 'DELETE' }, logout); load(); };
  const openEdit = (c) => { setForm({ ...c, expiryDate: c.expiryDate ? c.expiryDate.slice(0, 10) : '', maxUses: c.maxUses || '' }); setEditId(c._id); setError(''); setShowModal(true); };
  const openNew = () => { setForm(emptyCoupon()); setEditId(null); setError(''); setShowModal(true); };

  const inp = 'w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900">Coupons & Discounts</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? Array(3).fill(0).map((_, i) => <div key={i} className="h-36 bg-white rounded-2xl border border-slate-100 animate-pulse" />) :
          coupons.map(c => (
            <div key={c._id} className={`bg-white rounded-2xl border shadow-sm p-5 space-y-3 relative ${!c.isActive ? 'opacity-60 border-slate-200' : 'border-indigo-100'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-black text-lg text-indigo-600 font-mono">{c.code}</p>
                  <p className="text-xs text-slate-500">{c.description || (c.type === 'percentage' ? `${c.value}% off` : `₹${c.value} off`)}</p>
                </div>
                <span className={badge(c.isActive ? 'delivered' : 'cancelled')}>{c.isActive ? 'Active' : 'Inactive'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-slate-50 rounded-lg p-2"><p className="text-slate-400">Value</p><p className="font-black text-slate-900">{c.type === 'percentage' ? `${c.value}%` : `₹${c.value}`}</p></div>
                <div className="bg-slate-50 rounded-lg p-2"><p className="text-slate-400">Used</p><p className="font-black text-slate-900">{c.usedCount} / {c.maxUses || '∞'}</p></div>
                <div className="bg-slate-50 rounded-lg p-2"><p className="text-slate-400">Min Order</p><p className="font-black text-slate-900">₹{c.minOrderAmount}</p></div>
                <div className="bg-slate-50 rounded-lg p-2"><p className="text-slate-400">Expires</p><p className="font-black text-slate-900">{c.expiryDate ? new Date(c.expiryDate).toLocaleDateString('en-IN') : 'Never'}</p></div>
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={() => openEdit(c)} className="flex-1 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition">Edit</button>
                <button onClick={() => del(c._id)} className="flex-1 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 transition">Delete</button>
              </div>
            </div>
          ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-black text-slate-900">{editId ? 'Edit Coupon' : 'Create Coupon'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-3">
              {error && <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-3">{error}</p>}
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Coupon Code *</label><input className={inp} value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="SAVE20" /></div>
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Description</label><input className={inp} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="e.g. 20% off on all orders" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Type</label>
                  <select className={inp} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option value="percentage">Percentage %</option>
                    <option value="flat">Flat Amount ₹</option>
                  </select>
                </div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Value *</label><input type="number" className={inp} value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} placeholder={form.type === 'percentage' ? '20' : '100'} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Min Order (₹)</label><input type="number" className={inp} value={form.minOrderAmount} onChange={e => setForm(f => ({ ...f, minOrderAmount: e.target.value }))} /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Max Uses</label><input type="number" className={inp} value={form.maxUses} onChange={e => setForm(f => ({ ...f, maxUses: e.target.value }))} placeholder="Unlimited" /></div>
              </div>
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label><input type="date" className={inp} value={form.expiryDate} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))} /></div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-indigo-600" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                <span className="text-xs font-semibold text-slate-700">Active</span>
              </label>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50">Cancel</button>
              <button onClick={save} disabled={saving} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 disabled:bg-slate-300 transition">
                {saving ? 'Saving...' : editId ? 'Update' : 'Create Coupon'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PANEL 7 — BANNERS
══════════════════════════════════════════════════════ */
const emptyBanner = () => ({ title: '', subtitle: '', imageUrl: '', linkUrl: '/products', category: 'all', position: 0, isActive: true, bgColor: '#f1f5f9', textColor: '#0f172a' });

const AdminBanners = ({ logout }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyBanner());
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => { setLoading(true); try { const r = await api('/api/banners/all', {}, logout); setBanners(await r.json()); } catch {} setLoading(false); };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.title || !form.imageUrl) { setError('Title and image URL required'); return; }
    setSaving(true);
    try {
      const r = await api(editId ? `/api/banners/${editId}` : '/api/banners', { method: editId ? 'PUT' : 'POST', body: JSON.stringify(form) }, logout);
      if (!r.ok) { const d = await r.json(); throw new Error(d.message); }
      setShowModal(false); load();
    } catch (e) { setError(e.message); }
    setSaving(false);
  };

  const del = async (id) => { if (!confirm('Delete banner?')) return; await api(`/api/banners/${id}`, { method: 'DELETE' }, logout); load(); };
  const openEdit = (b) => { setForm({ ...b }); setEditId(b._id); setError(''); setShowModal(true); };
  const inp = 'w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900">Homepage Banners</h2>
        <button onClick={() => { setForm(emptyBanner()); setEditId(null); setError(''); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition">
          <Plus className="w-4 h-4" /> Add Banner
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? Array(3).fill(0).map((_, i) => <div key={i} className="h-40 bg-white rounded-2xl border border-slate-100 animate-pulse" />) :
          banners.map(b => (
            <div key={b._id} className={`rounded-2xl border overflow-hidden shadow-sm ${!b.isActive ? 'opacity-60' : ''}`}>
              <div className="relative h-28 bg-slate-100">
                {b.imageUrl && <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-3 text-white">
                  <p className="text-xs font-black">{b.title}</p>
                  {b.subtitle && <p className="text-[10px] opacity-80">{b.subtitle}</p>}
                </div>
                <span className={`absolute top-2 right-2 ${badge(b.isActive ? 'delivered' : 'cancelled')}`}>{b.isActive ? 'Active' : 'Hidden'}</span>
              </div>
              <div className="bg-white p-3 flex items-center justify-between">
                <div className="text-[10px] text-slate-500">Category: <span className="font-bold capitalize">{b.category}</span> · Pos: <span className="font-bold">{b.position}</span></div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => del(b._id)} className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        {!loading && banners.length === 0 && (
          <div className="col-span-3 text-center py-16 text-slate-400"><Image className="w-10 h-10 mx-auto mb-3" /><p className="text-sm font-bold">No banners yet. Add your first banner!</p></div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-black text-slate-900">{editId ? 'Edit Banner' : 'Add Banner'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-3">
              {error && <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-3">{error}</p>}
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Title *</label><input className={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Summer Sale" /></div>
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label><input className={inp} value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="Up to 50% off" /></div>
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Image URL *</label><input className={inp} value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." /></div>
              {form.imageUrl && <img src={form.imageUrl} alt="" className="w-full h-28 object-cover rounded-xl" onError={e => e.target.style.display = 'none'} />}
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Link URL</label><input className={inp} value={form.linkUrl} onChange={e => setForm(f => ({ ...f, linkUrl: e.target.value }))} placeholder="/products?category=men" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select className={inp} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {['all', 'men', 'women', 'boys', 'girls', 'sale'].map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label><input type="number" className={inp} value={form.position} onChange={e => setForm(f => ({ ...f, position: Number(e.target.value) }))} /></div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-indigo-600" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                <span className="text-xs font-semibold text-slate-700">Active (show on homepage)</span>
              </label>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50">Cancel</button>
              <button onClick={save} disabled={saving} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 disabled:bg-slate-300 transition">
                {saving ? 'Saving...' : editId ? 'Update' : 'Add Banner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PANEL 8 — REVIEWS
══════════════════════════════════════════════════════ */
const AdminReviews = ({ logout }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [updating, setUpdating] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = filter ? `?status=${filter}` : '';
      const r = await api(`/api/reviews${params}`, {}, logout);
      setReviews(await r.json());
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    await api(`/api/reviews/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }, logout);
    setUpdating(null); load();
  };

  const del = async (id) => { if (!confirm('Delete review?')) return; await api(`/api/reviews/${id}`, { method: 'DELETE' }, logout); load(); };

  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-black text-slate-900">Reviews & Ratings</h2>
      <div className="flex gap-2 flex-wrap">
        {['', 'pending', 'approved', 'flagged'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition ${filter === s ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            {s || 'All'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {loading ? Array(4).fill(0).map((_, i) => <div key={i} className="h-20 bg-white rounded-2xl border border-slate-100 animate-pulse" />) :
          reviews.length === 0 ? (
            <div className="text-center py-16 text-slate-400"><Star className="w-10 h-10 mx-auto mb-3" /><p className="text-sm font-bold">No reviews found</p></div>
          ) : reviews.map(r => (
            <div key={r._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-black text-slate-900 text-xs">{r.userName}</span>
                  <span className="text-amber-400 text-sm">{stars(r.rating)}</span>
                  <span className={badge(r.status)}>{r.status}</span>
                </div>
                <p className="text-xs text-slate-600 mb-1">{r.comment}</p>
                {r.productId && (
                  <div className="flex items-center gap-2 mt-1">
                    {r.productId.images?.[0] && <img src={r.productId.images[0]} alt="" className="w-8 h-10 object-cover rounded-lg" />}
                    <span className="text-[10px] text-slate-500">{r.productId.name}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {r.status !== 'approved' && (
                  <button disabled={updating === r._id} onClick={() => updateStatus(r._id, 'approved')}
                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition" title="Approve">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                {r.status !== 'flagged' && (
                  <button disabled={updating === r._id} onClick={() => updateStatus(r._id, 'flagged')}
                    className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition" title="Flag">
                    <AlertTriangle className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => del(r._id)} className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PANEL 9 — SETTINGS
══════════════════════════════════════════════════════ */
const AdminSettings = ({ logout }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api('/api/settings/admin', {}, logout).then(r => r.json()).then(d => { setSettings(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const r = await api('/api/settings', { method: 'PUT', body: JSON.stringify(settings) }, logout);
      const d = await r.json();
      setSettings(d); setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {}
    setSaving(false);
  };

  const inp = 'w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500';
  const set = (key, val) => setSettings(s => ({ ...s, [key]: val }));
  const setNested = (parent, key, val) => setSettings(s => ({ ...s, [parent]: { ...s[parent], [key]: val } }));

  if (loading) return <div className="h-64 bg-white rounded-2xl border border-slate-100 animate-pulse" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900">Store Settings</h2>
        {saved && <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold"><CheckCircle2 className="w-4 h-4" /> Saved!</span>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Info */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-black text-slate-900 border-b pb-2">🏪 Store Information</h3>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Store Name</label><input className={inp} value={settings?.storeName || ''} onChange={e => set('storeName', e.target.value)} /></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Support Email</label><input className={inp} value={settings?.storeEmail || ''} onChange={e => set('storeEmail', e.target.value)} /></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Phone</label><input className={inp} value={settings?.storePhone || ''} onChange={e => set('storePhone', e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Currency</label><input className={inp} value={settings?.currency || ''} onChange={e => set('currency', e.target.value)} placeholder="INR" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Symbol</label><input className={inp} value={settings?.currencySymbol || ''} onChange={e => set('currencySymbol', e.target.value)} placeholder="₹" /></div>
          </div>
        </div>

        {/* Shipping & Tax */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-black text-slate-900 border-b pb-2">🚚 Shipping & Tax</h3>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Shipping Charge (₹)</label><input type="number" className={inp} value={settings?.shippingCharge || 0} onChange={e => set('shippingCharge', Number(e.target.value))} /></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Free Shipping Above (₹)</label><input type="number" className={inp} value={settings?.freeShippingAbove || 0} onChange={e => set('freeShippingAbove', Number(e.target.value))} /></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Tax Rate (%)</label><input type="number" className={inp} value={settings?.taxRate || 0} onChange={e => set('taxRate', Number(e.target.value))} /></div>
        </div>

        {/* Payment Gateway */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-black text-slate-900 border-b pb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-500" /> Payment Gateways</h3>
          <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-2 font-semibold">⚠️ These keys are sensitive. Never share them publicly.</p>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Razorpay Key ID</label><input className={inp} type="password" value={settings?.razorpayKeyId || ''} onChange={e => set('razorpayKeyId', e.target.value)} placeholder="rzp_live_..." /></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Razorpay Key Secret</label><input className={inp} type="password" value={settings?.razorpayKeySecret || ''} onChange={e => set('razorpayKeySecret', e.target.value)} /></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Stripe Publishable Key</label><input className={inp} type="password" value={settings?.stripePublishableKey || ''} onChange={e => set('stripePublishableKey', e.target.value)} placeholder="pk_live_..." /></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Stripe Secret Key</label><input className={inp} type="password" value={settings?.stripeSecretKey || ''} onChange={e => set('stripeSecretKey', e.target.value)} placeholder="sk_live_..." /></div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-black text-slate-900 border-b pb-2">🌐 Social Links</h3>
          {['facebook', 'instagram', 'twitter'].map(s => (
            <div key={s}><label className="block text-xs font-bold text-slate-700 mb-1 capitalize">{s}</label>
              <input className={inp} value={settings?.socialLinks?.[s] || ''} onChange={e => setNested('socialLinks', s, e.target.value)} placeholder={`https://${s}.com/yourstore`} /></div>
          ))}
        </div>
      </div>

      <button onClick={save} disabled={saving} className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-500 disabled:bg-slate-300 transition shadow-lg shadow-indigo-600/20">
        {saving ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN ADMIN DASHBOARD SHELL
══════════════════════════════════════════════════════ */
const TABS = [
  { id: 'overview',   label: 'Dashboard',  Icon: LayoutDashboard },
  { id: 'products',   label: 'Products',   Icon: Package },
  { id: 'orders',     label: 'Orders',     Icon: ShoppingBag },
  { id: 'customers',  label: 'Customers',  Icon: Users },
  { id: 'inventory',  label: 'Inventory',  Icon: Layers },
  { id: 'coupons',    label: 'Coupons',    Icon: Tag },
  { id: 'banners',    label: 'Banners',    Icon: Image },
  { id: 'reviews',    label: 'Reviews',    Icon: Star },
  { id: 'settings',   label: 'Settings',   Icon: Settings },
];

export const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/auth'); };

  const panelProps = { logout: handleLogout };

  const PANELS = {
    overview:  <AdminOverview  {...panelProps} />,
    products:  <AdminProducts  {...panelProps} />,
    orders:    <AdminOrders    {...panelProps} />,
    customers: <AdminCustomers {...panelProps} />,
    inventory: <AdminInventory {...panelProps} />,
    coupons:   <AdminCoupons   {...panelProps} />,
    banners:   <AdminBanners   {...panelProps} />,
    reviews:   <AdminReviews   {...panelProps} />,
    settings:  <AdminSettings  {...panelProps} />,
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`${mobile ? 'flex flex-col h-full' : 'hidden lg:flex flex-col'} w-64 bg-slate-900 text-white h-screen sticky top-0 flex-shrink-0`}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm">S</div>
          <div>
            <p className="font-black text-white text-sm">StyleVerse</p>
            <p className="text-[10px] text-slate-400 font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Admin info */}
      <div className="px-4 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-black text-sm flex-shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-400 capitalize">Super Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {TABS.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-800">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:bg-rose-900 hover:text-rose-300 transition">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 z-10">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-slate-100 px-4 lg:px-8 py-4 flex items-center gap-4 sticky top-0 z-30 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100">
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <h1 className="text-base font-black text-slate-900">{TABS.find(t => t.id === activeTab)?.label}</h1>
            <p className="text-[10px] text-slate-400">StyleVerse Admin Panel</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a href="/" target="_blank" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition">
              <Eye className="w-4 h-4" /> View Store
            </a>
          </div>
        </div>

        {/* Panel Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-auto">
          {PANELS[activeTab]}
        </div>
      </div>
    </div>
  );
};
