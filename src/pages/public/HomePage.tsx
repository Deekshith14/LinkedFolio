
// import React from 'react';
// import { Link } from 'react-router-dom';
// import PublicNavbar from '@/components/layout/PublicNavbar';
// import Footer from '@/components/layout/Footer';
// import { CheckCircle, User, Briefcase, Sparkles, Award, Share2 } from 'lucide-react';

// const HomePage: React.FC = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <PublicNavbar />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-white to-blue-50">
//         <div className="container-custom section-padding">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div className="animate-fade-in">
//               <h1 className="heading-xl mb-6 text-gray-900">
//                 Build Your Professional
//                 <span className="text-primary"> Portfolio </span>
//                 with Ease
//               </h1>
//               <p className="text-lead mb-8">
//                 Create a stunning portfolio in minutes, not hours. PortifyPro helps you showcase your skills and experience to stand out in today's competitive market.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <Link to="/signup" className="btn-primary">
//                   Get Started Free
//                 </Link>
//                 <Link to="/features" className="btn-outline">
//                   Explore Features
//                 </Link>
//               </div>
//               <div className="flex items-center mt-8 text-sm text-gray-600">
//                 <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//                 <span>No credit card required</span>
//               </div>
//             </div>

//             <div className="animate-slide-up md:pl-8">
//               <div className="relative">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25"></div>
//                 <div className="relative bg-white rounded-lg overflow-hidden shadow-xl">
//                   <img
//                     src="https://imgs.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
//                     alt="Portfolio example"
//                     className="w-full h-auto object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Overview Section */}
//       <section className="section-padding bg-white">
//         <div className="container-custom">
//           <div className="text-center mb-16">
//             <h2 className="heading-lg mb-4">Why Choose PortifyPro?</h2>
//             <p className="text-lead max-w-3xl mx-auto">
//               Everything you need to create a professional portfolio that showcases your skills and experience.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="card-default">
//               <div className="feature-icon">
//                 <User />
//               </div>
//               <h3 className="heading-sm mb-2">LinkedIn Integration</h3>
//               <p className="text-body">
//                 Import your professional details directly from LinkedIn with just a click. Keep everything in sync automatically.
//               </p>
//             </div>

//             <div className="card-default">
//               <div className="feature-icon">
//                 <Briefcase />
//               </div>
//               <h3 className="heading-sm mb-2">Professional Templates</h3>
//               <p className="text-body">
//                 Choose from a variety of professionally designed templates that are optimized for different industries.
//               </p>
//             </div>

//             <div className="card-default">
//               <div className="feature-icon">
//                 <Sparkles />
//               </div>
//               <h3 className="heading-sm mb-2">Customization Options</h3>
//               <p className="text-body">
//                 Personalize your portfolio with custom colors, fonts, and layouts that match your personal brand.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="section-padding bg-gray-50">
//         <div className="container-custom">
//           <div className="text-center mb-16">
//             <h2 className="heading-lg mb-4">Our Users Love Us</h2>
//             <p className="text-lead max-w-3xl mx-auto">
//               See what professionals and students are saying about their experience with PortifyPro.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="card-default">
//               <div className="flex items-center mb-4">
//                 <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
//                   JD
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Jane Doe</h4>
//                   <p className="text-sm text-gray-500">Software Engineer</p>
//                 </div>
//               </div>
//               <p className="text-body">
//                 "PortifyPro made creating my professional portfolio so easy. I was able to import my LinkedIn profile and make a few tweaks to have a stunning site ready to share."
//               </p>
//             </div>

//             <div className="card-default">
//               <div className="flex items-center mb-4">
//                 <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
//                   JS
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">John Smith</h4>
//                   <p className="text-sm text-gray-500">UX Designer</p>
//                 </div>
//               </div>
//               <p className="text-body">
//                 "As a designer, I was impressed with the quality of the templates. They're clean, professional, and really showcase my work in the best light."
//               </p>
//             </div>

