import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../pages/Index";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PageTransition } from "./animations/PageTransitions";
import { FadeUpText, TypewriterText } from "./animations/TextEffects";
import { MorphingButton, StaggeredContainer } from "./animations/UIComponents";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    const userData = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      points: 20
    };
    
    login(userData);
    toast({
      title: "Welcome to ReWear!",
      description: "Your account has been created successfully. You've earned 20 welcome points!",
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

  const formFields = [
    { name: "name", type: "text", placeholder: "Full name", icon: User, label: "Full Name" },
    { name: "email", type: "email", placeholder: "Email address", icon: Mail, label: "Email" },
    { name: "password", type: "password", placeholder: "Password", icon: Lock, label: "Password" },
    { name: "confirmPassword", type: "password", placeholder: "Confirm password", icon: Lock, label: "Confirm Password" }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/4 right-16 w-2 h-2 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-12 w-1 h-1 bg-white rounded-full animate-pulse delay-1500"></div>
        </motion.div>

        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.div
              className="inline-flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-6 w-6 mr-2 text-white" />
              <FadeUpText delay={0.2} className="text-4xl font-light tracking-wider">
                Join ReWear
              </FadeUpText>
            </motion.div>
            <TypewriterText 
              delay={1}
              className="text-gray-400 font-light"
            >
              Start your sustainable fashion journey
            </TypewriterText>
          </motion.div>

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={itemVariants}
          >
            <StaggeredContainer>
              {formFields.map((field, index) => (
                <motion.div 
                  key={field.name}
                  className="space-y-2"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-light text-gray-300">
                    {field.label}
                  </label>
                  <div className="relative">
                    <motion.div
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      whileHover={{ scale: 1.1 }}
                    >
                      <field.icon className="h-5 w-5 text-gray-400" />
                    </motion.div>
                    <motion.input
                      type={
                        (field.type === "password" && showPassword) ? "text" : field.type
                      }
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300 font-light placeholder-gray-500"
                      placeholder={field.placeholder}
                      whileFocus={{ scale: 1.02 }}
                      required
                    />
                    {field.type === "password" && (
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </StaggeredContainer>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <MorphingButton className="w-full py-3 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
                <span>Create Account</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </MorphingButton>
            </motion.div>
          </motion.form>

          {/* Features */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 space-y-3"
          >
            <motion.div className="text-center text-sm text-gray-400 font-light mb-4">
              What you get:
            </motion.div>
            <StaggeredContainer className="space-y-2">
              {[
                "20 welcome points to start swapping",
                "Access to exclusive fashion items",
                "Community of sustainable fashion lovers",
                "Carbon footprint tracking"
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1 }
                  }}
                  className="flex items-center text-sm text-gray-300 font-light"
                >
                  <motion.div
                    className="w-1 h-1 bg-white rounded-full mr-3"
                    whileHover={{ scale: 1.5 }}
                  />
                  {feature}
                </motion.div>
              ))}
            </StaggeredContainer>
          </motion.div>

          {/* Footer Links */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 text-center space-y-4"
          >
            <motion.p 
              className="text-gray-400 font-light"
              whileHover={{ scale: 1.02 }}
            >
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-white hover:text-gray-300 transition-colors underline decoration-1 underline-offset-4"
              >
                Sign in
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
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Register;
