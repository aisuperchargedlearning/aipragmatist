import React from 'react';
import { ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CaseStudies = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const caseStudies = [
    {
      company: 'GlobalTech Manufacturing',
      industry: 'Manufacturing',
      challenge: 'Reducing equipment downtime and maintenance costs',
      solution: 'Predictive maintenance AI workflow implementation',
      results: [
        { icon: TrendingUp, label: 'Efficiency Increase', value: '45%' },
        { icon: Clock, label: 'Downtime Reduction', value: '60%' },
        { icon: DollarSign, label: 'Cost Savings', value: '$2.4M' }
      ],
      timeline: '3 months',
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      company: 'Premier Legal Associates',
      industry: 'Legal Services',
      challenge: 'Streamlining document review and contract analysis',
      solution: 'AI-powered document intelligence system',
      results: [
        { icon: Clock, label: 'Time Savings', value: '75%' },
        { icon: TrendingUp, label: 'Accuracy Improvement', value: '92%' },
        { icon: DollarSign, label: 'Revenue Increase', value: '$1.8M' }
      ],
      timeline: '2 months',
      image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  return (
    <section className="py-20 bg-primary" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            Proven Results
          </h2>
          <p className="text-xl text-intermediate max-w-3xl mx-auto">
            Real companies achieving measurable success with our AI workflows
          </p>
        </motion.div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="bg-secondary/50 backdrop-blur-sm border border-intermediate/20 rounded-2xl overflow-hidden hover:border-cyan/50 transition-all duration-300"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`relative h-80 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <img 
                    src={study.image} 
                    alt={study.company}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent"></div>
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                      {study.industry}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
                      {study.company}
                    </h3>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">Challenge</h4>
                    <p className="text-intermediate leading-relaxed mb-4">
                      {study.challenge}
                    </p>
                    
                    <h4 className="text-white font-semibold mb-2">Solution</h4>
                    <p className="text-intermediate leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {study.results.map((result, resultIndex) => {
                      const IconComponent = result.icon;
                      return (
                        <div key={result.label} className="text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-cyan/20 rounded-lg mb-2 mx-auto">
                            <IconComponent className="w-6 h-6 text-cyan" />
                          </div>
                          <div className="text-2xl font-bold text-white">{result.value}</div>
                          <div className="text-xs text-intermediate">{result.label}</div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-intermediate">Implementation Timeline</span>
                      <div className="text-lg font-semibold text-white">{study.timeline}</div>
                    </div>
                    
                    <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
                      Read Full Case Study
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;