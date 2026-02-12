
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { ArrowLeft, Check, CheckCircle, Copy, ExternalLink, GitBranch, Globe, Lock, Share2, Unlock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type ProfileData = Database['public']['Tables']['profiles']['Row'];

const PortfolioSettings: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [hasRequiredData, setHasRequiredData] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        // Fetch profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        setProfileData(data);
        
        // Check if all required data is available
        const requiredData = data && data.full_name && data.email && data.template_id;
        setHasRequiredData(!!requiredData);
        
        // Set portfolio URL
        if (data) {
          const username = data.username || 'user';
          setPortfolioUrl(`${window.location.origin}/portfolio/${username}/${user.id}`);
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

  const handlePublish = async () => {
    if (!user || !hasRequiredData) return;
    
    setIsPublishing(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ published: true, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setProfileData((prev) => prev ? { ...prev, published: true } : null);
      
      toast({
        title: "Portfolio published!",
        description: "Your portfolio is now live and can be shared.",
      });
    } catch (error: any) {
      console.error('Error publishing portfolio:', error.message);
      toast({
        title: "Error publishing portfolio",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    if (!user) return;
    
    setIsPublishing(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ published: false, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setProfileData((prev) => prev ? { ...prev, published: false } : null);
      
      toast({
        title: "Portfolio unpublished",
        description: "Your portfolio is no longer publicly accessible.",
      });
    } catch (error: any) {
      console.error('Error unpublishing portfolio:', error.message);
      toast({
        title: "Error unpublishing portfolio",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "The URL has been copied to your clipboard.",
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Portfolio Settings">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Portfolio Settings">
      <div className="space-y-8">
        {/* Publishing Status */}
        <div className="card-default">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="heading-md mb-1">Publishing Settings</h2>
              <p className="text-body">
                Manage the visibility and URL of your professional portfolio.
              </p>
            </div>
            
            <div>
              {profileData?.published ? (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Published</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm font-medium">Not Published</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Publication Requirements */}
        {!hasRequiredData && (
          <div className="card-default border-orange-200 bg-orange-50">
            <h3 className="font-semibold text-orange-800 mb-2">Complete Your Portfolio</h3>
            <p className="text-orange-700 mb-4">
              You need to complete the following items before you can publish your portfolio:
            </p>
            <ul className="space-y-2">
              {!profileData?.full_name && (
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-2 text-orange-700">Add your full name</span>
                </li>
              )}
              {!profileData?.email && (
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-2 text-orange-700">Add your email address</span>
                </li>
              )}
              {!profileData?.template_id && (
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-2 text-orange-700">Choose a template</span>
                </li>
              )}
            </ul>
            <div className="mt-4">
              <Link to="/profile" className="btn-primary">
                Complete My Profile
              </Link>
            </div>
          </div>
        )}
        
        {/* Publish/Unpublish Control */}
        <div className="card-default">
          <h3 className="heading-sm mb-4">Portfolio Visibility</h3>
          <p className="text-body mb-6">
            {profileData?.published
              ? 'Your portfolio is currently published and visible to anyone with the link.'
              : 'Your portfolio is currently private. Publish it to make it accessible to others.'}
          </p>
          
          {profileData?.published ? (
            <button
              onClick={handleUnpublish}
              disabled={isPublishing}
              className="btn-outline flex items-center"
            >
              {isPublishing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Unpublish Portfolio
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handlePublish}
              disabled={isPublishing || !hasRequiredData}
              className={`btn-primary flex items-center ${(!hasRequiredData || isPublishing) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isPublishing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <Unlock className="h-4 w-4 mr-2" />
                  Publish Portfolio
                </>
              )}
            </button>
          )}
        </div>
        
        {/* Portfolio URL Section */}
        <div className="card-default">
          <h3 className="heading-sm mb-4">Portfolio URL</h3>
          <p className="text-body mb-6">
            Share this URL with potential employers, colleagues, or clients to showcase your professional portfolio.
          </p>
          
          <div className="flex items-center space-x-2 mb-6">
            <input
              type="text"
              value={portfolioUrl}
              readOnly
              className="form-input flex-1"
            />
            <button
              onClick={() => copyToClipboard(portfolioUrl)}
              className="btn-outline py-2"
            >
              <Copy className="h-4 w-4" />
            </button>
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline py-2"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          
          {/* Username Customization */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h4 className="font-medium mb-2">Customize Your Username</h4>
            <p className="text-sm text-gray-600 mb-4">
              Customize the username portion of your portfolio URL to make it more personal and memorable.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm whitespace-nowrap">
                    {window.location.origin}/portfolio/
                  </span>
                  <input
                    type="text"
                    value={profileData?.username || ''}
                    className="form-input rounded-none border-r-0 flex-1 min-w-0"
                    placeholder="yourusername"
                    readOnly
                  />
                  <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    /{user?.id}
                  </span>
                </div>
              </div>
              
              <Link to="/profile" className="btn-outline whitespace-nowrap">
                Edit Username
              </Link>
            </div>
          </div>
        </div>
        
        {/* Social Sharing */}
        <div className="card-default">
          <h3 className="heading-sm mb-4">Share Your Portfolio</h3>
          <p className="text-body mb-6">
            Share your portfolio across your social networks to increase visibility.
          </p>
          
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <div className="h-6 w-6 text-blue-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h-.003z" />
                </svg>
              </div>
              Share on LinkedIn
            </a>
            
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(portfolioUrl)}&text=${encodeURIComponent('Check out my professional portfolio!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <div className="h-6 w-6 text-blue-400 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
              Share on Twitter
            </a>
            
            <button
              onClick={() => copyToClipboard(portfolioUrl)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Share2 className="h-5 w-5 text-gray-600 mr-2" />
              Copy Link
            </button>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="card-default bg-primary bg-opacity-5 border-primary border-opacity-20">
          <h3 className="heading-sm mb-4">Next Steps</h3>
          <p className="text-body mb-6">
            Now that you've set up your portfolio, here are some suggested next steps:
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                <Check />
              </div>
              <span className="ml-2">Add your portfolio URL to your resume and job applications</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                <Check />
              </div>
              <span className="ml-2">Share your portfolio with your professional network</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                <Check />
              </div>
              <span className="ml-2">Include your portfolio URL in your LinkedIn profile</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                <Check />
              </div>
              <span className="ml-2">Regularly update your portfolio with new projects and skills</span>
            </li>
          </ul>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Link to="/preview" className="btn-outline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Preview
          </Link>
          <Link to="/dashboard" className="btn-primary flex items-center">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioSettings;
