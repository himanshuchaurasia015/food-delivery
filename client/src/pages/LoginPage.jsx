import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const LoginPage = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", { username, password });
      setUser(response.data.user);
      setIsAuthenticated(true);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-green-600 text-white py-6 px-8 text-center">
          <h1 className="text-3xl font-bold">Fresh Feast</h1>
          <p className="text-sm mt-2">Healthy meals, delivered fresh!</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
            <a
              href="#"
              className="text-sm text-green-600 hover:text-green-800 mt-2 block text-right"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg 
              hover:bg-green-700 transition duration-300 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            New to Fresh Feast?
            <a
              href="/register"
              className="text-green-600 ml-1 hover:text-green-800"
            >
              Create an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
