"use client"

import type React from "react"
import { formatDate } from "@/lib/utils"
import { useEffect, useState, useRef } from "react"
import {
  Mail,
  Phone,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Star,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
} from "lucide-react"
import type { PortfolioProps } from "@/types/portfolio"

const Free2Template: React.FC<PortfolioProps> = ({
  userId,
  username,
  profileData,
  experienceData,
  educationData,
  projectsData,
  skillsData,
}) => {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  }

  // Log template rendering
  useEffect(() => {
    console.log("FREE 2 TEMPLATE RENDERING")
    if (profileData) console.log(profileData)
    if (experienceData) console.log(experienceData)
    if (educationData) console.log(educationData)
    if (projectsData) console.log(projectsData)
    if (skillsData) console.log(skillsData)
  }, [profileData, experienceData, educationData, projectsData, skillsData])

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for the navbar

      // Check which section is currently in view
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const element = ref.current
          const offsetTop = element.offsetTop
          const height = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const section = sectionRefs[sectionId as keyof typeof sectionRefs]?.current
    if (section) {
      const navbarHeight = 80 // Approximate height of navbar
      const offsetTop = section.offsetTop - navbarHeight
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-white">Profile Not Found</h1>
          <p className="mt-2 text-gray-300">The profile data could not be loaded.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo/Name */}
            <div className="flex items-center">
              <button onClick={() => scrollToSection("home")} className="text-xl font-bold text-purple-400">
                {profileData.full_name?.split(" ")[0] || username || "Portfolio"}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => scrollToSection("home")}
                className={`px-3 py-2 rounded-md transition-colors ${activeSection === "home" ? "text-purple-400" : "text-gray-300 hover:text-white"
                  }`}
              >
                Home
              </button>
              {experienceData && experienceData.length > 0 && (
                <button
                  onClick={() => scrollToSection("experience")}
                  className={`px-3 py-2 rounded-md transition-colors ${activeSection === "experience" ? "text-purple-400" : "text-gray-300 hover:text-white"
                    }`}
                >
                  Experience
                </button>
              )}
              {projectsData && projectsData.length > 0 && (
                <button
                  onClick={() => scrollToSection("projects")}
                  className={`px-3 py-2 rounded-md transition-colors ${activeSection === "projects" ? "text-purple-400" : "text-gray-300 hover:text-white"
                    }`}
                >
                  Projects
                </button>
              )}
              {educationData && educationData.length > 0 && (
                <button
                  onClick={() => scrollToSection("education")}
                  className={`px-3 py-2 rounded-md transition-colors ${activeSection === "education" ? "text-purple-400" : "text-gray-300 hover:text-white"
                    }`}
                >
                  Education
                </button>
              )}
              {skillsData && skillsData.length > 0 && (
                <button
                  onClick={() => scrollToSection("skills")}
                  className={`px-3 py-2 rounded-md transition-colors ${activeSection === "skills" ? "text-purple-400" : "text-gray-300 hover:text-white"
                    }`}
                >
                  Skills
                </button>
              )}
              <button
                onClick={() => scrollToSection("contact")}
                className={`px-3 py-2 rounded-md transition-colors ${activeSection === "contact" ? "text-purple-400" : "text-gray-300 hover:text-white"
                  }`}
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-b border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("home")}
                className={`block px-3 py-2 rounded-md w-full text-left ${activeSection === "home"
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                Home
              </button>
              {experienceData && experienceData.length > 0 && (
                <button
                  onClick={() => scrollToSection("experience")}
                  className={`block px-3 py-2 rounded-md w-full text-left ${activeSection === "experience"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                  Experience
                </button>
              )}
              {projectsData && projectsData.length > 0 && (
                <button
                  onClick={() => scrollToSection("projects")}
                  className={`block px-3 py-2 rounded-md w-full text-left ${activeSection === "projects"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                  Projects
                </button>
              )}
              {educationData && educationData.length > 0 && (
                <button
                  onClick={() => scrollToSection("education")}
                  className={`block px-3 py-2 rounded-md w-full text-left ${activeSection === "education"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                  Education
                </button>
              )}
              {skillsData && skillsData.length > 0 && (
                <button
                  onClick={() => scrollToSection("skills")}
                  className={`block px-3 py-2 rounded-md w-full text-left ${activeSection === "skills"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                  Skills
                </button>
              )}
              <button
                onClick={() => scrollToSection("contact")}
                className={`block px-3 py-2 rounded-md w-full text-left ${activeSection === "contact"
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Animated Background */}
      <div ref={sectionRefs.home} className="relative overflow-hidden bg-black pt-20">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-900 to-blue-900/30 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLW9wYWNpdHk9Ii4yIiBjeD0iOSIgY3k9IjkiIHI9IjgiLz48L2c+PC9zdmc+')]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 md:py-32">
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 p-1 mb-6 shadow-lg shadow-purple-500/20">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                {profileData.avatar_url ? (
                  <img
                    src={profileData.avatar_url || "/placeholder.svg"}
                    alt={profileData.full_name || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl font-bold text-gray-100">
                    {(profileData.full_name || username || "U").charAt(0)}
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
              {profileData.full_name || username}
            </h1>

            {experienceData && experienceData.length > 0 && experienceData[0].title && (
              <h2 className="text-xl text-gray-300 mb-6">
                {experienceData[0].title} at {experienceData[0].company}
              </h2>
            )}

            <p className="max-w-2xl text-gray-300 mb-8 leading-relaxed">
              {profileData.bio || "Welcome to my professional portfolio"}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {profileData.email && (
                <a
                  href={`mailto:${profileData.email}`}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 flex items-center gap-2 border border-gray-700 hover:border-purple-500 group"
                >
                  <Mail className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                  <span>Contact Me</span>
                </a>
              )}

              {profileData.website && (
                <a
                  href={profileData.website.startsWith("http") ? profileData.website : `https://${profileData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 flex items-center gap-2 border border-gray-700 hover:border-blue-500 group"
                >
                  <ExternalLink className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                  <span>Visit Website</span>
                </a>
              )}
            </div>

            <div className="mt-10 flex gap-4">
              {profileData.github_url && (
                <a
                  href={profileData.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-700"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
              )}

              {profileData.linkedin_url && (
                <a
                  href={profileData.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-700"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              )}

              {profileData.twitter_url && (
                <a
                  href={profileData.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-700"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              )}

              {profileData.instagram_url && (
                <a
                  href={profileData.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-700"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-16 md:h-24 fill-gray-900">
            <path d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Experience Section */}
        {experienceData && experienceData.length > 0 && (
          <section ref={sectionRefs.experience} className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-purple-900/30 text-purple-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Work Experience</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experienceData.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                      {exp.title}
                    </h3>
                    <span className="flex items-center text-gray-400 text-sm bg-gray-800 px-3 py-1 rounded-full">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(exp.start_date)} - {exp.current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-300 mb-3">
                    <span className="font-medium">{exp.company}</span>
                    {exp.location && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="flex items-center text-gray-400">
                          <MapPin className="w-3 h-3 mr-1" />
                          {exp.location}
                        </span>
                      </>
                    )}
                  </div>

                  {exp.description && <p className="text-gray-400 mt-3 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projectsData && projectsData.length > 0 && (
          <section ref={sectionRefs.projects} className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-900/30 text-blue-400">
                <Code className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Projects</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group flex flex-col h-full"
                >
                  {project.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors mb-2">
                      {project.title}
                    </h3>

                    {project.description && <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>}

                    {project.technologies && project.technologies.filter((t) => t).length > 0 && (
                      <div className="mt-auto mb-4 flex flex-wrap gap-2">
                        {project.technologies
                          .filter((t) => t)
                          .map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md">
                              {tech}
                            </span>
                          ))}
                      </div>
                    )}

                    {project.url && (
                      <a
                        href={project.url.startsWith("http") ? project.url : `https://${project.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-auto"
                      >
                        <span className="mr-1">View Project</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two Column Layout for Education and Skills/Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Education Section */}
          <div className="lg:col-span-2">
            {educationData && educationData.length > 0 && (
              <section
                ref={sectionRefs.education}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-green-900/30 text-green-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Education</h2>
                </div>

                <div className="space-y-8">
                  {educationData.map((edu) => (
                    <div
                      key={edu.id}
                      className="relative pl-6 border-l border-gray-700 hover:border-green-500 transition-colors"
                    >
                      <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-green-500"></div>

                      <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                        <h3 className="font-bold text-lg text-white">{edu.institution}</h3>
                        <span className="text-gray-400 text-sm flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(edu.start_date)} - {edu.current ? "Present" : formatDate(edu.end_date)}
                        </span>
                      </div>

                      <p className="text-gray-300 font-medium">
                        {edu.degree}
                        {edu.field_of_study && ` in ${edu.field_of_study}`}
                      </p>

                      {edu.description && <p className="text-gray-400 mt-2">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Skills and Contact Sections */}
          <div className="space-y-8">
            {/* Skills Section */}
            {skillsData && skillsData.length > 0 && (
              <section
                ref={sectionRefs.skills}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-amber-900/30 text-amber-400">
                    <Star className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Skills</h2>
                </div>

                <div className="space-y-6">
                  {Object.entries(
                    skillsData.reduce(
                      (acc, skill) => {
                        const category = skill.category || "Other"
                        acc[category] = [...(acc[category] || []), skill]
                        return acc
                      },
                      {} as Record<string, typeof skillsData>,
                    ),
                  ).map(([category, skills]) => (
                    <div key={category} className="mb-4">
                      <h3 className="font-medium text-gray-300 mb-3 flex items-center">
                        <ChevronRight className="w-4 h-4 text-amber-500 mr-1" />
                        {category}
                      </h3>

                      <div className="space-y-3">
                        {skills.map((skill) => (
                          <div key={skill.id} className="group">
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-300 group-hover:text-amber-300 transition-colors">
                                {skill.name}
                              </span>
                              {skill.level && <span className="text-xs text-gray-500">{skill.level}/5</span>}
                            </div>

                            {skill.level && (
                              <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-1.5 rounded-full transition-all duration-500 ease-out"
                                  style={{ width: `${(skill.level / 5) * 100}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contact Section */}
            <section
              ref={sectionRefs.contact}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 scroll-mt-24"
            >
              <h2 className="text-xl font-bold text-white mb-4">Contact</h2>

              <ul className="space-y-4">
                {profileData.email && (
                  <li className="flex items-center gap-3 group">
                    <div className="p-2 bg-gray-700 rounded-lg text-purple-400 group-hover:bg-purple-900/30 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-gray-300 hover:text-purple-300 transition-colors"
                    >
                      {profileData.email}
                    </a>
                  </li>
                )}

                {profileData.phone && (
                  <li className="flex items-center gap-3 group">
                    <div className="p-2 bg-gray-700 rounded-lg text-blue-400 group-hover:bg-blue-900/30 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <a
                      href={`tel:${profileData.phone}`}
                      className="text-gray-300 hover:text-blue-300 transition-colors"
                    >
                      {profileData.phone}
                    </a>
                  </li>
                )}

                {profileData.website && (
                  <li className="flex items-center gap-3 group">
                    <div className="p-2 bg-gray-700 rounded-lg text-green-400 group-hover:bg-green-900/30 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <a
                      href={
                        profileData.website.startsWith("http") ? profileData.website : `https://${profileData.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-green-300 transition-colors"
                    >
                      {profileData.website.replace(/(^\w+:|^)\/\//, "")}
                    </a>
                  </li>
                )}
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-gray-800 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-white">{profileData.full_name || username}</h2>
            <p className="text-gray-400 text-sm">Professional Portfolio</p>
          </div>

          <div className="flex gap-4">
            {profileData.github_url && (
              <a
                href={profileData.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}

            {profileData.linkedin_url && (
              <a
                href={profileData.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}

            {profileData.twitter_url && (
              <a
                href={profileData.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}

            {profileData.instagram_url && (
              <a
                href={profileData.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {profileData.full_name || username}. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Created with <span className="text-purple-400">LinkedFolio</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Free2Template
