import { useState, useEffect } from "react";
import { Briefcase, Plus, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Database } from "@/lib/database.types";

type Experience = Partial<Database["public"]["Tables"]["experiences"]["Row"]>;

interface ExperienceFormProps {
  experiences: Experience[];
  onDataChange: (experiences: Experience[]) => void;
  onSave: () => Promise<void>;
}

const ExperienceForm = ({ experiences, onDataChange, onSave }: ExperienceFormProps) => {
  const [formData, setFormData] = useState<Experience[]>(experiences);
  const [isSaving, setIsSaving] = useState(false);
  const [descriptionLists, setDescriptionLists] = useState<string[][]>(
    experiences
      .map((exp) => (Array.isArray(exp.description) ? exp.description : [String(exp.description ?? "")]))
      .map((list) => list.filter((item) => item !== null && item !== undefined))
  );

  useEffect(() => {
    setFormData(experiences);
    setDescriptionLists(
      experiences
        .map((exp) => (Array.isArray(exp.description) ? exp.description : [String(exp.description ?? "")]))
        .map((list) => list.filter((item) => item !== null && item !== undefined))
    );
  }, [experiences]);

  const handleExperienceChange = (index: number, field: string, value: any) => {
    const updatedExperiences = [...formData];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    setFormData(updatedExperiences);
    onDataChange(updatedExperiences);
  };

  const handleDescriptionChange = (index: number, points: string[]) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], description: points };
    setFormData(updatedFormData);
    onDataChange(updatedFormData);
    setDescriptionLists((prev) => {
      const next = [...prev];
      next[index] = points;
      return next;
    });
  };

  const addDescriptionPoint = (index: number) => {
    setDescriptionLists((prev) => {
      const next = [...prev];
      next[index] = [...(next[index] || []), ""];
      return next;
    });
    handleDescriptionChange(index, [...(descriptionLists[index] || []), ""]);
  };

  const updateDescriptionPoint = (index: number, pointIndex: number, value: string) => {
    setDescriptionLists((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index][pointIndex] = value;
      }
      return next;
    });
    handleDescriptionChange(index, descriptionLists[index]?.map((p, i) => (i === pointIndex ? value : p)) || []);
  };

  const removeDescriptionPoint = (index: number, pointIndex: number) => {
    setDescriptionLists((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index] = next[index].filter((_, i) => i !== pointIndex);
      }
      return next;
    });
    handleDescriptionChange(index, descriptionLists[index]?.filter((_, i) => i !== pointIndex) || []);
  };

  const addExperience = () => {
    const newExperiences = [
      ...formData,
      {
        company: "",
        title: "",
        location: "",
        start_date: "",
        current: false,
        description: [],
      },
    ];
    setFormData(newExperiences);
    onDataChange(newExperiences);
    setDescriptionLists([...descriptionLists, []]);
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = formData.filter((_, i) => i !== index);
    setFormData(updatedExperiences);
    onDataChange(updatedExperiences);
    setDescriptionLists(descriptionLists.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Ensure description is an array before saving
      const preparedData = formData.map(item => ({
        ...item,
        description: Array.isArray(item.description) ? item.description : [String(item.description || '')].filter(Boolean),
      }));
      await onSave();
      toast({ title: "Experience Saved" });
    } catch (error: any) {
      console.error("Error saving experience:", error.message);
      toast({
        title: "Error saving experience",
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
        <h2 className="text-xl font-semibold text-gray-800">Professional Experience</h2>
        <button
          onClick={addExperience}
          className="flex items-center text-sm bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Experience
        </button>
      </div>

      {formData.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No experience added yet</h3>
          <p className="text-gray-500 mb-4">Add your professional experience to showcase your career path.</p>
          <button onClick={addExperience} className="btn-primary text-sm">
            Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.map((experience, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 relative hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => removeExperience(index)}
                className="absolute top-3 right-3 p-1.5 hover:bg-red-50 text-red-500 rounded-full"
                aria-label="Remove experience"
              >
                <Trash className="h-4 w-4" />
              </button>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="form-label">Job Title*</label>
                  <input
                    type="text"
                    value={experience.title || ""}
                    onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Company*</label>
                  <input
                    type="text"
                    value={experience.company || ""}
                    onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    value={experience.location || ""}
                    onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="form-label">Start Date*</label>
                    <input
                      type="date"
                      value={experience.start_date || ""}
                      onChange={(e) => handleExperienceChange(index, "start_date", e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      value={experience.end_date || ""}
                      onChange={(e) => handleExperienceChange(index, "end_date", e.target.value)}
                      className="form-input"
                      disabled={experience.current}
                    />
                    <div className="mt-2 flex items-center">
                      <input
                        type="checkbox"
                        id={`current-job-${index}`}
                        checked={experience.current || false}
                        onChange={(e) => handleExperienceChange(index, "current", e.target.checked)}
                        className="h-4 w-4 text-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`current-job-${index}`} className="ml-2 text-sm text-gray-600">
                        I currently work here
                      </label>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="form-label">Description</label>
                  {descriptionLists[index]?.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => updateDescriptionPoint(index, pointIndex, e.target.value)}
                        className="form-input mr-2"
                        placeholder={`Point ${pointIndex + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeDescriptionPoint(index, pointIndex)}
                        className="p-2 rounded-md hover:bg-red-100 text-red-500"
                        aria-label={`Remove description point ${pointIndex + 1}`}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addDescriptionPoint(index)}
                    className="text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Add Description Point
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`btn-primary mt-6 ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {isSaving ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </>
        ) : (
          "Save Experience"
        )}
      </button>
    </div>
  );
};

export default ExperienceForm;
