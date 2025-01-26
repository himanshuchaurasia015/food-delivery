import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Home,
  ShoppingCart,
  List,
  User,
  LogOut,
  Menu as MenuIcon,
} from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="flex items-center space-x-2 hover:text-green-200">
        <Home className="w-5 h-5" />
        <span>Menu</span>
      </Link>
      <Link
        to="/cart"
        className="flex items-center space-x-2 hover:text-green-200"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Cart</span>
      </Link>
      <Link
        to="/orders"
        className="flex items-center space-x-2 hover:text-green-200"
      >
        <List className="w-5 h-5" />
        <span>Orders</span>
      </Link>
      {isAuthenticated ? (
        <>
          <Link
            to="/profile"
            className="flex items-center space-x-2 hover:text-green-200"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-300 hover:text-red-100"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <Link to="/login" className="hover:text-green-200">
          Login
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-green-600 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <MenuIcon className="w-8 h-8" />
          <span>Fresh Feast</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLinks />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-green-700 p-4">
          <div className="flex flex-col space-y-4">
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
