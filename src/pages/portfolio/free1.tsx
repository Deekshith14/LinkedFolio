import type React from "react"
import type { PortfolioProps } from "@/types/portfolio"
import {
  Calendar,
  Code,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  User,
  Twitter,
  Instagram,
  Phone,
  ChevronRight,
  Download,
} from "lucide-react"
import { formatDate } from "@/lib/utils"

const Free1Template: React.FC<PortfolioProps> = (props) => {
  const formatDateRange = (startDate: string, endDate?: string | null, current?: boolean) => {
    const start = formatDate(startDate)
    const end = current ? "Present" : endDate ? formatDate(endDate) : ""
    return `${start} - ${end}`
  }

  // Extract profile data for easier access
  const profile = props.profileData || {}

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header/Hero Section */}
      <header className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0M20 40L40 20M0 20L20 0" stroke="white" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-20 md:py-32 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image/Icon */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-xl">
                <User className="h-16 w-16 md:h-20 md:w-20 text-white/80" />
              </div>

              {/* Profile Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                  {profile.full_name || "John Doe"}
                </h1>

                {props.experienceData && props.experienceData.length > 0 && props.experienceData[0].title && (
                  <h2 className="text-xl md:text-2xl font-medium text-white/90 mb-4">
                    {props.experienceData[0].title} at {props.experienceData[0].company}
                  </h2>
                )}

                {profile.bio && <p className="text-white/80 text-lg max-w-2xl mb-6 leading-relaxed">{profile.bio}</p>}

                {/* Contact Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="flex items-center gap-2 bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Contact Me</span>
                    </a>
                  )}

                  {profile.website && (
                    <a
                      href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Website</span>
                    </a>
                  )}

                  <a
                    href="#"
                    className="flex items-center gap-2 bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>Resume</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center md:justify-end mt-8 gap-3">
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/15 hover:bg-white/25 p-3 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}

              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/15 hover:bg-white/25 p-3 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}

              {profile.twitter_url && (
                <a
                  href={profile.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/15 hover:bg-white/25 p-3 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}

              {profile.instagram_url && (
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/15 hover:bg-white/25 p-3 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-full text-gray-50 fill-current"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,0,0,0Z"></path>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-16">
            {/* Experience Section */}
            {props.experienceData.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 overflow-hidden relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Professional Experience</h2>
                </div>

                <div className="space-y-10">
                  {props.experienceData.map((experience, index) => (
                    <div
                      key={experience.id}
                      className="group relative pl-8 border-l-2 border-indigo-200 hover:border-indigo-500 transition-colors"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white shadow-md"></div>

                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{experience.title}</h3>
                        <div className="flex items-center text-indigo-600 text-sm font-medium mt-1 md:mt-0">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDateRange(experience.start_date, experience.end_date, experience.current)}
                        </div>
                      </div>

                      <div className="flex items-center text-gray-700 mb-3">
                        <h4 className="font-semibold text-lg">{experience.company}</h4>
                        {experience.location && (
                          <>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {experience.location}
                            </div>
                          </>
                        )}
                      </div>

                      {experience.description && (
                        <p className="text-gray-600 mt-2 leading-relaxed">{experience.description}</p>
                      )}

                      {/* Add a visual indicator for the last item */}
                      {index === props.experienceData.length - 1 && (
                        <div className="absolute -left-[9px] bottom-0 w-4 h-4 rounded-full bg-indigo-200 border-2 border-white"></div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {props.projectsData.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
                    <Code className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
                </div>

                <div className="grid gap-6 grid-cols-1">
                  {props.projectsData.map((project) => (
                    <div
                      key={project.id}
                      className="bg-gradient-to-br from-purple-50 to-white rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 border border-purple-100 flex flex-col"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                          {project.url && (
                            <a
                              href={project.url.startsWith("http") ? project.url : `https://${project.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:text-purple-700 transition-colors"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </a>
                          )}
                        </div>

                        {project.description && (
                          <p className="text-gray-600 mt-3 leading-relaxed">{project.description}</p>
                        )}

                        {project.technologies && project.technologies.filter((t) => t).length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.technologies
                              .filter((t) => t)
                              .map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {props.educationData.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                </div>

                <div className="space-y-8">
                  {props.educationData.map((education) => (
                    <div
                      key={education.id}
                      className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{education.institution}</h3>
                        <div className="flex items-center text-blue-600 text-sm font-medium mt-1 md:mt-0">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDateRange(education.start_date, education.end_date, education.current)}
                        </div>
                      </div>

                      <div className="text-gray-700">
                        <h4 className="font-semibold text-lg">
                          {education.degree}
                          {education.field_of_study && ` in ${education.field_of_study}`}
                        </h4>
                      </div>

                      {education.description && (
                        <p className="text-gray-600 mt-2 leading-relaxed">{education.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Contact Info Card */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>

              <div className="space-y-4">
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors group"
                  >
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-200 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span>{profile.email}</span>
                  </a>
                )}

                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors group"
                  >
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-200 transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <span>{profile.phone}</span>
                  </a>
                )}

                {profile.website && (
                  <a
                    href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors group"
                  >
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-200 transition-colors">
                      <Globe className="h-5 w-5" />
                    </div>
                    <span className="truncate">{profile.website.replace(/^https?:\/\//, "")}</span>
                  </a>
                )}
              </div>

              {/* Social Media Links */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect With Me</h3>
                <div className="flex flex-wrap gap-3">
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0077B5] text-white p-2 rounded-lg flex items-center justify-center transition-all duration-300 hover:opacity-90"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}

                  {profile.github_url && (
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#333] text-white p-2 rounded-lg flex items-center justify-center transition-all duration-300 hover:opacity-90"
                      aria-label="GitHub Profile"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}

                  {profile.twitter_url && (
                    <a
                      href={profile.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1DA1F2] text-white p-2 rounded-lg flex items-center justify-center transition-all duration-300 hover:opacity-90"
                      aria-label="Twitter Profile"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}

                  {profile.instagram_url && (
                    <a
                      href={profile.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white p-2 rounded-lg flex items-center justify-center transition-all duration-300 hover:opacity-90"
                      aria-label="Instagram Profile"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </section>

            {/* Skills Section */}
            {props.skillsData.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                    <Award className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Skills</h2>
                </div>

                {(() => {
                  const categories = new Set(props.skillsData.map((skill) => skill.category || "Other"))

                  if (categories.size <= 1) {
                    // No categories or just one, display as a simple list
                    return (
                      <div className="space-y-4">
                        {props.skillsData.map((skill) => (
                          <div key={skill.id} className="group">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                                {skill.name}
                              </span>
                              <span className="text-sm text-gray-500 font-medium">{skill.level}/5</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out group-hover:from-indigo-600 group-hover:to-purple-600"
                                style={{ width: `${(skill.level / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  } else {
                    // Multiple categories, group them
                    return Array.from(categories).map((category) => {
                      const categorySkills = props.skillsData.filter(
                        (skill) => (skill.category || "Other") === category,
                      )
                      return (
                        <div key={String(category)} className="mb-6 last:mb-0">
                          <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                            <ChevronRight className="h-4 w-4 text-indigo-500 mr-1" />
                            {category}
                          </h3>
                          <div className="space-y-4">
                            {categorySkills.map((skill) => (
                              <div key={skill.id} className="group">
                                <div className="flex justify-between mb-1">
                                  <span className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                                    {skill.name}
                                  </span>
                                  <span className="text-sm text-gray-500 font-medium">{skill.level}/5</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                  <div
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out group-hover:from-indigo-600 group-hover:to-purple-600"
                                    style={{ width: `${(skill.level / 5) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })
                  }
                })()}
              </section>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{profile.full_name || "John Doe"}</h2>
              <p className="text-indigo-300 mt-1">Professional Portfolio</p>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6 md:mt-0">
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-indigo-300 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}

              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-indigo-300 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}

              {profile.twitter_url && (
                <a
                  href={profile.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-indigo-300 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}

              {profile.instagram_url && (
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-indigo-300 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-indigo-800/50 text-center">
            <p className="text-indigo-300 text-sm">
              &copy; {new Date().getFullYear()} {profile.full_name || "John Doe"}. All rights reserved.
            </p>
            <p className="text-indigo-400/70 text-sm mt-2">
              Created with <span className="text-pink-400 font-medium">LinkedFolio</span> - Showcase your professional
              journey
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Free1Template
