
import { Link } from "react-router-dom";
import { ArrowRight, Recycle, Heart, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Header from "./Header";

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
    },
    {
      id: 4,
      image: "/lovable-uploads/22a43abb-3b2f-4742-a317-f341a25bb230.png",
      title: "Summer Dress",
      category: "Formal",
      points: 20
    },
    {
      id: 5,
      image: "/lovable-uploads/3fb9e3c8-c36d-4eed-9f77-a4241f2f582e.png",
      title: "Denim Jacket",
      category: "Casual",
      points: 18
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        <div className="text-center z-10 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm mb-6 border border-white/20">
            New spring collection 2025
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Where style speaks, trends resonate,
            <span className="block text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              fashion flourishes
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Unveiling a fashion destination where trends blend seamlessly with your
            individual style aspirations. Discover sustainable fashion through swapping!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors"
            >
              Start Swapping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/login" 
              className="inline-flex items-center px-8 py-4 border border-white/30 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Browse Items
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Swaps</h2>
          <div className="relative">
            <div className="flex overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 20}%)` }}
              >
                {featuredItems.map((item, index) => (
                  <div key={item.id} className="w-1/5 flex-shrink-0 px-4">
                    <Link to={`/item/${item.id}`} className="block group">
                      <div className="relative overflow-hidden rounded-3xl aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <div className="absolute bottom-6 left-6 z-20">
                          <p className="text-white/80 text-sm mb-1">{item.category}</p>
                          <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                            {item.points} points
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose ReWear?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Recycle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Sustainable Fashion</h3>
              <p className="text-gray-300">Reduce textile waste by giving clothes a second life through our swapping platform.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Point-Based System</h3>
              <p className="text-gray-300">Earn points by listing items and use them to get new pieces for your wardrobe.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Community Driven</h3>
              <p className="text-gray-300">Connect with fashion enthusiasts and build a sustainable wardrobe together.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
