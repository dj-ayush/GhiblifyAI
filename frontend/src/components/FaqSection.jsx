// src/components/FaqSection.jsx
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles, Image, Type, Download, Shield, Brush, Zap, Palette } from 'lucide-react';

const FaqSection = () => {
  const [openItems, setOpenItems] = useState([]);

  const faqs = [
    {
      question: "What is the Ghibli Art Generator?",
      answer: "The Ghibli Art Generator is an AI-powered tool that transforms your photos and text descriptions into beautiful Studio Ghibli-inspired artwork. Using advanced machine learning algorithms, we capture the magical aesthetic and artistic style that makes Studio Ghibli films so beloved.",
      icon: <Sparkles className="h-5 w-5 text-primary" />
    },
    {
      question: "How does the photo-to-art transformation work?",
      answer: "Simply upload any photo, choose your preferred Ghibli style, and our AI will analyze the composition to recreate it in the Studio Ghibli style. The process preserves the essence of your original image while applying the distinctive watercolor textures and whimsical details characteristic of Ghibli animations.",
      icon: <Image className="h-5 w-5 text-primary" />
    },
    {
      question: "Can I create art from text descriptions?",
      answer: "Absolutely! Our text-to-art feature allows you to describe any scene, character, or concept, and the AI will generate a unique Ghibli-style artwork based on your description. You can refine the results with style adjustments and detail enhancements.",
      icon: <Type className="h-5 w-5 text-primary" />
    },
    {
      question: "What image formats are supported?",
      answer: "You can upload JPEG, PNG, or WebP images up to 20MB in size. For best results, use high-resolution photos (minimum 1000px on the longest side) with clear details. Output is available in PNG format with transparent background options.",
      icon: <Download className="h-5 w-5 text-primary" />
    },
    {
      question: "Is my data and artwork secure?",
      answer: "We prioritize your privacy. Uploaded photos are processed securely and automatically deleted after 24 hours unless you choose to save them. Your generated artworks are private by default, with optional sharing features available.",
      icon: <Shield className="h-5 w-5 text-primary" />
    },
    {
      question: "Do I need artistic skills to use it?",
      answer: "Not at all! The generator is designed for everyone, from professional artists to complete beginners. Our intuitive interface and style presets make it easy to create stunning artwork regardless of your experience level.",
      icon: <Brush className="h-5 w-5 text-primary" />
    },
    {
      question: "Can I use my generated art commercially?",
      answer: "Yes, you retain full rights to all artwork you generate. You may use it for personal and commercial purposes, including merchandise, books, and digital media. We recommend checking our Terms of Service for any specific restrictions.",
      icon: <Zap className="h-5 w-5 text-primary" />
    },
    {
      question: "How long does generation take?",
      answer: "Processing typically takes 15-30 seconds depending on server load and image complexity. High-resolution outputs or complex text prompts may take up to 1 minute. You'll receive an email notification if you leave the page during processing.",
      icon: <Palette className="h-5 w-5 text-primary" />
    },
  ];

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-primary/5 via-accent/5 to-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg animate-[bounce_3s_ease-in-out_infinite] mb-6">
              <HelpCircle className="h-12 w-12 text-white animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" strokeWidth={1.5} />
            </div>
            
            <div className="relative inline-flex items-center justify-center mb-6">
              <HelpCircle className="absolute -left-10 h-6 w-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text drop-shadow-md">
                Frequently Asked Questions
              </h1>
              <HelpCircle className="absolute -right-10 h-6 w-6 text-primary" />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-accent/40 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <p className="relative text-lg text-muted-foreground leading-relaxed bg-background/90 px-6 py-4 rounded-lg">
                Everything you need to know about creating magical Ghibli-style artwork
              </p>
            </div>
            
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index);
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl border border-primary/20 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/30 ${
                  isOpen ? 'ring-2 ring-primary/10 bg-white' : ''
                }`}
              >
                {/* Question mark decoration */}
                <div className="absolute -left-4 top-6 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-white shadow-sm">
                  <HelpCircle className="h-4 w-4 text-primary" />
                </div>

                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full px-10 py-6 text-left flex items-start gap-6 transition-all duration-300 ${
                    isOpen ? 'bg-primary/5' : 'hover:bg-primary/5'
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <div className={`mt-1 flex-shrink-0 p-2 rounded-lg ${
                    isOpen ? 'bg-primary/10' : 'bg-primary/5'
                  }`}>
                    {faq.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-foreground">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`mt-1 flex-shrink-0 p-1 rounded-full transition-all duration-300 ${
                    isOpen ? 'rotate-180 bg-primary/10' : 'bg-primary/5'
                  }`}>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-primary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>

                <div
                  id={`faq-panel-${index}`}
                  className={`px-10 overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'pb-8' : 'pb-0'
                  }`}
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="pl-14">
                    <div className="border-l-2 border-primary/20 pl-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-accent/40 rounded-3xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-10 md:p-14 rounded-3xl shadow-lg border border-primary/10 transition-all duration-300 group-hover:shadow-xl">
              <div className="space-y-8">
                <Sparkles className="h-12 w-12 mx-auto text-primary animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Still Have Questions?
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    Our support team is here to help you on your creative journey.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:brightness-110 group">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Contact Support</span>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                  
                  <button className="px-8 py-4 bg-secondary text-secondary-foreground font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-secondary/90 flex items-center justify-center gap-2">
                    <span>Join Community</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;