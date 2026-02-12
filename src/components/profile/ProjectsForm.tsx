
import { useState, useEffect } from "react";
import { Grid, Plus, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Database } from "@/lib/database.types";

type Project = Partial<Database["public"]["Tables"]["projects"]["Row"]>;

interface ProjectsFormProps {
  projects: Project[];
  onDataChange: (projects: Project[]) => void;
  onSave: () => Promise<void>;
}

const ProjectsForm = ({ projects, onDataChange, onSave }: ProjectsFormProps) => {
  const [formData, setFormData] = useState<Project[]>(projects);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(projects);
  }, [projects]);

  const handleProjectChange = (index: number, field: string, value: any) => {
    const updatedProjects = [...formData];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setFormData(updatedProjects);
    onDataChange(updatedProjects);
  };

  const addProject = () => {
    const newProjects = [
      ...formData,
      {
        title: "",
        description: "",
        url: "",
        image_url: "",
        technologies: [],
        current: true,
      },
    ];
    setFormData(newProjects);
    onDataChange(newProjects);
  };

  const removeProject = (index: number) => {
    const updatedProjects = formData.filter((_, i) => i !== index);
    setFormData(updatedProjects);
    onDataChange(updatedProjects);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      toast({ title: "Projects Saved" });
    } catch (error: any) {
      console.error("Error saving projects:", error.message);
      toast({
        title: "Error saving projects",
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
        <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
        <button
          onClick={addProject}
          className="flex items-center text-sm bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Project
        </button>
      </div>

      {formData.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <Grid className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No projects added yet</h3>
          <p className="text-gray-500 mb-4">Add your projects to showcase your work and skills.</p>
          <button onClick={addProject} className="btn-primary text-sm">
            Add Project
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.map((project, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 relative hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => removeProject(index)}
                className="absolute top-3 right-3 p-1.5 hover:bg-red-50 text-red-500 rounded-full"
                aria-label="Remove project"
              >
                <Trash className="h-4 w-4" />
              </button>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="form-label">Project Title*</label>
                  <input
                    type="text"
                    value={project.title || ""}
                    onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Project URL</label>
                  <input
                    type="url"
                    value={project.url || ""}
                    onChange={(e) => handleProjectChange(index, "url", e.target.value)}
                    className="form-input"
                    placeholder="https://"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="form-label">Project Image URL</label>
                  <input
                    type="url"
                    value={project.image_url || ""}
                    onChange={(e) => handleProjectChange(index, "image_url", e.target.value)}
                    className="form-input"
                    placeholder="https://"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Enter a URL for an image showcasing your project
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="form-label">Technologies Used</label>
                  <input
                    type="text"
                    value={(project.technologies || []).join(", ")}
                    onChange={(e) =>
                      handleProjectChange(
                        index,
                        "technologies",
                        e.target.value.split(",").map((tech) => tech.trim()),
                      )
                    }
                    className="form-input"
                    placeholder="React, TypeScript, Node.js, etc."
                  />
                  <p className="mt-1 text-xs text-gray-500">Comma separated list of technologies</p>
                </div>

                <div className="sm:col-span-2">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={4}
                    value={project.description || ""}
                    onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                    className="form-input"
                    placeholder="Describe the project, its purpose, and your role..."
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

export default ProjectsForm;
