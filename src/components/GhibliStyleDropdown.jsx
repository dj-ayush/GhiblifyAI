// src/components/GhibliStyleDropdown.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const GhibliStyleDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const styles = [
    { id: 'classic-ghibli', name: 'Classic Ghibli' },
    { id: 'spirited-away', name: 'Spirited Away' },
    { id: 'totoro', name: 'My Neighbor Totoro' },
    { id: 'mononoke', name: 'Princess Mononoke' },
    { id: 'howl', name: 'Howl\'s Moving Castle' },
    { id: 'kiki', name: 'Kiki\'s Delivery Service' },
    { id: 'anime', name: 'Anime Style' },
    { id: 'cinematic', name: 'Cinematic' },
    { id: 'watercolor', name: 'Watercolor' },
    { id: 'sketch', name: 'Sketch' },
    { id: 'pastel', name: 'Pastel' },
    { id: 'vintage', name: 'Vintage' }
  ];

  const selectedStyle = styles.find(style => style.id === value) || styles[0];

  return (
    <div className="ghibli-dropdown-container">
      <motion.button
        className="ghibli-dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span>{selectedStyle.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ghibli-dropdown-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ maxHeight: '300px', overflowY: 'auto' }}
          >
            {styles.map((style) => (
              <motion.div
                key={style.id}
                className={`dropdown-item ${value === style.id ? 'active' : ''}`}
                onClick={() => {
                  onChange(style.id);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'rgba(131, 197, 190, 0.1)' }}
              >
                {style.name}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GhibliStyleDropdown;