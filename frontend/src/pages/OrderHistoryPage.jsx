import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/SeoMeta';
import { Package, Clock, CheckCircle2, Truck, ShoppingBag } from 'lucide-react';

export const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('cloth_shop_token');
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch('/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-extrabold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Delivered</span>;
      case 'shipped':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-[11px] font-extrabold flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Shipped</span>;
      case 'processing':
        return <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-[11px] font-extrabold flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Processing</span>;
      default:
        return <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-[11px] font-extrabold flex items-center gap-1"><Package className="w-3.5 h-3.5" /> Order Placed</span>;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <div className="h-8 bg-stone-200 rounded-xl w-48 animate-pulse" />
        <div className="h-48 bg-stone-200 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
        <SeoMeta title="My Bag Orders — Kottuba Sri Lanka" />
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-stone-900">No Orders Found</h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          You haven't placed any Kottuba orders yet. Explore our Sri Lanka leather collection to find your next bag!
        </p>
        <Link
          to="/products"
          className="inline-block px-6 py-3 rounded-2xl bg-amber-900 text-white font-bold text-xs shadow-md"
        >
          Explore Bag Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <SeoMeta title="My Orders & Delivery History — Kottuba Sri Lanka" />

      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900">My Kottuba Order History</h1>
        <p className="text-xs text-stone-500 mt-1">Track status and view details of your handcrafted bag purchases</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6"
          >
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Order ID</span>
                <span className="text-sm font-black text-stone-900">#{order._id.slice(-8).toUpperCase()}</span>
                <span className="text-xs text-stone-500 ml-3">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(order.orderStatus)}
                <span className="text-base font-black text-amber-900">
                  Rs. {(order.totalAmount || 0).toLocaleString('en-US')}.00
                </span>
              </div>
            </div>

            {/* Products thumbnails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {order.products?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-100">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200'}
                    alt=""
                    className="w-14 h-16 object-cover rounded-xl bg-white flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 truncate">{item.name}</p>
                    <p className="text-[11px] text-stone-500">Qty: {item.quantity}</p>
                    <p className="text-xs font-extrabold text-stone-800">
                      Rs. {((item.price || 0) * item.quantity).toLocaleString('en-US')}.00
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Address Footer */}
            <div className="text-xs text-stone-500 bg-stone-50 p-3.5 rounded-2xl border border-stone-100 flex items-center justify-between">
              <div>
                <strong className="text-stone-900">Deliver to: </strong>
                {order.shippingAddress?.name}, {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.district}
              </div>
              <span className="font-semibold text-stone-700 capitalize">Payment: {order.paymentStatus || 'COD'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
