
import { useState } from "react";
import Header from "./Header";
import { Users, Package, ShoppingCart, TrendingUp, Check, X, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ScrollRevealText, ScrollRevealWords, ScrollRevealLetters, ScrollRevealSlide, ScrollRevealScale } from "./animations/TextEffects";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    totalUsers: 1247,
    activeListings: 89,
    pendingSwaps: 23,
    completedSwaps: 456
  };

  const [pendingItems, setPendingItems] = useState([
    {
      id: 1,
      title: "Vintage Band T-Shirt",
      owner: "Alex K.",
      category: "Tops",
      submittedDate: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      title: "Designer Handbag",
      owner: "Maria S.",
      category: "Accessories",
      submittedDate: "1 day ago",
      status: "pending"
    }
  ]);

  const recentUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2024-01-15",
      status: "active",
      listings: 3
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2024-01-14",
      status: "active",
      listings: 1
    }
  ];

  const handleViewItemDetails = (itemId) => {
    toast({
      title: "Item Details",
      description: `Viewing details for item ID: ${itemId}`,
    });
  };

  const handleViewUserDetails = (userId) => {
    toast({
      title: "User Details",
      description: `Viewing details for user ID: ${userId}`,
    });
  };

  const handleApproveItem = (itemId) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item Approved",
      description: "The item has been approved and is now live on the platform.",
    });
  };

  const handleRejectItem = (itemId) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item Rejected",
      description: "The item has been rejected and removed from the queue.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <ScrollRevealLetters className="text-3xl font-bold mb-2">Admin Dashboard</ScrollRevealLetters>
            <ScrollRevealWords className="text-gray-400">Manage users, items, and platform activity</ScrollRevealWords>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <ScrollRevealText className="text-blue-400 text-sm font-medium">Total Users</ScrollRevealText>
                  <ScrollRevealScale className="text-2xl font-bold">{stats.totalUsers.toString()}</ScrollRevealScale>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-green-700/20 rounded-xl p-6 border border-green-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <ScrollRevealText className="text-green-400 text-sm font-medium">Active Listings</ScrollRevealText>
                  <ScrollRevealScale className="text-2xl font-bold">{stats.activeListings.toString()}</ScrollRevealScale>
                </div>
                <Package className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-700/20 rounded-xl p-6 border border-yellow-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <ScrollRevealText className="text-yellow-400 text-sm font-medium">Pending Swaps</ScrollRevealText>
                  <ScrollRevealScale className="text-2xl font-bold">{stats.pendingSwaps.toString()}</ScrollRevealScale>
                </div>
                <ShoppingCart className="h-8 w-8 text-yellow-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-purple-700/20 rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <ScrollRevealText className="text-purple-400 text-sm font-medium">Completed Swaps</ScrollRevealText>
                  <ScrollRevealScale className="text-2xl font-bold">{stats.completedSwaps.toString()}</ScrollRevealScale>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === "overview" 
                ? "bg-white text-black" 
                : "text-gray-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("pending-items")}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === "pending-items" 
                ? "bg-white text-black" 
                : "text-gray-400 hover:text-white"
              }`}
            >
              Pending Items
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === "users" 
                ? "bg-white text-black" 
                : "text-gray-400 hover:text-white"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("swaps")}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === "swaps" 
                ? "bg-white text-black" 
                : "text-gray-400 hover:text-white"
              }`}
            >
              Swaps
            </button>
          </div>

          {/* Pending Items Tab */}
          {activeTab === "pending-items" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Pending Item Approvals</h2>
              
              <div className="space-y-4">
                {pendingItems.map((item) => (
                  <div key={item.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg"></div>
                        <div>
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <p className="text-gray-400 text-sm">by {item.owner} • {item.category}</p>
                          <p className="text-gray-500 text-sm">Submitted {item.submittedDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleViewItemDetails(item.id)}
                          className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleApproveItem(item.id)}
                          className="p-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleRejectItem(item.id)}
                          className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">User Management</h2>
              
              <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">User</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Join Date</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Listings</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {recentUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
                                {user.name.charAt(0)}
                              </div>
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-400">{user.email}</td>
                          <td className="px-6 py-4 text-gray-400">{user.joinDate}</td>
                          <td className="px-6 py-4 text-gray-400">{user.listings}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => handleViewUserDetails(user.id)}
                              className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Overview Tab (default) */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Users */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">New Users</h3>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-400">Joined {user.joinDate}</p>
                          </div>
                        </div>
                        <span className="text-sm text-green-400">{user.listings} listings</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Items */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">Items Awaiting Approval</h3>
                  <div className="space-y-4">
                    {pendingItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-400">by {item.owner} • {item.submittedDate}</p>
                        </div>
                        <span className="text-sm text-yellow-400">Pending</span>
                      </div>
                    ))}
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

export default AdminPanel;
