import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';
import ErrorBoundary from './ErrorBoundary';
import './Header.scss';

const Logo3D = () => {
  return (
    <ErrorBoundary fallback={<div className="text-2xl font-bold text-primary">Ghibli AI</div>}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.8}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Ghibli AI
          <meshStandardMaterial color="#006d77" />
        </Text3D>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </ErrorBoundary>
  );
};

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          <div className="logo-3d">
            <Logo3D />
          </div>
        </Link>
        
        <div className="nav-links">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/">Home</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/create">Create</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/features">Features</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/gallery">Gallery</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/faq">FAQ</Link>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};

export default Header;