//             <div className="card-default">
//               <div className="flex items-center mb-4">
//                 <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
//                   AJ
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Amy Johnson</h4>
//                   <p className="text-sm text-gray-500">CS Student</p>
//                 </div>
//               </div>
//               <p className="text-body">
//                 "As a student about to graduate, PortifyPro helped me showcase my projects and skills in a professional way that really impressed potential employers."
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="section-padding bg-gradient-to-br from-primary to-secondary text-white">
//         <div className="container-custom text-center">
//           <h2 className="heading-lg mb-6">Ready to Showcase Your Professional Journey?</h2>
//           <p className="text-lead mb-8 max-w-3xl mx-auto">
//             Join thousands of professionals who are using PortifyPro to advance their careers with a stunning online portfolio.
//           </p>
//           <Link to="/signup" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-md transition-all inline-block">
//             Create Your Portfolio Free
//           </Link>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default HomePage;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import PublicNavbar from '@/components/layout/PublicNavbar';
// import Footer from '@/components/layout/Footer';
// import { User, Briefcase, Paintbrush, LayoutDashboard, Share2, CheckCircle2 } from 'lucide-react'; // Changed icons

// const HomePage: React.FC = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <PublicNavbar />

//       {/* Hero Section */}
      

// {/* Hero Section */}
// <section className="bg-gradient-to-br from-indigo-50 to-purple-100 py-24">
//   <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
//     <div className="animate-fade-in">
//       <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
//         Your <span className="text-gradient">Digital Identity</span>, Perfected.
//       </h1>
//       <p className="text-lg text-gray-700 mb-6">
//         LinkedFolio helps you stand out with beautiful, ATS-optimized portfolios, resumes, and CVs — all powered by intelligent design and AI.
//       </p>
//       <div className="flex gap-4 flex-wrap">
//         <Link to="/signup" className="btn-primary">Get Started Free</Link>
//         <Link to="/demo" className="btn-outline">Watch Demo</Link>
//       </div>
//       <div className="mt-4 text-sm text-gray-600 flex items-center">
//         <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
//         No credit card required – it's 100% free to try
//       </div>
//     </div>

//     <div className="animate-slide-up">
//       <img src="/lovable-uploads/LF.jpg" alt="LinkedFolio Demo" className="w-full rounded-lg shadow-xl border" />
//     </div>
//   </div>
// </section>


//       {/* Features Overview Section */}
//       <section className="section-padding bg-white">
//   <div className="container-custom">
//     <h2 className="heading-lg text-center mb-12">Everything You Need, All in One Place</h2>
//     <div className="grid md:grid-cols-3 gap-10">
//       {[
//         {
//           title: "One-Click Resume & CV",
//           icon: <Briefcase />,
//           desc: "Generate beautiful, ATS-friendly resumes and CVs instantly. Export PDF or share as a web link.",
//         },
//         {
//           title: "AI-Powered Rewrites",
//           icon: <Paintbrush />,
//           desc: "Let our AI rewrite your bio or job descriptions to make them sound more professional and polished.",
//         },
//         {
//           title: "ATS Score Analyzer",
//           icon: <Share2 />,
//           desc: "Upload your resume and get real-time ATS compatibility scores with actionable suggestions.",
//         },
//       ].map(({ title, icon, desc }, i) => (
//         <div key={i} className="card-default hover:shadow-xl transition-all duration-200">
//           <div className="feature-icon mb-4">{icon}</div>
//           <h3 className="text-xl font-semibold mb-2">{title}</h3>
//           <p className="text-body text-gray-600">{desc}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>


//       {/* Testimonials Section */}
//       <section className="section-padding bg-gray-50">
//         <div className="container-custom">
//           <div className="text-center mb-16">
//             <h2 className="heading-lg mb-4">What Our Users Are Saying</h2>
//             <p className="text-lead max-w-3xl mx-auto">
//               See how professionals and creatives are using LinkedFolio to showcase their work and advance their careers.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="card-default">
//               <div className="flex items-center mb-4">
//                 <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 mr-4">
//                   JD
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Jane Doe</h4>
//                   <p className="text-sm text-gray-500">Software Engineer</p>
//                 </div>
//               </div>
//               <p className="text-body">
//                 "LinkedFolio gave me the platform to highlight my projects and skills effectively. It helped me land my dream job!"
//               </p>
//             </div>

//             <div className="card-default">
//               <div className="flex items-center mb-4">
//                 <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 mr-4">
//                   JS
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">John Smith</h4>
//                   <p className="text-sm text-gray-500">UX Designer</p>
//                 </div>
//               </div>
//               <p className="text-body">
//                 "The templates are fantastic! They're clean, professional, and allowed me to create a portfolio that truly reflects my design aesthetic."
//               </p>
//             </div>

