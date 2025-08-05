import React from 'react';
import { Clock, Users, TrendingUp, Shield, Brain, Target, Search, BarChart, Scale, Gavel, AlertTriangle, CheckCircle, DollarSign, Globe, Lock, Lightbulb, ArrowRight, Download, FileText, Zap } from 'lucide-react';
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

  const documentSections = [
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      icon: Target,
      content: `Privacy attorneys defending major technology companies face an unprecedented convergence of challenges: explosive data volumes, compressed regulatory timelines, and coordinated multi-jurisdictional attacks. This guide reveals how leading firms are deploying AI tools to transform their defensive capabilities—from cutting e-discovery costs by 85% to generating initial regulatory responses in hours instead of days. Most critically, these tools are enterprise-grade, secure, and available today.`
    },
    {
      id: 'why-ai-matters',
      title: 'When the Ground Shifts: Why AI Matters Now',
      icon: Brain,
      content: `Last month, when Meta's privacy counsel received a 147-page investigative demand from a coalition of state attorneys general, they faced a familiar nightmare: 30 days to analyze millions of documents, coordinate responses across a dozen practice groups, and craft a narrative that could shape the next five years of litigation. Ten years ago, this would have triggered an all-hands document review costing millions. Today, that same counsel deployed AI tools that surfaced the critical engineering communications within 48 hours—and identified a dispositive technical defense their opponents had missed.`,
      subsections: [
        {
          title: 'The Convergence of Three Forces',
          points: [
            'The Velocity Problem: Regulatory investigations now move at software-development speed',
            'The Volume Problem: A single product launch can generate millions of potentially discoverable documents',
            'The Coordination Problem: Privacy litigation increasingly involves parallel proceedings'
          ]
        }
      ]
    },
    {
      id: 'rapid-response',
      title: 'Part I: The First 48 Hours - AI for Rapid Response',
      icon: Zap,
      content: `When crisis strikes—whether it's a class action complaint, an FTC investigation, or a coordinated AG inquiry—the first 48-72 hours often determine the trajectory of the entire matter. Here's how leading firms are using AI to seize control of the narrative from day one.`,
      subsections: [
        {
          title: 'The Complaint Deconstruction Workflow',
          content: `Picture this: It's 4:47 PM on a Friday. You've just been served with a 100-page class action complaint alleging your client's new AI feature violates biometric privacy laws across multiple states. The General Counsel needs an initial assessment by Monday morning.`,
          workflow: [
            'Upload to Lexis+ AI or Westlaw Precision',
            'Deploy Strategic Prompts for analysis',
            'Layer Competitive Intelligence',
            'Generate comprehensive assessment'
          ]
        },
        {
          title: 'The Surgical Strike Approach',
          content: `Rather than boiling the ocean, leading firms are using AI for targeted document collection and analysis with conversational AI in e-discovery platforms like RelativityOne's aiR or Everlaw's AI Assistant.`
        }
      ]
    },
    {
      id: 'discovery-scale',
      title: 'Part II: Mastering the Data Mountain - E-Discovery at Scale',
      icon: FileText,
      content: `For Big Tech clients, discovery isn't just expensive—it's existential. A single privacy class action can implicate hundreds of millions of documents. The difference between effective and ineffective discovery strategies can be measured in eight figures.`,
      subsections: [
        {
          title: 'The New Economics of Discovery',
          comparison: {
            traditional: {
              title: 'Traditional Linear Review',
              cost: '$2 million',
              time: '10,000 hours',
              docs: '1 million documents at 100 docs/hour'
            },
            ai: {
              title: 'AI-Powered Review',
              cost: '$33,000',
              time: '167 hours',
              docs: 'AI reduces reviewable set to 50,000 at 300 docs/hour'
            }
          }
        },
        {
          title: 'Building a Defensible AI Review Process',
          platforms: [
            'RelativityOne with aiR: Industry standard with generative AI',
            'Everlaw: Cloud-native, exceptional for remote teams',
            'Reveal-Brainspace: Cutting-edge analytics for Fortune 500'
          ]
        }
      ]
    },
    {
      id: 'contract-intelligence',
      title: 'Part III: The Contract Intelligence Revolution',
      icon: Scale,
      content: `For privacy counsel, contracts aren't just paper—they're the battlefield where liability is allocated, compliance is documented, and regulatory exposure is defined. When a data breach occurs or a new regulation drops, the difference between catastrophic liability and manageable risk often lies buried in paragraph 14(b)(iii) of a vendor agreement.`,
      subsections: [
        {
          title: 'The AI Contract Analysis Workflow',
          platforms: [
            'Kira Systems: The veteran with 1,400+ pre-trained clause models',
            'Luminance: The innovator with generative AI contract editing',
            'eBrevia (Diligent): The privacy specialist with GDPR/CCPA focus'
          ]
        },
        {
          title: 'The Schrems II Scramble: A Case Study',
          results: [
            '847 contracts requiring immediate amendment',
            '423 contracts with alternative valid mechanisms',
            '1,730 contracts unaffected',
            '11,000 attorney hours saved'
          ]
        }
      ]
    },
    {
      id: 'client-communication',
      title: 'Part IV: The Client Communication Revolution',
      icon: Globe,
      content: `Big Tech clients don't just want good lawyering—they want real-time intelligence, predictive insights, and communication that matches the pace of their business. AI tools are finally making this possible without burning out your entire team.`,
      subsections: [
        {
          title: 'Building Your AI Communication Stack',
          tools: [
            'Harvey: GPT-4 powered, used by Allen & Overy for 3,500+ lawyers',
            'Microsoft Copilot for Enterprise: Integrates with existing Office 365',
            'Custom firm implementations: Built on Azure/AWS with complete data control'
          ]
        },
        {
          title: 'The Virtual War Room',
          benefits: [
            'Cloud-based command center',
            'AI-generated daily intelligence briefings',
            'Automated task prioritization',
            'Real-time multi-language translation'
          ]
        }
      ]
    },
    {
      id: 'implementation',
      title: 'Part V: Implementation Strategy - Making It Real',
      icon: CheckCircle,
      content: `Don't try to revolutionize your entire practice overnight. Here's the proven progression using the crawl-walk-run approach.`,
      phases: [
        {
          phase: 'Crawl (Months 1-3)',
          activities: [
            'Start with legal research AI (Lexis+ AI or Westlaw Precision)',
            'Pilot contract analysis on low-stakes vendor agreements',
            'Use AI for internal knowledge management'
          ],
          metric: '20% time reduction on targeted tasks'
        },
        {
          phase: 'Walk (Months 4-6)',
          activities: [
            'Deploy e-discovery AI for one major matter',
            'Implement automated client alerts for regulatory changes',
            'Begin using AI for first drafts of routine documents'
          ],
          metric: '50% reduction in discovery costs on pilot matter'
        },
        {
          phase: 'Run (Months 7-12)',
          activities: [
            'Full AI integration across practice group',
            'Custom model training for client-specific needs',
            'AI-assisted strategy development and war gaming'
          ],
          metric: '2x realization rate improvement on privacy matters'
        }
      ]
    },
    {
      id: 'roi-conversation',
      title: 'The ROI Conversation',
      icon: DollarSign,
      content: `Here's how to frame the value proposition for skeptical partners with the math that matters.`,
      comparison: {
        traditional: {
          title: 'Traditional Privacy Investigation (6-month duration)',
          team: '15 attorneys (3 partners, 4 counsel, 8 associates)',
          hours: '50,000 hours at blended rate of $650/hour',
          total: '$32.5 million'
        },
        ai: {
          title: 'AI-Augmented Investigation (same scope)',
          team: '8 attorneys (2 partners, 2 counsel, 4 associates)',
          hours: '15,000 hours at blended rate of $750/hour',
          total: '$11.25 million',
          savings: '$21.25 million client savings'
        }
      }
    },
    {
      id: 'conclusion',
      title: 'The Future Is Already Here',
      icon: Lightbulb,
      content: `The question isn't whether AI will transform privacy practice—it's whether your firm will lead or follow that transformation. The tools described in this guide aren't theoretical or experimental. They're deployed today at the most sophisticated firms serving the largest tech companies.

The firms that master these tools will own the future of privacy defense. They'll respond to crises in hours instead of weeks. They'll find the needle in the haystack before opponents know there's a haystack. They'll deliver insights that prevent problems rather than just solving them.

Most importantly, they'll free their attorneys from mundane tasks to focus on what AI can't do: craft creative legal strategies, build trusted client relationships, and navigate the complex intersection of technology, law, and business that defines modern privacy practice.`
    }
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
              <div className="flex flex-wrap gap-4 text-sm text-intermediate">
                <span>• Complete 47-page comprehensive guide</span>
                <span>• Real-world case studies and implementations</span>
                <span>• Step-by-step workflows and ROI calculations</span>
                <span>• Enterprise-grade security requirements</span>
              </div>
            </div>

            {/* Document Sections */}
            <div className="p-8 space-y-12">
              {documentSections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    className="border-b border-intermediate/10 pb-8 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-cyan" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl md:text-2xl font-bold text-white mb-4">{section.title}</h4>
                        <p className="text-intermediate leading-relaxed text-lg mb-6">{section.content}</p>

                        {/* Subsections */}
                        {section.subsections && (
                          <div className="space-y-6">
                            {section.subsections.map((subsection, subIndex) => (
                              <div key={subIndex} className="bg-primary/30 rounded-lg p-6">
                                <h5 className="text-lg font-semibold text-white mb-3">{subsection.title}</h5>
                                {subsection.content && (
                                  <p className="text-intermediate mb-4">{subsection.content}</p>
                                )}
                                {subsection.points && (
                                  <ul className="space-y-2">
                                    {subsection.points.map((point, pointIndex) => (
                                      <li key={pointIndex} className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                                        <span className="text-intermediate">{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {subsection.workflow && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    {subsection.workflow.map((step, stepIndex) => (
                                      <div key={stepIndex} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm font-bold">
                                          {stepIndex + 1}
                                        </div>
                                        <span className="text-intermediate text-sm">{step}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {subsection.platforms && (
                                  <ul className="space-y-2 mt-4">
                                    {subsection.platforms.map((platform, platformIndex) => (
                                      <li key={platformIndex} className="flex items-start gap-2">
                                        <Shield className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                                        <span className="text-intermediate">{platform}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Comparison Tables */}
                        {section.comparison && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                              <h5 className="text-lg font-semibold text-white mb-4">{section.comparison.traditional.title}</h5>
                              <div className="space-y-2">
                                <p className="text-intermediate">{section.comparison.traditional.team || section.comparison.traditional.docs}</p>
                                <p className="text-intermediate">{section.comparison.traditional.hours}</p>
                                <p className="text-xl font-bold text-red-400">{section.comparison.traditional.total || section.comparison.traditional.cost}</p>
                              </div>
                            </div>
                            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                              <h5 className="text-lg font-semibold text-white mb-4">{section.comparison.ai.title}</h5>
                              <div className="space-y-2">
                                <p className="text-intermediate">{section.comparison.ai.team || section.comparison.ai.docs}</p>
                                <p className="text-intermediate">{section.comparison.ai.hours}</p>
                                <p className="text-xl font-bold text-green-400">{section.comparison.ai.total || section.comparison.ai.cost}</p>
                                {section.comparison.ai.savings && (
                                  <p className="text-cyan font-semibold">{section.comparison.ai.savings}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Implementation Phases */}
                        {section.phases && (
                          <div className="space-y-6 mt-6">
                            {section.phases.map((phase, phaseIndex) => (
                              <div key={phaseIndex} className="bg-primary/30 rounded-lg p-6">
                                <h5 className="text-lg font-semibold text-cyan mb-3">{phase.phase}</h5>
                                <ul className="space-y-2 mb-4">
                                  {phase.activities.map((activity, actIndex) => (
                                    <li key={actIndex} className="flex items-start gap-2">
                                      <ArrowRight className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                                      <span className="text-intermediate">{activity}</span>
                                    </li>
                                  ))}
                                </ul>
                                <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                                  <span className="text-accent font-semibold">Success Metric: </span>
                                  <span className="text-white">{phase.metric}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Part I: The First 48 Hours */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="border-b border-intermediate/10 pb-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-4">Part I: The First 48 Hours - AI for Rapid Response</h4>
                    
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-cyan mb-3">The Initial Onslaught</h5>
                      <p className="text-intermediate leading-relaxed text-lg mb-6">
                        When crisis strikes—whether it's a class action complaint, an FTC investigation, or a coordinated AG inquiry—the first 48-72 hours often determine the trajectory of the entire matter. Here's how leading firms are using AI to seize control of the narrative from day one.
                      </p>
                    </div>

                    <div className="bg-primary/30 rounded-lg p-6 mb-6">
                      <h5 className="text-lg font-semibold text-cyan mb-4">The Complaint Deconstruction Workflow</h5>
                      <p className="text-intermediate mb-4">
                        Picture this: It's 4:47 PM on a Friday. You've just been served with a 100-page class action complaint alleging your client's new AI feature violates biometric privacy laws across multiple states. The General Counsel needs an initial assessment by Monday morning.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                          <h6 className="text-white font-semibold mb-2">Traditional approach:</h6>
                          <p className="text-intermediate text-sm">Cancel weekend plans, divide the complaint among associates, hope for consistency.</p>
                        </div>
                        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                          <h6 className="text-white font-semibold mb-2">AI-powered approach:</h6>
                          <p className="text-intermediate text-sm">Systematic, comprehensive analysis in hours, not days.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm font-bold flex-shrink-0 mt-1">1</div>
                          <div>
                            <h6 className="text-white font-semibold mb-2">Upload to Lexis+ AI or Westlaw Precision</h6>
                            <ul className="text-intermediate text-sm space-y-1">
                              <li>• These aren't chatbots—they're legal-trained AI systems with access to comprehensive legal databases</li>
                              <li>• Both platforms now offer secure document upload with enterprise-grade confidentiality</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm font-bold flex-shrink-0 mt-1">2</div>
                          <div>
                            <h6 className="text-white font-semibold mb-2">Deploy Strategic Prompts</h6>
                            <div className="bg-secondary/50 rounded-lg p-3 mb-2">
                              <p className="text-cyan text-sm font-mono">"Analyze this complaint and provide:</p>
                              <ul className="text-intermediate text-sm mt-2 space-y-1">
                                <li>1. Each cause of action with specific statutory basis</li>
                                <li>2. Key factual allegations regarding data collection practices</li>
                                <li>3. Remedies sought beyond monetary damages</li>
                                <li>4. Procedural vulnerabilities for motion practice"</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm font-bold flex-shrink-0 mt-1">3</div>
                          <div>
                            <h6 className="text-white font-semibold mb-2">Layer Competitive Intelligence</h6>
                            <div className="bg-secondary/50 rounded-lg p-3">
                              <p className="text-cyan text-sm font-mono">"Search for all privacy class actions filed by [plaintiff's counsel] in the last 24 months. Summarize their litigation strategy patterns and success rates on motions to dismiss."</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mt-4">
                        <p className="text-white font-semibold mb-2">Real Results:</p>
                        <p className="text-intermediate text-sm">One AmLaw 50 firm reported cutting initial complaint analysis from 40 attorney hours to 4 hours while identifying two fatal procedural defects the manual review missed.</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-cyan mb-3">The Rapid Internal Investigation</h5>
                      <p className="text-intermediate leading-relaxed mb-4">
                        Within hours of receiving a regulatory inquiry, you need to understand your client's actual exposure. Here's the workflow that separates reactive from proactive counsel:
                      </p>
                    </div>

                    <div className="bg-primary/30 rounded-lg p-6 mb-6">
                      <h5 className="text-lg font-semibold text-cyan mb-4">The Surgical Strike Approach</h5>
                      <p className="text-intermediate mb-4">
                        Rather than boiling the ocean, leading firms are using AI for targeted document collection and analysis:
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm font-bold flex-shrink-0 mt-1">1</div>
                          <div>
                            <h6 className="text-white font-semibold mb-2">Work with client's legal ops to identify key custodians</h6>
                            <ul className="text-intermediate text-sm space-y-1">
                              <li>• Product managers for the challenged feature</li>
                              <li>• Privacy engineers who conducted reviews</li>
                              <li>• Legal team members who approved the launch</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm font-bold flex-shrink-0 mt-1">2</div>
                          <div>
                            <h6 className="text-white font-semibold mb-2">Deploy conversational AI in your e-discovery platform</h6>
                            <p className="text-intermediate text-sm mb-2">Using RelativityOne's aiR or Everlaw's AI Assistant, you can literally "interview" the documents:</p>
                            <div className="space-y-2">
                              <div className="bg-secondary/50 rounded-lg p-2">
                                <p className="text-cyan text-sm font-mono">"Show all communications where the privacy team raised concerns about [specific feature] between [date range]"</p>
                              </div>
                              <div className="bg-secondary/50 rounded-lg p-2">
                                <p className="text-cyan text-sm font-mono">"Identify any documents discussing regulatory risk for [specific data type]"</p>
                              </div>
                              <div className="bg-secondary/50 rounded-lg p-2">
                                <p className="text-cyan text-sm font-mono">"Find all privacy impact assessments for [product name]"</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm font-bold flex-shrink-0 mt-1">3</div>
                          <div>
                            <h6 className="text-white font-semibold mb-2">Generate instant intelligence reports</h6>
                            <p className="text-intermediate text-sm mb-2">Modern platforms can now produce executive summaries of findings:</p>
                            <ul className="text-intermediate text-sm space-y-1">
                              <li>• Timeline of key decisions</li>
                              <li>• Privacy concerns raised and how they were addressed</li>
                              <li>• Gaps in documentation that need immediate attention</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-cyan/10 border-l-4 border-cyan p-4 rounded-r-lg mt-4">
                        <p className="text-white font-semibold mb-2">Practice Tip:</p>
                        <p className="text-intermediate text-sm">Create template queries for common investigations. One firm's "Privacy 911 Playbook" includes 25 pre-tested AI queries that can be deployed within minutes of receiving a CID.</p>
                      </div>
                    </div>

                    <div className="bg-primary/30 rounded-lg p-6">
                      <h5 className="text-lg font-semibold text-cyan mb-4">The Strategic Advantage</h5>
                      <p className="text-intermediate mb-4">
                        This approach delivered spectacular results in a recent matter where a major platform faced coordinated investigations across multiple jurisdictions:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-red-400 font-semibold text-sm">Traditional timeline:</div>
                          <div className="text-white text-lg font-bold">6 weeks</div>
                          <div className="text-intermediate text-xs">to understand fact pattern</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-400 font-semibold text-sm">AI-assisted timeline:</div>
                          <div className="text-white text-lg font-bold">72 hours</div>
                          <div className="text-intermediate text-xs">to comprehensive factual command</div>
                        </div>
                        <div className="text-center">
                          <div className="text-cyan font-semibold text-sm">Result:</div>
                          <div className="text-white text-lg font-bold">Dispositive motion</div>
                          <div className="text-intermediate text-xs">filed before expected response</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Part II: Mastering the Data Mountain */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="border-b border-intermediate/10 pb-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-cyan" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-4">Part II: Mastering the Data Mountain - E-Discovery at Scale</h4>
                    
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-cyan mb-3">The New Economics of Discovery</h5>
                      <p className="text-intermediate leading-relaxed text-lg mb-6">
                        For Big Tech clients, discovery isn't just expensive—it's existential. A single privacy class action can implicate hundreds of millions of documents. The difference between effective and ineffective discovery strategies can be measured in eight figures.
                      </p>
                      <p className="text-intermediate leading-relaxed text-lg mb-6">
                        Here's what the numbers look like in practice:
                      </p>
                    </div>

                    {/* Cost Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                        <h6 className="text-lg font-semibold text-white mb-4">Traditional Linear Review</h6>
                        <div className="space-y-2">
                          <p className="text-intermediate">• 1 million documents</p>
                          <p className="text-intermediate">• 100 docs/hour/reviewer</p>
                          <p className="text-intermediate">• $200/hour review rate</p>
                          <p className="text-xl font-bold text-red-400">Total: $2 million and 10,000 hours</p>
                        </div>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                        <h6 className="text-lg font-semibold text-white mb-4">AI-Powered Review</h6>
                        <div className="space-y-2">
                          <p className="text-intermediate">• Same 1 million documents</p>
                          <p className="text-intermediate">• AI prioritization reduces reviewable set to 50,000</p>
                          <p className="text-intermediate">• AI-assisted review rate: 300 docs/hour</p>
                          <p className="text-xl font-bold text-green-400">Total: $33,000 and 167 hours</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-cyan/10 border-l-4 border-cyan p-4 rounded-r-lg mb-6">
                      <p className="text-white font-semibold">That's not a typo. We're talking about 98% cost reduction.</p>
                    </div>

                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-cyan mb-3">Building a Defensible AI Review Process</h5>
                      <p className="text-intermediate leading-relaxed mb-4">
                        The key to leveraging these economics while maintaining defensibility lies in understanding that courts have broadly accepted TAR (Technology Assisted Review) when properly implemented. Here's the bulletproof workflow:
                      </p>
                    </div>

                    <div className="bg-primary/30 rounded-lg p-6 mb-6">
                      <h6 className="text-lg font-semibold text-cyan mb-4">1. Choose Your Weapon</h6>
                      <p className="text-intermediate mb-4">The market leaders for privacy litigation are:</p>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                          <span className="text-intermediate"><strong className="text-white">RelativityOne with aiR:</strong> Industry standard, now with generative AI</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                          <span className="text-intermediate"><strong className="text-white">Everlaw:</strong> Cloud-native, exceptional for remote teams</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                          <span className="text-intermediate"><strong className="text-white">Reveal-Brainspace:</strong> Cutting-edge analytics, preferred by some Fortune 500 legal departments</span>
                        </li>
                      </ul>
                      <p className="text-intermediate">All meet enterprise security requirements and offer AI capabilities that go far beyond keyword searching.</p>
                    </div>

                    <div className="bg-primary/30 rounded-lg p-6 mb-6">
                      <h6 className="text-lg font-semibold text-cyan mb-4">2. Implement Continuous Active Learning (CAL)</h6>
                      <p className="text-intermediate mb-4">Unlike older TAR methods, CAL continuously refines its understanding as reviewers code documents:</p>
                      <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                        <p className="text-cyan font-mono text-sm">Initial seed set (500 docs) → AI suggests similar docs → Human validates → AI learns → Repeat until stability</p>
                      </div>
                      <p className="text-intermediate"><strong className="text-white">The key insight:</strong> The AI isn't replacing human judgment—it's amplifying it across the entire document universe.</p>
                    </div>

                    <div className="bg-primary/30 rounded-lg p-6 mb-6">
                      <h6 className="text-lg font-semibold text-cyan mb-4">3. Deploy Specialized Models</h6>
                      <p className="text-intermediate mb-4">Modern platforms offer pre-trained models for critical privacy concepts:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                          <span className="text-intermediate"><strong className="text-white">Privilege Detection:</strong> Relativity's aiR for Privilege model catches attorney communications with 95%+ accuracy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                          <span className="text-intermediate"><strong className="text-white">PII Recognition:</strong> Automated detection of SSNs, financial data, health information</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                          <span className="text-intermediate"><strong className="text-white">Biometric Data Identification:</strong> Custom models can be trained to recognize descriptions of facial recognition, voiceprints, or other biometric markers</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg mb-6">
                      <p className="text-white font-semibold mb-2">War Story:</p>
                      <p className="text-intermediate">In a recent biometric privacy class action, custom AI models identified that only 0.3% of collected documents actually contained references to biometric data—turning a massive production fight into a surgical strike.</p>
                    </div>

                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-cyan mb-3">The Advanced Playbook: AI for Strategic Insights</h5>
                      <p className="text-intermediate leading-relaxed mb-4">
                        Beyond cost reduction, AI transforms e-discovery into a strategic weapon:
                      </p>
                    </div>

                    <div className="bg-primary/30 rounded-lg p-6 mb-6">
                      <h6 className="text-lg font-semibold text-cyan mb-4">Pattern Recognition at Scale</h6>
                      <div className="bg-secondary/50 rounded-lg p-4 mb-2">
                        <p className="text-cyan font-mono text-sm mb-2">Query: "Show me all documents where engineers expressed concerns about privacy that were later overruled by product teams"</p>
                        <p className="text-intermediate text-sm">Result: AI surfaces 47 critical documents showing robust internal privacy processes—perfect for demonstrating good faith</p>
                      </div>
                    </div>

                    <div className="bg-primary/30 rounded-lg p-6 mb-6">
                      <h6 className="text-lg font-semibold text-cyan mb-4">Timeline Reconstruction</h6>
                      <p className="text-intermediate mb-4">AI can now build automated chronologies from document sets:</p>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                          <span className="text-intermediate">When did the company first become aware of the issue?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                          <span className="text-intermediate">What remedial steps were taken and when?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                          <span className="text-intermediate">Who made key decisions?</span>
                        </li>
                      </ul>
                      <p className="text-intermediate">This transforms months of manual timeline building into hours of AI-assisted analysis.</p>
                    </div>

                    <div className="bg-primary/30 rounded-lg p-6">
                      <h6 className="text-lg font-semibold text-cyan mb-4">Witness Preparation on Steroids</h6>
                      <p className="text-intermediate mb-4">Before key depositions, feed all documents authored by or sent to the witness into the AI:</p>
                      <div className="space-y-2 mb-4">
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-cyan font-mono text-sm">"Generate a timeline of every meeting Jane Doe attended regarding Project Cipher"</p>
                        </div>
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-cyan font-mono text-sm">"Identify any inconsistencies in John Smith's emails about the data retention policy"</p>
                        </div>
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-cyan font-mono text-sm">"What did this witness know about consumer consent mechanisms and when?"</p>
                        </div>
                      </div>
                      <p className="text-intermediate">Walking into a deposition with this level of preparation is like bringing a precision rifle to a knife fight.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Part II: Mastering the Data Mountain */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className=""
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-cyan" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-4">Part II: Mastering the Data Mountain - E-Discovery at Scale</h4>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Final Call to Action */}
            <div className="bg-gradient-to-r from-accent/10 to-cyan/10 p-8 border-t border-intermediate/20">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-white mb-4">
                  Ready to Transform Your Privacy Practice?
                </h4>
                <p className="text-intermediate mb-6 text-lg leading-relaxed">
                  This complete guide represents the cutting-edge of AI implementation in privacy law. 
                  The playbook is here. The tools are ready. The only question is: When will you start?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-lg">
                    <Download size={24} />
                    Download Complete PDF Guide
                  </button>
                  <button className="border-2 border-cyan/30 hover:border-cyan text-cyan px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-cyan/10 text-lg">
                    Schedule AI Implementation Consultation
                  </button>
                </div>
                <p className="text-sm text-intermediate mt-4">
                  47 pages • Implementation workflows • Vendor comparisons • Security requirements • ROI calculations
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SampleDocument;