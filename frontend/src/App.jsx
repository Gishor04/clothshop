import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

import { HomePage } from './pages/HomePage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AuthPage } from './pages/AuthPage';
import { ContactPage } from './pages/ContactPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { FaqPage } from './pages/FaqPage';
import { WishlistPage } from './pages/WishlistPage';
import { PolicyPage } from './pages/PolicyPage';

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <Navigate to="/auth" replace />;
  return children;
};

const ToastNotification = () => {
  const { notification } = useCart();
  if (!notification) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-stone-800 text-xs font-bold animate-bounce flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
      <span>{notification}</span>
    </div>
  );
};

// Layout wrapper — hides Navbar/Footer for admin panel
const ShopLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col justify-between bg-stone-50 text-stone-900 font-['Plus_Jakarta_Sans',sans-serif]">
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
    <Footer />
    <ToastNotification />
    <CartDrawer />
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
      <Route path="/contact" element={<ShopLayout><ContactPage /></ShopLayout>} />
      <Route path="/about" element={<ShopLayout><AboutUsPage /></ShopLayout>} />
      <Route path="/faq" element={<ShopLayout><FaqPage /></ShopLayout>} />
      <Route path="/wishlist" element={<ShopLayout><WishlistPage /></ShopLayout>} />
      <Route path="/policies" element={<ShopLayout><PolicyPage /></ShopLayout>} />
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
          <WishlistProvider>
            <CompareProvider>
              <AppContent />
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
