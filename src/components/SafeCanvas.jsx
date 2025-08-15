import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';

const SafeCanvas = ({ children, ...props }) => {
  const [error, setError] = useState(null);
  const [contextLost, setContextLost] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
      setContextLost(true);
      console.log('WebGL context lost. Attempting to restore...');
      
      // Attempt automatic recovery
      const canvas = canvasRef.current?.querySelector('canvas');
      if (canvas) {
        const gl = canvas.getContext('webgl');
        setTimeout(() => {
          gl?.getExtension('WEBGL_lose_context')?.restoreContext();
        }, 500);
      }
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      setContextLost(false);
      setError(null);
    };

    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, []);

  if (error) {
    return (
      <motion.div
        className="error-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 bg-gradient-to-br from-red-100 to-red-50 border-2 border-red-300 text-red-800 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-2">Canvas Error</h3>
          <p className="mb-4">{error.message}</p>
          <div className="flex gap-3">
            <motion.button
              onClick={() => setError(null)}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retry
            </motion.button>
            <motion.button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Refresh
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (contextLost) {
    return (
      <motion.div
        className="context-lost-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-50 border-2 border-yellow-300 text-yellow-800 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-2">Graphics Context Lost</h3>
          <p className="mb-4">Attempting to recover WebGL context...</p>
          <motion.button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            whileFocus={{ scale: 1.05 }}
          >
            Refresh Page
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div 
      ref={canvasRef} 
      className="w-full h-full relative"
      style={{ minHeight: '150px' }}
    >
      <Canvas
        {...props}
        onCreated={({ gl }) => {
          gl.forceContextRestore = () => {
            console.log('Forcing context restore');
            gl.getExtension('WEBGL_lose_context')?.restoreContext();
          };
        }}
        onError={(error) => {
          console.error('Canvas error:', error);
          setError(error);
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {children}
      </Canvas>
    </div>
  );
};

export default SafeCanvas;