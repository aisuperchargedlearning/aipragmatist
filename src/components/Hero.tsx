import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-accent rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-cyan rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 font-display"
          >
            PRAGMATIC AI
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/90 mb-4 font-semibold tracking-wide"
          >
            Real-World AI Workflows That Work
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="text-lg text-intermediate mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We transform complex AI capabilities into practical, implementable workflows 
            for professionals across industries.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 min-w-[200px] justify-center">
              Explore Workflows
              <ArrowRight size={20} />
            </button>
            
            <button className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm flex items-center gap-2 min-w-[200px] justify-center">
              <Play size={20} />
              View Case Studies
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;