import React from 'react';
import { Scale, Palette, BarChart3, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const IndustrySolutions = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const industries = [
    {
      icon: Scale,
      title: 'Legal AI Workflows',
      industry: 'Attorneys',
      description: 'Complete document analysis, case research, and contract automation workflows with step-by-step implementation guide',
      metric: 'Free Sample Available',
      color: 'from-cyan/20 to-cyan/5',
      isActive: true,
      isSample: true
    },
    {
      icon: Compass,
      title: 'Product Design AI',
      industry: 'Product Designers',
      description: 'AI-powered design workflows for rapid prototyping, user research analysis, and design system automation',
      metric: 'Partial Report Available',
      color: 'from-intermediate/20 to-intermediate/5',
      isActive: false,
      isPartial: true
    },
    {
      icon: Palette,
      title: 'Graphic Design AI',
      industry: 'Graphic Designers',
      description: 'Creative AI workflows for brand asset generation, style consistency, and automated design variations',
      metric: 'Partial Report Available',
      color: 'from-intermediate/20 to-intermediate/5',
      isActive: false,
      isPartial: true
    },
    {
      icon: BarChart3,
      title: 'Data Analytics AI',
      industry: 'Data Analysts',
      description: 'Automated analytics workflows for data processing, insight generation, and predictive modeling',
      metric: 'Partial Report Available',
      color: 'from-intermediate/20 to-intermediate/5',
      isActive: false,
      isPartial: true
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
            Expert AI Guidance for Professionals
          </h2>
          <p className="text-xl text-intermediate max-w-3xl mx-auto">
            Get complete implementation guides and workflows tailored to your industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${industry.color} backdrop-blur-sm border ${
                  industry.isActive 
                    ? 'border-cyan/50 hover:border-cyan/70' 
                    : 'border-intermediate/20 hover:border-intermediate/30'
                } rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                  !industry.isActive ? 'opacity-60' : ''
                }`}>
                  <div className={`flex items-center justify-center w-16 h-16 ${
                    industry.isActive ? 'bg-cyan/20' : 'bg-intermediate/20'
                  } rounded-lg mb-6 group-hover:${
                    industry.isActive ? 'bg-cyan/30' : 'bg-intermediate/30'
                  } transition-colors duration-300`}>
                    <IconComponent className={`w-8 h-8 ${
                      industry.isActive ? 'text-cyan' : 'text-intermediate'
                    }`} />
                  </div>
                  
                  <div className="mb-4">
                    <span className={`text-sm font-semibold ${
                      industry.isActive ? 'text-accent' : 'text-intermediate'
                    } uppercase tracking-wider`}>
                      {industry.industry}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-3">
                      {industry.title}
                    </h3>
                  </div>
                  
                  <p className="text-intermediate mb-6 leading-relaxed">
                    {industry.description}
                  </p>
                  
                  <div className="border-t border-intermediate/20 pt-4">
                    <div className={`${
                      industry.isActive ? 'text-cyan' : 'text-intermediate'
                    } font-semibold`}>
                      {industry.isSample ? 'Sample Report' : industry.isPartial ? 'Preview Available' : 'Status'}
                    </div>
                    <div className={`${
                      industry.isActive ? 'text-white' : 'text-intermediate'
                    } font-bold text-lg`}>
                      {industry.metric}
                    </div>
                  </div>

                  {industry.isSample && (
                    <div className="mt-4">
                      <button 
                        onClick={() => {
                          const element = document.getElementById('sample-document');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full bg-cyan/20 hover:bg-cyan/30 text-cyan border border-cyan/30 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                      >
                        View Sample
                      </button>
                    </div>
                  )}

                  {industry.isPartial && (
                    <div className="mt-4">
                      <button className="w-full bg-accent/20 hover:bg-accent/30 text-accent border border-accent/30 px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                        Get Full Report
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;