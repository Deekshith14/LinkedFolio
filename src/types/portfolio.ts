export interface PortfolioProps {
  userId: string;
  username?: string;
  profileData?: {
    id?: string;
    full_name?: string | null;
    email?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
    website?: string | null;
    template_id?: string | null;
    is_premium?: boolean | null;
    phone?: string | null;
    github_url?: string | null;
    linkedin_url?: string | null;
    twitter_url?: string | null;
    instagram_url?: string | null;
    visit_count?: number;
  };
  experienceData?: {
    id: string;
    title: string;
    company: string;
    location?: string | null;
    start_date: string;
    end_date?: string | null;
    current: boolean;
    description?: string | null;
  }[];
  educationData?: {
    id: string;
    institution: string;
    degree: string;
    field_of_study?: string | null;
    start_date: string;
    end_date?: string | null;
    current: boolean;
    description?: string | null;
  }[];
  projectsData?: {
    id: string;
    title: string;
    description?: string | null;
    url?: string | null;
    image_url?: string | null;
    technologies?: string[] | null;
    current?: boolean | null;
    category?: string | null;
  }[];
  skillsData?: {
    id: string;
    name: string;
    level?: number | null;
    category?: string | null;
  }[];
}
