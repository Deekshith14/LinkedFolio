import { useState, useEffect } from "react";
import { Github, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useFormPersistence } from "@/hooks/useFormPersistence";

interface PersonalInfoFormProps {
  initialData: {
    full_name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    bio: string;
    avatar_url: string;
    linkedin_url: string;
    github_url: string;
    twitter_url: string;
    instagram_url: string;
  };
  onDataChange: (data: any) => void;
  onSave: () => Promise<void>;
}

const PersonalInfoForm = ({ initialData, onDataChange, onSave }: PersonalInfoFormProps) => {
  const [formData, setFormData, clearPersistedData] = useFormPersistence("personalInfo", initialData);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (initialData.full_name || initialData.email) {
      if (JSON.stringify(initialData) !== JSON.stringify(formData)) {
        setFormData(initialData);
      }
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      await onSave();
      clearPersistedData();
      toast({ title: "Personal Info Saved" });
    } catch (error: any) {
      console.error("Error saving profile section:", error.message);
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="full_name" className="form-label">
            Full Name*
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            value={formData.full_name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div>
          <label htmlFor="username" className="form-label">
            Username*
          </label>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              portfolio/
            </span>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="form-input rounded-none rounded-r-md flex-1"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email*
          </label>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              <Mail className="h-4 w-4" />
            </span>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input rounded-none rounded-r-md flex-1"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              <Phone className="h-4 w-4" />
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="form-input rounded-none rounded-r-md flex-1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="website" className="form-label">
            Website
          </label>
          <input
            id="website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
            className="form-input"
            placeholder="https://"
          />
        </div>

        <div>
          <label htmlFor="linkedin_url" className="form-label">
            LinkedIn URL
          </label>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              <Linkedin className="h-4 w-4" />
            </span>
            <input
              id="linkedin_url"
              name="linkedin_url"
              type="url"
              value={formData.linkedin_url}
              onChange={handleChange}
              className="form-input rounded-none rounded-r-md flex-1"
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>
        </div>

        <div>
          <label htmlFor="github_url" className="form-label">
            GitHub URL
          </label>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              <Github className="h-4 w-4" />
            </span>
            <input
              id="github_url"
              name="github_url"
              type="url"
              value={formData.github_url}
              onChange={handleChange}
              className="form-input rounded-none rounded-r-md flex-1"
              placeholder="https://github.com/yourusername"
            />
          </div>
        </div>

        <div>
          <label htmlFor="instagram_url" className="form-label">
            Instagram URL
          </label>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              <Instagram className="h-4 w-4" />
            </span>
            <input
              id="instagram_url"
              name="instagram_url"
              type="url"
              value={formData.instagram_url}
              onChange={handleChange}
              className="form-input rounded-none rounded-r-md flex-1"
              placeholder="https://instagram.com/yourusername"
            />
          </div>
        </div>

        <div>
          <label htmlFor="twitter_url" className="form-label">
            Twitter URL
          </label>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              <Twitter className="h-4 w-4" />
            </span>
            <input
              id="twitter_url"
              name="twitter_url"
              type="url"
              value={formData.twitter_url}
              onChange={handleChange}
              className="form-input rounded-none rounded-r-md flex-1"
              placeholder="https://twitter.com/yourusername"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="form-label">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
          className="form-input"
          placeholder="Write a short introduction about yourself..."
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">
          Brief description for your profile. URLs are hyperlinked.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
