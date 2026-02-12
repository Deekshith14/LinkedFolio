
import React, { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface PublicPortfolioProps {
  tier: 'free' | 'pro' | 'enterprise';
}

const PublicPortfolio: React.FC<PublicPortfolioProps> = ({ tier }) => {
  const { username, userId } = useParams<{ username: string; userId: string }>();
  const [searchParams] = useSearchParams();
  const templateIdFromQuery = searchParams.get('template');
  const [accessDenied, setAccessDenied] = useState(false);
  const [templateId, setTemplateId] = useState<string | null>(null);

  // Fetch profile data and template
  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['publicProfile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*, templates!inner(*)')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    },
  });

  // If we have a templateId in the query, use it instead of the user's selected template
  useEffect(() => {
    if (templateIdFromQuery) {
      setTemplateId(templateIdFromQuery);
    } else if (profileData?.template_id) {
      setTemplateId(profileData.template_id);
    }
  }, [templateIdFromQuery, profileData]);

  // Fetch the specific template details if we have a template ID from the query
  const { data: templateData, isLoading: isLoadingTemplate } = useQuery({
    queryKey: ['template', templateId],
    queryFn: async () => {
      if (!templateId) return null;
      
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('id', templateId)
        .single();
      
      if (error) {
        console.error('Error fetching template:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!templateId && templateId !== profileData?.template_id,
  });

  const template = templateData || (profileData?.templates || null);
  const isLoading = isLoadingProfile || isLoadingTemplate;

  // Check if user has access to this tier
  useEffect(() => {
    if (!isLoading && profileData && template) {
      const templateTier = template.tier || 'free';
      
      if (templateTier === 'free') {
        // Free portfolios are accessible to all
        setAccessDenied(false);
      } else if (templateTier === 'pro' || templateTier === 'enterprise') {
        // Check if user has premium access
        setAccessDenied(!(profileData.is_premium || false));
      }
    }
  }, [isLoading, profileData, template]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Portfolio Not Found</CardTitle>
            <CardDescription>
              The portfolio you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // If no template is found
  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Template Not Found</CardTitle>
            <CardDescription>
              The template for this portfolio doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-gray-100">
                <Lock className="h-8 w-8 text-gray-500" />
              </div>
            </div>
            <CardTitle>Premium Portfolio</CardTitle>
            <CardDescription>
              This is a premium {template.tier} portfolio and requires an active subscription to view.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              The owner of this portfolio needs to upgrade their account to make this portfolio visible.
            </p>
          </CardContent>
          <CardFooter className="justify-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/">Return Home</Link>
            </Button>
            <Button asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Here we would dynamically render the selected template component
  // In this implementation, we're just showing a placeholder
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">LinkedFolio</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant={template.tier === 'free' ? 'outline' : template.tier === 'pro' ? 'default' : 'secondary'}>
                {template.tier.charAt(0).toUpperCase() + template.tier.slice(1)} Portfolio
              </Badge>
              <Button asChild variant="outline" size="sm">
                <Link to="/">Create Your Own</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
              <div className="h-32 w-32 rounded-full bg-primary flex items-center justify-center text-white text-4xl">
                {profileData.full_name ? profileData.full_name.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
            <div className="md:w-3/4">
              <h1 className="text-3xl font-bold">{profileData.full_name || 'Portfolio User'}</h1>
              <p className="text-gray-500 mt-2">{profileData.bio || 'Welcome to my portfolio'}</p>
              {profileData.website && (
                <a 
                  href={profileData.website.startsWith('http') ? profileData.website : `https://${profileData.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary mt-1 inline-block hover:underline"
                >
                  {profileData.website}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            {/* This is placeholder content - in a real app, you would fetch and display the actual portfolio data */}
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Experience items would be displayed here.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Project items would be displayed here.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Education items would be displayed here.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Skills would be displayed here.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Contact information would be displayed here.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get In Touch</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} LinkedFolio. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-500 hover:text-primary text-sm">Home</Link>
              <Link to="/pricing" className="text-gray-500 hover:text-primary text-sm">Pricing</Link>
              <Link to="/contact" className="text-gray-500 hover:text-primary text-sm">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Badge = ({ children, variant }: { children: React.ReactNode, variant: 'outline' | 'default' | 'secondary' }) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  
  const variantClasses = {
    outline: "bg-white border border-gray-200 text-gray-800",
    default: "bg-primary text-white",
    secondary: "bg-secondary text-white",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

export default PublicPortfolio;
