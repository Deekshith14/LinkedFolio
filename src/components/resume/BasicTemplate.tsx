
import React from 'react';
import { PortfolioProps } from '@/types/portfolio';
import { formatDate } from '@/lib/utils';

interface BasicTemplateProps {
  data: PortfolioProps;
}

const BasicTemplate = React.forwardRef<HTMLDivElement, BasicTemplateProps>(
  ({ data }, ref) => {
    const { profileData, experienceData, educationData, skillsData, projectsData } = data;

    return (
      <div 
        ref={ref} 
        className="w-full max-w-4xl mx-auto bg-white p-8" 
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-center uppercase tracking-wider">
            {profileData?.full_name || 'Your Name'}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-3 mt-3 text-sm">
            {profileData?.email && (
              <a href={`mailto:${profileData.email}`} className="text-blue-600 hover:underline">
                {profileData.email}
              </a>
            )}
            {profileData?.phone && (
              <span className="after:content-['•'] after:mx-2 after:text-gray-400">
                {profileData.phone}
              </span>
            )}
            {profileData?.linkedin_url && (
              <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            )}
            {profileData?.github_url && (
              <a href={profileData.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">
                GitHub
              </a>
            )}
            {profileData?.website && (
              <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">
                Portfolio
              </a>
            )}
          </div>
        </div>

        {/* Bio/Summary */}
        {profileData?.bio && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">{profileData.bio}</p>
          </div>
        )}

        {/* Experience */}
        {experienceData && experienceData.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experienceData.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-semibold">{exp.title}</h3>
                      <h4 className="text-sm italic">{exp.company}</h4>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(exp.start_date)} - {exp.current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : ''}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-sm">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {educationData && educationData.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-4">
              {educationData.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-semibold">{edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ''}</h3>
                      <h4 className="text-sm italic">{edu.institution}</h4>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(edu.start_date)} - {edu.current ? 'Present' : edu.end_date ? formatDate(edu.end_date) : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skillsData && skillsData.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsData.map((skill) => (
                <span key={skill.id} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projectsData && projectsData.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
              Selected Projects
            </h2>
            <div className="space-y-4">
              {projectsData.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-semibold">
                        {project.url ? (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {project.title}
                          </a>
                        ) : project.title}
                      </h3>
                    </div>
                  </div>
                  {project.description && (
                    <p className="mt-1 text-sm">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
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
    );
  }
);

BasicTemplate.displayName = 'BasicTemplate';

export default BasicTemplate;
