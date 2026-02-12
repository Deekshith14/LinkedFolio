
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';

export const useVisitCounter = (profileId?: string) => {
  useEffect(() => {
    const incrementVisitCount = async () => {
      if (!profileId) return;

      try {
        const { error } = await supabase.rpc('increment_visit_count', { 
          profile_id: profileId 
        });

        if (error) {
          console.error('Failed to increment visit count:', error);
        }
      } catch (err) {
        console.error('Error in visit counter:', err);
      }
    };

    incrementVisitCount();
  }, [profileId]);
};
