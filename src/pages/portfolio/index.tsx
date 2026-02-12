
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { PortfolioProps } from '@/types/portfolio';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import NotFoundPortfolio from './NotFoundPortfolio';
import AccessDeniedPortfolio from './AccessDeniedPortfolio';
import { getTemplateComponent, getTemplateTier, canUserAccessTemplate } from './template-mapper';

// This is the public portfolio view - it ONLY shows templates the user has access to
const PortfolioPage: React.FC = () => {
  const { username, userId } = useParams<{ username: string; userId: string }>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [noAccess, setNoAccess] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioProps | null>(null);
  const [templateTier, setTemplateTier] = useState<string>('free');

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!userId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError || !profileData) {
          console.error('Error fetching profile:', profileError);
          setNotFound(true);
          setLoading(false);
          return;
        }

        if (profileData.is_private) {
          setIsPrivate(true);
          setLoading(false);
          return;
        }

        console.log("Fetched profile data:", profileData);
        console.log("Profile template_id:", profileData.template_id);

        // For public view, we only allow their selected template
        const templateId = profileData.template_id || 'free1';
        const userPlanType = profileData.plan_type || 'free';
        
        // Ensure user can access this template based on their plan
        const tier = getTemplateTier(templateId);
        setTemplateTier(tier);
        
        // Check if user has access to this template based on their plan
        const hasAccess = canUserAccessTemplate(templateId, userPlanType);
        
        if (!hasAccess) {
          console.log("User doesn't have access to this template. Template tier:", tier, "User plan:", userPlanType);
          setNoAccess(true);
          setLoading(false);
          return;
        }

        const { data: experienceData, error: experienceError } = await supabase
          .from('experiences')
          .select('*')
          .eq('profile_id', userId)
          .order('start_date', { ascending: false });

        if (experienceError) {
          console.error('Error fetching experience:', experienceError);
        }

        const { data: educationData, error: educationError } = await supabase
          .from('education')
          .select('*')
          .eq('profile_id', userId)
          .order('start_date', { ascending: false });

        if (educationError) {
          console.error('Error fetching education:', educationError);
        }

        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('profile_id', userId);

        if (projectsError) {
          console.error('Error fetching projects:', projectsError);
        }

        const { data: skillsData, error: skillsError } = await supabase
          .from('skills')
          .select('*')
          .eq('profile_id', userId);

        if (skillsError) {
          console.error('Error fetching skills:', skillsError);
        }

        setPortfolioData({
          userId,
          username: profileData.username,
          profileData: {
            ...profileData,
            template_id: templateId
          },
          experienceData: experienceData || [],
          educationData: educationData || [],
          projectsData: projectsData || [],
          skillsData: skillsData || []
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setNotFound(true);
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [userId, username]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (notFound) {
    return <NotFoundPortfolio />;
  }

  if (isPrivate) {
    return <AccessDeniedPortfolio templateTier={templateTier} reason="private" />;
  }
  
  if (noAccess) {
    return <AccessDeniedPortfolio templateTier={templateTier} reason="unauthorized" />;
  }

  if (!portfolioData) {
    return <NotFoundPortfolio />;
  }

  const renderTemplate = () => {
    const templateId = portfolioData.profileData?.template_id || 'free1';
    console.log("Using template:", templateId);
    
    const TemplateComponent = getTemplateComponent(templateId);
    return <TemplateComponent {...portfolioData} />;
  };

  return renderTemplate();
};

export default PortfolioPage;
