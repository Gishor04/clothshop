import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AuthPage } from './pages/AuthPage';

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <Navigate to="/auth" replace />;
  return children;
};

const ToastNotification = () => {
  const { notification } = useCart();
  if (!notification) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 text-xs font-bold animate-bounce flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-emerald-400" />
      <span>{notification}</span>
    </div>
  );
};

// Layout wrapper — hides Navbar/Footer for admin panel
const ShopLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
    <Footer />
    <ToastNotification />
  </div>
);

export function AppContent() {
  return (
    <Routes>
      {/* Admin panel — full screen, no Navbar/Footer */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashboardPage />
          </ProtectedAdminRoute>
        }
      />

      {/* All shop pages share the ShopLayout */}
      <Route path="/" element={<ShopLayout><HomePage /></ShopLayout>} />
      <Route path="/products" element={<ShopLayout><ProductListPage /></ShopLayout>} />
      <Route path="/product/:id" element={<ShopLayout><ProductDetailPage /></ShopLayout>} />
      <Route path="/cart" element={<ShopLayout><CartPage /></ShopLayout>} />
      <Route path="/checkout" element={<ShopLayout><CheckoutPage /></ShopLayout>} />
      <Route path="/orders" element={<ShopLayout><OrderHistoryPage /></ShopLayout>} />
      <Route path="/auth" element={<ShopLayout><AuthPage /></ShopLayout>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
