import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle2, Truck, AlertCircle, ShoppingBag } from 'lucide-react';

export const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('cloth_shop_token');
        if (!token) return;

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
        return <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-[11px] font-extrabold flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Processing</span>;
      default:
        return <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-[11px] font-extrabold flex items-center gap-1"><Package className="w-3.5 h-3.5" /> Order Placed</span>;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <div className="h-8 bg-slate-200 rounded-xl w-48 animate-pulse" />
        <div className="h-48 bg-slate-200 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">No Orders Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          You haven't placed any orders yet. Check out our store to find your next favorite outfit!
        </p>
        <Link
          to="/products"
          className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
        >
          Explore Clothing
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Order History</h1>
        <p className="text-xs text-slate-500 mt-1">Track status and view details of your previous purchases</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6"
          >
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Order ID</span>
                <span className="text-sm font-extrabold text-slate-900">#{order._id.slice(-8).toUpperCase()}</span>
                <span className="text-xs text-slate-500 ml-3">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(order.orderStatus)}
                <span className="text-base font-black text-indigo-600">${order.totalAmount?.toFixed(2)}</span>
              </div>
            </div>

            {/* Products thumbnails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {order.products?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200'}
                    alt=""
                    className="w-14 h-16 object-cover rounded-xl bg-white flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                    <p className="text-[11px] text-slate-500">Size: {item.size} &bull; Qty: {item.quantity}</p>
                    <p className="text-xs font-extrabold text-slate-800">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Address Footer */}
            <div className="text-xs text-slate-500 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <strong className="text-slate-900">Ship to: </strong>
                {order.shippingAddress?.name}, {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
              </div>
              <span className="font-semibold text-slate-700 capitalize">Payment: {order.paymentStatus}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
