
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../pages/Index";
import { User, ShoppingBag, LogOut } from "lucide-react";

const Header = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          ReWear
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link to="/dashboard" className="hover:text-gray-300 transition-colors">Browse</Link>
          <Link to="/add-item" className="hover:text-gray-300 transition-colors">List Item</Link>
          {isAdmin && (
            <Link to="/admin" className="hover:text-gray-300 transition-colors text-purple-400">Admin</Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">{user.name}</span>
              </Link>
              <button 
                onClick={logout}
                className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="hover:text-gray-300 transition-colors"
              >
                Login
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
