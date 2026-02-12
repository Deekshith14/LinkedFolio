
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { 
  ArrowRight, Clock, Edit, Eye, FileText, Grid, Plus, 
  Share2, User, Zap, Crown, Rocket, BookOpen, Briefcase, GraduationCap,
  CheckCircle, AlertTriangle, ExternalLink, ChevronUp, CircleUser, BarChart4,
  Calendar, Code 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

type ProfileData = Database['public']['Tables']['profiles']['Row'];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [experienceCount, setExperienceCount] = useState(0);
  const [educationCount, setEducationCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [skillCount, setSkillCount] = useState(0);

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
        
        // Fetch counts of related data
        const fetchCounts = async () => {
          // Experience count
          const { count: expCount, error: expError } = await supabase
            .from('experiences')
            .select('*', { count: 'exact', head: true })
            .eq('profile_id', user.id);
          
          if (!expError) setExperienceCount(expCount || 0);
          
          // Education count
          const { count: eduCount, error: eduError } = await supabase
            .from('education')
            .select('*', { count: 'exact', head: true })
            .eq('profile_id', user.id);
          
          if (!eduError) setEducationCount(eduCount || 0);
          
          // Projects count
          const { count: projCount, error: projError } = await supabase
            .from('projects')
            .select('*', { count: 'exact', head: true })
            .eq('profile_id', user.id);
          
          if (!projError) setProjectCount(projCount || 0);
          
          // Skills count
          const { count: skillsCount, error: skillsError } = await supabase
            .from('skills')
            .select('*', { count: 'exact', head: true })
            .eq('profile_id', user.id);
          
          if (!skillsError) setSkillCount(skillsCount || 0);
        };
        
        fetchCounts();
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

  const getCompletionPercentage = (): number => {
    if (!profileData) return 0;

    let completedSteps = 0;
    const totalSteps = 3;

    if (profileData.full_name && profileData.email) completedSteps += 1;
    if (profileData.template_id) completedSteps += 1;
    if (profileData.published) completedSteps += 1;

    return Math.round((completedSteps / totalSteps) * 100);
  };

  const completionPercentage = getCompletionPercentage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <DashboardLayout pageTitle="Dashboard">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Welcome Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome, {profileData?.full_name || 'there'}!</h2>
              <p className="text-indigo-100 text-lg">
                {completionPercentage === 100 
                  ? "Your portfolio is complete and ready to impress!"
                  : "Continue building your professional portfolio to showcase your skills."}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-3">
                {profileData?.published ? (
                  <Link 
                    to={`/portfolio/${profileData.username || 'user'}/${user?.id}`} 
                    target="_blank" 
                    className="bg-white text-indigo-700 hover:bg-indigo-50 px-5 py-2.5 rounded-lg font-medium 
                    shadow-md flex items-center transition-all duration-200 hover:translate-y-[-2px]"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Portfolio
                  </Link>
                ) : (
                  <Link 
                    to="/preview" 
                    className="bg-white text-indigo-700 hover:bg-indigo-50 px-5 py-2.5 rounded-lg font-medium 
                    shadow-md flex items-center transition-all duration-200 hover:translate-y-[-2px]"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Portfolio
                  </Link>
                )}
                
                <Link 
                  to="/profile" 
                  className="bg-indigo-700 text-white hover:bg-indigo-800 px-5 py-2.5 rounded-lg font-medium 
                  shadow-md flex items-center transition-all duration-200 hover:translate-y-[-2px]"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
              <div className="mr-4">
                <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray={`${completionPercentage}, 100`}
                    className="animate-pulse"
                  />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium">Portfolio Completion</span>
                <div className="text-2xl font-bold">{completionPercentage}%</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Progress and Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Portfolio Setup Progress */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  Portfolio Setup Progress
                </CardTitle>
                <CardDescription>Complete these steps to publish your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-sm font-medium">{completionPercentage}% Complete</span>
                  {completionPercentage === 100 && (
                    <span className="text-sm text-green-600 font-medium flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      All set!
                    </span>
                  )}
                </div>
                <Progress value={completionPercentage} className="h-2" />

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className={`rounded-lg p-5 border ${!profileData?.full_name || !profileData?.email ? 'border-amber-200 bg-amber-50' : 'border-green-200 bg-green-50'}`}>
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full ${!profileData?.full_name || !profileData?.email ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                        <User className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{!profileData?.full_name || !profileData?.email ? 'Complete Your Profile' : 'Profile Completed'}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {!profileData?.full_name || !profileData?.email
                            ? 'Add your personal information and details'
                            : 'Your profile information is complete'}
                        </p>
                        {(!profileData?.full_name || !profileData?.email) && (
                          <Link to="/profile" className="text-sm flex items-center text-primary font-medium mt-2 hover:underline">
                            Complete Now <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`rounded-lg p-5 border ${!profileData?.template_id ? 'border-amber-200 bg-amber-50' : 'border-green-200 bg-green-50'}`}>
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full ${!profileData?.template_id ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                        <Grid className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{!profileData?.template_id ? 'Choose a Template' : 'Template Selected'}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {!profileData?.template_id
                            ? 'Select a template design that fits your style'
                            : 'You have selected a portfolio template'}
                        </p>
                        {!profileData?.template_id && (
                          <Link to="/templates" className="text-sm flex items-center text-primary font-medium mt-2 hover:underline">
                            Choose Now <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`rounded-lg p-5 border ${!profileData?.published ? 'border-amber-200 bg-amber-50' : 'border-green-200 bg-green-50'}`}>
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full ${!profileData?.published ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                        <Share2 className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{!profileData?.published ? 'Publish Your Portfolio' : 'Portfolio Published'}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {!profileData?.published
                            ? 'Make your portfolio visible to the world'
                            : 'Your portfolio is live and accessible online'}
                        </p>
                        {!profileData?.published && (
                          <Link to="/settings" className="text-sm flex items-center text-primary font-medium mt-2 hover:underline">
                            Publish Now <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart4 className="mr-2 h-5 w-5 text-primary" />
                  Profile Stats
                </CardTitle>
                <CardDescription>Your portfolio performance at a glance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full">
                      <Eye className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Profile Views</span>
                  </div>
                  <span className="text-xl font-bold">{profileData?.visit_count || 0}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full">
                      <Code className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Skills</span>
                  </div>
                  <span className="text-xl font-bold">{skillCount}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Experience</span>
                  </div>
                  <span className="text-xl font-bold">{experienceCount}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-full">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Education</span>
                  </div>
                  <span className="text-xl font-bold">{educationCount}</span>
                </div>
              </CardContent>
              
              {profileData?.published && (
                <CardFooter>
                  <Link 
                    to={`/portfolio/${profileData.username || 'user'}/${user?.id}`} 
                    target="_blank" 
                    className="w-full flex justify-center items-center py-2 text-primary hover:text-primary/80 font-medium"
                  >
                    Visit Portfolio <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>Manage your portfolio with these shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                <Link to="/profile" className="group flex flex-col items-center p-4 border border-gray-200 rounded-lg 
                transition-all duration-200 hover:border-primary/50 hover:bg-gray-50 hover:shadow-md">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-3 group-hover:bg-primary/20">
                    <Edit className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-center">Edit Profile</span>
                </Link>

                <Link to="/templates" className="group flex flex-col items-center p-4 border border-gray-200 rounded-lg 
                transition-all duration-200 hover:border-primary/50 hover:bg-gray-50 hover:shadow-md">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-3 group-hover:bg-primary/20">
                    <Grid className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-center">Change Template</span>
                </Link>

                <Link to="/preview" className="group flex flex-col items-center p-4 border border-gray-200 rounded-lg 
                transition-all duration-200 hover:border-primary/50 hover:bg-gray-50 hover:shadow-md">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-3 group-hover:bg-primary/20">
                    <Eye className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-center">Preview Portfolio</span>
                </Link>

                <Link to="/payment/request" className="group flex flex-col items-center p-4 border border-gray-200 rounded-lg 
                transition-all duration-200 hover:border-primary/50 hover:bg-gray-50 hover:shadow-md">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-3 group-hover:bg-primary/20">
                    <Crown className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-center">Upgrade Plan</span>
                </Link>

                <Link to="/resume" className="group flex flex-col items-center p-4 border border-gray-200 rounded-lg 
                transition-all duration-200 hover:border-primary/50 hover:bg-gray-50 hover:shadow-md">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-3 group-hover:bg-primary/20">
                    <FileText className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-center">Generate Resume</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Resources & Tips */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Tips to Enhance Your Portfolio
              </CardTitle>
              <CardDescription>Simple steps to make your profile stand out</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-5 border border-gray-200 rounded-lg">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full mr-3">
                      <CircleUser className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Complete Your Profile</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Add a professional photo and write a compelling bio that highlights your expertise and personality.
                  </p>
                </div>
                
                <div className="p-5 border border-gray-200 rounded-lg">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-green-100 text-green-600 rounded-full mr-3">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Showcase Your Best Work</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Add detailed descriptions and visuals of your most impressive projects and experiences.
                  </p>
                </div>
                
                <div className="p-5 border border-gray-200 rounded-lg">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-full mr-3">
                      <Code className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Highlight Your Skills</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Categorize your skills and rate your proficiency to give visitors a clear view of your capabilities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default DashboardPage;
