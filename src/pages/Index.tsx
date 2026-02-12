
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from '@/components/portfolio/AnimatedBackground';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Animation setup
  useEffect(() => {
    setLoaded(true);
    
    // Hero section animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    )
    .fromTo(
      subHeadingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.6"
    )
    .fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    )
    .fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, repeat: -1, yoyo: true },
      "-=0.2"
    );

    // Scroll-triggered animations
    gsap.fromTo(
      featuredRef.current,
      { y: 100, opacity: 0 },
      { 
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );

    // Pulsing animation for scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Animated 3D Background */}
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        <div className={`max-w-4xl mx-auto text-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-900/40 text-indigo-300 text-sm font-medium backdrop-blur-sm mb-6 border border-indigo-800/50">
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-indigo-400"></span>
              Welcome to my portfolio
            </div>
            
            <h1 
              ref={headingRef} 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tighter"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Creative Developer
              </span>
            </h1>
            
            <p 
              ref={subHeadingRef} 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Building beautiful digital experiences with cutting-edge technology and thoughtful design
            </p>
            
            <div 
              ref={ctaRef} 
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <Link to="/portfolio/enterprise1" className="transition-all duration-300">
                <Button 
                  size="lg" 
                  className="px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl flex items-center shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 border-0 text-lg"
                >
                  View Portfolio <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <a href="mailto:your-email@example.com" className="transition-all duration-300">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-6 bg-transparent border-2 border-gray-700 hover:border-indigo-500 text-gray-300 hover:text-white rounded-xl flex items-center transition-all duration-300 text-lg"
                >
                  Contact Me <Mail className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
          
          <div className="flex justify-center space-x-6 mt-12">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="h-7 w-7" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-7 w-7" />
            </a>
            <a 
              href="mailto:your-email@example.com" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="h-7 w-7" />
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          ref={scrollIndicatorRef} 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        >
          <span className="block text-sm text-gray-400 mb-2">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 text-gray-400 mx-auto" />
        </div>
      </section>
      
      {/* Featured Work Preview Section */}
      <section ref={featuredRef} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-900/40 text-purple-300 text-sm font-medium backdrop-blur-sm mb-4 border border-purple-800/50">
              Featured Work
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
              Recent Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore a selection of my best work showcasing my skills and expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Project 1 */}
            <div className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-2">
              <div className="h-56 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 flex items-center justify-center">
                <div className="w-16 h-16 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">E-Commerce Platform</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">A modern e-commerce solution with advanced filtering, search, and payment integration.</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-900/40 text-indigo-300">React</span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-900/40 text-indigo-300">Supabase</span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-900/40 text-indigo-300">Stripe</span>
                </div>
                
                <Link to="/portfolio/enterprise1" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  View Details <ExternalLink className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Featured Project 2 */}
            <div className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-2">
              <div className="h-56 bg-gradient-to-br from-purple-900/20 to-pink-900/20 flex items-center justify-center">
                <div className="w-16 h-16 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21V19C22.9986 17.1771 21.7079 15.5857 19.91 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13C17.7699 3.58137 19.0412 5.17253 19.0412 7.005C19.0412 8.83747 17.7699 10.4286 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">Team Collaboration App</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">Streamlined team collaboration with real-time messaging, task management, and file sharing.</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-900/40 text-purple-300">React</span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-900/40 text-purple-300">Firebase</span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-900/40 text-purple-300">WebRTC</span>
                </div>
                
                <Link to="/portfolio/enterprise1" className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  View Details <ExternalLink className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Featured Project 3 */}
            <div className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-2">
              <div className="h-56 bg-gradient-to-br from-pink-900/20 to-orange-900/20 flex items-center justify-center">
                <div className="w-16 h-16 text-pink-400 group-hover:scale-110 transition-transform duration-300">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors">AI-Powered Analytics</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">Advanced analytics platform with AI-driven insights and interactive visualization tools.</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-pink-900/40 text-pink-300">React</span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-pink-900/40 text-pink-300">TensorFlow.js</span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-pink-900/40 text-pink-300">D3.js</span>
                </div>
                
                <Link to="/portfolio/enterprise1" className="inline-flex items-center text-pink-400 hover:text-pink-300 font-medium transition-colors">
                  View Details <ExternalLink className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/portfolio/enterprise1">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-6 py-3 border-gray-700 hover:border-indigo-500 text-gray-300 hover:text-white rounded-xl transition-colors"
              >
                View All Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Portfolio
              </h2>
              <p className="text-gray-400 mt-2">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            
            <div className="flex space-x-8">
              <Link to="/portfolio/enterprise1" className="text-gray-400 hover:text-white transition-colors">
                Portfolio
              </Link>
              <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
