
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../pages/Index";
import Header from "./Header";
import { Plus, Search, Filter, Star, Clock, Check } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("browse");

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
      title: "Summer Dress",
      category: "Casual",
      points: 20,
      condition: "Like New",
      owner: "Emma K.",
      status: "available",
      image: "/lovable-uploads/3fb9e3c8-c36d-4eed-9f77-a4241f2f582e.png"
    }
  ];

  const myListings = [
    {
      id: 4,
      title: "Blue Denim Jacket",
      category: "Casual",
      points: 18,
      status: "available",
      views: 24
    },
    {
      id: 5,
      title: "Black Hoodie",
      category: "Streetwear",
      points: 15,
      status: "swapped",
      views: 31
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* User Info & Stats */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 mb-8 border border-white/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, {user?.name || 'User'}!</h1>
                  <p className="text-gray-400">Ready to discover new fashion treasures?</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{user?.points || 0}</div>
                  <div className="text-sm text-gray-400">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">2</div>
                  <div className="text-sm text-gray-400">Listings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">3</div>
                  <div className="text-sm text-gray-400">Swaps</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === "browse" 
                ? "bg-white text-black" 
                : "text-gray-400 hover:text-white"
              }`}
            >
              Browse Items
            </button>
            <button
              onClick={() => setActiveTab("my-listings")}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === "my-listings" 
                ? "bg-white text-black" 
                : "text-gray-400 hover:text-white"
              }`}
            >
              My Listings
            </button>
            <button
              onClick={() => setActiveTab("swaps")}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === "swaps" 
                ? "bg-white text-black" 
                : "text-gray-400 hover:text-white"
              }`}
            >
              My Swaps
            </button>
          </div>

          {/* Browse Items Tab */}
          {activeTab === "browse" && (
            <div>
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for items..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>
                <button className="flex items-center space-x-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Filter className="h-5 w-5" />
                  <span>Filter</span>
                </button>
                <Link 
                  to="/add-item"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>List Item</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockItems.map((item) => (
                  <Link key={item.id} to={`/item/${item.id}`} className="group">
                    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-colors">
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-700 relative">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                          {item.points} pts
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{item.category} • {item.condition}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">by {item.owner}</span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            Available
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* My Listings Tab */}
          {activeTab === "my-listings" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">My Listings</h2>
                <Link 
                  to="/add-item"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add New Item</span>
                </Link>
              </div>

              <div className="space-y-4">
                {myListings.map((item) => (
                  <div key={item.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg"></div>
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.category} • {item.points} points</p>
                        <p className="text-gray-500 text-sm">{item.views} views</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        item.status === 'available' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {item.status === 'available' ? (
                          <>
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            Available
                          </>
                        ) : (
                          <>
                            <Check className="w-3 h-3 mr-2" />
                            Swapped
                          </>
                        )}
                      </span>
                      <button className="text-gray-400 hover:text-white">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Swaps Tab */}
          {activeTab === "swaps" && (
            <div>
              <h2 className="text-2xl font-bold mb-8">My Swaps</h2>
              
              <div className="grid gap-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Swap with Emma K.</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-400">
                      <Clock className="w-3 h-3 mr-2" />
                      Pending
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">You're giving:</p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg"></div>
                        <div>
                          <p className="font-medium">Blue Denim Jacket</p>
                          <p className="text-sm text-gray-400">18 points</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">You're getting:</p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg"></div>
                        <div>
                          <p className="font-medium">Summer Dress</p>
                          <p className="text-sm text-gray-400">20 points</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
