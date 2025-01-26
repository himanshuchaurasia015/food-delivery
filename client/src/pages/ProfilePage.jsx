import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const ProfilePage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.put(
        "/auth/update",
        { _id: user._id, password },
        {
          withCredentials: true,
        }
      );

      alert("Profile updated successfully");
      setLoading(false);
    } catch (err) {
      setError("Update failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-green-50 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            disabled
            type="text"
            id="username"
            value={user.username}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Leave blank if you don't want to change"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
