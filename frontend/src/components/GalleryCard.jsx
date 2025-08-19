// src/components/GalleryCard.jsx
import { Heart, Download, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const GalleryCard = ({ imageIndex, title, artist, likes, views, category }) => {
  const imageKey = `grid_0${imageIndex}`;
  const imageSrc = assets[imageKey] || assets.grid_01; // Fallback to first image

  return (
    <motion.div 
      className="rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = assets.grid_01; // Fallback to first image
          }}
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
            <Eye className="h-5 w-5 text-white" />
          </button>
          <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
            <Download className="h-5 w-5 text-white" />
          </button>
          <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
            <Heart className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">by {artist}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {likes}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {views}
            </span>
          </div>
          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
            {category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryCard;