import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Fetch cart data from the backend when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated) {
        return;
      }
      try {
        const response = await api(`/cart/${user.userId}`, {
          withCredentials: true,
        });

        setCart(Array.isArray(response.data.items) ? response.data.items : []);
        console.log(response.data.items);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, [isAuthenticated, user]);

  //add items

  const addItem = async (item) => {
    try {
      const response = await api.post(
        `/cart/add`,
        { ...item, userId: user.userId },
        { withCredentials: true }
      );

      if (response.data && Array.isArray(response.data.items)) {
        setCart(response.data.items);
      } else {
        console.error("Unexpected cart response structure:", response.data);
      }
    } catch (error) {
      console.error(
        "Error adding item to cart:",
        error.response?.data || error.message
      );
    }
  };
  //remove items
  const removeItem = async (productId) => {
    try {
      const response = await api.post(
        `/cart/remove`,
        { productId, userId: user.userId },
        { withCredentials: true }
      );
      if (response.data && Array.isArray(response.data.items)) {
        setCart(response.data.items);
      } else {
        console.error("Unexpected cart response structure:", response.data);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  //update

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await api.put(
        `/cart/update`,
        { productId, quantity, userId: user.userId },
        { withCredentials: true }
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  // Calculate the total price
  const calculateTotal = useMemo(() => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((acc, item) => {
      const price = item.productId?.price || item.price || 0;
      const quantity = item.quantity || 1;
      return acc + price * quantity;
    }, 0);
  }, [cart]);

  // Clear the cart
  const clearCart = async () => {
    try {
      const response = await api.delete(`/cart/${user.userId}`, {
        withCredentials: true,
      });
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        calculateTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
