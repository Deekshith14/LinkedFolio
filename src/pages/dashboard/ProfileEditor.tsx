"use client"

import { useEffect, useState } from "react"
import { useNavigate, useBeforeUnload } from "react-router-dom"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { ExternalLink, Check, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import ProfileSidebar from "./ProfileSidebar"
import ProfileSummary from "./ProfileSummary"
import PersonalInfoForm from "@/components/profile/PersonalInfoForm"
import ExperienceForm from "@/components/profile/ExperienceForm"
import EducationForm from "@/components/profile/EducationForm"
import ProjectsForm from "@/components/profile/ProjectsForm"
import SkillsForm from "@/components/profile/SkillsForm"
import AchievementsForm from "@/components/profile/AchievementsForm"
import CertificatesForm from "@/components/profile/CertificatesForm"
import AutosaveNotification from "@/components/ui/AutosaveNotification"
import { usePageLeaveProtection } from "@/hooks/usePageLeaveProtection"
import type { Database } from "@/lib/database.types"

type ProfileData = Database["public"]["Tables"]["profiles"]["Row"]
type Experience = Database["public"]["Tables"]["experiences"]["Row"]
type Education = Database["public"]["Tables"]["education"]["Row"]
type Project = Database["public"]["Tables"]["projects"]["Row"]
type Skill = Database["public"]["Tables"]["skills"]["Row"]

interface Achievement {
  id?: string;
  title: string;
  date?: string;
  description?: string;
}

interface Certificate {
  id?: string;
  title: string;
  issuer: string;
  issueDate?: string;
  expiryDate?: string;
  credentialUrl?: string;
  description?: string;
}

const ProfileEditor: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  const [profileData, setProfileData] = useState({
    personal: {
      full_name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      bio: "",
      avatar_url: "",
      linkedin_url: "",
      github_url: "",
      twitter_url: "",
      instagram_url: "",
    },
    experiences: [] as Partial<Experience>[],
    education: [] as Partial<Education>[],
    projects: [] as Partial<Project>[],
    skills: [] as Partial<Skill>[],
    achievements: [] as Achievement[],
    certificates: [] as Certificate[],
  })

  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return

      try {
        setIsLoading(true)

        const { data: personalData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError && profileError.code !== "PGRST116") throw profileError

        const { data: experiencesData, error: experiencesError } = await supabase
          .from("experiences")
          .select("*")
          .eq("profile_id", user.id)
          .order("start_date", { ascending: false })

        if (experiencesError) throw experiencesError

        const { data: educationData, error: educationError } = await supabase
          .from("education")
          .select("*")
          .eq("profile_id", user.id)
          .order("start_date", { ascending: false })

        if (educationError) throw educationError

        const { data: projectsData, error: projectsError } = await supabase
          .from("projects")
          .select("*")
          .eq("profile_id", user.id)
          .order("created_at", { ascending: false })

        if (projectsError) throw projectsError

        const { data: skillsData, error: skillsError } = await supabase
          .from("skills")
          .select("*")
          .eq("profile_id", user.id)
          .order("name", { ascending: true })

        if (skillsError) throw skillsError

        setProfileData({
          personal: {
            full_name: personalData?.full_name || "",
            username: personalData?.username || "",
            email: personalData?.email || "",
            phone: personalData?.phone || "",
            website: personalData?.website || "",
            bio: personalData?.bio || "",
            avatar_url: personalData?.avatar_url || "",
            linkedin_url: personalData?.linkedin_url || "",
            github_url: personalData?.github_url || "",
            twitter_url: personalData?.twitter_url || "",
            instagram_url: personalData?.instagram_url || "",
          },
          experiences: experiencesData || [],
          education: educationData || [],
          projects: projectsData || [],
          skills: skillsData || [],
          achievements: personalData?.achievements || [],
          certificates: personalData?.certificates || [],
        })

        setDataLoaded(true)
        setHasUnsavedChanges(false)
      } catch (error: any) {
        console.error("Error fetching profile data:", error.message)
        toast({
          title: "Error loading profile",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [user])

  const handleTabChange = (tab: string) => {
    if (hasUnsavedChanges) {
      if (window.confirm("You have unsaved changes. Do you want to continue without saving?")) {
        setActiveTab(tab)
      }
    } else {
      setActiveTab(tab)
    }
  }

  const handlePersonalInfoChange = (data: any) => {
    setProfileData((prev) => ({
      ...prev,
      personal: data,
    }))
    setHasUnsavedChanges(true)
  }

  const handleExperiencesChange = (data: Partial<Experience>[]) => {
    setProfileData((prev) => ({
      ...prev,
      experiences: data,
    }))
    setHasUnsavedChanges(true)
  }

  const handleEducationChange = (data: Partial<Education>[]) => {
    setProfileData((prev) => ({
      ...prev,
      education: data,
    }))
    setHasUnsavedChanges(true)
  }

  const handleProjectsChange = (data: Partial<Project>[]) => {
    setProfileData((prev) => ({
      ...prev,
      projects: data,
    }))
    setHasUnsavedChanges(true)
  }

  const handleSkillsChange = (data: Partial<Skill>[]) => {
    setProfileData((prev) => ({
      ...prev,
      skills: data,
    }))
    setHasUnsavedChanges(true)
  }

  const handleAchievementsChange = (data: Achievement[]) => {
    setProfileData((prev) => ({
      ...prev,
      achievements: data,
    }));
    setHasUnsavedChanges(true);
  };

  const handleCertificatesChange = (data: Certificate[]) => {
    setProfileData((prev) => ({
      ...prev,
      certificates: data,
    }));
    setHasUnsavedChanges(true);
  };

  // Handler for autosave notification
  const handleRestorePersistedData = (section: string) => {
    const savedData = localStorage.getItem(`form_${section}`);
    if (!savedData) return;
    
    try {
      const parsedData = JSON.parse(savedData);
      
      switch (section) {
        case "achievements":
          setProfileData(prev => ({ ...prev, achievements: parsedData }));
          break;
        case "certificates":
          setProfileData(prev => ({ ...prev, certificates: parsedData }));
          break;
        // Add other sections as needed
      }
      
      setHasUnsavedChanges(true);
      toast({ 
        title: "Restored unsaved changes",
        description: `Your unsaved ${section} have been restored.`
      });
    } catch (error) {
      console.error("Error parsing saved data:", error);
    }
  };
  
  const handleDiscardPersistedData = (section: string) => {
    localStorage.removeItem(`form_${section}`);
    toast({ 
      title: "Discarded unsaved changes", 
      description: `Your unsaved ${section} have been discarded.`
    });
  };

  const handleSaveCurrentSection = async () => {
    if (!user) return

    setIsSaving(true)
    try {
      switch (activeTab) {
        case "personal": {
          console.log("Saving personal info for user:", user.id);
          
          const { error: profileError } = await supabase
            .from("profiles")
            .update({
              full_name: profileData.personal.full_name,
              username: profileData.personal.username,
              email: profileData.personal.email,
              website: profileData.personal.website,
              phone: profileData.personal.phone,
              bio: profileData.personal.bio,
              avatar_url: profileData.personal.avatar_url,
              linkedin_url: profileData.personal.linkedin_url,
              github_url: profileData.personal.github_url,
              twitter_url: profileData.personal.twitter_url,
              instagram_url: profileData.personal.instagram_url,
              updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);

          if (profileError) {
            console.error("Supabase update error:", profileError);
            throw profileError;
          }
          
          toast({ title: "Personal Info Saved" });
          break;
        }
        case "experience": {
          await supabase.from("experiences").delete().eq("profile_id", user.id)
          if (profileData.experiences.length > 0) {
            const { error: experiencesError } = await supabase.from("experiences").insert(
              profileData.experiences.map((exp) => ({
                profile_id: user.id,
                company: exp.company,
                title: exp.title,
                location: exp.location,
                start_date: exp.start_date,
                end_date: exp.end_date,
                current: exp.current || false,
                description: exp.description,
                created_at: new Date().toISOString(),
              })),
            )
            if (experiencesError) throw experiencesError
          }
          toast({ title: "Experience Saved" });
          break;
        }
        case "education": {
          await supabase.from("education").delete().eq("profile_id", user.id)
          if (profileData.education.length > 0) {
            const { error: educationError } = await supabase.from("education").insert(
              profileData.education.map((edu) => ({
                profile_id: user.id,
                institution: edu.institution,
                degree: edu.degree,
                field_of_study: edu.field_of_study,
                start_date: edu.start_date,
                end_date: edu.end_date,
                current: edu.current || false,
                description: edu.description,
                created_at: new Date().toISOString(),
              })),
            )
            if (educationError) throw educationError
          }
          toast({ title: "Education Saved" });
          break;
        }
        case "projects": {
          await supabase.from("projects").delete().eq("profile_id", user.id)
          if (profileData.projects.length > 0) {
            const { error: projectsError } = await supabase.from("projects").insert(
              profileData.projects.map((proj) => ({
                profile_id: user.id,
                title: proj.title,
                description: proj.description,
                url: proj.url,
                image_url: proj.image_url,
                technologies: proj.technologies,
                current: proj.current || true,
                created_at: new Date().toISOString(),
              })),
            )
            if (projectsError) throw projectsError
          }
          toast({ title: "Projects Saved" });
          break;
        }
        case "skills": {
          await supabase.from("skills").delete().eq("profile_id", user.id)
          if (profileData.skills.length > 0) {
            const { error: skillsError } = await supabase.from("skills").insert(
              profileData.skills.map((skill) => ({
                profile_id: user.id,
                name: skill.name,
                category: skill.category,
                level: skill.level || null,
                created_at: new Date().toISOString(),
              })),
            )
            if (skillsError) throw skillsError
          }
          toast({ title: "Skills Saved" });
          break;
        }
        case "achievements": {
          const { error: achievementsError } = await supabase
            .from("profiles")
            .update({
              achievements: profileData.achievements,
              updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);
          
          if (achievementsError) throw achievementsError;
          toast({ title: "Achievements Saved" });
          break;
        }
        case "certificates": {
          const { error: certificatesError } = await supabase
            .from("profiles")
            .update({
              certificates: profileData.certificates,
              updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);
          
          if (certificatesError) throw certificatesError;
          toast({ title: "Certificates Saved" });
          break;
        }
        default:
          break
      }

      setHasUnsavedChanges(false)
      setLastSaved(new Date().toLocaleTimeString())
    } catch (error: any) {
      console.error("Error saving profile section:", error.message)
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const clearAllPersistedData = () => {
    // Clear all form data from localStorage
    localStorage.removeItem('form_personalInfo');
    localStorage.removeItem('form_experiences');
    localStorage.removeItem('form_education');
    localStorage.removeItem('form_projects');
    localStorage.removeItem('form_skills');
    localStorage.removeItem('form_achievements');
    localStorage.removeItem('form_certificates');
  };

  const handleSaveAllProfile = async () => {
    if (!user) return

    setIsSaving(true)
    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: profileData.personal.full_name,
          username: profileData.personal.username,
          email: profileData.personal.email,
          website: profileData.personal.website,
          phone: profileData.personal.phone,
          bio: profileData.personal.bio,
          avatar_url: profileData.personal.avatar_url,
          linkedin_url: profileData.personal.linkedin_url,
          github_url: profileData.personal.github_url,
          twitter_url: profileData.personal.twitter_url,
          instagram_url: profileData.personal.instagram_url,
          achievements: profileData.achievements,
          certificates: profileData.certificates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) {
        console.error("Supabase profile update error:", profileError);
        throw profileError;
      }

      await supabase.from("experiences").delete().eq("profile_id", user.id)
      if (profileData.experiences.length > 0) {
        const { error: experiencesError } = await supabase.from("experiences").insert(
          profileData.experiences.map((exp) => ({
            profile_id: user.id,
            company: exp.company,
            title: exp.title,
            location: exp.location,
            start_date: exp.start_date,
            end_date: exp.end_date,
            current: exp.current || false,
            description: exp.description,
            created_at: new Date().toISOString(),
          })),
        )
        if (experiencesError) throw experiencesError
      }

      await supabase.from("education").delete().eq("profile_id", user.id)
      if (profileData.education.length > 0) {
        const { error: educationError } = await supabase.from("education").insert(
          profileData.education.map((edu) => ({
            profile_id: user.id,
            institution: edu.institution,
            degree: edu.degree,
            field_of_study: edu.field_of_study,
            start_date: edu.start_date,
            end_date: edu.end_date,
            current: edu.current || false,
            description: edu.description,
            created_at: new Date().toISOString(),
          })),
        )
        if (educationError) throw educationError
      }

      await supabase.from("projects").delete().eq("profile_id", user.id)
      if (profileData.projects.length > 0) {
        const { error: projectsError } = await supabase.from("projects").insert(
          profileData.projects.map((proj) => ({
            profile_id: user.id,
            title: proj.title,
            description: proj.description,
            url: proj.url,
            image_url: proj.image_url,
            technologies: proj.technologies,
            current: proj.current || true,
            created_at: new Date().toISOString(),
          })),
        )
        if (projectsError) throw projectsError
      }

      await supabase.from("skills").delete().eq("profile_id", user.id)
      if (profileData.skills.length > 0) {
        const { error: skillsError } = await supabase.from("skills").insert(
          profileData.skills.map((skill) => ({
            profile_id: user.id,
            name: skill.name,
            category: skill.category,
            level: skill.level || null,
            created_at: new Date().toISOString(),
          })),
        )
        if (skillsError) throw skillsError
      }

      toast({
        title: "Profile Saved",
        description: "All your profile information has been saved successfully.",
        variant: "default",
      })

      // Clear all persisted form data after successful save
      clearAllPersistedData();
      
      setHasUnsavedChanges(false)
      setLastSaved(new Date().toLocaleTimeString())
    } catch (error: any) {
      console.error("Error saving profile:", error.message)
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = () => {
    if (hasUnsavedChanges) {
      if (window.confirm("You have unsaved changes. Do you want to save before previewing?")) {
        handleSaveAllProfile().then(() => {
          navigate("/preview")
        })
      } else {
        navigate("/preview")
      }
    } else {
      navigate("/preview")
    }
  }

  // Use the page leave protection hook
  usePageLeaveProtection(hasUnsavedChanges);

  // Use before unload to protect against browser/tab closing
  useBeforeUnload((event) => {
    if (hasUnsavedChanges) {
      event.preventDefault();
      event.returnValue = "You have unsaved changes. Are you sure you want to leave this page?";
    }
  });

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Edit Profile">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout pageTitle="Edit Profile">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <ProfileSidebar activeTab={activeTab} onTabChange={handleTabChange} hasUnsavedChanges={hasUnsavedChanges} />

          <ProfileSummary
            personalInfo={profileData.personal}
            experienceCount={profileData.experiences.length}
            educationCount={profileData.education.length}
            projectCount={profileData.projects.length}
            skillCount={profileData.skills.length}
            achievementCount={profileData.achievements?.length || 0}
            certificateCount={profileData.certificates?.length || 0}
          />
        </div>

        <div className="lg:w-3/4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex justify-between items-center">
            <div className="flex items-center">
              {hasUnsavedChanges ? (
                <span className="text-amber-500 text-sm flex items-center">
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                  Unsaved changes
                </span>
              ) : (
                <span className="text-green-500 text-sm flex items-center">
                  <Check className="h-4 w-4 mr-1" />
                  {lastSaved ? `Last saved at ${lastSaved}` : "All changes saved"}
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveCurrentSection}
                disabled={isSaving || !hasUnsavedChanges}
                className={`btn-outline text-sm flex items-center ${isSaving || !hasUnsavedChanges ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Save className="h-4 w-4 mr-1" />
                Save Section
              </button>

              <button
                onClick={handleSaveAllProfile}
                disabled={isSaving || !hasUnsavedChanges}
                className={`btn-primary text-sm flex items-center ${isSaving || !hasUnsavedChanges ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1" />
                    Save All
                  </>
                )}
              </button>

              <button onClick={handlePreview} className="btn-secondary text-sm flex items-center">
                <ExternalLink className="h-4 w-4 mr-1" />
                Preview
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            {activeTab === "personal" && (
              <PersonalInfoForm 
                initialData={profileData.personal}
                onDataChange={handlePersonalInfoChange}
                onSave={handleSaveCurrentSection}
              />
            )}

            {activeTab === "experience" && (
              <ExperienceForm 
                experiences={profileData.experiences}
                onDataChange={handleExperiencesChange}
                onSave={handleSaveCurrentSection}
              />
            )}

            {activeTab === "education" && (
              <EducationForm 
                education={profileData.education}
                onDataChange={handleEducationChange}
                onSave={handleSaveCurrentSection}
              />
            )}

            {activeTab === "projects" && (
              <ProjectsForm 
                projects={profileData.projects}
                onDataChange={handleProjectsChange}
                onSave={handleSaveCurrentSection}
              />
            )}

            {activeTab === "skills" && (
              <SkillsForm 
                skills={profileData.skills}
                onDataChange={handleSkillsChange}
                onSave={handleSaveCurrentSection}
              />
            )}

            {activeTab === "achievements" && (
              <AchievementsForm 
                achievements={profileData.achievements || []}
                onDataChange={handleAchievementsChange}
              />
            )}

            {activeTab === "certificates" && (
              <CertificatesForm 
                certificates={profileData.certificates || []}
                onDataChange={handleCertificatesChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* Add autosave notifications for different sections */}
      {activeTab === "achievements" && (
        <AutosaveNotification 
          formKey="achievements"
          onRestore={() => handleRestorePersistedData("achievements")}
          onDiscard={() => handleDiscardPersistedData("achievements")}
        />
      )}
      
      {activeTab === "certificates" && (
        <AutosaveNotification 
          formKey="certificates"
          onRestore={() => handleRestorePersistedData("certificates")}
          onDiscard={() => handleDiscardPersistedData("certificates")}
        />
      )}
    </DashboardLayout>
  )
}

export default ProfileEditor
