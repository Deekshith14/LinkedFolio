
import { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { PortfolioProps } from '@/types/portfolio';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Download, FileText, Lock, Crown } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import BasicTemplate from '@/components/resume/BasicTemplate';
import ModernTemplate from '@/components/resume/ModernTemplate';
import MinimalistTemplate from '@/components/resume/MinimalistTemplate';
import { Skeleton } from '@/components/ui/skeleton';

const ResumeGenerator = () => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState<PortfolioProps | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('basic');
  const [isLoading, setIsLoading] = useState(true);
  const [userPlanType, setUserPlanType] = useState<string | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${resumeData?.profileData?.full_name || 'Resume'}_${new Date().toISOString().slice(0, 10)}`,
    onAfterPrint: () => {
      toast({
        title: "Resume downloaded successfully",
        description: "Your resume has been downloaded as a PDF.",
      });
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Fetch user profile to determine plan type
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setUserPlanType(profileData?.plan_type || 'free');

        // Fetch experiences
        const { data: experienceData, error: experienceError } = await supabase
          .from('experiences')
          .select('*')
          .eq('profile_id', user.id)
          .order('start_date', { ascending: false });

        if (experienceError) throw experienceError;

        // Fetch education
        const { data: educationData, error: educationError } = await supabase
          .from('education')
          .select('*')
          .eq('profile_id', user.id)
          .order('start_date', { ascending: false });

        if (educationError) throw educationError;

        // Fetch skills
        const { data: skillsData, error: skillsError } = await supabase
          .from('skills')
          .select('*')
          .eq('profile_id', user.id);

        if (skillsError) throw skillsError;

        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('profile_id', user.id);

        if (projectsError) throw projectsError;

        // Set all data for the resume
        setResumeData({
          userId: user.id,
          username: profileData?.username,
          profileData,
          experienceData,
          educationData,
          skillsData,
          projectsData
        });
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
        toast({
          variant: "destructive",
          title: "Error fetching your data",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const isEnterprisePlan = userPlanType === 'enterprise';

  const renderTemplate = () => {
    if (!resumeData) return null;

    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate ref={componentRef} data={resumeData} />;
      case 'minimalist':
        return <MinimalistTemplate ref={componentRef} data={resumeData} />;
      case 'basic':
      default:
        return <BasicTemplate ref={componentRef} data={resumeData} />;
    }
  };

  return (
    <DashboardLayout pageTitle="Resume Generator">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Resume Generator</h1>
            <p className="text-muted-foreground">
              Generate a professional resume from your portfolio data.
            </p>
          </div>
          
          {isEnterprisePlan ? (
            <Button 
              className="w-full md:w-auto" 
              onClick={handlePrint}
              disabled={isLoading || !resumeData}
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          ) : (
            <Button 
              className="w-full md:w-auto"
              variant="outline"
              onClick={() => window.location.href = '/payment/request'}
            >
              <Crown className="mr-2 h-4 w-4" /> Upgrade to Enterprise
            </Button>
          )}
        </div>

        {!isEnterprisePlan && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Enterprise Feature</AlertTitle>
            <AlertDescription className="text-amber-700">
              Resume generation and PDF download are exclusive to Enterprise plan users.
              <Button 
                variant="link" 
                className="text-amber-800 font-medium p-0 h-auto"
                onClick={() => window.location.href = '/payment/request'}
              >
                Upgrade to Enterprise
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardContent className="p-6">
            <Tabs value={selectedTemplate} onValueChange={setSelectedTemplate} className="w-full">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="md:w-64 space-y-4">
                  <h3 className="font-medium">Template Style</h3>
                  <TabsList className="flex flex-col w-full h-auto space-y-1">
                    <TabsTrigger value="basic" className="w-full justify-start px-3">
                      <FileText className="mr-2 h-4 w-4" /> Basic
                    </TabsTrigger>
                    <TabsTrigger value="modern" className="w-full justify-start px-3">
                      <FileText className="mr-2 h-4 w-4" /> Modern
                    </TabsTrigger>
                    <TabsTrigger value="minimalist" className="w-full justify-start px-3">
                      <FileText className="mr-2 h-4 w-4" /> Minimalist
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Help & Tips</h3>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>• Choose a template that matches your career goals.</li>
                      <li>• Make sure your profile is complete for the best resume.</li>
                      <li>• Your resume content is based on your profile data.</li>
                      <li>• Use the "Edit Profile" section to update your information.</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex-1 border rounded-lg relative">
                  {isLoading ? (
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-12 w-1/2 mx-auto" />
                      <Skeleton className="h-4 w-3/4 mx-auto" />
                      <div className="space-y-2 mt-6">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-24 w-full" />
                      </div>
                      <div className="space-y-2 mt-6">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="overflow-auto max-h-[600px] p-1">
                        <TabsContent value="basic" className="mt-0">
                          {renderTemplate()}
                        </TabsContent>
                        <TabsContent value="modern" className="mt-0">
                          {renderTemplate()}
                        </TabsContent>
                        <TabsContent value="minimalist" className="mt-0">
                          {renderTemplate()}
                        </TabsContent>
                      </div>
                      
                      {!isEnterprisePlan && (
                        <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] flex flex-col items-center justify-center">
                          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
                            <Lock className="h-12 w-12 mx-auto text-amber-500 mb-3" />
                            <h3 className="text-lg font-bold mb-2">Enterprise Feature</h3>
                            <p className="text-gray-600 mb-4">
                              Resume generation and downloading is available exclusively for Enterprise plan users.
                            </p>
                            <Button 
                              onClick={() => window.location.href = '/payment/request'}
                              className="w-full"
                            >
                              <Crown className="mr-2 h-4 w-4" /> Upgrade to Enterprise
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Hidden print-only resume to preserve exact styling */}
      <div className="hidden">
        {!isLoading && renderTemplate()}
      </div>
    </DashboardLayout>
  );
};

export default ResumeGenerator;
