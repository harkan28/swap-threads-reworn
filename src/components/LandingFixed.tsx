import { Link } from "react-router-dom";
import { ArrowRight, Recycle, Heart, Users, Star, TrendingUp } from "lucide-react";
import Header from "./Header";

const Landing = () => {
  const featuredItems = [
    {
      id: 1,
      image: "/lovable-uploads/3fb9e3c8-c36d-4eed-9f77-a4241f2f582e.png",
      title: "Vintage Leather Jacket",
      category: "Outerwear",
      points: 25
    },
    {
      id: 2,
      image: "/lovable-uploads/22a43abb-3b2f-4742-a317-f341a25bb230.png",
      title: "Designer Blazer", 
      category: "Professional",
      points: 30
    },
    {
      id: 3,
      image: "/lovable-uploads/3fb9e3c8-c36d-4eed-9f77-a4241f2f582e.png",
      title: "Casual Hoodie",
      category: "Streetwear", 
      points: 15
    }
  ];

  const stats = [
    { icon: Users, label: "Active Swappers", value: "10K+" },
    { icon: Recycle, label: "Items Swapped", value: "50K+" },
    { icon: Heart, label: "CO2 Saved", value: "2.5T" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-6">
            REWEAR
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 text-gray-300 max-w-2xl mx-auto">
            Sustainable fashion through community-driven clothing swaps
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4">Featured Items</h2>
            <p className="text-gray-400 text-lg">Discover amazing pieces from our community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div key={item.id} className="bg-white/5 border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
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
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-3">{item.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-medium">{item.points} points</span>
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Simple steps to start swapping</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-medium mb-2">List Your Items</h3>
              <p className="text-gray-400">Upload photos and descriptions of clothes you want to swap</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-medium mb-2">Browse & Connect</h3>
              <p className="text-gray-400">Discover items from other users and make swap requests</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-medium mb-2">Swap & Enjoy</h3>
              <p className="text-gray-400">Complete the swap and enjoy your new sustainable wardrobe</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-4">Ready to Start Swapping?</h2>
          <p className="text-gray-400 text-lg mb-8">Join thousands of users making fashion more sustainable</p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300"
          >
            Join the Community
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2024 REWEAR. Making fashion sustainable, one swap at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
