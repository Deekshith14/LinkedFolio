
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Use the same values from src/integrations/supabase/client.ts
const SUPABASE_URL = "https://pzsvkxxqckdeuwnwcjmo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6c3ZreHhxY2tkZXV3bndjam1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MjI0NjYsImV4cCI6MjA4NjQ5ODQ2Nn0.4C2nCljSuF78zYHeOb6ba9sM141mtPMrAErOyM3Bi5Q";

// Create a single instance of the Supabase client with proper configuration
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
    fetch: (url, options) => {
      // Log requests for debugging
      console.log(`Supabase request: ${options?.method || 'GET'} ${url}`);
      return fetch(url, {
        ...options,
        // Ensure we're always sending proper credentials
        credentials: 'same-origin'
      });
    }
  }
});

// For debugging purposes
console.log('Supabase URL:', SUPABASE_URL);
console.log('Supabase Key length:', SUPABASE_PUBLISHABLE_KEY ? SUPABASE_PUBLISHABLE_KEY.length : 0);
