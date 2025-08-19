import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import CreatePage from "./pages/CreatePage";
import FeaturesSection from "./components/FeaturesSection";
import FaqSection from "./components/FaqSection";
import GallerySection from "./components/GallerySection";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/features" element={<FeaturesSection />} />
            <Route path="/faq" element={<FaqSection />} />
            <Route path="/gallery" element={<GallerySection />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;