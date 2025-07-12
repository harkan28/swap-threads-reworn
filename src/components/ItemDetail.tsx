
import { useParams, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../pages/Index";
import Header from "./Header";
import { ArrowLeft, Heart, Share2, Star, User, Clock, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ItemDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [currentImage, setCurrentImage] = useState(0);

  // Mock item data
  const item = {
    id: 1,
    title: "Vintage Leather Jacket",
    description: "A beautiful vintage leather jacket in excellent condition. Perfect for adding a classic touch to any outfit. This jacket has been well-maintained and shows minimal wear. Great for both casual and semi-formal occasions.",
    category: "Outerwear",
    type: "Jacket",
    size: "M",
    condition: "Excellent",
    points: 25,
    tags: ["vintage", "leather", "classic", "brown"],
    owner: {
      name: "Sarah M.",
      avatar: null,
      rating: 4.8,
      location: "New York, NY",
      joinDate: "2023"
    },
    images: [
      "/lovable-uploads/3fb9e3c8-c36d-4eed-9f77-a4241f2f582e.png",
      "/lovable-uploads/22a43abb-3b2f-4742-a317-f341a25bb230.png",
      "/lovable-uploads/3fb9e3c8-c36d-4eed-9f77-a4241f2f582e.png"
    ],
    status: "available",
    listedDate: "2 days ago"
  };

  const handleSwapRequest = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to request a swap",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Swap Request Sent!",
      description: "Your swap request has been sent to Sarah M.",
    });
  };

  const handlePointsRedeem = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to redeem with points",
        variant: "destructive"
      });
      return;
    }

    if (user.points < item.points) {
      toast({
        title: "Insufficient Points",
        description: `You need ${item.points - user.points} more points to redeem this item`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Item Redeemed!",
      description: `You've successfully redeemed this item for ${item.points} points`,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/dashboard" 
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Browse</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl mb-4 overflow-hidden">
                <div className="w-full h-full bg-black/20"></div>
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="flex space-x-4">
                {item.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImage === index 
                      ? 'border-purple-500' 
                      : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Item Details */}
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>Size {item.size}</span>
                    <span>•</span>
                    <span>{item.condition}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Points Display */}
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-6 mb-6 border border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text mb-2">
                    {item.points} Points
                  </div>
                  <p className="text-gray-400">Required to redeem this item</p>
                </div>
              </div>

              {/* Owner Info */}
              <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-lg font-bold">
                    {item.owner.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{item.owner.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-400">{item.owner.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{item.owner.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Member since {item.owner.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleSwapRequest}
                  className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-colors"
                >
                  <span>Request Swap</span>
                </button>
                <button 
                  onClick={handlePointsRedeem}
                  className="flex items-center justify-center space-x-2 px-6 py-4 border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                >
                  <span>Redeem ({item.points} pts)</span>
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-4 text-center">
                Listed {item.listedDate} • Available for swap or redemption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
