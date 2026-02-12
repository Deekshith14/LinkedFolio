
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, ArrowRight, CheckCircle, Clipboard, Download, Linkedin, RefreshCw, XCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const LinkedInIntegration: React.FC = () => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  useEffect(() => {
    const checkLinkedInStatus = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('linkedin_connected, updated_at')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        setIsConnected(data?.linkedin_connected || false);
        setLastSynced(data?.updated_at);
      } catch (error: any) {
        console.error('Error checking LinkedIn status:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLinkedInStatus();
  }, [user]);

  const handleConnectLinkedIn = async () => {
    setIsConnecting(true);
    
    try {
      // In a real implementation, this would redirect to LinkedIn OAuth flow
      // For this example, we'll simulate a successful connection after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({
            linkedin_connected: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
        
        if (error) throw error;
        
        setIsConnected(true);
        setLastSynced(new Date().toISOString());
        
        toast({
          title: "LinkedIn connected!",
          description: "Your LinkedIn profile has been successfully connected.",
        });
      }
    } catch (error: any) {
      console.error('Error connecting LinkedIn:', error.message);
      toast({
        title: "Connection failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectLinkedIn = async () => {
    try {
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({
            linkedin_connected: false,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
        
        if (error) throw error;
        
        setIsConnected(false);
        
        toast({
          title: "LinkedIn disconnected",
          description: "Your LinkedIn profile has been disconnected.",
        });
      }
    } catch (error: any) {
      console.error('Error disconnecting LinkedIn:', error.message);
      toast({
        title: "Disconnection failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSyncLinkedIn = async () => {
    setIsSyncing(true);
    
    try {
      // In a real implementation, this would fetch updated data from LinkedIn API
      // For this example, we'll simulate a successful sync after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
        
        if (error) throw error;
        
        setLastSynced(new Date().toISOString());
        
        toast({
          title: "Sync complete!",
          description: "Your LinkedIn data has been updated.",
        });
      }
    } catch (error: any) {
      console.error('Error syncing LinkedIn data:', error.message);
      toast({
        title: "Sync failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const formatLastSynced = (dateString: string | null) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="LinkedIn Integration">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="LinkedIn Integration">
      <div className="space-y-8">
        {/* LinkedIn Connection Status */}
        <div className="card-default">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="heading-md mb-1">LinkedIn Integration</h2>
              <p className="text-body">
                Connect your LinkedIn profile to automatically import your professional data.
              </p>
            </div>
            
            <div>
              {isConnected ? (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  <XCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Not Connected</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Connection Actions */}
        <div className="card-default">
          <h3 className="heading-sm mb-4">
            {isConnected ? 'Manage LinkedIn Connection' : 'Connect with LinkedIn'}
          </h3>
          <p className="text-body mb-6">
            {isConnected
              ? 'Your LinkedIn profile is connected. You can sync your data or disconnect at any time.'
              : 'Connect your LinkedIn profile to import your work experience, education, and skills.'}
          </p>
          
          {isConnected ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Last synced</h4>
                  <p className="text-sm text-gray-500">{formatLastSynced(lastSynced)}</p>
                </div>
                <button
                  onClick={handleSyncLinkedIn}
                  disabled={isSyncing}
                  className={`btn-outline flex items-center ${isSyncing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSyncing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </>
                  )}
                </button>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={handleDisconnectLinkedIn}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Disconnect LinkedIn Account
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleConnectLinkedIn}
              disabled={isConnecting}
              className={`btn-primary flex items-center ${isConnecting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isConnecting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </>
              ) : (
                <>
                  <Linkedin className="h-4 w-4 mr-2" />
                  Connect with LinkedIn
                </>
              )}
            </button>
          )}
        </div>
        
        {/* Import Options */}
        {isConnected && (
          <div className="card-default">
            <h3 className="heading-sm mb-4">Import Options</h3>
            <p className="text-body mb-6">
              Choose what information to import from your LinkedIn profile.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="import-experience"
                  checked
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <label htmlFor="import-experience" className="ml-2 text-sm text-gray-700">
                  Work Experience
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="import-education"
                  checked
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <label htmlFor="import-education" className="ml-2 text-sm text-gray-700">
                  Education
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="import-skills"
                  checked
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <label htmlFor="import-skills" className="ml-2 text-sm text-gray-700">
                  Skills
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="import-profile"
                  checked
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <label htmlFor="import-profile" className="ml-2 text-sm text-gray-700">
                  Profile Information
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="btn-primary flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Import Selected Data
              </button>
            </div>
          </div>
        )}
        
        {/* Alternative: Manual Entry */}
        <div className="card-default">
          <h3 className="heading-sm mb-4">Manual Data Entry</h3>
          <p className="text-body mb-6">
            If you prefer not to connect your LinkedIn profile, you can manually enter your professional information.
          </p>
          
          <Link to="/profile" className="btn-outline flex items-center">
            <Clipboard className="h-4 w-4 mr-2" />
            Enter Data Manually
          </Link>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Link to="/dashboard" className="btn-outline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <Link to="/profile" className="btn-primary flex items-center">
            Continue to Profile
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LinkedInIntegration;
