import React from 'react';
import { Facebook, Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Careers', href: '#careers' },
        { label: 'Press', href: '#press' },
        { label: 'Blog', href: '#blog' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Legal AI', href: '#legal' },
        { label: 'Engineering AI', href: '#engineering' },
        { label: 'Design AI', href: '#design' },
        { label: 'Manufacturing AI', href: '#manufacturing' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#docs' },
        { label: 'API Reference', href: '#api' },
        { label: 'Case Studies', href: '#cases' },
        { label: 'Tutorials', href: '#tutorials' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#help' },
        { label: 'Contact Us', href: '#contact' },
        { label: 'Status', href: '#status' },
        { label: 'Privacy Policy', href: '#privacy' }
      ]
    }
  ];

  return (
    <footer className="bg-black">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">PRAGMATIC AI</h3>
            <p className="text-intermediate mb-6 leading-relaxed">
              Transforming industries through practical AI implementation. 
              Real-world workflows that deliver measurable results.
            </p>
            
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-intermediate/20 rounded-lg flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-intermediate/20 rounded-lg flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-all duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-intermediate/20 rounded-lg flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-all duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-intermediate/20 rounded-lg flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-all duration-300">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-intermediate hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-intermediate/20 mt-12 pt-12">
          <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:flex lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
              <p className="text-intermediate">Get the latest AI workflows and industry insights.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intermediate" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-intermediate/10 border border-intermediate/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-intermediate focus:outline-none focus:border-accent/50 min-w-[250px]"
                />
              </div>
              <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-intermediate/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-intermediate text-sm mb-4 md:mb-0">
            © 2025 Pragmatic AI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#terms" className="text-intermediate hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#privacy" className="text-intermediate hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#cookies" className="text-intermediate hover:text-white text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;