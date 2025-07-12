import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "./Header";
import { Upload, X, Plus, Camera, Tag, Shirt } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AddItem = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    size: "",
    condition: "",
    price: 0,
    tags: ""
  });
  const [images, setImages] = useState<string[]>([]);

  const categories = [
    "Outerwear", "Tops", "Bottoms", "Dresses", "Shoes", 
    "Accessories", "Formal", "Casual", "Sportswear"
  ];

  const conditions = ["new", "like_new", "good", "fair", "poor"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 5 images",
        variant: "destructive"
      });
      return;
    }

    // For demo purposes, just add placeholder URLs
    const newImages = files.map(() => "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666'%3EUploaded%3C/text%3E%3C/svg%3E");
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Item Listed!",
        description: "Your item has been successfully listed for swapping",
      });
      
      navigate("/dashboard");
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to list item. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-light mb-2">Add New Item</h1>
            <p className="text-gray-400">List an item for swapping with other users</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Images Upload */}
            <div>
              <label className="block text-lg font-medium mb-4">Images *</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img 
                      src={image} 
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover bg-white/10 border border-white/20"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-white/30 hover:border-white/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-400">Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-2">Upload up to 5 images. First image will be the main photo.</p>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Vintage Leather Jacket"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-black">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Size *</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300"
                  required
                >
                  <option value="">Select Size</option>
                  {sizes.map((size) => (
                    <option key={size} value={size} className="bg-black">
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Condition *</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300"
                  required
                >
                  <option value="">Select Condition</option>
                  {conditions.map((condition) => (
                    <option key={condition} value={condition} className="bg-black">
                      {condition.replace('_', ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item, its condition, styling details, etc."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300 resize-none"
                required
              />
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Price (optional)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300"
                />
                <p className="text-sm text-gray-400 mt-1">Leave empty for trade-only items</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (optional)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="vintage, designer, casual..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white/40 transition-all duration-300"
                />
                <p className="text-sm text-gray-400 mt-1">Comma-separated tags</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 py-3 px-6 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 px-6 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Listing Item..." : "List Item"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddItem;
