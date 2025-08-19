// src/components/FeaturesSection.jsx
import { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Image, Type, Palette, Download, 
  Zap, Heart, Star, ChevronRight, Wand2 
} from 'lucide-react';

const FeaturesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const controls = useAnimation();
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const targetValues = [50000, 10000, 99.9, 5];
  const duration = 2000;

  const features = [
    {
      icon: Image,
      title: 'Photo Transformation',
      description: 'Upload any photo and watch it transform into stunning Ghibli-style artwork',
      details: ['High-quality image processing', 'Multiple art styles', 'Preserve original composition']
    },
    {
      icon: Palette,
      title: 'Artistic Styles',
      description: 'Choose from various Ghibli-inspired artistic styles for your creations',
      details: ['Studio Ghibli classics', 'Modern anime twists', 'Custom style blending']
    },
    {
      icon: Type,
      title: 'Text Integration',
      description: 'Add beautiful typography to your artwork with our curated font collection',
      details: ['Japanese calligraphy styles', 'Whimsical handwritten fonts', 'Perfect text placement']
    },
    {
      icon: Download,
      title: 'High-Res Export',
      description: 'Download your creations in ultra-high resolution for printing or sharing',
      details: ['Multiple format options', 'Print-ready files', 'Social media optimized']
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Get your transformed artwork in seconds with our powerful AI engine',
      details: ['No waiting queues', 'Real-time previews', 'Batch processing']
    },
    {
      icon: Heart,
      title: 'Community Gallery',
      description: 'Showcase your creations in our community gallery and get inspired',
      details: ['Like and comment', 'Featured artist spots', 'Weekly challenges']
    }
  ];

  const stats = [
    { number: '50K+', label: 'Artworks Created' },
    { number: '10K+', label: 'Happy Artists' },
    { number: '99.9%', label: 'Uptime' },
    { number: '5⭐', label: 'User Rating' }
  ];

  useEffect(() => {
    const animateCounters = () => {
      const startTime = Date.now();
      
      const updateCounters = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const newCounters = targetValues.map((target, index) => {
          if (index === 2) {
            return progress === 1 ? target : Math.floor(progress * target * 10) / 10;
          } else if (index === 3) {
            return progress === 1 ? target : Math.floor(progress * target * 10) / 10;
          } else {
            return progress === 1 ? target : Math.floor(progress * target);
          }
        });
        
        setCounters(newCounters);
        
        if (progress < 1) {
          requestAnimationFrame(updateCounters);
        }
      };
      
      requestAnimationFrame(updateCounters);
    };
    
    animateCounters();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 20px rgba(0, 109, 119, 0.1)"
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 8px 30px rgba(0, 109, 119, 0.15)",
      y: -5
    }
  };

  const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: 5, scale: 1.1 }
  };

  return (
    <div className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Wand2 className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Magical Features</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Transform Your Creativity
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the powerful capabilities that make our Ghibli Art Generator special
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="feature-stat-card p-6 text-center relative overflow-hidden"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px rgba(0, 109, 119, 0.1)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {index === 0 && counters[0].toLocaleString() + '+'}
                  {index === 1 && counters[1].toLocaleString() + '+'}
                  {index === 2 && counters[2] + '%'}
                  {index === 3 && counters[3] + '⭐'}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="h-full"
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="feature-card h-full p-8 flex flex-col"
                  variants={cardVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  <motion.div 
                    className="w-14 h-14 mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative overflow-hidden"
                    variants={iconVariants}
                  >
                    <Icon className="h-6 w-6 text-white z-10" />
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div 
                          className="absolute inset-0 bg-white/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-3 mt-auto">
                    {feature.details.map((detail, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start space-x-3 text-sm text-muted-foreground"
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Star className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div 
                    className="mt-6 flex items-center text-primary font-medium text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0, x: hoveredIndex === index ? 0 : -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>Learn more</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ready to Create Magic?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of artists transforming their creativity with our Ghibli Art Generator
            </p>
            <motion.div
              className="inline-flex"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <button className="primary-action-button">
                <Sparkles className="h-5 w-5 mr-2" />
                <span>Start Creating Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;