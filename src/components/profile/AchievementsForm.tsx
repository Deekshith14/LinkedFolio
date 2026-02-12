
import { useState, useEffect } from "react";
import { Award, Plus, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useFormPersistence } from "@/hooks/useFormPersistence";

interface Achievement {
  id?: string;
  title: string;
  date?: string;
  description?: string;
}

interface AchievementsFormProps {
  achievements: Achievement[];
  onDataChange: (achievements: Achievement[]) => void;
}

const AchievementsForm = ({ achievements = [], onDataChange }: AchievementsFormProps) => {
  const [formData, setFormData, clearPersistedData] = useFormPersistence<Achievement[]>(
    "achievements", 
    achievements
  );
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Only update if initial achievements are not empty and different from formData
    if (achievements.length > 0 && JSON.stringify(achievements) !== JSON.stringify(formData)) {
      setFormData(achievements);
    }
  }, [achievements]);

  const handleAchievementChange = (index: number, field: string, value: any) => {
    const updatedAchievements = [...formData];
    updatedAchievements[index] = { ...updatedAchievements[index], [field]: value };
    setFormData(updatedAchievements);
    onDataChange(updatedAchievements);
  };

  const addAchievement = () => {
    const newAchievements = [
      ...formData,
      {
        title: "",
        date: "",
        description: "",
      },
    ];
    setFormData(newAchievements);
    onDataChange(newAchievements);
  };

  const removeAchievement = (index: number) => {
    const updatedAchievements = formData.filter((_, i) => i !== index);
    setFormData(updatedAchievements);
    onDataChange(updatedAchievements);
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Save achievements to profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("achievements")
        .eq("id", user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") throw profileError;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          achievements: formData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) throw updateError;
      
      // After successful save, clear the persisted form data
      clearPersistedData();
      toast({ title: "Achievements Saved" });
    } catch (error: any) {
      console.error("Error saving achievements:", error.message);
      toast({
        title: "Error saving achievements",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Achievements</h2>
        <button
          onClick={addAchievement}
          className="flex items-center text-sm bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Achievement
        </button>
      </div>

      {formData.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No achievements added yet</h3>
          <p className="text-gray-500 mb-4">Add your achievements to showcase your accomplishments.</p>
          <button onClick={addAchievement} className="btn-primary text-sm">
            Add Achievement
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.map((achievement, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 relative hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => removeAchievement(index)}
                className="absolute top-3 right-3 p-1.5 hover:bg-red-50 text-red-500 rounded-full"
                aria-label="Remove achievement"
              >
                <Trash className="h-4 w-4" />
              </button>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="form-label">Achievement Title*</label>
                  <input
                    type="text"
                    value={achievement.title || ""}
                    onChange={(e) => handleAchievementChange(index, "title", e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    value={achievement.date || ""}
                    onChange={(e) => handleAchievementChange(index, "date", e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={4}
                    value={achievement.description || ""}
                    onChange={(e) => handleAchievementChange(index, "description", e.target.value)}
                    className="form-input"
                    placeholder="Describe your achievement..."
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementsForm;
