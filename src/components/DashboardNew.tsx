import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { AuthContext } from "../pages/Index";
import Header from "./Header";
import { Plus, Search, Filter, Star, Clock, Check, TrendingUp, Heart, Recycle } from "lucide-react";
import { PageTransition } from "./animations/PageTransitions";
import { FadeUpText, ScaleText } from "./animations/TextEffects";
import { FloatingCard, StaggeredContainer, MorphingButton, RotateCard } from "./animations/UIComponents";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("browse");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

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
    },
    {
      id: 4,
      title: "Denim Jacket",
      category: "Casual",
      points: 18,
      condition: "Good",
      owner: "Alex P.",
      status: "available",
      image: "/lovable-uploads/22a43abb-3b2f-4742-a317-f341a25bb230.png"
    },
    {
      id: 5,
      title: "Evening Gown",
      category: "Formal",
      points: 35,
      condition: "Excellent",
      owner: "Lisa T.",
      status: "available",
      image: "/lovable-uploads/3fb9e3c8-c36d-4eed-9f77-a4241f2f582e.png"
    },
    {
      id: 6,
      title: "Casual Sweater",
      category: "Casual",
      points: 15,
      condition: "Good",
      owner: "Tom W.",
      status: "available",
      image: "/lovable-uploads/22a43abb-3b2f-4742-a317-f341a25bb230.png"
    }
  ];

  const myListings = [
    {
      id: 4,
      title: "Blue Denim Jacket",
      category: "Casual",
      points: 18,
      condition: "Good",
      status: "available",
      image: "/lovable-uploads/3fb9e3c8-c36d-4eed-9f77-a4241f2f582e.png",
      views: 12,
      interests: 3
    },
    {
      id: 5,
      title: "Black Sneakers",
      category: "Footwear", 
      points: 22,
      condition: "Like New",
      status: "swapped",
      image: "/lovable-uploads/22a43abb-3b2f-4742-a317-f341a25bb230.png",
      views: 28,
      interests: 7
    }
  ];

  const stats = [
    { icon: TrendingUp, label: "Points Earned", value: user?.points || 50 },
    { icon: Heart, label: "Items Saved", value: 12 },
    { icon: Recycle, label: "Items Swapped", value: 8 }
  ];

  const tabs = [
    { id: "browse", label: "Browse Items" },
    { id: "my-items", label: "My Listings" },
    { id: "saved", label: "Saved Items" }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white">
        <Header />
        
        {/* Hero Section with User Welcome */}
        <section className="pt-24 pb-12 px-4 relative overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            style={{ y }}
          >
            <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-20 w-2 h-2 bg-white rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2000"></div>
          </motion.div>
          
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <FadeUpText delay={0.2} className="text-5xl font-light mb-4 tracking-tight">
                {`Welcome back, ${user?.name}`}
              </FadeUpText>
              <FadeUpText delay={0.4} className="text-gray-400 text-lg font-light">
                Continue your sustainable fashion journey
              </FadeUpText>
            </motion.div>

            {/* Stats Cards */}
            <StaggeredContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {stats.map((stat, index) => (
                <FloatingCard key={index} delay={index * 0.1}>
                  <div className="bg-white/5 border border-white/10 p-6 text-center group hover:border-white/30 transition-all duration-500">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-block p-3 border border-white/20 rounded-full mb-4 group-hover:border-white/40 transition-colors"
                    >
                      <stat.icon className="h-6 w-6" />
                    </motion.div>
                    <ScaleText delay={0.5 + index * 0.1} className="text-3xl font-light mb-2">
                      {stat.value}
                    </ScaleText>
                    <p className="text-gray-400 font-light">{stat.label}</p>
                  </div>
                </FloatingCard>
              ))}
            </StaggeredContainer>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8"
            >
              <div className="flex-1 max-w-md relative">
                <motion.div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  whileHover={{ scale: 1.1 }}
                >
                  <Search className="h-5 w-5 text-gray-400" />
                </motion.div>
                <motion.input
                  type="text"
                  placeholder="Search items..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300 font-light"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <div className="flex gap-4">
                <MorphingButton className="px-4 py-2 border border-white/30 hover:border-white/60 transition-colors font-light flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </MorphingButton>
                <Link to="/add-item">
                  <MorphingButton className="px-6 py-2 bg-white text-black hover:bg-gray-100 transition-colors font-light flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    List Item
                  </MorphingButton>
                </Link>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex space-x-8 border-b border-white/10 mb-8"
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 font-light transition-colors relative ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px bg-white"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Items Grid */}
        <section ref={ref} className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === "browse" ? mockItems : myListings).map((item, index) => (
                <RotateCard key={item.id} delay={index * 0.1}>
                  <Link to={`/item/${item.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500">
                        <motion.img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                        <motion.div
                          className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 text-xs font-light"
                          whileHover={{ scale: 1.1 }}
                        >
                          {item.points} pts
                        </motion.div>
                      </div>
                      <div className="p-4 bg-white/5 border-x border-b border-white/10 group-hover:border-white/30 transition-all duration-500">
                        <h3 className="text-lg font-light mb-2">{item.title}</h3>
                        <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                          <span>{item.category}</span>
                          <span>{item.condition}</span>
                        </div>
                        {activeTab === "browse" ? (
                          <p className="text-sm text-gray-400 font-light">by {item.owner}</p>
                        ) : (
                          <div className="flex justify-between items-center text-sm text-gray-400">
                            <span>{item.views} views</span>
                            <span>{item.interests} interested</span>
                          </div>
                        )}
                        <motion.div
                          className="flex items-center justify-between mt-3"
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className={`text-xs px-2 py-1 border ${
                            item.status === 'available' 
                              ? 'border-green-500/30 text-green-400' 
                              : 'border-yellow-500/30 text-yellow-400'
                          }`}>
                            {item.status}
                          </span>
                          <Star className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </RotateCard>
              ))}
            </StaggeredContainer>

            {/* Load More */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1 }}
            >
              <MorphingButton className="px-8 py-3 border border-white/30 hover:border-white/60 transition-colors font-light">
                Load More Items
              </MorphingButton>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
