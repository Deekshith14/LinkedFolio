
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/supabase';
import { PortfolioProps } from '@/types/portfolio';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import NotFoundPortfolio from './NotFoundPortfolio';
import { getTemplateComponent, getTemplateTier, isTemplatePremium } from './template-mapper';
import PreviewBanner from '@/components/portfolio/PreviewBanner';
import { useAuth } from '@/context/AuthContext';

// This component is for previewing ANY template, regardless of user's subscription
const PortfolioPreviewPage: React.FC = () => {
  const { username, userId } = useParams<{ username: string; userId: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioProps | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [isPremiumPreview, setIsPremiumPreview] = useState(false);
  const [templateTier, setTemplateTier] = useState('free');
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!userId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      // Check if the current user is viewing their own portfolio
      setIsCurrentUser(user?.id === userId);

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

        setProfileData(profileData);
        console.log("Preview mode - Fetched profile data:", profileData);

        // Use template from query params or fall back to profile's template
        const templateId = searchParams.get('template') || profileData.template_id || 'free1';
        console.log("Preview mode - Using template:", templateId);

        // Check if premium template being previewed
        const isPremium = isTemplatePremium(templateId);
        const userTier = profileData.plan_type || 'free';
        const tier = getTemplateTier(templateId);
        setTemplateTier(tier);

        setIsPremiumPreview(isPremium &&
          ((tier === 'pro' && userTier !== 'pro' && userTier !== 'enterprise') ||
            (tier === 'enterprise' && userTier !== 'enterprise')));

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
            template_id: templateId // Use template from URL or fallback
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
  }, [userId, username, searchParams, user?.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (notFound) {
    return <NotFoundPortfolio />;
  }

  if (!portfolioData) {
    return <NotFoundPortfolio />;
  }

  const templateId = searchParams.get('template') || portfolioData.profileData?.template_id || 'free1';
  const TemplateComponent = getTemplateComponent(templateId);

  return (
    <div className="relative">
      {/* Premium Preview Watermark */}
      {isPremiumPreview && (
        <PreviewBanner
          templateTier={templateTier}
          isCurrentUser={isCurrentUser}
          userId={userId || ''}
        />
      )}

      {/* Template Preview with offset for the banner if needed */}
      <div className={`${isPremiumPreview ? 'pt-[42px]' : ''}`}>
        <TemplateComponent {...portfolioData} />
      </div>

      {/* Add noindex meta tag to prevent search engines from indexing preview pages */}
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

    </div>
  );
};

export default PortfolioPreviewPage;
