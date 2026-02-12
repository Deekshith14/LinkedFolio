
import React from 'react';
import { PortfolioProps } from '@/types/portfolio';
import { formatDate } from '@/lib/utils';

interface ModernTemplateProps {
  data: PortfolioProps;
}

const ModernTemplate = React.forwardRef<HTMLDivElement, ModernTemplateProps>(
  ({ data }, ref) => {
    const { profileData, experienceData, educationData, skillsData, projectsData } = data;

    return (
      <div 
        ref={ref} 
        className="w-full max-w-4xl mx-auto bg-white" 
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        {/* Header */}
        <div className="bg-blue-800 text-white p-8">
          <h1 className="text-3xl font-bold">
            {profileData?.full_name || 'Your Name'}
          </h1>
          
          <div className="mt-2 text-blue-100">
            {profileData?.bio && (
              <p className="text-sm mb-4">{profileData.bio}</p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm">
              {profileData?.email && (
                <a href={`mailto:${profileData.email}`} className="flex items-center hover:text-white">
                  <span>{profileData.email}</span>
                </a>
              )}
              {profileData?.phone && (
                <span className="flex items-center">
                  <span>{profileData.phone}</span>
                </span>
              )}
              {profileData?.linkedin_url && (
                <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white">
                  <span>LinkedIn</span>
                </a>
              )}
              {profileData?.github_url && (
                <a href={profileData.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white">
                  <span>GitHub</span>
                </a>
              )}
              {profileData?.website && (
                <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white">
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Experience */}
          {experienceData && experienceData.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
                Experience
              </h2>
              <div className="space-y-6">
                {experienceData.map((exp) => (
                  <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-blue-800 before:rounded-full">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                      <h3 className="text-lg font-semibold">{exp.title}</h3>
                      <div className="text-sm text-gray-600 md:text-right">
                        {formatDate(exp.start_date)} - {exp.current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : ''}
                      </div>
                    </div>
                    <h4 className="text-base text-blue-700 font-medium mt-1">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</h4>
                    {exp.description && (
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            {educationData && educationData.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
                  Education
                </h2>
                <div className="space-y-4">
                  {educationData.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-lg font-semibold">{edu.institution}</h3>
                      <p className="text-base text-blue-700">{edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ''}</p>
                      <div className="text-sm text-gray-600">
                        {formatDate(edu.start_date)} - {edu.current ? 'Present' : edu.end_date ? formatDate(edu.end_date) : ''}
                      </div>
                      {edu.description && (
                        <p className="mt-1 text-sm text-gray-600">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skillsData && skillsData.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skillsData.map((skill) => (
                    <span key={skill.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Projects */}
          {projectsData && projectsData.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectsData.map((project) => (
                  <div key={project.id} className="border border-blue-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-blue-700">
                      {project.url ? (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {project.title}
                        </a>
                      ) : project.title}
                    </h3>
                    {project.description && (
                      <p className="mt-2 text-sm text-gray-600">{project.description}</p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ModernTemplate.displayName = 'ModernTemplate';

export default ModernTemplate;
