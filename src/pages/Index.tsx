
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "../components/Landing";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import ItemDetail from "../components/ItemDetail";
import AddItem from "../components/AddItem";
import AdminPanel from "../components/AdminPanel";

// Simple auth context for demo purposes
export const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isAdmin: false
});

const Index = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (userData) => {
    setUser(userData);
    if (userData.email === 'admin@rewear.com') {
      setIsAdmin(true);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/item/:id" 
            element={<ItemDetail />} 
          />
          <Route 
            path="/add-item" 
            element={user ? <AddItem /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin" 
            element={user && isAdmin ? <AdminPanel /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default Index;
