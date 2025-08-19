// src/pages/CreatePage.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Spinner from '../components/Spinner';
import GhibliStyleDropdown from '../components/GhibliStyleDropdown';
import SafeCanvas from '../components/SafeCanvas';
import ErrorMessage from '../components/ErrorMessage';
import './CreatePage.scss';

const TotoroModel = () => {
  return (
    <group position={[0, 0, 0]}>
      <Float 
        speed={1.5} 
        rotationIntensity={0.5} 
        floatIntensity={0.8}
        floatingRange={[-0.3, 0.3]}
      >
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial 
            color="#83c5be"
            roughness={0.2}
            metalness={0.1}
            emissive="#83c5be"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 32]} />
        <meshStandardMaterial color="#e29578" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const CreatePage = () => {
  const [activeTab, setActiveTab] = useState('photo');
  const [selectedFile, setSelectedFile] = useState(null);
  const [textPrompt, setTextPrompt] = useState('');
  const [style, setStyle] = useState('classic-ghibli');
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
        setGeneratedImage(null);
        setError(null);
      } else {
        setError("Please upload a valid image file.");
        setPreviewImage(null);
        setSelectedFile(null);
      }
    }
  };

  const handleGenerate = async () => {
    if (activeTab === 'photo' && !selectedFile) {
      setError('Please upload an image first!');
      return;
    }
    
    if (activeTab === 'text' && !textPrompt.trim()) {
      setError('Please enter a description for your artwork.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let response;
      
      if (activeTab === 'photo') {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("prompt", textPrompt);
        
        response = await fetch('http://localhost:9090/api/v1/generate', {
          method: 'POST',
          body: formData,
        });
      } else {
        const payload = { 
          prompt: textPrompt, 
          style 
        };
        
        response = await fetch('http://localhost:9090/api/v1/generate-from-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok. Status: ${response.status}. Message: ${errorText}`);
      }

      const resultBlob = await response.blob();
      setGeneratedImage(URL.createObjectURL(resultBlob));
    } catch (error) {
      console.error('Error generating image:', error);
      setError("Failed to generate image. Please ensure the backend is running and check the console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ghibli-art-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateAnother = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    setGeneratedImage(null);
    setTextPrompt('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="create-page" ref={containerRef}>
      {/* Animated Background */}
      <div className="background-canvas">
        <SafeCanvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Environment preset="sunset" />
        </SafeCanvas>
      </div>

      <motion.main 
        className="create-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
        
        <motion.div 
          className="title-section"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="title">
            <span className="title-line">Create</span>
            <span className="title-line ghibli-text">Ghibli Art</span>
          </h1>
          <p className="subtitle">Transform your photos or text into magical Studio Ghibli-style artwork</p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="tab-navigation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button
            className={`tab-button ${activeTab === 'photo' ? 'active' : ''}`}
            onClick={() => setActiveTab('photo')}
          >
            Photo to Art
          </button>
          <button
            className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            Text to Art
          </button>
        </motion.div>
        
        <div className="content-grid">
          {/* Left Section - Input */}
          <motion.div 
            className="input-section glass-card"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            {activeTab === 'photo' ? (
              <div className={`upload-box ${previewImage ? 'has-image' : ''}`}>
                {previewImage ? (
                  <motion.img 
                    src={previewImage} 
                    alt="Preview" 
                    className="preview-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <>
                    <div className="upload-icon">
                      <SafeCanvas>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <TotoroModel />
                        <Environment preset="city" />
                      </SafeCanvas>
                    </div>
                    <p>Drag & drop your photo here</p>
                    <p>or click to browse files</p>
                  </>
                )}
                <input 
                  type="file" 
                  id="file-upload" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <motion.label 
                  htmlFor="file-upload" 
                  className="file-label btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose File
                </motion.label>
              </div>
            ) : (
              <div className="text-input-section">
                <textarea
                  className="text-prompt-input"
                  placeholder="Describe the Ghibli-style art you want to create..."
                  value={textPrompt}
                  onChange={(e) => setTextPrompt(e.target.value)}
                  rows={5}
                />
                <div className="prompt-examples">
                  <p className="examples-title">Example prompts:</p>
                  <ul className="examples-list">
                    <li>"A peaceful forest with kodama spirits"</li>
                    <li>"A flying castle in the sky at sunset"</li>
                    <li>"A young witch with a black cat on a broomstick"</li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Right Section - Preview */}
          <motion.div 
            className="preview-section glass-card"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="preview-content">
              {isLoading ? (
                <div className="spinner-container">
                  <Spinner />
                  <p className="loading-text">Creating your Ghibli art...</p>
                </div>
              ) : generatedImage ? (
                <motion.div
                  className="result-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={generatedImage} 
                    alt="Generated Ghibli Art" 
                    className="generated-image"
                  />
                  <div className="result-actions">
                    <button 
                      className="download-btn btn-primary"
                      onClick={handleDownload}
                    >
                      Download Art
                    </button>
                    <button 
                      className="share-btn btn-secondary"
                      onClick={handleCreateAnother}
                    >
                      Create Another
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="empty-state">
                  <div className="floating-spirits">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="spirit"
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.6, 1, 0.6],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 3 + Math.random() * 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                  <p>Your {activeTab === 'photo' ? 'photo' : 'text'} will be transformed here</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="controls-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <div className="style-controls">
            <GhibliStyleDropdown value={style} onChange={setStyle} />
            <div className="style-description">
              {style === 'classic-ghibli' && 'Traditional Studio Ghibli look'}
              {style === 'spirited-away' && 'Mystical bathhouse aesthetic'}
              {style === 'totoro' && 'Whimsical forest style'}
            </div>
          </div>
          
          <motion.button
            className="generate-btn btn-primary"
            onClick={handleGenerate}
            disabled={(activeTab === 'photo' ? !selectedFile : !textPrompt.trim()) || isLoading}
            whileHover={{ scale: (activeTab === 'photo' ? !selectedFile : !textPrompt.trim()) || isLoading ? 1 : 1.05 }}
            whileTap={{ scale: (activeTab === 'photo' ? !selectedFile : !textPrompt.trim()) || isLoading ? 1 : 0.95 }}
          >
            {isLoading ? (
              <>
                <span className="spinner-dot"></span>
                <span className="spinner-dot"></span>
                <span className="spinner-dot"></span>
                Generating...
              </>
            ) : (
              'Generate Art'
            )}
          </motion.button>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default CreatePage;