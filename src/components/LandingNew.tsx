import { Link } from "react-router-dom";
import { ArrowRight, Recycle, Heart, Users, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Header from "./Header";
import { FadeUpText, TypewriterText, SplitText, ScaleText } from "./animations/TextEffects";
import { StaggeredContainer, MorphingButton, RotateCard } from "./animations/UIComponents";
import { PageTransition } from "./animations/PageTransitions";

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
                <Link to="/register">
                  <MorphingButton className="group px-8 py-4 bg-white text-black rounded-none font-medium hover:bg-gray-100 transition-all duration-300 flex items-center">
                    <span>Start Your Journey</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </MorphingButton>
                </Link>
              </motion.div>
              
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Link to="/login">
                  <MorphingButton className="px-8 py-4 border border-white/30 rounded-none font-medium hover:bg-white/5 transition-all duration-300">
                    Explore Collection
                  </MorphingButton>
                </Link>
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
            <Link to="/register">
              <MorphingButton className="px-12 py-4 bg-white text-black rounded-none font-medium hover:bg-gray-100 transition-all duration-300 inline-flex items-center">
                <span>Get Started</span>
                <TrendingUp className="ml-2 h-4 w-4" />
              </MorphingButton>
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Landing;
