
"use client"

import type React from "react"
import { 
  Award, 
  BookOpen, 
  Briefcase, 
  FileText, 
  GraduationCap, 
  Grid, 
  User
} from "lucide-react"

interface ProfileSidebarProps {
    activeTab: string
    onTabChange: (tab: string) => void
    hasUnsavedChanges: boolean
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, onTabChange, hasUnsavedChanges }) => {
    const tabs = [
        { id: "personal", label: "Personal Info", icon: User },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "education", label: "Education", icon: GraduationCap },
        { id: "projects", label: "Projects", icon: Grid },
        { id: "skills", label: "Skills", icon: BookOpen },
        { id: "achievements", label: "Achievements", icon: Award },
        { id: "certificates", label: "Certificates", icon: FileText },
    ]

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Profile Sections</h2>
            </div>
            <nav className="flex flex-col">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                        <button
                            key={tab.id}
                            className={`flex items-center px-4 py-3 text-sm font-medium border-l-2 ${activeTab === tab.id
                                ? "bg-primary/5 border-l-primary text-primary"
                                : "text-gray-600 hover:bg-gray-50 border-l-transparent"
                                }`}
                            onClick={() => onTabChange(tab.id)}
                        >
                            <Icon className="h-4 w-4 mr-3" />
                            {tab.label}
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}

export default ProfileSidebar
