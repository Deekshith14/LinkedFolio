
import { useState, useEffect } from "react";
import { GraduationCap, Plus, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Database } from "@/lib/database.types";

type Education = Partial<Database["public"]["Tables"]["education"]["Row"]>;

interface EducationFormProps {
  education: Education[];
  onDataChange: (education: Education[]) => void;
  onSave: () => Promise<void>;
}

const EducationForm = ({ education, onDataChange, onSave }: EducationFormProps) => {
  const [formData, setFormData] = useState<Education[]>(education);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(education);
  }, [education]);

  const handleEducationChange = (index: number, field: string, value: any) => {
    const updatedEducation = [...formData];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setFormData(updatedEducation);
    onDataChange(updatedEducation);
  };

  const addEducation = () => {
    const newEducation = [
      ...formData,
      {
        institution: "",
        degree: "",
        field_of_study: "",
        start_date: "",
        current: false,
        description: "",
      },
    ];
    setFormData(newEducation);
    onDataChange(newEducation);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = formData.filter((_, i) => i !== index);
    setFormData(updatedEducation);
    onDataChange(updatedEducation);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      toast({ title: "Education Saved" });
    } catch (error: any) {
      console.error("Error saving education:", error.message);
      toast({
        title: "Error saving education",
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
        <h2 className="text-xl font-semibold text-gray-800">Education</h2>
        <button
          onClick={addEducation}
          className="flex items-center text-sm bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Education
        </button>
      </div>

      {formData.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No education added yet</h3>
          <p className="text-gray-500 mb-4">Add your educational background to showcase your qualifications.</p>
          <button onClick={addEducation} className="btn-primary text-sm">
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.map((edu, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 relative hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => removeEducation(index)}
                className="absolute top-3 right-3 p-1.5 hover:bg-red-50 text-red-500 rounded-full"
                aria-label="Remove education"
              >
                <Trash className="h-4 w-4" />
              </button>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="form-label">School/Institution*</label>
                  <input
                    type="text"
                    value={edu.institution || ""}
                    onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Degree*</label>
                  <input
                    type="text"
                    value={edu.degree || ""}
                    onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Field of Study</label>
                  <input
                    type="text"
                    value={edu.field_of_study || ""}
                    onChange={(e) => handleEducationChange(index, "field_of_study", e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="form-label">Start Date*</label>
                    <input
                      type="date"
                      value={edu.start_date || ""}
                      onChange={(e) => handleEducationChange(index, "start_date", e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      value={edu.end_date || ""}
                      onChange={(e) => handleEducationChange(index, "end_date", e.target.value)}
                      className="form-input"
                      disabled={edu.current}
                    />
                    <div className="mt-2 flex items-center">
                      <input
                        type="checkbox"
                        id={`current-edu-${index}`}
                        checked={edu.current || false}
                        onChange={(e) => handleEducationChange(index, "current", e.target.checked)}
                        className="h-4 w-4 text-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`current-edu-${index}`} className="ml-2 text-sm text-gray-600">
                        I am currently studying here
                      </label>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={4}
                    value={edu.description || ""}
                    onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                    className="form-input"
                    placeholder="Describe your studies, achievements, activities..."
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

export default EducationForm;
