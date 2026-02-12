
import React from 'react';
import { PortfolioProps } from '@/types/portfolio';
import { formatDate } from '@/lib/utils';

interface MinimalistTemplateProps {
  data: PortfolioProps;
}

const MinimalistTemplate = React.forwardRef<HTMLDivElement, MinimalistTemplateProps>(
  ({ data }, ref) => {
    const { profileData, experienceData, educationData, skillsData, projectsData } = data;

    return (
      <div 
        ref={ref} 
        className="w-full max-w-4xl mx-auto bg-white p-8" 
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-normal mb-2">
            {profileData?.full_name || 'Your Name'}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
            {profileData?.email && (
              <a href={`mailto:${profileData.email}`} className="hover:text-black">
                {profileData.email}
              </a>
            )}
            {profileData?.phone && (
              <span>{profileData.phone}</span>
            )}
            {profileData?.linkedin_url && (
              <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-black">
                LinkedIn
              </a>
            )}
            {profileData?.github_url && (
              <a href={profileData.github_url} target="_blank" rel="noopener noreferrer" className="hover:text-black">
                GitHub
              </a>
            )}
            {profileData?.website && (
              <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="hover:text-black">
                Portfolio
              </a>
            )}
          </div>
        </div>

        <hr className="border-t border-gray-300 my-6" />

        {/* Bio/Summary */}
        {profileData?.bio && (
          <div className="mb-8">
            <h2 className="text-xl font-normal mb-3 text-center">Summary</h2>
            <p className="text-sm leading-relaxed">{profileData.bio}</p>
            <hr className="border-t border-gray-300 mt-6" />
          </div>
        )}

        {/* Experience */}
        {experienceData && experienceData.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-normal mb-3 text-center">Experience</h2>
            <div className="space-y-6">
              {experienceData.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <h3 className="text-base font-semibold">{exp.title}</h3>
                    <div className="text-sm text-gray-600">
                      {formatDate(exp.start_date)} - {exp.current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : ''}
                    </div>
                  </div>
                  <h4 className="text-sm italic mt-1">{exp.company}{exp.location ? `, ${exp.location}` : ''}</h4>
                  {exp.description && (
                    <p className="mt-2 text-sm">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
            <hr className="border-t border-gray-300 mt-6" />
          </div>
        )}

        {/* Education */}
        {educationData && educationData.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-normal mb-3 text-center">Education</h2>
            <div className="space-y-4">
              {educationData.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <h3 className="text-base font-semibold">{edu.institution}</h3>
                    <div className="text-sm text-gray-600">
                      {formatDate(edu.start_date)} - {edu.current ? 'Present' : edu.end_date ? formatDate(edu.end_date) : ''}
                    </div>
                  </div>
                  <p className="text-sm mt-1">
                    {edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ''}
                  </p>
                  {edu.description && (
                    <p className="mt-1 text-sm text-gray-600">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
            <hr className="border-t border-gray-300 mt-6" />
          </div>
        )}

        {/* Skills */}
        {skillsData && skillsData.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-normal mb-3 text-center">Skills</h2>
            <p className="text-center">
              {skillsData.map((skill, index) => (
                <React.Fragment key={skill.id}>
                  <span>{skill.name}</span>
                  {index < skillsData.length - 1 && <span className="mx-1">•</span>}
                </React.Fragment>
              ))}
            </p>
            <hr className="border-t border-gray-300 mt-6" />
          </div>
        )}

        {/* Projects */}
        {projectsData && projectsData.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-normal mb-3 text-center">Projects</h2>
            <div className="space-y-4">
              {projectsData.map((project) => (
                <div key={project.id}>
                  <h3 className="text-base font-semibold">
                    {project.url ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {project.title}
                      </a>
                    ) : project.title}
                  </h3>
                  {project.description && (
                    <p className="mt-1 text-sm">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="mt-1 text-sm text-gray-600 italic">
                      Technologies: {project.technologies.join(', ')}
                    </p>
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

MinimalistTemplate.displayName = 'MinimalistTemplate';

export default MinimalistTemplate;
