import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../pages/Index";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PageTransition } from "./animations/PageTransitions";
import { FadeUpText, TypewriterText } from "./animations/TextEffects";
import { MorphingButton } from "./animations/UIComponents";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const userData = {
      id: 1,
      name: formData.email === 'admin@rewear.com' ? 'Admin User' : 'John Doe',
      email: formData.email,
      points: 50
    };
    
    login(userData);
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-2 h-2 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
        </motion.div>

        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <FadeUpText delay={0.2} className="text-4xl font-light tracking-wider mb-4">
              Welcome Back
            </FadeUpText>
            <TypewriterText 
              delay={1}
              className="text-gray-400 font-light"
            >
              Continue your sustainable journey
            </TypewriterText>
          </motion.div>

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={itemVariants}
          >
            {/* Email Field */}
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-light text-gray-300">
                Email
              </label>
              <div className="relative">
                <motion.div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  whileHover={{ scale: 1.1 }}
                >
                  <Mail className="h-5 w-5 text-gray-400" />
                </motion.div>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300 font-light placeholder-gray-500"
                  placeholder="Enter your email"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-light text-gray-300">
                Password
              </label>
              <div className="relative">
                <motion.div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  whileHover={{ scale: 1.1 }}
                >
                  <Lock className="h-5 w-5 text-gray-400" />
                </motion.div>
                <motion.input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300 font-light placeholder-gray-500"
                  placeholder="Enter your password"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </motion.button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <MorphingButton className="w-full py-3 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
                <span>Sign In</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </MorphingButton>
            </motion.div>
          </motion.form>

          {/* Footer Links */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 text-center space-y-4"
          >
            <motion.p 
              className="text-gray-400 font-light"
              whileHover={{ scale: 1.02 }}
            >
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-white hover:text-gray-300 transition-colors underline decoration-1 underline-offset-4"
              >
                Sign up
              </Link>
            </motion.p>
            
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link 
                to="/" 
                className="text-gray-500 hover:text-gray-300 transition-colors font-light text-sm"
              >
                ← Back to home
              </Link>
            </motion.div>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 p-4 border border-white/10 bg-white/5"
          >
            <p className="text-xs text-gray-400 font-light mb-2">Demo credentials:</p>
            <p className="text-xs text-gray-300 font-light">Email: admin@rewear.com</p>
            <p className="text-xs text-gray-300 font-light">Password: any</p>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Login;
