import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../pages/Index";
import Header from "./Header";
import { Upload, X, Plus, Camera, Tag, Shirt } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PageTransition } from "./animations/PageTransitions";
import { FadeUpText, TypewriterText } from "./animations/TextEffects";
import { MorphingButton, StaggeredContainer } from "./animations/UIComponents";
import { ScrollTriggered } from "./animations/ScrollTriggers";

const AddItem = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    tags: ""
  });
  const [images, setImages] = useState([]);

  const categories = [
    "Outerwear", "Tops", "Bottoms", "Dresses", "Shoes", 
    "Accessories", "Formal", "Casual", "Sportswear"
  ];

  const conditions = ["Like New", "Excellent", "Good", "Fair"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files) as File[];
    if (images.length + files.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 5 images",
        variant: "destructive"
      });
      return;
    }

    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.condition) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "No Images",
        description: "Please upload at least one image",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Item Listed!",
      description: "Your item has been successfully listed for swapping",
    });
    
    navigate("/dashboard");
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

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <div className="pt-24 pb-12 px-4 relative overflow-hidden">
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
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <ScrollTriggered animation="fadeUp" className="text-center mb-12">
              <motion.div
                className="inline-flex items-center mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Shirt className="h-8 w-8 mr-3" />
                <FadeUpText delay={0.2} className="text-5xl font-light tracking-wider">
                  List Your Item
                </FadeUpText>
              </motion.div>
              <TypewriterText 
                delay={1}
                className="text-gray-400 text-lg font-light"
              >
                Share your fashion pieces with the community
              </TypewriterText>
            </ScrollTriggered>

            {/* Form */}
            <motion.form 
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Image Upload */}
              <ScrollTriggered animation="slideLeft">
                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-xl font-light flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Photos
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {images.map((image) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative group"
                      >
                        <img 
                          src={image.url} 
                          alt="Preview" 
                          className="w-full h-32 object-cover border border-white/20 group-hover:border-white/40 transition-colors"
                        />
                        <motion.button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X className="h-4 w-4" />
                        </motion.button>
                      </motion.div>
                    ))}
                    
                    {images.length < 5 && (
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-32 border-2 border-dashed border-white/30 flex flex-col items-center justify-center cursor-pointer hover:border-white/50 transition-colors"
                      >
                        <Upload className="h-6 w-6 mb-2" />
                        <span className="text-sm font-light">Add Photo</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </motion.label>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 font-light">Upload up to 5 photos</p>
                </motion.div>
              </ScrollTriggered>

              {/* Basic Information */}
              <ScrollTriggered animation="slideRight">
                <StaggeredContainer className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-light mb-4 flex items-center">
                      <Tag className="h-5 w-5 mr-2" />
                      Basic Information
                    </h3>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="block text-sm font-light text-gray-300">
                      Title *
                    </label>
                    <motion.input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Vintage Leather Jacket"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300 font-light"
                      whileFocus={{ scale: 1.02 }}
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="block text-sm font-light text-gray-300">
                      Description *
                    </label>
                    <motion.textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your item in detail..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300 font-light resize-none"
                      whileFocus={{ scale: 1.02 }}
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-light text-gray-300">
                        Category *
                      </label>
                      <motion.select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300 font-light"
                        whileFocus={{ scale: 1.02 }}
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat} className="bg-black">{cat}</option>
                        ))}
                      </motion.select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-light text-gray-300">
                        Size
                      </label>
                      <motion.select
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300 font-light"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option value="">Select size</option>
                        {sizes.map(size => (
                          <option key={size} value={size} className="bg-black">{size}</option>
                        ))}
                      </motion.select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-light text-gray-300">
                        Condition *
                      </label>
                      <motion.select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300 font-light"
                        whileFocus={{ scale: 1.02 }}
                        required
                      >
                        <option value="">Select condition</option>
                        {conditions.map(condition => (
                          <option key={condition} value={condition} className="bg-black">{condition}</option>
                        ))}
                      </motion.select>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="block text-sm font-light text-gray-300">
                      Tags
                    </label>
                    <motion.input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="e.g., vintage, designer, sustainable"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300 font-light"
                      whileFocus={{ scale: 1.02 }}
                    />
                    <p className="text-sm text-gray-400 font-light">Separate tags with commas</p>
                  </motion.div>
                </StaggeredContainer>
              </ScrollTriggered>

              {/* Submit Button */}
              <ScrollTriggered animation="fadeUp">
                <motion.div variants={itemVariants} className="flex justify-end pt-8">
                  <MorphingButton className="px-12 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-300 font-medium flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    List Item
                  </MorphingButton>
                </motion.div>
              </ScrollTriggered>
            </motion.form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AddItem;
