
import { useState, useEffect } from "react";
import { FileText, Plus, Trash, Link } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useFormPersistence } from "@/hooks/useFormPersistence";

interface Certificate {
  id?: string;
  title: string;
  issuer: string;
  issueDate?: string;
  expiryDate?: string;
  credentialUrl?: string;
  description?: string;
}

interface CertificatesFormProps {
  certificates: Certificate[];
  onDataChange: (certificates: Certificate[]) => void;
}

const CertificatesForm = ({ certificates = [], onDataChange }: CertificatesFormProps) => {
  const [formData, setFormData, clearPersistedData] = useFormPersistence<Certificate[]>(
    "certificates", 
    certificates
  );
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Only update if initial certificates are not empty and different from formData
    if (certificates.length > 0 && JSON.stringify(certificates) !== JSON.stringify(formData)) {
      setFormData(certificates);
    }
  }, [certificates]);

  const handleCertificateChange = (index: number, field: string, value: any) => {
    const updatedCertificates = [...formData];
    updatedCertificates[index] = { ...updatedCertificates[index], [field]: value };
    setFormData(updatedCertificates);
    onDataChange(updatedCertificates);
  };

  const addCertificate = () => {
    const newCertificates = [
      ...formData,
      {
        title: "",
        issuer: "",
        issueDate: "",
        expiryDate: "",
        credentialUrl: "",
        description: "",
      },
    ];
    setFormData(newCertificates);
    onDataChange(newCertificates);
  };

  const removeCertificate = (index: number) => {
    const updatedCertificates = formData.filter((_, i) => i !== index);
    setFormData(updatedCertificates);
    onDataChange(updatedCertificates);
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Save certificates to profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("certificates")
        .eq("id", user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") throw profileError;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          certificates: formData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) throw updateError;
      
      // After successful save, clear the persisted form data
      clearPersistedData();
      toast({ title: "Certificates Saved" });
    } catch (error: any) {
      console.error("Error saving certificates:", error.message);
      toast({
        title: "Error saving certificates",
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
        <h2 className="text-xl font-semibold text-gray-800">Certificates</h2>
        <button
          onClick={addCertificate}
          className="flex items-center text-sm bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Certificate
        </button>
      </div>

      {formData.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No certificates added yet</h3>
          <p className="text-gray-500 mb-4">Add your certificates to showcase your qualifications.</p>
          <button onClick={addCertificate} className="btn-primary text-sm">
            Add Certificate
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.map((certificate, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 relative hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => removeCertificate(index)}
                className="absolute top-3 right-3 p-1.5 hover:bg-red-50 text-red-500 rounded-full"
                aria-label="Remove certificate"
              >
                <Trash className="h-4 w-4" />
              </button>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="form-label">Certificate Title*</label>
                  <input
                    type="text"
                    value={certificate.title || ""}
                    onChange={(e) => handleCertificateChange(index, "title", e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Issuing Organization*</label>
                  <input
                    type="text"
                    value={certificate.issuer || ""}
                    onChange={(e) => handleCertificateChange(index, "issuer", e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Issue Date</label>
                  <input
                    type="date"
                    value={certificate.issueDate || ""}
                    onChange={(e) => handleCertificateChange(index, "issueDate", e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="date"
                    value={certificate.expiryDate || ""}
                    onChange={(e) => handleCertificateChange(index, "expiryDate", e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="form-label">Credential URL</label>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      <Link className="h-4 w-4" />
                    </span>
                    <input
                      type="url"
                      value={certificate.credentialUrl || ""}
                      onChange={(e) => handleCertificateChange(index, "credentialUrl", e.target.value)}
                      className="form-input rounded-none rounded-r-md flex-1"
                      placeholder="https://"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Link to verify your credential
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={4}
                    value={certificate.description || ""}
                    onChange={(e) => handleCertificateChange(index, "description", e.target.value)}
                    className="form-input"
                    placeholder="Describe what you learned or the skills certified..."
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

export default CertificatesForm;
