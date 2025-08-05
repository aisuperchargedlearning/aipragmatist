import React, { useState } from 'react';
import { FileText, BookOpen, BarChart3, CheckCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ResourcesHub = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'templates', label: 'Workflow Templates' },
    { id: 'guides', label: 'Industry Guides' },
    { id: 'comparisons', label: 'Tool Comparisons' },
    { id: 'practices', label: 'Best Practices' }
  ];

  const resources = [
    {
      type: 'templates',
      icon: FileText,
      title: 'Document Intelligence Template',
      description: 'Complete workflow for automated document processing and analysis',
      category: 'Legal & Compliance',
      downloads: '2.3k',
      format: 'PDF + Scripts'
    },
    {
      type: 'guides',
      icon: BookOpen,
      title: 'Manufacturing AI Implementation Guide',
      description: 'Step-by-step guide for implementing AI in manufacturing environments',
      category: 'Manufacturing',
      downloads: '1.8k',
      format: 'Digital Guide'
    },
    {
      type: 'comparisons',
      icon: BarChart3,
      title: 'AI Tools Comparison Matrix',
      description: 'Comprehensive comparison of leading AI platforms and tools',
      category: 'Technology',
      downloads: '3.1k',
      format: 'Interactive Chart'
    },
    {
      type: 'practices',
      icon: CheckCircle,
      title: 'AI Ethics & Best Practices',
      description: 'Guidelines for responsible AI implementation in business',
      category: 'Business Strategy',
      downloads: '1.5k',
      format: 'Whitepaper'
    },
    {
      type: 'templates',
      icon: FileText,
      title: 'Creative Asset Generation Workflow',
      description: 'AI-powered creative workflow for marketing and design teams',
      category: 'Marketing & Design',
      downloads: '2.7k',
      format: 'Template Pack'
    },
    {
      type: 'guides',
      icon: BookOpen,
      title: 'Engineering AI Integration Playbook',
      description: 'Complete playbook for integrating AI into engineering workflows',
      category: 'Engineering',
      downloads: '2.1k',
      format: 'Digital Playbook'
    }
  ];

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === activeCategory);

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
            AI Implementation Resources
          </h2>
          <p className="text-xl text-intermediate max-w-3xl mx-auto">
            Everything you need to successfully implement AI in your organization
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-accent text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-primary/50 backdrop-blur-sm border border-intermediate/20 rounded-xl p-6 hover:border-cyan/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-cyan/20 rounded-lg">
                    <IconComponent className="w-6 h-6 text-cyan" />
                  </div>
                  <span className="text-sm text-intermediate">{resource.format}</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                    {resource.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">
                    {resource.title}
                  </h3>
                </div>
                
                <p className="text-intermediate mb-6 leading-relaxed">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-intermediate">
                    {resource.downloads} downloads
                  </span>
                  
                  <button className="bg-accent/20 hover:bg-accent/30 text-accent border border-accent/30 px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourcesHub;