
import { useState, useEffect } from "react";
import { BookOpen, Plus, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Database } from "@/lib/database.types";

type Skill = Partial<Database["public"]["Tables"]["skills"]["Row"]>;

interface SkillsFormProps {
  skills: Skill[];
  onDataChange: (skills: Skill[]) => void;
  onSave: () => Promise<void>;
}

const SkillsForm = ({ skills, onDataChange, onSave }: SkillsFormProps) => {
  const [formData, setFormData] = useState<Skill[]>(skills);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(skills);
  }, [skills]);

  const handleSkillChange = (index: number, field: string, value: any) => {
    const updatedSkills = [...formData];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setFormData(updatedSkills);
    onDataChange(updatedSkills);
  };

  const addSkill = () => {
    const newSkills = [
      ...formData,
      {
        name: "",
        category: null,
        level: null,
      },
    ];
    setFormData(newSkills);
    onDataChange(newSkills);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = formData.filter((_, i) => i !== index);
    setFormData(updatedSkills);
    onDataChange(updatedSkills);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      toast({ title: "Skills Saved" });
    } catch (error: any) {
      console.error("Error saving skills:", error.message);
      toast({
        title: "Error saving skills",
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
        <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
        <button
          onClick={addSkill}
          className="flex items-center text-sm bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Skill
        </button>
      </div>

      {formData.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No skills added yet</h3>
          <p className="text-gray-500 mb-4">Add your skills to showcase your expertise.</p>
          <button onClick={addSkill} className="btn-primary text-sm">
            Add Skill
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {formData.map((skill, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 relative hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => removeSkill(index)}
                className="absolute top-2 right-2 p-1.5 hover:bg-red-50 text-red-500 rounded-full"
                aria-label="Remove skill"
              >
                <Trash className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <div>
                  <label className="form-label">Skill Name*</label>
                  <input
                    type="text"
                    value={skill.name || ""}
                    onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Category</label>
                  <select
                    value={skill.category || ""}
                    onChange={(e) => handleSkillChange(index, "category", e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select a category</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Languages">Languages</option>
                    <option value="Tools">Tools</option>
                    <option value="Soft Skills">Soft Skills</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Proficiency Level</label>
                  <select
                    value={skill.level || ""}
                    onChange={(e) =>
                      handleSkillChange(
                        index,
                        "level",
                        e.target.value ? Number.parseInt(e.target.value) : null,
                      )
                    }
                    className="form-input"
                  >
                    <option value="">Select level</option>
                    <option value="1">Beginner</option>
                    <option value="2">Intermediate</option>
                    <option value="3">Advanced</option>
                    <option value="4">Expert</option>
                    <option value="5">Master</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
