import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CTASection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-cyan rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-accent rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-cyan rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            Ready to Transform Your Legal Practice?
          </h2>
          
          <p className="text-xl md:text-2xl text-intermediate mb-8 leading-relaxed">
            Join legal professionals using our proven AI workflows to revolutionize document processing
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan mb-2">500+</div>
              <div className="text-intermediate">Legal Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">75%</div>
              <div className="text-intermediate">Time Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan mb-2">95%</div>
              <div className="text-intermediate">Accuracy Rate</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 min-w-[200px] justify-center"
            >
              Start Free Trial
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10 flex items-center gap-2 min-w-[200px] justify-center"
            >
              <Calendar size={20} />
              Schedule Demo
            </motion.button>
          </div>

          <p className="text-sm text-intermediate mt-6">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;