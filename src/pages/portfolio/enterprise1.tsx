
import { useRef, useEffect, useState } from 'react';
import './enterprise1.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioProps } from '@/types/portfolio';
import { useVisitCounter } from '@/hooks/useVisitCounter';
import Scene from '@/components/portfolio/enterprise1/Scene';
import AnimatedTitle from '@/components/ui/custom/AnimatedTitle';
import ScrollReveal from '@/components/ui/custom/ScrollReveal';
import SkillBar from '@/components/ui/custom/SkillBar';
import TimelineItem from '@/components/ui/custom/TimelineItem';
import {
  ArrowRight,
  AtSign,
  Briefcase,
  Code,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Home,
  Layers,
  Linkedin,
  Mail,
  Phone,
  User
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PortfolioTemplate: React.FC<PortfolioProps> = ({
  profileData,
  experienceData = [],
  educationData = [],
  projectsData = [],
  skillsData = []
}) => {
  // Track site visits
  useVisitCounter(profileData?.id);

  // State to track if page has loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Cursor state
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  // Refs for various sections
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update cursor position
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: cursorPosition.x,
        y: cursorPosition.y,
        duration: 0.15,
        ease: 'power2.out'
      });
    }
  }, [cursorPosition]);

  // Handle link hover for cursor
  useEffect(() => {
    const handleLinkHover = () => setCursorVariant('link');
    const handleLinkLeave = () => setCursorVariant('default');

    const links = document.querySelectorAll('a, button');

    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [isLoaded]);

  // Setup page animations
  useEffect(() => {
    const header = heroRef.current;
    const nav = navRef.current;

    if (!header || !nav) return;

    // Initial header animation
    gsap.from(header, {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      onComplete: () => setIsLoaded(true)
    });

    // Navbar scroll effect
    ScrollTrigger.create({
      start: 'top -100',
      end: 99999,
      toggleClass: { className: 'enterprise1:bg-black/80 backdrop-blur-md border-b border-gray-800', targets: nav }
    });

    // Only animate navbar items after page loaded
    setTimeout(() => {
      const navItems = nav.querySelectorAll('.nav-item');
      gsap.from(navItems, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, 1200);
  }, []);

  // Sort experience and education by date
  const sortedExperience = [...experienceData].sort((a, b) => {
    const dateA = a.current ? new Date().getTime() : new Date(a.end_date || a.start_date).getTime();
    const dateB = b.current ? new Date().getTime() : new Date(b.end_date || b.start_date).getTime();
    return dateB - dateA;
  });

  const sortedEducation = [...educationData].sort((a, b) => {
    const dateA = a.current ? new Date().getTime() : new Date(a.end_date || a.start_date).getTime();
    const dateB = b.current ? new Date().getTime() : new Date(b.end_date || b.start_date).getTime();
    return dateB - dateA;
  });

  return (
    <div className="enterprise1 bg-black">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${cursorVariant === 'link' ? 'enterprise1:bg-accent scale-150' : 'enterprise1:bg-white'} hidden md:block`}
      ></div>

      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="enterprise1:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-purple-400 nav-item">
            {profileData?.full_name || 'Portfolio'}
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="nav-item enterprise1:text-gray-300 hover:enterprise1:text-white transition-colors">About</a>
            <a href="#experience" className="nav-item enterprise1:text-gray-300 hover:enterprise1:text-white transition-colors">Experience</a>
            <a href="#skills" className="nav-item enterprise1:text-gray-300 hover:enterprise1:text-white transition-colors">Skills</a>
            <a href="#projects" className="nav-item enterprise1:text-gray-300 hover:enterprise1:text-white transition-colors">Projects</a>
            <a href="#contact" className="nav-item enterprise1:text-gray-300 hover:enterprise1:text-white transition-colors">Contact</a>
          </div>

          <a
            href="mailto:johndoe@example.com"
            className="nav-item enterprise1:bg-accent/10 hover:enterprise1:bg-accent/20 enterprise1:text-accent py-2 px-4 rounded-lg 
            transition-colors border border-accent/30 hidden md:block"
          >
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="hero"
        className="min-h-screen flex items-center pt-24 relative overflow-hidden"
      >
        {/* 3D Background Scene */}
        <div className="absolute inset-0 z-0">
          <Scene />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full enterprise1:bg-accent/10 enterprise1:text-accent enterprise1:text-sm mb-6">
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full enterprise1:bg-accent"></span>
              Available for opportunities
            </div>

            <AnimatedTitle
              as="h1"
              className="enterprise1:text-5xl md:enterprise1:text-6xl lg:enterprise1:text-7xl font-bold mb-6"
              textGradient
              reveal={false}
            >
              {profileData?.full_name || 'John Doe'}
            </AnimatedTitle>

            <h2 className="enterprise1:text-3xl enterprise1:text-gray-300 font-light mb-8">
              Full Stack Developer
            </h2>

            {profileData?.bio && (
              <p className="enterprise1:text-lg enterprise1:text-gray-300 opacity-80 max-w-2xl mb-10">
                {profileData.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-6 py-3 enterprise1:bg-accent hover:enterprise1:bg-accent/90 enterprise1:text-white font-medium rounded-lg 
                flex items-center transform hover:translate-y-[-2px] transition-all duration-300"
              >
                <Mail className="mr-2 h-5 w-5" /> Contact Me
              </a>

              <a
                href="#projects"
                className="px-6 py-3 enterprise1:bg-transparent border border-primary hover:enterprise1:bg-primary/10 
                enterprise1:text-primary font-medium rounded-lg flex items-center
                transform hover:translate-y-[-2px] transition-all duration-300"
              >
                <Layers className="mr-2 h-5 w-5" /> View Projects
              </a>
            </div>

            <div className="flex space-x-4 mt-12">
              {profileData?.linkedin_url && (
                <a
                  href={profileData.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enterprise1:text-gray-400 hover:enterprise1:text-primary transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}

              {profileData?.github_url && (
                <a
                  href={profileData.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enterprise1:text-gray-400 hover:enterprise1:text-primary transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
              )}

              {profileData?.email && (
                <a
                  href={`mailto:${profileData.email}`}
                  className="enterprise1:text-gray-400 hover:enterprise1:text-primary transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          <div className="hidden lg:block absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#about" className="enterprise1:text-gray-400 hover:enterprise1:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section enterprise1:bg-gradient-to-b from-background to-gray-900">
        <div className="container mx-auto px-6">
          <ScrollReveal className="enterprise1:text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full enterprise1:bg-primary/10 enterprise1:text-primary enterprise1:text-sm mb-4">
              <User className="mr-2 h-4 w-4" /> About Me
            </div>
            <AnimatedTitle className="enterprise1:text-4xl font-bold mb-6" textGradient>
              Who I Am
            </AnimatedTitle>
            <p className="max-w-3xl mx-auto enterprise1:text-gray-300 enterprise1:text-lg">
              Passionate about creating exceptional digital experiences through code and design.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl enterprise1:bg-gradient-to-r from-primary to-accent blur-sm opacity-50"></div>
                <div className="relative enterprise1:bg-gray-900 p-8 rounded-xl">
                  <h3 className="enterprise1:text-2xl text-white font-bold mb-4">My Journey</h3>
                  <p className="enterprise1:text-gray-300 mb-4">
                    {profileData?.bio || `I am a passionate Full Stack Developer with expertise in building robust and 
                    scalable applications. I enjoy solving challenging problems and creating seamless digital 
                    experiences. My skills encompass front-end, back-end, and everything in between!`}
                  </p>

                  <h4 className="enterprise1:text-xl text-white font-semibold mb-2 mt-6">What I Offer</h4>
                  <ul className="space-y-2 enterprise1:text-gray-300">
                    <li className="flex items-start">
                      <span className="enterprise1:text-accent mr-2">▹</span>
                      Building responsive single page applications
                    </li>
                    <li className="flex items-start">
                      <span className="enterprise1:text-accent mr-2">▹</span>
                      Creating robust and scalable backend services
                    </li>
                    <li className="flex items-start">
                      <span className="enterprise1:text-accent mr-2">▹</span>
                      Implementing performance optimizations
                    </li>
                    <li className="flex items-start">
                      <span className="enterprise1:text-accent mr-2">▹</span>
                      DevOps and deployment automation
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <div className="relative md:h-96">
              <ScrollReveal>
                <div className="relative h-full flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0">
                      <Scene
                        particles={false}
                        shapes={true}
                        cameraPosition={[0, 0, 3]}
                        lightIntensity={1}
                      />
                    </div>

                    <div className="relative z-10 h-full flex flex-col justify-center items-center py-8">
                      <div className="enterprise1:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800 mb-6">
                        <h3 className="enterprise1:text-xl text-white font-bold mb-2">Languages & Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="badge px-3 py-1 enterprise1:bg-primary/10 enterprise1:text-primary rounded-full enterprise1:text-xs">TypeScript</span>
                          <span className="badge px-3 py-1 enterprise1:bg-primary/10 enterprise1:text-primary rounded-full enterprise1:text-xs">React</span>
                          <span className="badge px-3 py-1 enterprise1:bg-primary/10 enterprise1:text-primary rounded-full enterprise1:text-xs">Node.js</span>
                          <span className="badge px-3 py-1 enterprise1:bg-primary/10 enterprise1:text-primary rounded-full enterprise1:text-xs">Express</span>
                          <span className="badge px-3 py-1 enterprise1:bg-primary/10 enterprise1:text-primary rounded-full enterprise1:text-xs">Three.js</span>
                        </div>
                      </div>

                      {profileData?.website && (
                        <a
                          href={profileData.website.startsWith('http') ? profileData.website : `https://${profileData.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 enterprise1:bg-gray-900/80 backdrop-blur-sm hover:enterprise1:bg-gray-800 
                          enterprise1:text-white rounded-lg border border-gray-800 flex items-center transition-colors"
                        >
                          Visit My Website <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {sortedExperience.length > 0 && (
        <section id="experience" className="section">
          <div className="container mx-auto px-6">
            <ScrollReveal className="enterprise1:text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full enterprise1:bg-primary/10 enterprise1:text-primary enterprise1:text-sm mb-4">
                <Briefcase className="mr-2 h-4 w-4" /> Experience
              </div>
              <AnimatedTitle className="enterprise1:text-4xl font-bold mb-6" textGradient>
                Professional Journey
              </AnimatedTitle>
              <p className="max-w-3xl mx-auto enterprise1:text-gray-300 enterprise1:text-lg">
                A collection of my professional experiences and achievements.
              </p>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto">
              <div className="relative pl-8">
                {sortedExperience.map((experience, index) => (
                  <TimelineItem
                    key={experience.id}
                    title={experience.title}
                    company={experience.company}
                    location={experience.location}
                    startDate={experience.start_date}
                    endDate={experience.end_date || undefined}
                    current={experience.current}
                    description={experience.description}
                    isFirst={index === 0}
                    isLast={index === sortedExperience.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills & Education Grid */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Skills Section */}
            {skillsData.length > 0 && (
              <div id="skills">
                <ScrollReveal className="enterprise1:text-center mb-16">
                  <div className="inline-flex items-center px-4 py-2 rounded-full enterprise1:bg-primary/10 enterprise1:text-primary enterprise1:text-sm mb-4">
                    <Code className="mr-2 h-4 w-4" /> Skills
                  </div>
                  <AnimatedTitle className="enterprise1:text-3xl font-bold mb-6" textGradient>
                    Technical Expertise
                  </AnimatedTitle>
                </ScrollReveal>

                {(() => {
                  const categories = new Set(skillsData.map(skill => skill.category || 'Other'));

                  return Array.from(categories).map(category => {
                    const categorySkills = skillsData.filter(skill => (skill.category || 'Other') === category);
                    return (
                      <ScrollReveal key={String(category)} className="mb-10 last:mb-0">
                        <h3 className="enterprise1:text-xl font-bold mb-6 flex items-center enterprise1:text-gray-200">
                          <span className="w-8 h-8 rounded-lg enterprise1:bg-primary/20 enterprise1:text-primary flex items-center justify-center mr-3">
                            <Code className="w-4 h-4" />
                          </span>
                          {category}
                        </h3>

                        <div className="enterprise1:bg-card p-6 rounded-xl shadow-xl border border-gray-800">
                          <div className="space-y-4">
                            {categorySkills.map(skill => (
                              <SkillBar
                                key={skill.id}
                                name={skill.name}
                                level={skill.level || 3}
                                maxLevel={5}
                              />
                            ))}
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  });
                })()}
              </div>
            )}

            {/* Education Section */}
            {sortedEducation.length > 0 && (
              <div id="education">
                <ScrollReveal className="enterprise1:text-center mb-16">
                  <div className="inline-flex items-center px-4 py-2 rounded-full enterprise1:bg-primary/10 enterprise1:text-primary enterprise1:text-sm mb-4">
                    <GraduationCap className="mr-2 h-4 w-4" /> Education
                  </div>
                  <AnimatedTitle className="enterprise1:text-3xl font-bold mb-6" textGradient>
                    Academic Background
                  </AnimatedTitle>
                </ScrollReveal>

                <div className="relative pl-8">
                  {sortedEducation.map((education, index) => (
                    <TimelineItem
                      key={education.id}
                      title={education.degree + (education.field_of_study ? ` in ${education.field_of_study}` : '')}
                      company={education.institution}
                      startDate={education.start_date}
                      endDate={education.end_date || undefined}
                      current={education.current}
                      description={education.description}
                      isFirst={index === 0}
                      isLast={index === sortedEducation.length - 1}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {projectsData.length > 0 && (
        <section id="projects" className="section enterprise1:bg-gradient-to-b from-gray-900 to-background">
          <div className="container mx-auto px-6">
            <ScrollReveal className="enterprise1:text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full enterprise1:bg-primary/10 enterprise1:text-primary enterprise1:text-sm mb-4">
                <Layers className="mr-2 h-4 w-4" /> Projects
              </div>
              <AnimatedTitle className="enterprise1:text-4xl font-bold mb-6" textGradient>
                Featured Work
              </AnimatedTitle>
              <p className="max-w-3xl mx-auto enterprise1:text-gray-300 enterprise1:text-lg">
                A selection of my recent projects and creative work.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project, index) => (
                <ScrollReveal key={project.id}>
                  <div
                    className="group enterprise1:bg-card overflow-hidden rounded-xl shadow-xl hover:shadow-2xl
                    border border-gray-800 transition-all duration-300 h-full flex flex-col"
                  >
                    {project.image_url ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 
                          group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="h-48 enterprise1:bg-gradient-to-br from-primary/20 to-accent/20 
                      flex items-center justify-center p-8">
                        <Layers className="w-16 h-16 enterprise1:text-gray-600" />
                      </div>
                    )}

                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="enterprise1:text-xl font-bold enterprise1:text-gray-100 mb-3">{project.title}</h3>

                      {project.description && (
                        <p className="enterprise1:text-gray-400 mb-4 line-clamp-3 flex-grow">{project.description}</p>
                      )}

                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 enterprise1:text-xs font-medium rounded-full 
                              enterprise1:bg-primary/10 enterprise1:text-primary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {project.url && (
                        <a
                          href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center enterprise1:text-accent hover:enterprise1:text-accent/80
                          transition-colors mt-2 font-medium"
                        >
                          View Project <ExternalLink className="ml-1 w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container mx-auto px-6">
          <ScrollReveal className="enterprise1:text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full enterprise1:bg-primary/10 enterprise1:text-primary enterprise1:text-sm mb-4">
              <Mail className="mr-2 h-4 w-4" /> Contact
            </div>
            <AnimatedTitle className="enterprise1:text-4xl font-bold mb-6" textGradient>
              Get In Touch
            </AnimatedTitle>
            <p className="max-w-3xl mx-auto enterprise1:text-gray-300 enterprise1:text-lg">
              Feel free to reach out for collaboration opportunities or just to say hello!
            </p>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <ScrollReveal>
                <div className="enterprise1:bg-card p-8 rounded-xl border border-gray-800 shadow-xl relative overflow-hidden">
                  <div className="animated-border"></div>

                  <h3 className="enterprise1:text-2xl text-white font-bold mb-6">Let's Talk</h3>

                  <div className="space-y-6">
                    {profileData?.email && (
                      <div className="flex items-start">
                        <div className="enterprise1:bg-primary/10 p-3 rounded-lg mr-4">
                          <Mail className="h-6 w-6 enterprise1:text-primary" />
                        </div>
                        <div>
                          <h4 className="enterprise1:text-sm text-white font-medium enterprise1:text-gray-400 mb-1">Email</h4>
                          <a
                            href={`mailto:${profileData.email}`}
                            className="enterprise1:text-lg text-white hover:enterprise1:text-primary transition-colors"
                          >
                            {profileData.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {profileData?.phone && (
                      <div className="flex items-start">
                        <div className="enterprise1:bg-primary/10 p-3 rounded-lg mr-4">
                          <Phone className="h-6 w-6 enterprise1:text-primary" />
                        </div>
                        <div>
                          <h4 className="enterprise1:text-sm text-white font-medium enterprise1:text-gray-400 mb-1">Phone</h4>
                          <a
                            href={`tel:${profileData.phone}`}
                            className="enterprise1:text-lg text-white hover:enterprise1:text-primary transition-colors"
                          >
                            {profileData.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start">
                      <div className="enterprise1:bg-primary/10 p-3 rounded-lg mr-4">
                        <AtSign className="h-6 w-6 enterprise1:text-primary" />
                      </div>
                      <div>
                        <h4 className="enterprise1:text-sm text-white font-medium enterprise1:text-gray-400 mb-1">Social Media</h4>
                        <div className="flex space-x-4 mt-2">
                          {profileData?.linkedin_url && (
                            <a
                              href={profileData.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="enterprise1:text-gray-400 hover:enterprise1:text-primary transition-colors"
                            >
                              <Linkedin className="h-5 w-5" />
                            </a>
                          )}

                          {profileData?.github_url && (
                            <a
                              href={profileData.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="enterprise1:text-gray-400 hover:enterprise1:text-primary transition-colors"
                            >
                              <Github className="h-5 w-5" />
                            </a>
                          )}

                          {profileData?.twitter_url && (
                            <a
                              href={profileData.twitter_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="enterprise1:text-gray-400 hover:enterprise1:text-primary transition-colors"
                            >
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </a>
                          )}

                          {profileData?.instagram_url && (
                            <a
                              href={profileData.instagram_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="enterprise1:text-gray-400 hover:enterprise1:text-primary transition-colors"
                            >
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href="mailto:hello@example.com"
                      className="inline-flex items-center px-6 py-3 enterprise1:bg-gradient-to-r from-primary to-accent 
                      enterprise1:text-white font-medium rounded-lg transform hover:translate-y-[-2px] transition-all 
                      duration-300 shadow-lg hover:shadow-accent/20"
                    >
                      Send Me a Message <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="relative h-96">
                  <div className="absolute inset-0">
                    <Scene
                      particles={false}
                      shapes={true}
                      cameraPosition={[0, 0, 3]}
                    />
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-center items-center">
                    <div className="enterprise1:text-center">
                      <h3 className="enterprise1:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-purple-400">Open to Opportunities</h3>
                      <p className="enterprise1:text-gray-300 mb-8 max-w-sm mx-auto">
                        Currently available for freelance projects, full-time positions, and interesting collaborations.
                      </p>

                      <a
                        href="#"
                        className="inline-flex items-center px-6 py-3 enterprise1:bg-card hover:enterprise1:bg-gray-800 
                        enterprise1:text-white font-medium rounded-lg border border-gray-700 shadow-lg
                        transform hover:translate-y-[-2px] transition-all duration-300"
                      >
                        <Download className="mr-2 h-5 w-5" /> Download Resume
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="enterprise1:bg-card py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="enterprise1:text-2xl text-white font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-purple-400">
                {profileData?.full_name || 'John Doe'}
              </h2>
              <p className="enterprise1:text-gray-400 mt-1">Full Stack Developer</p>
            </div>

            <div className="flex space-x-8 mb-6 md:mb-0">
              <a href="#about" className="enterprise1:text-gray-400 hover:enterprise1:text-white transition-colors">About</a>
              <a href="#experience" className="enterprise1:text-gray-400 hover:enterprise1:text-white transition-colors">Experience</a>
              <a href="#skills" className="enterprise1:text-gray-400 hover:enterprise1:text-white transition-colors">Skills</a>
              <a href="#projects" className="enterprise1:text-gray-400 hover:enterprise1:text-white transition-colors">Projects</a>
              <a href="#contact" className="enterprise1:text-gray-400 hover:enterprise1:text-white transition-colors">Contact</a>
            </div>

            <div className="flex space-x-4">
              {profileData?.linkedin_url && (
                <a
                  href={profileData.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enterprise1:text-gray-400 hover:enterprise1:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}

              {profileData?.github_url && (
                <a
                  href={profileData.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enterprise1:text-gray-400 hover:enterprise1:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}

              {profileData?.email && (
                <a
                  href={`mailto:${profileData.email}`}
                  className="enterprise1:text-gray-400 hover:enterprise1:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="enterprise1:text-gray-500 enterprise1:text-sm">
              &copy; {new Date().getFullYear()} {profileData?.full_name || 'John Doe'}. All rights reserved.
            </p>

            <p className="enterprise1:text-gray-500 enterprise1:text-sm mt-2 md:mt-0">
              Designed and built with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioTemplate;
