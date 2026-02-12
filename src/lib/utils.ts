
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Return the original string if it's invalid
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short'
  };
  
  return date.toLocaleDateString('en-US', options);
}
