import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

function OrderPage() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await api.get("/order");
        setOrderHistory(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order history:", error);
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading orders...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Order History</h1>

      {orderHistory.length === 0 ? (
        <div className="text-center text-gray-500">No orders found</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orderHistory.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transform transition hover:scale-105"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    Order #{order._id.slice(-6)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xl font-bold text-gray-800">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold mb-2">Order Details</h3>
                  {order.items &&
                    order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.productId.name}</span>
                        <span>x{item.quantity}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderPage;
