import React, { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SignupPage = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post(
        "auth/register",
        { username, password },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setIsAuthenticated(true);
        history("/");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-green-600 text-white py-6 px-8 text-center">
          <h1 className="text-3xl font-bold">Fresh Feast</h1>
          <p className="text-sm mt-2">Create your culinary adventure!</p>
        </div>

        <form onSubmit={handleSignup} className="p-8 space-y-6">
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errorMessage}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg 
              hover:bg-green-700 transition duration-300 
              disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <a
              href="/login"
              className="text-green-600 ml-1 hover:text-green-800"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
