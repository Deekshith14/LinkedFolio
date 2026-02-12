import React, { useState } from 'react';
import { PortfolioProps } from '@/types/portfolio';
import { ArrowRight, AtSign, Briefcase, Calendar, Code, Download, ExternalLink, Github, Globe, GraduationCap, Home, Layers, Linkedin, Mail, MapPin, Menu, Moon, Star, Sun, User, X } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const Pro1Template: React.FC<PortfolioProps> = ({ 
  profileData, 
  experienceData = [], 
  educationData = [], 
  projectsData = [], 
  skillsData = [] 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const formatDateRange = (startDate: string, endDate?: string | null, current?: boolean) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : endDate ? formatDate(endDate) : '';
    return `${start} - ${end}`;
  };

  // Dynamic classNames based on dark mode
  const theme = {
    bg: {
      primary: isDarkMode ? 'bg-gray-900' : 'bg-white',
      secondary: isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
      accent: 'bg-purple-600',
      accentHover: 'hover:bg-purple-700',
      card: isDarkMode ? 'bg-gray-800' : 'bg-white',
    },
    text: {
      primary: isDarkMode ? 'text-white' : 'text-gray-900',
      secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
      accent: 'text-purple-600',
      accentHover: 'hover:text-purple-500',
    },
    border: {
      primary: isDarkMode ? 'border-gray-700' : 'border-gray-200',
      accent: 'border-purple-600',
    }
  };

  return (
    <div className={`min-h-screen font-sans ${theme.bg.primary} ${theme.text.primary} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-20 ${theme.bg.primary} border-b ${theme.border.primary} py-4 px-6`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-bold flex items-center">
            <span className={`${theme.text.accent}`}>
              {profileData?.full_name?.split(' ')[0] || 'Portfolio'}
            </span>
            <span>.</span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}>About</a>
            {experienceData.length > 0 && (
              <a href="#experience" className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}>Experience</a>
            )}
            {projectsData.length > 0 && (
              <a href="#projects" className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}>Projects</a>
            )}
            {skillsData.length > 0 && (
              <a href="#skills" className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}>Skills</a>
            )}
            {educationData.length > 0 && (
              <a href="#education" className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}>Education</a>
            )}
            <a href="#contact" className={`${theme.bg.accent} ${theme.bg.accentHover} text-white px-4 py-2 rounded-lg transition-colors`}>
              Contact
            </a>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} transition-colors`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} transition-colors`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`p-2 rounded-lg ${theme.text.primary}`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={`fixed inset-0 z-30 ${theme.bg.primary} ${theme.text.primary} md:hidden`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <a href="#" className="text-2xl font-bold">
                <span className={theme.text.accent}>
                  {profileData?.full_name?.split(' ')[0] || 'Portfolio'}
                </span>
                <span>.</span>
              </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6 text-xl">
              <a 
                href="#about" 
                className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              {experienceData.length > 0 && (
                <a 
                  href="#experience" 
                  className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Experience
                </a>
              )}
              {projectsData.length > 0 && (
                <a 
                  href="#projects" 
                  className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </a>
              )}
              {skillsData.length > 0 && (
                <a 
                  href="#skills" 
                  className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Skills
                </a>
              )}
              {educationData.length > 0 && (
                <a 
                  href="#education" 
                  className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Education
                </a>
              )}
              <a 
                href="#contact" 
                className={`${theme.bg.accent} ${theme.bg.accentHover} text-white px-6 py-3 rounded-lg inline-block transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
            
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex space-x-6">
                <a href="#" className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}>
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}>
                  <Github className="w-6 h-6" />
                </a>
                {profileData?.email && (
                  <a 
                    href={`mailto:${profileData.email}`} 
                    className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        id="about" 
        className={`pt-32 pb-20 px-6 ${theme.bg.primary} relative overflow-hidden`}
      >
        {/* Background gradient */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-purple-600/20 to-blue-600/10 opacity-50 -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${theme.bg.secondary} ${theme.text.primary}`}>
                {profileData?.bio?.split(' ').slice(0, 3).join(' ') || 'Welcome to my portfolio'}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Hi, I'm {' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  {profileData?.full_name || 'Portfolio User'}
                </span>
              </h1>
              
              <p className={`text-xl mb-8 ${theme.text.secondary}`}>
                {profileData?.bio || 'Welcome to my professional portfolio. I showcase my projects, skills, and experience here.'}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  className={`inline-flex items-center ${theme.bg.accent} hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors`}
                >
                  Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                
                <a 
                  href="#" 
                  className={`inline-flex items-center px-6 py-3 rounded-lg font-medium border ${theme.border.primary} ${theme.text.secondary} hover:${theme.text.primary} transition-colors`}
                >
                  <Download className="mr-2 w-5 h-5" /> Download Resume
                </a>
              </div>
              
              <div className="mt-12 flex items-center gap-4">
                <div className={`${theme.text.secondary}`}>Find me on:</div>
                <div className="flex space-x-4">
                  <a href="#" className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}>
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}>
                    <Github className="w-5 h-5" />
                  </a>
                  {profileData?.email && (
                    <a 
                      href={`mailto:${profileData.email}`} 
                      className={`${theme.text.secondary} ${theme.text.accentHover} transition-colors`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center">
              {profileData?.avatar_url ? (
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-600 shadow-lg">
                    <img 
                      src={profileData.avatar_url} 
                      alt={profileData?.full_name || 'Profile'} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 rounded-full bg-purple-600/30 -right-5 -bottom-5"></div>
                </div>
              ) : (
                <div className="relative">
                  <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-purple-600 ${theme.bg.secondary} flex items-center justify-center shadow-lg`}>
                    <User className="w-32 h-32 text-purple-600" />
                  </div>
                  <div className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 rounded-full bg-purple-600/30 -right-5 -bottom-5"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {experienceData.length > 0 && (
        <section id="experience" className={`py-20 px-6 ${theme.bg.secondary}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h6 className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${theme.bg.accent} text-white`}>
                Experience
              </h6>
              <h2 className="text-3xl md:text-4xl font-bold">My Professional Journey</h2>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {experienceData.map((experience, index) => (
                <div 
                  key={experience.id} 
                  className={`
                    relative pl-8 pb-12 
                    ${index !== experienceData.length - 1 ? 'border-l-2' : ''} 
                    ${theme.border.accent}
                  `}
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-2.5 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center border-4 ${isDarkMode ? 'border-gray-800' : 'border-gray-50'}`}></div>
                  
                  <div className={`${theme.bg.card} rounded-lg p-6 shadow-md ml-4 hover:shadow-lg transition-shadow border ${theme.border.primary}`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-bold">{experience.title}</h3>
                      <div className={`flex items-center text-sm ${theme.text.secondary} mt-1 md:mt-0`}>
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDateRange(experience.start_date, experience.end_date, experience.current)}
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <Briefcase className={`w-4 h-4 mr-2 ${theme.text.secondary}`} />
                      <h4 className="font-medium">{experience.company}</h4>
                      {experience.location && (
                        <>
                          <span className={`mx-2 text-sm ${theme.text.secondary}`}>•</span>
                          <div className="flex items-center">
                            <MapPin className={`w-4 h-4 mr-1 ${theme.text.secondary}`} />
                            <span className={theme.text.secondary}>{experience.location}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {experience.description && (
                      <p className={`${theme.text.secondary} mt-2`}>{experience.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projectsData.length > 0 && (
        <section id="projects" className={`py-20 px-6 ${theme.bg.primary}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h6 className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${theme.bg.accent} text-white`}>
                Projects
              </h6>
              <h2 className="text-3xl md:text-4xl font-bold">My Recent Work</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map(project => (
                <div 
                  key={project.id} 
                  className={`
                    group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300
                    border ${theme.border.primary} ${theme.bg.card}
                  `}
                >
                  {project.image_url ? (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className={`h-48 flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <Layers className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    
                    {project.description && (
                      <p className={`${theme.text.secondary} mb-4 line-clamp-3`}>{project.description}</p>
                    )}
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index} 
                            className={`
                              px-2 py-1 text-xs rounded-full font-medium
                              ${isDarkMode ? 'bg-gray-700 text-purple-400' : 'bg-purple-100 text-purple-800'}
                            `}
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
                        className={`
                          inline-flex items-center ${theme.text.accent} ${theme.text.accentHover} 
                          mt-2 font-medium transition-colors
                        `}
                      >
                        View Project <ExternalLink className="ml-1 w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skillsData.length > 0 && (
        <section id="skills" className={`py-20 px-6 ${theme.bg.secondary}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h6 className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${theme.bg.accent} text-white`}>
                Skills
              </h6>
              <h2 className="text-3xl md:text-4xl font-bold">My Expertise</h2>
            </div>
            
            {(() => {
              const categories = new Set(skillsData.map(skill => skill.category || 'Other'));
              
              if (categories.size <= 1) {
                // No categories or just one, display as a grid of cards
                return (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {skillsData.map(skill => (
                      <div 
                        key={skill.id} 
                        className={`
                          p-6 rounded-xl ${theme.bg.card} border ${theme.border.primary}
                          shadow-md hover:shadow-lg transition-all text-center
                          hover:-translate-y-1 duration-300
                        `}
                      >
                        <Code className={`w-10 h-10 ${theme.text.accent} mx-auto mb-3`} />
                        <h3 className="font-bold mb-2">{skill.name}</h3>
                        
                        {skill.level && (
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                            <div 
                              className="bg-purple-600 h-1.5 rounded-full" 
                              style={{ width: `${(skill.level / 5) * 100}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              } else {
                // Multiple categories, group them
                return (
                  <div className="grid md:grid-cols-2 gap-12">
                    {Array.from(categories).map(category => {
                      const categorySkills = skillsData.filter(skill => (skill.category || 'Other') === category);
                      return (
                        <div 
                          key={String(category)} 
                          className={`p-6 rounded-xl ${theme.bg.card} border ${theme.border.primary} shadow-md`}
                        >
                          <h3 className="text-xl font-bold mb-6 flex items-center">
                            <Star className={`${theme.text.accent} mr-2 w-5 h-5`} />
                            {category}
                          </h3>
                          
                          <div className="space-y-4">
                            {categorySkills.map(skill => (
                              <div key={skill.id}>
                                <div className="flex justify-between mb-1">
                                  <span className="font-medium">{skill.name}</span>
                                  {skill.level && (
                                    <span className={theme.text.secondary}>{skill.level}/5</span>
                                  )}
                                </div>
                                
                                {skill.level && (
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-purple-600 h-2 rounded-full" 
                                      style={{ width: `${(skill.level / 5) * 100}%` }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }
            })()}
          </div>
        </section>
      )}

      {/* Education Section */}
      {educationData.length > 0 && (
        <section id="education" className={`py-20 px-6 ${theme.bg.primary}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h6 className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${theme.bg.accent} text-white`}>
                Education
              </h6>
              <h2 className="text-3xl md:text-4xl font-bold">Academic Background</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {educationData.map(education => (
                <div 
                  key={education.id} 
                  className={`
                    p-6 rounded-xl ${theme.bg.card} border ${theme.border.primary}
                    shadow-md hover:shadow-lg transition-all
                  `}
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-purple-100'}`}>
                      <GraduationCap className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">{education.institution}</h3>
                      <div className={`flex items-center text-sm ${theme.text.secondary}`}>
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDateRange(education.start_date, education.end_date, education.current)}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`ml-14 ${theme.text.primary}`}>
                    <h4 className="font-medium">
                      {education.degree}
                      {education.field_of_study && ` in ${education.field_of_study}`}
                    </h4>
                    
                    {education.description && (
                      <p className={`mt-2 ${theme.text.secondary}`}>{education.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-6 ${theme.bg.secondary}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h6 className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${theme.bg.accent} text-white`}>
              Contact
            </h6>
            <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
            <p className={`max-w-3xl mx-auto mt-4 ${theme.text.secondary} text-lg`}>
              Feel free to reach out for collaborations or just a friendly chat. 
              I'm always open to discussing new projects or opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Email */}
            {profileData?.email && (
              <a 
                href={`mailto:${profileData.email}`}
                className={`
                  p-6 rounded-xl ${theme.bg.card} border ${theme.border.primary}
                  shadow-md hover:shadow-lg transition-all text-center
                  hover:-translate-y-1 duration-300
                `}
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-full ${theme.bg.accent} flex items-center justify-center`}>
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Email</h3>
                <p className={theme.text.secondary}>{profileData.email}</p>
              </a>
            )}
            
            {/* LinkedIn */}
            <a 
              href="#"
              className={`
                p-6 rounded-xl ${theme.bg.card} border ${theme.border.primary}
                shadow-md hover:shadow-lg transition-all text-center
                hover:-translate-y-1 duration-300
              `}
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-full ${theme.bg.accent} flex items-center justify-center`}>
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">LinkedIn</h3>
              <p className={theme.text.secondary}>Connect with me</p>
            </a>
            
            {/* Location/Website */}
            {profileData?.website ? (
              <a 
                href={profileData.website.startsWith('http') ? profileData.website : `https://${profileData.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  p-6 rounded-xl ${theme.bg.card} border ${theme.border.primary}
                  shadow-md hover:shadow-lg transition-all text-center
                  hover:-translate-y-1 duration-300
                `}
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-full ${theme.bg.accent} flex items-center justify-center`}>
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Website</h3>
                <p className={theme.text.secondary}>{profileData.website}</p>
              </a>
            ) : (
              <div 
                className={`
                  p-6 rounded-xl ${theme.bg.card} border ${theme.border.primary}
                  shadow-md hover:shadow-lg transition-all text-center
                `}
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-full ${theme.bg.accent} flex items-center justify-center`}>
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Location</h3>
                <p className={theme.text.secondary}>Remote / Worldwide</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="#" className="text-2xl font-bold">
                <span className="text-purple-400">
                  {profileData?.full_name?.split(' ')[0] || 'Portfolio'}
                </span>
                <span>.</span>
              </a>
              <p className="mt-2 text-gray-400">Personal Portfolio Website</p>
            </div>
            
            <div className="flex items-center space-x-8">
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
              {experienceData.length > 0 && (
                <a href="#experience" className="text-gray-400 hover:text-white transition-colors">Experience</a>
              )}
              {projectsData.length > 0 && (
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
              )}
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              {profileData?.email && (
                <a 
                  href={`mailto:${profileData.email}`} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Created with LinkedFolio</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pro1Template;
