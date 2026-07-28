import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { user } = useAuth();
  const [notification, setNotification] = useState(null);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('cloth_shop_token');
      if (user && token) {
        try {
          const res = await fetch('/api/cart', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            const formatted = data.map((item) => ({
              productId: item.productId._id || item.productId,
              product: item.productId,
              size: item.size || 'One Size',
              quantity: item.quantity,
            }));
            setCartItems(formatted);
            return;
          }
        } catch (err) {
          console.error('Failed to sync backend cart:', err);
        }
      }

      const savedCart = localStorage.getItem('kottuba_cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          setCartItems([]);
        }
      }
    };

    fetchCart();
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('kottuba_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product, size, quantity = 1) => {
    const targetSize = size || product.sizes?.[0]?.size || 'One Size';
    const token = localStorage.getItem('cloth_shop_token');

    if (user && token) {
      try {
        const res = await fetch('/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: product._id, size: targetSize, quantity }),
        });

        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((item) => ({
            productId: item.productId._id || item.productId,
            product: item.productId,
            size: item.size || 'One Size',
            quantity: item.quantity,
          }));
          setCartItems(formatted);
          showToast(`Added ${product.name} to Cart!`);
          setIsCartDrawerOpen(true);
          return true;
        }
      } catch (err) {
        console.error(err);
      }
    }

    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) => item.productId === product._id && item.size === targetSize
      );

      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { productId: product._id, product, size: targetSize, quantity }];
      }
    });

    showToast(`Added ${product.name} to Cart!`);
    setIsCartDrawerOpen(true);
    return true;
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AVURUDU25') {
      setAppliedCoupon({ code: 'AVURUDU25', discountPercent: 25, label: 'Avurudu New Year Sale (25% OFF)' });
      showToast('Coupon AVURUDU25 applied! 25% discount activated.');
      return true;
    } else if (clean === 'KOTTUBA10') {
      setAppliedCoupon({ code: 'KOTTUBA10', discountPercent: 10, label: 'Welcome 10% OFF' });
      showToast('Coupon KOTTUBA10 applied! 10% discount activated.');
      return true;
    } else {
      showToast('Invalid Coupon Code. Try AVURUDU25 or KOTTUBA10');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  const saveForLaterItem = (itemToSave) => {
    removeFromCart(itemToSave.productId, itemToSave.size);
    setSavedForLater((prev) => [...prev, itemToSave]);
    showToast('Item saved for later');
  };

  const moveToCartFromSaved = (itemToMove) => {
    setSavedForLater((prev) =>
      prev.filter(
        (i) => !(i.productId === itemToMove.productId && i.size === itemToMove.size)
      )
    );
    addToCart(itemToMove.product, itemToMove.size, itemToMove.quantity || 1);
  };

  const updateQuantity = async (productId, size, newQty) => {
    if (newQty < 1) {
      return removeFromCart(productId, size);
    }

    const token = localStorage.getItem('cloth_shop_token');
    if (user && token) {
      try {
        const res = await fetch('/api/cart/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, size, quantity: newQty }),
        });
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((item) => ({
            productId: item.productId._id || item.productId,
            product: item.productId,
            size: item.size,
            quantity: item.quantity,
          }));
          setCartItems(formatted);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = async (productId, size) => {
    const token = localStorage.getItem('cloth_shop_token');
    if (user && token) {
      try {
        const res = await fetch(`/api/cart/remove/${productId}/${size}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((item) => ({
            productId: item.productId._id || item.productId,
            product: item.productId,
            size: item.size,
            quantity: item.quantity,
          }));
          setCartItems(formatted);
          showToast('Item removed from cart');
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
    showToast('Item removed from cart');
  };

  const clearCart = async () => {
    const token = localStorage.getItem('cloth_shop_token');
    if (user && token) {
      try {
        await fetch('/api/cart/clear', {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error(err);
      }
    }
    setCartItems([]);
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  const discountAmount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const estimatedShipping = cartSubtotal > 10000 || cartSubtotal === 0 ? 0 : 350;

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + estimatedShipping);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedForLater,
        addToCart,
        updateQuantity,
        removeFromCart,
        saveForLaterItem,
        moveToCartFromSaved,
        clearCart,
        totalItemCount,
        cartSubtotal,
        discountAmount,
        estimatedShipping,
        cartTotal,
        couponCode,
        setCouponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        notification,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
