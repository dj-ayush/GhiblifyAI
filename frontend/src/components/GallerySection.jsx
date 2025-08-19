// src/components/GallerySection.jsx
import { Heart, Download, Eye, Filter, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { assets } from '../assets/assets';

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All Styles');
  const [hoveredCard, setHoveredCard] = useState(null);

  const artworks = [
    {
      id: 1,
      title: 'Enchanted Forest',
      artist: 'Emma Wilson',
      likes: 142,
      views: 1234,
      category: 'Nature',
      style: 'Classic Ghibli',
      featured: true,
      imageIndex: 1
    },
    {
      id: 2,
      title: 'Spirited City',
      artist: 'Liam Chen',
      likes: 256,
      views: 1892,
      category: 'Architecture',
      style: 'Spirited Away',
      featured: false,
      imageIndex: 2
    },
    {
      id: 3,
      title: 'Mystic Valley',
      artist: 'Sophia Rodriguez',
      likes: 198,
      views: 1456,
      category: 'Fantasy',
      style: 'Princess Mononoke',
      featured: true,
      imageIndex: 3
    },
    {
      id: 4,
      title: 'Totoro Garden',
      artist: 'Oliver Smith',
      likes: 324,
      views: 2310,
      category: 'Nature',
      style: 'Totoro',
      featured: false,
      imageIndex: 4
    },
    {
      id: 5,
      title: 'Floating Islands',
      artist: 'Ava Johnson',
      likes: 287,
      views: 1765,
      category: 'Fantasy',
      style: 'Classic Ghibli',
      featured: true,
      imageIndex: 5
    },
    {
      id: 6,
      title: 'Moonlit Castle',
      artist: 'Noah Williams',
      likes: 412,
      views: 2987,
      category: 'Architecture',
      style: 'Spirited Away',
      featured: false,
      imageIndex: 6
    }
  ];

  const categories = ['All', 'Nature', 'Architecture', 'Fantasy', 'Landscape'];
  const styles = ['All Styles', 'Classic Ghibli', 'Spirited Away', 'Princess Mononoke', 'Totoro'];

  const filteredArtworks = artworks.filter(artwork => {
    return (selectedCategory === 'All' || artwork.category === selectedCategory) &&
           (selectedStyle === 'All Styles' || artwork.style === selectedStyle);
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center bg-primary/10 px-4 py-2 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Wand2 className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Community Gallery</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Ghibli Art Gallery
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore magical creations from our community of Ghibli-inspired artists
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <Filter className="h-6 w-6 text-primary" />
            <span className="text-base font-medium text-gray-800">Filter Artworks</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <motion.div
              whileHover={{ y: -2 }}
              className="relative"
            >
              <select 
                className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none pr-8"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -2 }}
              className="relative"
            >
              <select 
                className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none pr-8"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
              >
                {styles.map((style) => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence>
            {filteredArtworks.map((artwork) => {
              const imageKey = `grid_0${artwork.imageIndex}`;
              const imageSrc = assets[imageKey] || assets.grid_01;
              
              return (
                <motion.div
                  key={artwork.id}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  layout
                >
                  {artwork.featured && (
                    <div className="absolute -top-2 -right-2 z-10 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full shadow-md">
                      Featured
                    </div>
                  )}
                  
                  <motion.div
                    className="ghibli-card overflow-hidden group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
                    whileHover={{ y: -8 }}
                    onHoverStart={() => setHoveredCard(artwork.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <div className="relative aspect-square flex items-center justify-center overflow-hidden">
                      <img 
                        src={imageSrc}
                        alt={artwork.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = assets.grid_01;
                        }}
                      />
                      
                      <motion.div 
                        className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredCard === artwork.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button 
                          className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                          whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.4)' }}
                        >
                          <Eye className="h-5 w-5 text-white" />
                        </motion.button>
                        <motion.button 
                          className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                          whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.4)' }}
                        >
                          <Download className="h-5 w-5 text-white" />
                        </motion.button>
                        <motion.button 
                          className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                          whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.4)' }}
                        >
                          <Heart className="h-5 w-5 text-white" />
                        </motion.button>
                      </motion.div>
                    </div>

                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">{artwork.title}</h3>
                        <p className="text-gray-600 mb-4">by {artwork.artist}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm mt-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-gray-500">
                            <Heart className="h-4 w-4 text-rose-500" />
                            <span>{artwork.likes}</span>
                          </span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <Eye className="h-4 w-4 text-blue-500" />
                            <span>{artwork.views}</span>
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {artwork.category}
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                            {artwork.style}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative max-w-2xl mx-auto">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-lg rounded-full scale-x-150 transform -z-10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1.5 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            
            <div className="px-10 py-8 mx-auto">
              <div className="space-y-5">
                <motion.h2 
                  className="text-2xl font-bold text-gray-900"
                  whileHover={{ scale: 1.02 }}
                >
                  Ready to Create Ghibli Magic?
                </motion.h2>
                <motion.p 
                  className="text-gray-600 text-lg"
                  whileHover={{ scale: 1.01 }}
                >
                  Transform your imagination into stunning artwork
                </motion.p>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/create" 
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <Wand2 className="h-5 w-5" />
                    <span>Start Creating</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GallerySection;