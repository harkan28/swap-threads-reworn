import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";

const Landing = () => {
  // Expanded clothing items data with Pixabay images
  const newArrivals = [
    {
      id: 1,
      image: "https://cdn.pixabay.com/photo/2016/11/29/01/34/man-1866574_1280.jpg",
      title: "Premium Blazer",
      category: "Men",
      price: "$89.90"
    },
    {
      id: 2,
      image: "https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284496_1280.jpg",
      title: "Casual White Shirt",
      category: "Men",
      price: "$49.90"
    },
    {
      id: 3,
      image: "https://cdn.pixabay.com/photo/2016/11/29/10/09/fashion-1868545_1280.jpg",
      title: "Summer Beach Dress",
      category: "Women",
      price: "$69.90"
    },
    {
      id: 4,
      image: "https://cdn.pixabay.com/photo/2014/08/05/10/31/waiting-410328_1280.jpg",
      title: "Casual Urban Look",
      category: "Women",
      price: "$59.90"
    }
  ];

  const trendingItems = [
    {
      id: 5,
      image: "https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg",
      title: "Winter Wool Coat",
      category: "Women",
      price: "$129.00"
    },
    {
      id: 6,
      image: "https://cdn.pixabay.com/photo/2015/07/09/22/45/t-shirt-638484_1280.jpg",
      title: "Essential T-Shirt",
      category: "Men",
      price: "$29.90"
    },
    {
      id: 7,
      image: "https://cdn.pixabay.com/photo/2016/03/09/15/22/fashion-1246693_1280.jpg",
      title: "Leather Chelsea Boots",
      category: "Women",
      price: "$99.90"
    },
    {
      id: 8,
      image: "https://cdn.pixabay.com/photo/2019/08/01/05/59/girl-4376755_1280.jpg",
      title: "Denim Collection",
      category: "Women",
      price: "$79.90"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <img 
          src="https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg" 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-extralight tracking-[0.2em] text-white mb-8">
              REWEAR
            </h1>
            <p className="text-xl font-light text-white/90 mb-12 tracking-widest uppercase">
              Fall/Winter Collection 2024
            </p>
            <div className="flex gap-8 justify-center">
              <Link
                to="/dashboard"
                className="px-10 py-4 bg-white text-black font-light uppercase tracking-widest hover:bg-gray-100 transition-all duration-300"
              >
                Women
              </Link>
              <Link
                to="/dashboard"
                className="px-10 py-4 bg-white text-black font-light uppercase tracking-widest hover:bg-gray-100 transition-all duration-300"
              >
                Men
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extralight mb-12 tracking-widest text-center uppercase">New Arrivals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {newArrivals.map((item) => (
              <Link to={`/dashboard`} key={item.id} className="group">
                <div className="overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23f2f2f2'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999'%3EImage%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-light mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                  <p className="text-sm font-medium">{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-10 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extralight mb-12 tracking-widest text-center uppercase">Trending Now</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {trendingItems.map((item) => (
              <Link to={`/dashboard`} key={item.id} className="group">
                <div className="overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23f2f2f2'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999'%3EImage%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-light mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                  <p className="text-sm font-medium">{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Banner */}
      <section className="relative h-[70vh] w-full my-16">
        <img 
          src="https://cdn.pixabay.com/photo/2015/06/25/17/22/smart-watch-821559_1280.jpg" 
          alt="Collection Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-extralight tracking-widest mb-6">SUSTAINABLE COLLECTION</h2>
            <Link
              to="/dashboard"
              className="inline-block px-10 py-4 bg-white text-black font-light uppercase tracking-widest hover:bg-gray-100 transition-all duration-300"
            >
              Discover
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-sm font-medium mb-6 uppercase tracking-wider">Help</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Shop at REWEAR</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Product</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Payment</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Shipping</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-6 uppercase tracking-wider">Follow Us</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Instagram</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Facebook</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Twitter</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Pinterest</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">YouTube</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-6 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Join Life</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Sustainability</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Work With Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-6 uppercase tracking-wider">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex mb-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black"
              />
              <button className="ml-2 uppercase text-sm tracking-wider">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">© 2024 REWEAR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
