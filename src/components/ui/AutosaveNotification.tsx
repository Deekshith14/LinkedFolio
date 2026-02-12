
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AutosaveNotificationProps {
  formKey: string;
  onRestore: () => void;
  onDiscard: () => void;
}

const AutosaveNotification = ({ formKey, onRestore, onDiscard }: AutosaveNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if there's saved data for this form
    const savedData = localStorage.getItem(`form_${formKey}`);
    if (savedData) {
      setIsVisible(true);
    }
  }, [formKey]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white shadow-lg rounded-lg border border-gray-200 p-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">Unsaved changes found</h3>
          <p className="text-sm text-gray-600 mt-1">
            We've restored your previous work. Would you like to keep these changes?
          </p>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => {
                onRestore();
                setIsVisible(false);
              }}
              className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-primary/90"
            >
              Keep Changes
            </button>
            <button
              onClick={() => {
                onDiscard();
                setIsVisible(false);
              }}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Discard
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AutosaveNotification;
