
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

const AdminRoute = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ['isAdmin', user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      
      return data?.is_admin || false;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login', { replace: true });
    } else if (!isLoading && !isAdminLoading && !isAdmin) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, isLoading, isAdmin, isAdminLoading, navigate]);

  if (isLoading || isAdminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return isAdmin ? <Outlet /> : null;
};

export default AdminRoute;