//             <div className="card-default">
//               <div className="flex items-center mb-4">
//                 <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 mr-4">
//                   AR
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Amy Rodriguez</h4>
//                   <p className="text-sm text-gray-500">Web Developer</p>
//                 </div>
//               </div>
//               <p className="text-body">
//                 "LinkedFolio is so easy to use! I was able to build a portfolio in a day, and it looks amazing. Highly recommend it!"
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="section-padding bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
//         <div className="container-custom text-center">
//           <h2 className="heading-lg mb-6">Ready to Take Control of Your Online Presence?</h2>
//           <p className="text-lead mb-8 max-w-3xl mx-auto">
//             Join the LinkedFolio community and build a portfolio that showcases your unique talents and propels your career forward.
//           </p>
//           <Link to="/signup" className="bg-white text-indigo-500 hover:bg-gray-100 font-semibold py-3 px-8 rounded-md transition-all inline-block">
//             Start Your Free Portfolio
//           </Link>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default HomePage;



"use client"
import { motion } from "framer-motion"
import {
  FileText,
  Award,
  CheckCircle,
  Sparkles,
  ArrowRight,
  BarChart3,
  FileCheck,
  Layers,
  Share2,
  Star,
} from "lucide-react"
import { Link } from "react-router-dom"
import PublicNavbar from '@/components/layout/PublicNavbar';
import Footer from '@/components/layout/Footer';
import Preview from '../../../public/lovable-uploads/port-preview.png';
import PreviewVedio from '../../../public/lovable-uploads/preview-vedio.mp4';


