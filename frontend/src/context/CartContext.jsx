import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth, authFetch } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { user } = useAuth();
  const [notification, setNotification] = useState(null);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  // Show temporary toast message
  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch or load cart
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
              size: item.size,
              quantity: item.quantity,
            }));
            setCartItems(formatted);
            return;
          }
        } catch (err) {
          console.error('Failed to sync backend cart:', err);
        }
      }

      // Fallback to localStorage if guest
      const savedCart = localStorage.getItem('cloth_shop_guest_cart');
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

  // Persist guest cart
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cloth_shop_guest_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product, size, quantity = 1) => {
    if (!size) {
      showToast('Please select a size first');
      return false;
    }

    const token = localStorage.getItem('cloth_shop_token');

    if (user && token) {
      try {
        const res = await fetch('/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: product._id, size, quantity }),
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
          showToast(`Added ${product.name} (${size}) to Cart!`);
          setIsCartDrawerOpen(true);
          return true;
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Guest add fallback
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) => item.productId === product._id && item.size === size
      );

      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { productId: product._id, product, size, quantity }];
      }
    });

    showToast(`Added ${product.name} (${size}) to Cart!`);
    setIsCartDrawerOpen(true);
    return true;
  };

  const saveForLaterItem = (itemToSave) => {
    removeFromCart(itemToSave.productId, itemToSave.size);
    setSavedForLater((prev) => [...prev, itemToSave]);
    showToast('Saved item for later');
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

