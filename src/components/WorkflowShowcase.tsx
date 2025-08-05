import React from 'react';
import { FileText, Clock, Users, TrendingUp, Shield, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SampleDocument = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const keyStats = [
    { icon: TrendingUp, label: 'Cost Reduction', value: '85%', description: 'in e-discovery costs' },
    { icon: Clock, label: 'Time Savings', value: '98%', description: 'faster document review' },
    { icon: Users, label: 'Professionals', value: '500+', description: 'using these workflows' },
    { icon: Shield, label: 'Success Rate', value: '95%', description: 'accuracy in analysis' }
  ];

  return (
    <section id="sample-document" className="py-20 bg-gradient-to-br from-primary via-secondary to-primary" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            Pragmatic AI Guide and Workflow for Privacy Attorneys
          </h2>
          <p className="text-xl text-intermediate max-w-3xl mx-auto mb-8">
            The AI Advantage: A Privacy Counsel's Guide to Transforming Big Tech Defense
          </p>
          
          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {keyStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-secondary/50 backdrop-blur-sm border border-intermediate/20 rounded-xl p-4 hover:border-cyan/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-cyan/20 rounded-lg mb-3 mx-auto">
                    <IconComponent className="w-6 h-6 text-cyan" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-cyan mb-1">{stat.label}</div>
                  <div className="text-xs text-intermediate">{stat.description}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Document Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-secondary/50 backdrop-blur-sm border border-intermediate/20 rounded-2xl overflow-hidden">
            {/* Document Header */}
            <div className="bg-gradient-to-r from-cyan/20 to-accent/20 p-8 border-b border-intermediate/20">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                The AI Advantage: A Privacy Counsel's Guide to Transforming Big Tech Defense
              </h3>
              <div className="bg-primary/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-cyan mb-3">Executive Summary</h4>
                <p className="text-intermediate leading-relaxed">
                  Privacy attorneys defending major technology companies face an unprecedented convergence of challenges: explosive data volumes, compressed regulatory timelines, and coordinated multi-jurisdictional attacks. This guide reveals how leading firms are deploying AI tools to transform their defensive capabilities—from cutting e-discovery costs by 85% to generating initial regulatory responses in hours instead of days. Most critically, these tools are enterprise-grade, secure, and available today.
                </p>
              </div>
            </div>

            {/* Document Sections */}
            <div className="p-8 space-y-12">
              
              {/* When the Ground Shifts */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className=""
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-cyan" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-4">When the Ground Shifts: Why AI Matters Now</h4>
                    <p className="text-intermediate leading-relaxed text-lg mb-6">
                      Last month, when a Fortune 50 tech company's privacy counsel received a 147-page investigative demand from a coalition of state attorneys general, they faced a familiar nightmare: 30 days to analyze millions of documents, coordinate responses across a dozen practice groups, and craft a narrative that could shape the next five years of litigation. Ten years ago, this would have triggered an all-hands document review costing millions. Today, that same counsel deployed AI tools that surfaced the critical engineering communications within 48 hours—and identified a dispositive technical defense their opponents had missed.
                    </p>
                    <p className="text-intermediate leading-relaxed text-lg mb-6">
                      This isn't science fiction. It's the new baseline for sophisticated privacy defense.
                    </p>
                    <p className="text-intermediate leading-relaxed text-lg mb-6">
                      The convergence of three forces has made AI adoption non-negotiable for privacy counsel serving Big Tech:
                    </p>
                    
                    <div className="bg-primary/30 rounded-lg p-6 mb-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm font-bold flex-shrink-0 mt-1">1</div>
                          <div>
                            <h5 className="text-white font-semibold mb-2">The Velocity Problem</h5>
                            <p className="text-intermediate">Regulatory investigations now move at software-development speed. When the FTC issues a civil investigative demand, they expect substantive responses in weeks, not months.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm font-bold flex-shrink-0 mt-1">2</div>
                          <div>
                            <h5 className="text-white font-semibold mb-2">The Volume Problem</h5>
                            <p className="text-intermediate">A single product launch can generate millions of potentially discoverable documents. Traditional linear review is mathematically impossible within court deadlines.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm font-bold flex-shrink-0 mt-1">3</div>
                          <div>
                            <h5 className="text-white font-semibold mb-2">The Coordination Problem</h5>
                            <p className="text-intermediate">Privacy litigation increasingly involves parallel proceedings—class actions, regulatory investigations, and international enforcement—requiring real-time synthesis across matters.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-cyan/10 border-l-4 border-cyan p-4 rounded-r-lg">
                      <p className="text-white font-semibold mb-2">The Bottom Line:</p>
                      <p className="text-intermediate">Firms that master AI tools are delivering first-mover advantages to their tech clients: faster initial assessments, dramatically lower discovery costs, and the ability to identify winning arguments before opponents even finish document collection.</p>
                    </div>
                  </div>
                </div>
              </motion.div>