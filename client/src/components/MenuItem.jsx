import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Heart, ShoppingCart } from "lucide-react";

const MenuItem = ({ item }) => {
  const { addItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    addItem({ productId: item._id, quantity });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img
          src={item.imageUrl || "vite.svg"}
          alt={item.name}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-white/70 p-2 rounded-full hover:bg-white"
        >
          <Heart
            className={`w-6 h-6 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-500 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
          <span className="text-green-600 font-semibold text-lg">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-500 mb-4">{item.category}</p>

        <div className="flex items-center space-x-3">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-12 text-center focus:outline-none"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-grow flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <ShoppingCart className="mr-2 w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
