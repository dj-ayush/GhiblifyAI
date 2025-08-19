import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./CallToAction.css";

const CallToAction = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 109, 119, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.div
      className="cta-container glass-card"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 8px 32px rgba(0, 109, 119, 0.2)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="cta-content">
        <motion.h2 
          className="cta-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Create Your Magical Ghibli Artwork Today
        </motion.h2>
        <motion.p
          className="cta-description"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Join thousands of artists and Studio Ghibli fans who are creating stunning
          Miyazaki-inspired artwork with our Ghibli AI generator.
        </motion.p>
        <motion.button
          className="btn-primary"
          onClick={() => navigate("/create")}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Try Ghibli AI For Free
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CallToAction;