import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/verify", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data.user); // Set the user data
        }
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout"); 
      setUser(null);
      setIsAuthenticated(false); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const contextValue = React.useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      loading,
      user,
      setUser,
      logout,
    }),
    [isAuthenticated, loading, user]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
