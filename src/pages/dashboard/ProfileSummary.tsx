import { Award, BookOpen, Briefcase, FileText, GraduationCap, Grid, User } from "lucide-react";

interface ProfileSummaryProps {
  personalInfo: {
    full_name: string;
    username: string;
    email: string;
    phone?: string;
    bio?: string;
    avatar_url?: string;
  };
  experienceCount: number;
  educationCount: number;
  projectCount: number;
  skillCount: number;
  achievementCount?: number;
  certificateCount?: number;
}

const ProfileSummary = ({
  personalInfo,
  experienceCount,
  educationCount,
  projectCount,
  skillCount,
  achievementCount = 0,
  certificateCount = 0,
}: ProfileSummaryProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-medium text-gray-700">Profile Summary</h2>
      </div>

      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
            {personalInfo.avatar_url ? (
              <img src={personalInfo.avatar_url} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <User className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{personalInfo.full_name || "Add your name"}</h3>
            <p className="text-sm text-gray-500">{personalInfo.username ? `@${personalInfo.username}` : "Add username"}</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </div>
            <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium">
              {experienceCount}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </div>
            <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium">
              {educationCount}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <Grid className="w-4 h-4 mr-2" />
              Projects
            </div>
            <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium">
              {projectCount}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <BookOpen className="w-4 h-4 mr-2" />
              Skills
            </div>
            <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium">
              {skillCount}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </div>
            <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium">
              {achievementCount}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <FileText className="w-4 h-4 mr-2" />
              Certificates
            </div>
            <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium">
              {certificateCount}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Profile completion helps improve visibility in search results. Make sure to complete all sections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
