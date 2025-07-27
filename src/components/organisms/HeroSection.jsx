import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const HeroSection = () => {
  const handleStartFree = () => {
    // Scroll to pricing section
    const pricingSection = document.querySelector("#pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWatchDemo = () => {
    // Open demo video or demo page
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary-400 rounded-full animate-pulse animation-delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary-300 rounded-full animate-pulse animation-delay-1500"></div>
      </div>

      {/* Floating Workflow Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/6 bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 rounded-lg p-3"
        >
          <ApperIcon name="MessageSquare" size={20} className="text-primary-400" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-1/6 bg-primary-600/20 backdrop-blur-sm border border-primary-600/30 rounded-lg p-3"
        >
          <ApperIcon name="Zap" size={20} className="text-primary-300" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/3 left-1/5 bg-primary-700/20 backdrop-blur-sm border border-primary-700/30 rounded-lg p-3"
        >
          <ApperIcon name="Download" size={20} className="text-primary-500" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Build{" "}
            <span className="gradient-text">n8n Workflows</span>
            <br />
            with Natural Language
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Describe your automation in plain English. Get production-ready n8n workflows in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="xl"
              variant="primary"
              onClick={handleStartFree}
              icon="Rocket"
              className="w-full sm:w-auto animate-glow"
            >
              Start Free
            </Button>
            
            <Button
              size="xl"
              variant="secondary"
              onClick={handleWatchDemo}
              icon="Play"
              className="w-full sm:w-auto"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <ApperIcon name="Users" size={20} />
              <span>10,000+ workflows created</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <ApperIcon name="Clock" size={20} />
              <span>Average setup: 30 seconds</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <ApperIcon name="Shield" size={20} />
              <span>Production ready</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ApperIcon name="ChevronDown" size={20} />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;