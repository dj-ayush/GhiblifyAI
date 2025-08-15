import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import './Footer.scss';

const TotoroModel = () => {
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    if (contextLost) {
      const timer = setTimeout(() => setContextLost(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [contextLost]);

  if (contextLost) return null;

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#83c5be" />
      </mesh>
    </Float>
  );
};

const Footer = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/dj-ayush' },
    { icon: <FaTwitter />, url: 'https://twitter.com/_7ayush' },
    { icon: <FaInstagram />, url: 'https://instagram.com/_ayush.ag' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/ayush7ag' }
  ];

  const handleContextLost = (e) => {
    e.preventDefault();
    console.warn('WebGL context lost, attempting recovery...');
    return false;
  };

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 3D Background Element with ErrorBoundary */}
      <div className="footer-canvas">
        <ErrorBoundary fallback={<div className="canvas-fallback">3D content unavailable</div>}>
          <Canvas
            onContextLost={handleContextLost}
            onContextRestored={() => console.log('WebGL context restored')}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <TotoroModel />
            <Environment preset="sunset" />
          </Canvas>
        </ErrorBoundary>
      </div>
      
     
   <div className="footer-content">
        <motion.div 
          className="footer-main"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="footer-brand">
            <div className="logo-container">
              <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Float speed={2} rotationIntensity={0.5}>
                  <mesh>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <meshStandardMaterial color="#006d77" />
                  </mesh>
                </Float>
              </Canvas>
            </div>
            <h3 className="brand-name">Ghibli AI</h3>
            <p className="brand-tagline">Bringing Studio Ghibli magic to your creations</p>
          </div>
          
          <div className="footer-links">
            <div className="links-column">
              <h4>Navigation</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/create">Create</a></li>
                <li><a href="/features">Features</a></li>
                <li><a href="/gallery">Gallery</a></li>
                <li><a href="/faq">FAQ</a></li>
              </ul>
            </div>
            
            <div className="links-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">Tutorials</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>
            
            <div className="links-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="footer-bottom"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
          
          <motion.p 
            className="copyright"
            whileHover={{ scale: 1.02 }}
          >
            © {new Date().getFullYear()} Ghibli AI. All rights reserved.
          </motion.p>
          
          <motion.p 
            className="made-with-love"
            whileHover={{ scale: 1.05 }}
          >
            Made with <span className="heart">❤️</span> by Ayush Gupta
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;