
import { useState, useEffect } from "react";

/**
 * Custom hook to persist form data in localStorage
 * @param key Unique identifier for the form data in localStorage
 * @param initialData Initial data for the form
 * @returns [formData, setFormData, clearPersistedData]
 */
export function useFormPersistence<T>(key: string, initialData: T): [T, (data: T) => void, () => void] {
  // Initialize state with data from localStorage or initial data
  const [formData, setFormDataState] = useState<T>(() => {
    const savedData = localStorage.getItem(`form_${key}`);
    return savedData ? JSON.parse(savedData) : initialData;
  });

  // Update form data in state and localStorage
  const setFormData = (data: T) => {
    setFormDataState(data);
    localStorage.setItem(`form_${key}`, JSON.stringify(data));
  };

  // Clear persisted data from localStorage
  const clearPersistedData = () => {
    localStorage.removeItem(`form_${key}`);
  };

  // Update localStorage when formData changes
  useEffect(() => {
    localStorage.setItem(`form_${key}`, JSON.stringify(formData));
  }, [formData, key]);

  // Update state if initialData changes significantly (e.g., after API load)
  useEffect(() => {
    // Only update if initial data is substantially different from current data
    const currentDataStr = JSON.stringify(formData);
    const initialDataStr = JSON.stringify(initialData);
    
    if (initialDataStr !== '{}' && initialDataStr !== '[]' && initialDataStr !== currentDataStr) {
      setFormData(initialData);
    }
  }, [initialData]);

  return [formData, setFormData, clearPersistedData];
}
