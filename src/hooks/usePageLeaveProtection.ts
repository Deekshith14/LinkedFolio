
import { useEffect } from "react";
import { useNavigate, useBeforeUnload } from "react-router-dom";

/**
 * Hook to protect against accidental page navigation with unsaved changes
 * @param hasUnsavedChanges Boolean indicating if there are unsaved changes
 * @param message Message to display when user tries to navigate away
 */
export const usePageLeaveProtection = (
  hasUnsavedChanges: boolean,
  message: string = "You have unsaved changes. Are you sure you want to leave this page?"
) => {
  useBeforeUnload((event) => {
    if (hasUnsavedChanges) {
      event.preventDefault();
      event.returnValue = message; // ✅ required for some browsers
    }
  });

  // This can be expanded if we want to add custom behavior when user tries to navigate within the app
  // For example, by using the navigate function from useNavigate() and implementing a custom confirmation dialog
  return { hasUnsavedChanges };
};
