import { Image, Palette, Users, Wand2 } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { assets } from "../assets/assets";

const GhibliSteps = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Premium Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={containerVariants}
        >
          
         
        </motion.div>

        {/* Main Content Section */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12 mb-24"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Image Section */}
          <motion.div 
            className="w-full lg:w-1/2"
            variants={itemVariants}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={assets.step1}
                alt="Ghibli Art Transformation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Before → After</h3>
                <p className="opacity-90">See your photo transform into Ghibli magic</p>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="w-full lg:w-1/2"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-[#2d3748] mb-6"
              variants={itemVariants}
            >
              Photo to Ghibli Art
            </motion.h3>
            
            <motion.p 
              className="text-[#4a5568] text-lg mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Transform any photo into beautiful Studio Ghibli-style artwork with our advanced AI. 
              Simply upload your image and watch as we apply the magical Ghibli aesthetic.
            </motion.p>
            
            <motion.ul 
              className="space-y-8"
              variants={containerVariants}
            >
              <motion.li 
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="p-3 rounded-full mr-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  <Image size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-[#2d3748] mb-2">Simple AI Process</h3>
                  <p className="text-[#4a5568]">
                    Our AI understands your vision and applies authentic Ghibli styling automatically.
                  </p>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="p-3 rounded-full mr-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  <Palette size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-[#2d3748] mb-2">Style Selection</h3>
                  <p className="text-[#4a5568]">
                    Choose from various Ghibli film styles like Spirited Away or Princess Mononoke.
                  </p>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="p-3 rounded-full mr-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-[#2d3748] mb-2">Character Integration</h3>
                  <p className="text-[#4a5568]">
                    Insert yourself or pets into the Ghibli universe while maintaining recognizable features.
                  </p>
                </div>
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={assets.step2} 
                  alt="Multiple Art Styles"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <Palette size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#2d3748]">Multiple Art Styles</h3>
                </div>
                <p className="text-[#4a5568]">
                  Choose from distinct Ghibli art styles from different films to match your vision.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={assets.step3} 
                  alt="High Resolution Output"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <Image size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#2d3748]">High Resolution</h3>
                </div>
                <p className="text-[#4a5568]">
                  Download your artwork in ultra-high resolution suitable for printing and sharing.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={assets.step4} 
                  alt="Quick Processing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <Wand2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#2d3748]">Quick Processing</h3>
                </div>
                <p className="text-[#4a5568]">
                  Get your transformed artwork in minutes with our powerful cloud-based AI engine.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <img 
                  src={assets.step1} 
                  alt="TLC-G Transformer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#2d3748]">TLC-G Transformer</h3>
                </div>
                <p className="text-[#4a5568]">
                  Our specialized animation transformer creates authentic Ghibli-style results.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Before/After Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12">
              <h3 className="text-2xl font-bold text-[#2d3748] mb-6">Before → After</h3>
              <p className="text-[#4a5568] mb-8 text-lg">
                See how ordinary photos transform into extraordinary Ghibli-style artwork with our AI-powered tools.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="aspect-square overflow-hidden rounded-xl mb-3 shadow-md">
                    <img src={assets.step1} alt="Before" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm text-center text-[#718096] font-medium">Original Photo</p>
                </div>
                <div>
                  <div className="aspect-square overflow-hidden rounded-xl mb-3 shadow-md">
                    <img src={assets.step2} alt="After" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm text-center text-[#718096] font-medium">Ghibli Art</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="aspect-[4/3] w-full h-full">
                <img 
                  src={assets.step3} 
                  alt="Transformation Process" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GhibliSteps;