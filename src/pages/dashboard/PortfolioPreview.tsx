
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { ArrowLeft, ArrowRight, Edit, ExternalLink, Monitor, Smartphone, Tablet } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

type ProfileData = Database['public']['Tables']['profiles']['Row'];
type Template = Database['public']['Tables']['templates']['Row'];

const PortfolioPreview: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        setProfileData(data);
        setTemplateId(data?.template_id || null);
        
        if (data?.template_id) {
          const { data: templateData, error: templateError } = await supabase
            .from('templates')
            .select('*')
            .eq('id', data.template_id)
            .single();
          
          if (templateError) throw templateError;
          setTemplate(templateData);
        }
      } catch (error: any) {
        console.error('Error fetching profile data:', error.message);
        toast({
          title: "Error fetching your profile",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user]);

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'desktop':
        return 'w-full';
      case 'tablet':
        return 'w-[768px]';
      case 'mobile':
        return 'w-[375px]';
      default:
        return 'w-full';
    }
  };

  const getPreviewUrl = () => {
    if (!user || !profileData) return '';
    // Use the preview URL pattern so we can preview the selected template
    return `/preview/portfolio/${profileData.username || 'user'}/${user.id}`;
  };

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Preview Portfolio">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!templateId) {
    return (
      <DashboardLayout pageTitle="Preview Portfolio">
        <div className="card-default">
          <div className="text-center p-8">
            <h2 className="heading-md mb-4">Template Not Selected</h2>
            <p className="text-body mb-6">
              You need to select a template before you can preview your portfolio.
            </p>
            <Link to="/templates" className="btn-primary">
              Choose a Template
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Preview Portfolio">
      <div className="space-y-6">
        <div className="card-default">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="heading-md mb-1">Preview Your Portfolio</h2>
              <p className="text-body">
                This is how your portfolio will look when published. Make any necessary changes before sharing.
              </p>
              {template && (
                <div className="mt-2">
                  <Badge variant={template.tier === 'free' ? 'outline' : template.tier === 'pro' ? 'secondary' : 'default'} className="capitalize">
                    {template.tier || 'Free'} Template
                  </Badge>
                  <span className="ml-2 text-sm text-gray-500">{template.name}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Link to="/profile" className="btn-outline flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
              <Link to="/settings" className="btn-primary flex items-center">
                <ArrowRight className="h-4 w-4 mr-2" />
                Next Step
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-2 rounded-md ${
              viewMode === 'desktop'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
            title="Desktop View"
          >
            <Monitor className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`p-2 rounded-md ${
              viewMode === 'tablet'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
            title="Tablet View"
          >
            <Tablet className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-2 rounded-md ${
              viewMode === 'mobile'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
            title="Mobile View"
          >
            <Smartphone className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex justify-center">
          <div className={`${getPreviewWidth()} h-[600px] border border-gray-300 rounded-lg overflow-hidden shadow-md mx-auto transition-all duration-300`}>
            <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 text-center text-sm text-gray-600 truncate">
                {getPreviewUrl()}
              </div>
              <a 
                href={getPreviewUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            
            <iframe
              src={getPreviewUrl()}
              title="Portfolio Preview"
              className="w-full h-full bg-white"
            ></iframe>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Link to="/templates" className="btn-outline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Link>
          <Link to="/settings" className="btn-primary flex items-center">
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioPreview;
