import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { Trash2, ShoppingCart, Plus, Minus } from "lucide-react";

const Cart = () => {
  const { cart, updateQuantity, removeItem, clearCart, calculateTotal } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      await api.post(
        "/order",
        {
          userId: user.userId,
          items: cart,
          totalAmount: calculateTotal,
        },
        { withCredentials: true }
      );

      alert("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <ShoppingCart className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500">
            Looks like you haven't added any items yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => {
            const productId = item.productId?._id || item.productId;
            const productName = item.productId?.name || "Unknown Product";
            const productPrice = item.productId?.price || 0;

            return (
              <div
                key={productId}
                className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold">{productName}</h3>
                  <p className="text-green-600 font-bold">
                    ${productPrice.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(
                          productId,
                          Math.max(1, (item.quantity || 1) - 1)
                        )
                      }
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="px-4">{item.quantity || 1}</span>
                    <button
                      onClick={() =>
                        updateQuantity(productId, (item.quantity || 1) + 1)
                      }
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(productId)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax (10%)</span>
              <span>${(calculateTotal * 0.1).toFixed(2)}</span>
            </div>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>${(calculateTotal * 1.1).toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="mt-6 w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center justify-center"
          >
            <ShoppingCart className="mr-2" />
            {isProcessing ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
