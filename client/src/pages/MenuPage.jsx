import React, { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import api from "../api/axios";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("name");
  const [filter, setFilter] = useState("");

  const fetchMenu = async (page, sortBy, categoryFilter) => {
    try {
      const response = await api(
        `/menu?page=${page}&sort=${sortBy}&category=${categoryFilter}`
      );
      setMenuItems(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    fetchMenu(currentPage, sortOption, filter);
  }, [currentPage, sortOption, filter]);

  const categories = [
    "All",
    "Appetizers",
    "Main Course",
    "Desserts",
    "Beverages",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Menu</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our delicious selection of dishes crafted with the finest
          ingredients
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        {/* Category Filters */}
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category === "All" ? "" : category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                filter === (category === "All" ? "" : category)
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border rounded-md text-gray-700"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>

      {/* Menu Items Grid */}
      {menuItems.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No items found in this category
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow-sm">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 border ${
                  currentPage === index + 1
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
