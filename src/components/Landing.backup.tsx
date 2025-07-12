
import { Link } from "react-router-dom";
import { ArrowRight, Recycle, Heart, Users, Sparkles, Star, TrendingUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import { FadeUpText, TypewriterText, SplitText, ScaleText } from "./animations/TextEffects";
import { FloatingCard, StaggeredContainer, MorphingButton, RotateCard } from "./animations/UIComponents";
import { PageTransition } from "./animations/PageTransitions";

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
    }
  ];

  const stats = [
    { icon: Users, label: "Active Swappers", value: "10K+" },
    { icon: Recycle, label: "Items Swapped", value: "50K+" },
    { icon: Heart, label: "CO2 Saved", value: "2.5T" }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <Header />
        
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center px-4">
          {/* Animated background elements */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2000"></div>
          </motion.div>
          
          <div className="text-center z-10 max-w-5xl mx-auto">
            <FadeUpText delay={0.2} className="inline-block px-6 py-2 border border-white/20 rounded-full text-sm mb-8 backdrop-blur-sm">
              ✨ Sustainable Fashion Revolution 2025
            </FadeUpText>
            
            <div className="mb-8">
              <SplitText 
                delay={0.5}
                className="text-6xl md:text-8xl font-light mb-4 leading-none tracking-tight"
              >
                REWEAR
              </SplitText>
              <TypewriterText 
                delay={1.5}
                className="text-lg md:text-xl text-gray-400 font-light tracking-wider"
              >
                Where fashion meets sustainability
              </TypewriterText>
            </div>

            <FadeUpText delay={2} className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Transform your wardrobe while protecting our planet. 
              Join thousands who swap, share, and sustain through fashion.
            </FadeUpText>
            
            <StaggeredContainer className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <MorphingButton className="group px-8 py-4 bg-white text-black rounded-none font-medium hover:bg-gray-100 transition-all duration-300 flex items-center">
                  <span>Start Your Journey</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </MorphingButton>
              </motion.div>
              
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <MorphingButton className="px-8 py-4 border border-white/30 rounded-none font-medium hover:bg-white/5 transition-all duration-300">
                  Explore Collection
                </MorphingButton>
              </motion.div>
            </StaggeredContainer>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <StaggeredContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-block p-4 border border-white/20 rounded-full mb-4 group-hover:border-white/40 transition-colors"
                  >
                    <stat.icon className="h-8 w-8" />
                  </motion.div>
                  <ScaleText delay={0.5 + index * 0.1} className="text-3xl font-light mb-2">
                    {stat.value}
                  </ScaleText>
                  <p className="text-gray-400 font-light">{stat.label}</p>
                </motion.div>
              ))}
            </StaggeredContainer>
          </div>
        </section>

        {/* Featured Items */}
        <section className="py-20 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <FadeUpText className="text-4xl font-light text-center mb-16 tracking-wide">
              Featured Collection
            </FadeUpText>
            
            <StaggeredContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredItems.map((item, index) => (
                <RotateCard key={item.id} delay={index * 0.2}>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                    <div className="p-6 bg-white/5 border-x border-b border-white/10 group-hover:border-white/30 transition-all duration-500">
                      <h3 className="text-xl font-light mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-light">{item.points} points</span>
                        <Star className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </RotateCard>
              ))}
            </StaggeredContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeUpText delay={0.2} className="text-4xl md:text-5xl font-light mb-8 leading-tight">
              Ready to make a difference?
            </FadeUpText>
            <FadeUpText delay={0.4} className="text-gray-400 mb-12 text-lg font-light">
              Join our community and start your sustainable fashion journey today.
            </FadeUpText>
            <MorphingButton className="px-12 py-4 bg-white text-black rounded-none font-medium hover:bg-gray-100 transition-all duration-300 inline-flex items-center">
              <Link to="/register" className="flex items-center">
                Get Started
                <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            </MorphingButton>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Landing;
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
