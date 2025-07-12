
import { Link } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../pages/Index";
import { User, ShoppingBag, LogOut, Menu } from "lucide-react";
import { SlideInText } from "./animations/TextEffects";

const Header = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Link to="/" className="text-2xl font-light tracking-wider">
            REWEAR
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
                  className="absolute bottom-0 left-0 h-px bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/admin" className="hover:text-gray-300 transition-colors text-purple-400 font-light">
                Admin
              </Link>
            </motion.div>
          )}
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
                  <span className="hidden sm:inline">{user.name}</span>
                </Link>
              </motion.div>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
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
  );
};

export default Header;
              </Link>
              <Link 
                to="/register" 
                className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
