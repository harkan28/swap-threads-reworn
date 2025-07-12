
import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "../components/Landing";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import ItemDetail from "../components/ItemDetail";
import AddItem from "../components/AddItem";
import AdminPanel from "../components/AdminPanel";
import { ScrollProgress } from "../components/animations/ScrollTriggers";
import { toast } from "@/hooks/use-toast";

// Simple auth context for demo purposes
export const AuthContext = React.createContext({
  user: null,
  login: (userData?: any) => {},
  logout: () => {},
  isAdmin: false
});

const Index = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  const login = (userData) => {
    setUser(userData);
    if (userData.email === 'admin@rewear.com') {
      setIsAdmin(true);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      <div className="min-h-screen bg-black text-white">
        <ScrollProgress />
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
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
        </AnimatePresence>
      </div>
    </AuthContext.Provider>
  );
};

export default Index;
