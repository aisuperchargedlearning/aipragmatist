import React from 'react';
import { Target, Wrench, Link, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FeaturesGrid = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Target,
      title: 'Legal-Specific Solutions',
      description: 'Custom workflows designed specifically for legal professionals and law firms',
      color: 'from-cyan/20 to-cyan/5'
    },
    {
      icon: Wrench,
      title: 'Implementation Ready',
      description: 'Complete guides from concept to deployment with step-by-step instructions',
      color: 'from-accent/20 to-accent/5'
    },
    {
      icon: Link,
      title: 'Tool Integration',
      description: 'Seamlessly connect with existing legal tools and case management systems',
      color: 'from-cyan/20 to-cyan/5'
    },
    {
      icon: TrendingUp,
      title: 'ROI Focused',
      description: 'Measurable outcomes with clear performance metrics for legal operations',
      color: 'from-accent/20 to-accent/5'
    }
  ];

  return (
    <section className="py-20 bg-secondary" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            Why Choose Pragmatic AI?
          </h2>
          <p className="text-xl text-intermediate max-w-3xl mx-auto">
            We bridge the gap between AI potential and practical legal implementation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-intermediate/20 rounded-xl p-8 hover:border-cyan/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl h-full`}>
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-lg mb-6 group-hover:bg-white/20 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-cyan" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-intermediate leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;