import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "./Header";
import { Plus, Search, Filter, Star, Clock, Check, TrendingUp, Heart, Recycle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("browse");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration
  const mockItems = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      category: "Outerwear",
      points: 25,
      condition: "Excellent",
      owner: "Sarah M.",
      status: "available",
      image: "/lovable-uploads/3fb9e3c8-c36d-4eed-9f77-a4241f2f582e.png"
    },
    {
      id: 2,
      title: "Designer Blazer",
      category: "Professional",
      points: 30,
      condition: "Good",
      owner: "Mike R.",
      status: "available",
      image: "/lovable-uploads/22a43abb-3b2f-4742-a317-f341a25bb230.png"
    },
    {
      id: 3,
      title: "Casual Hoodie",
      category: "Streetwear",
      points: 15,
      condition: "Very Good",
      owner: "Alex K.",
      status: "available",
      image: "/lovable-uploads/3fb9e3c8-c36d-4eed-9f77-a4241f2f582e.png"
    }
  ];

  const myListings = [
    {
      id: 4,
      title: "Blue Denim Jacket",
      category: "Casual",
      points: 20,
      condition: "Good",
      status: "available",
      image: "/lovable-uploads/22a43abb-3b2f-4742-a317-f341a25bb230.png"
    }
  ];

  const stats = {
    totalSwaps: 12,
    pointsEarned: 340,
    itemsListed: 8,
    rating: 4.8
  };

  const filteredItems = mockItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "browse":
        return (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300"
                />
              </div>
              <button className="px-4 py-2 border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white/5 border border-white/10 p-4 hover:border-white/20 transition-all duration-300">
                  <div className="aspect-square bg-white/10 mb-4 flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666'%3EImage%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{item.category}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-green-400">{item.points} points</span>
                    <span className="text-xs text-gray-500">{item.condition}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">by {item.owner}</p>
                  <button className="w-full py-2 bg-white text-black hover:bg-gray-100 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "my-listings":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">My Listings</h2>
              <Link
                to="/add-item"
                className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </Link>
            </div>

            {myListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.map((item) => (
                  <div key={item.id} className="bg-white/5 border border-white/10 p-4">
                    <div className="aspect-square bg-white/10 mb-4 flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666'%3EImage%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{item.category}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-green-400">{item.points} points</span>
                      <span className="text-xs text-gray-500">{item.condition}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-2 bg-white/10 border border-white/20 hover:border-white/40 transition-colors text-sm">
                        Edit
                      </button>
                      <button className="flex-1 py-2 bg-red-600/20 border border-red-600/40 hover:border-red-600/60 transition-colors text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No items listed yet</h3>
                <p className="text-gray-400 mb-4">Start by adding your first item to swap</p>
                <Link
                  to="/add-item"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Your First Item
                </Link>
              </div>
            )}
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Profile & Stats</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 p-4 text-center">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalSwaps}</div>
                <div className="text-sm text-gray-400">Total Swaps</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 text-center">
                <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.pointsEarned}</div>
                <div className="text-sm text-gray-400">Points Earned</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 text-center">
                <Recycle className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.itemsListed}</div>
                <div className="text-sm text-gray-400">Items Listed</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 text-center">
                <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.rating}</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
            </div>

            {/* User Info */}
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="text-lg font-medium mb-4">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <div className="text-white">{user?.email || "Not available"}</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Member Since</label>
                  <div className="text-white">January 2024</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Location</label>
                  <div className="text-white">Not set</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-light mb-2">Welcome back, {user?.email || "User"}!</h1>
            <p className="text-gray-400">Ready to continue your sustainable journey?</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-white/10 mb-8">
            <nav className="flex space-x-8">
              {[
                { id: "browse", label: "Browse Items", icon: Search },
                { id: "my-listings", label: "My Listings", icon: Clock },
                { id: "profile", label: "Profile", icon: Check }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
                    activeTab === id
                      ? "border-white text-white"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
