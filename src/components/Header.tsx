import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { hasSupabaseCredentials } from "../lib/supabase";
import { User, LogOut, AlertTriangle } from "lucide-react";
import { ScrollRevealText } from "./animations/TextEffects";
import { toast } from "@/hooks/use-toast";

const Header = () => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    }
  };

  return (
    <>
      {/* Demo Mode Warning Banner */}
      {!hasSupabaseCredentials && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-50 bg-amber-600/90 backdrop-blur-sm text-black text-center py-2 px-4 text-sm font-medium"
        >
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle size={16} />
            <span>Demo Mode: Configure Supabase credentials in .env to enable authentication & database features</span>
          </div>
        </motion.div>
      )}
      
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 ${
          !hasSupabaseCredentials ? 'top-10' : 'top-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="text-2xl font-light tracking-wider">
              <ScrollRevealText>REWEAR</ScrollRevealText>
            </Link>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { to: "/", label: "Home" },
              { to: "/dashboard", label: "Browse" },
              { to: "/add-item", label: "List Item" }
            ].map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link 
                  to={item.to} 
                  className="hover:text-gray-300 transition-colors font-light tracking-wide relative group"
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-white origin-left w-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            {/* Admin link - TODO: implement admin role detection */}
            {/* user?.email === 'admin@example.com' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/admin" className="hover:text-gray-300 transition-colors text-purple-400 font-light">
                  Admin
                </Link>
              </motion.div>
            ) */}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-2 hover:text-gray-300 transition-colors font-light"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">{user.email}</span>
                  </Link>
                </motion.div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link 
                    to="/login" 
                    className="hover:text-gray-300 transition-colors font-light"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 border border-white/30 hover:border-white/60 transition-colors font-light"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