const HomePage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-white">
     
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-70"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-300 opacity-10"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 8,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-300 opacity-10"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 10,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 font-medium text-sm">
                Your Professional Digital Presence
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Elevate Your Career with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LinkedFolio
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-xl">
                Create stunning portfolios, ATS-optimized resumes, and professional CVs that showcase your skills and
                experience in the best light.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/signup"
                    className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/demo"
                    className="inline-flex items-center bg-white text-gray-800 border border-gray-200 font-medium py-3 px-6 rounded-lg transition-all shadow-sm hover:shadow hover:bg-gray-50"
                  >
                    See Examples
                  </Link>
                </motion.div>
              </div>

              <div className="flex items-center pt-4 text-sm text-gray-600 space-x-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Free forever plan</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={scaleUp} className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                {/* <img
                  src={Preview}
                  alt="Professional portfolio example"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                /> */}
                 <video
      src={PreviewVedio} // Replace this with your actual video path
      autoPlay
      loop
      muted
      playsInline
      width={600}
      height={400}
      className="w-full h-auto object-cover"
    ></video>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <div className="text-sm font-medium text-blue-300">PORTFOLIO PREVIEW</div>
                    <h3 className="text-xl font-bold">John Doe</h3>
                    <p className="text-sm opacity-90">Full Stack Developer</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-3 border border-gray-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">98% ATS Score</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-3 border border-gray-100"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-2">
                  <FileCheck className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">Resume Ready</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Trusted by section */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mt-20 text-center">
            <p className="text-sm font-medium text-gray-500 mb-6">TRUSTED BY PROFESSIONALS FROM</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
              <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/file-google-logo-svg-wikimedia-commons-23.png"
                alt="Google"
                width={120}
                height={40}
                className="h-6 w-auto"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                alt="Netflix"
                width={120}
                height={40}
                className="h-7 w-auto"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png"
                alt="Microsoft"
                width={120}
                height={40}
                className="h-6 w-auto"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
                alt="Amazon"
                width={120}
                height={40}
                className="h-7 w-auto"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png"
                alt="Apple"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 font-medium text-sm mb-4">
              POWERFUL FEATURES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Stand Out</h2>
            <p className="text-lg text-gray-600">
              LinkedFolio provides all the tools you need to create a professional online presence that gets you noticed
              by recruiters and hiring managers.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mb-4">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Beautiful Portfolios</h3>
              <p className="text-gray-600">
                Create stunning, responsive portfolios that showcase your work, skills, and experience in a professional
                way.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Customizable templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Project showcases</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Custom domain support</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">ATS-Optimized Resumes</h3>
              <p className="text-gray-600">
                Generate professional resumes that pass through Applicant Tracking Systems and catch recruiters'
                attention.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">ATS compatibility check</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Keyword optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Multiple export formats</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional CVs</h3>
              <p className="text-gray-600">
                Create comprehensive CVs that highlight your academic and professional achievements in detail.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Academic templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Publication listings</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">International formats</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">ATS Score Checker</h3>
              <p className="text-gray-600">
                Analyze your resume against job descriptions to ensure it passes through ATS filters with a high score.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Job description matching</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Improvement suggestions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Keyword analysis</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Suggestions</h3>
              <p className="text-gray-600">
                Get intelligent recommendations to improve your resume, CV, and portfolio based on industry standards.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Content improvement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Industry-specific advice</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Formatting suggestions</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Sharing</h3>
              <p className="text-gray-600">
                Share your portfolio, resume, and CV with recruiters and hiring managers with just a few clicks.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Direct link sharing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Social media integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Email templates</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 font-medium text-sm mb-4">
              SIMPLE PROCESS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How LinkedFolio Works</h2>
            <p className="text-lg text-gray-600">Create your professional online presence in just a few simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="text-center"
            >
              <div className="relative mx-auto mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div className="hidden md:block absolute top-8 left-full w-full border-t-2 border-dashed border-blue-200"></div>
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Account</h3>
              <p className="text-gray-600">
                Sign up for free and set up your profile with your basic information and professional details.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="text-center"
            >
              <div className="relative mx-auto mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="hidden md:block absolute top-8 left-full w-full border-t-2 border-dashed border-blue-200"></div>
              </div>
              <h3 className="text-xl font-bold mb-3">Build Your Assets</h3>
              <p className="text-gray-600">
                Create your portfolio, resume, and CV using our intuitive builder and professional templates.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="text-center"
            >
              <div className="relative mx-auto mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Share & Get Hired</h3>
              <p className="text-gray-600">
                Share your professional assets with recruiters and hiring managers to land your dream job.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 font-medium text-sm mb-4">
              SUCCESS STORIES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Are Saying</h2>
            <p className="text-lg text-gray-600">
              Join thousands of professionals who have advanced their careers with LinkedFolio
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Testimonial 1 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold mr-4">
                  JD
                </div>
                <div>
                  <h4 className="font-bold">Jane Doe</h4>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600">
                "LinkedFolio transformed my job search. The ATS optimization feature helped my resume get through to
                hiring managers, and my portfolio showcased my projects perfectly. I landed interviews at top tech
                companies within weeks!"
              </p>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                  MS
                </div>
                <div>
                  <h4 className="font-bold">Michael Smith</h4>
                  <p className="text-sm text-gray-500">UX Designer</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600">
                "As a designer, I needed a portfolio that would showcase my work beautifully. LinkedFolio's templates
                are clean, professional, and fully customizable. The CV generator also helped me create a comprehensive
                document for academic applications."
              </p>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                  AR
                </div>
                <div>
                  <h4 className="font-bold">Amanda Rodriguez</h4>
                  <p className="text-sm text-gray-500">Marketing Manager</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600">
                "The ATS score checker was a game-changer for me. I was able to optimize my resume for each job
                application and saw my interview callback rate increase by 70%. LinkedFolio is now my go-to tool for all
                my career documents."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Professional Presence?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who are using LinkedFolio to showcase their skills, experience, and
              projects.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link
                to="/signup"
                className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg inline-flex items-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            <p className="mt-4 text-sm opacity-80">No credit card required. Free forever plan available.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LF.jpg-02eNY5Xa91yUvk9aVnusIvx0YMvAsi.jpeg"
                  alt="LinkedFolio Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="font-bold text-xl text-white">LinkedFolio</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Create professional portfolios, resumes, and CVs that help you stand out and advance your career.
              </p>
              <div className="flex space-x-4">
                <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    Examples
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    ATS Checker
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    Career Tips
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    Resume Guide
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    Portfolio Best Practices
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="text-gray-400 hover:text-white transition-colors">
                    ATS Optimization
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} LinkedFolio. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to={"#"} className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to={"#"} className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to={"#"} className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer> */}
      <Footer/>
    </div>
  )
}

export default HomePage

