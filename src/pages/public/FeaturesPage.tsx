"use client"
import Footer from "@/components/layout/Footer"
import PublicNavbar from "@/components/layout/PublicNavbar"
import { motion } from "framer-motion"
import {
  Edit,
  BarChart,
  FileText,
  Smartphone,
  Key,
  Zap,
  Globe,
  Award,
  FileCheck,
  Layers,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react"
import { Link } from "react-router-dom"


const FeaturesPage = () => {
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

  const featureCardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const imageScaleVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-white">
      {/* Navigation - Placeholder */}
     

      <PublicNavbar/>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
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
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 font-medium text-sm mb-4">
              POWERFUL FEATURES
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Everything You Need for Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Professional Journey
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Discover the comprehensive tools and features that LinkedFolio provides to create stunning portfolios,
              ATS-optimized resumes, and professional CVs.
            </p>
          </motion.div>

          {/* Feature Categories */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            <motion.div
              variants={featureCardVariant}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mx-auto mb-4">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="font-bold">Portfolio Builder</h3>
            </motion.div>

            <motion.div
              variants={featureCardVariant}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-bold">Resume Generator</h3>
            </motion.div>

            <motion.div
              variants={featureCardVariant}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold">CV Creator</h3>
            </motion.div>

            <motion.div
              variants={featureCardVariant}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 text-white flex items-center justify-center mx-auto mb-4">
                <BarChart className="h-6 w-6" />
              </div>
              <h3 className="font-bold">ATS Checker</h3>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-32">
            {/* Feature 1: Intuitive Builder */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="space-y-6"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-500/10 text-blue-700 font-medium text-sm">
                  INTUITIVE BUILDER
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Create Your Portfolio in Minutes</h2>
                <p className="text-lg text-gray-600">
                  Our user-friendly interface makes it easy to create a polished portfolio without any technical skills.
                  Simply add your details, customize your design, and publish your online presence.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Drag-and-Drop Interface</h3>
                      <p className="text-gray-600">Easily arrange sections with intuitive drag-and-drop controls</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Real-Time Preview</h3>
                      <p className="text-gray-600">See changes instantly as you build your portfolio</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">No Coding Required</h3>
                      <p className="text-gray-600">Create professional portfolios without any technical knowledge</p>
                    </div>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/demo" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                    Try the builder demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={imageScaleVariant}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Intuitive Builder Interface"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium">Easy to use</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Feature 2: Template Variety */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={imageScaleVariant}
                className="relative order-2 md:order-1"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                  <div className="grid grid-cols-2 gap-2 p-2">
                    <div className="rounded-lg overflow-hidden shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Portfolio Template 1"
                        width={300}
                        height={200}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Portfolio Template 2"
                        width={300}
                        height={200}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Portfolio Template 3"
                        width={300}
                        height={200}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Portfolio Template 4"
                        width={300}
                        height={200}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="space-y-6 order-1 md:order-2"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-purple-500/10 text-purple-700 font-medium text-sm">
                  DIVERSE TEMPLATES
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Templates for Every Industry</h2>
                <p className="text-lg text-gray-600">
                  Choose from a rich selection of professionally designed templates tailored for various industries and
                  styles. Personalize them to reflect your unique brand and preferences.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Industry-Specific Designs</h3>
                      <p className="text-gray-600">
                        Templates optimized for designers, developers, writers, artists, and more
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Premium & Free Options</h3>
                      <p className="text-gray-600">A wide range of templates to suit every need and budget</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Responsive Design</h3>
                      <p className="text-gray-600">All templates look stunning on any device</p>
                    </div>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/templates"
                    className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700"
                  >
                    Browse template gallery
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Feature 3: ATS Optimization */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="space-y-6"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-500/10 text-blue-700 font-medium text-sm">
                  ATS OPTIMIZATION
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Get Past the Resume Robots</h2>
                <p className="text-lg text-gray-600">
                  Our ATS optimization tools ensure your resume gets past Applicant Tracking Systems and into the hands
                  of hiring managers, increasing your chances of landing interviews.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Keyword Analysis</h3>
                      <p className="text-gray-600">Match your resume to job descriptions for higher ATS scores</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Format Optimization</h3>
                      <p className="text-gray-600">ATS-friendly formatting that ensures your resume gets read</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Score Improvement Tips</h3>
                      <p className="text-gray-600">Actionable suggestions to improve your ATS compatibility</p>
                    </div>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/ats-checker"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                  >
                    Try ATS checker
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={imageScaleVariant}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 p-6">
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-800">ATS Score Analysis</h3>
                      <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">92%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-800">Keyword Match</h4>
                        <p className="text-sm text-gray-600">
                          Your resume contains 18/20 key skills mentioned in the job description
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-800">Format Compatibility</h4>
                        <p className="text-sm text-gray-600">Your resume format is fully ATS-compatible</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Sparkles className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-800">Improvement Suggestion</h4>
                        <p className="text-sm text-gray-600">
                          Consider adding "project management" to your skills section
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Feature 4: Sharing & Integration */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={imageScaleVariant}
                className="relative order-2 md:order-1"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 p-6">
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <h3 className="font-bold text-gray-800">Your Custom URL</h3>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white border border-gray-200 rounded-l-lg py-2 px-3 flex-grow text-gray-700">
                        linkedfolio.com/johndoe
                      </div>
                      <button className="bg-blue-600 text-white py-2 px-3 rounded-r-lg text-sm">Copy</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-800">Share Your Portfolio</h4>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-blue-100 text-blue-800 rounded-lg py-2 px-4 flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                        Facebook
                      </div>
                      <div className="bg-blue-100 text-blue-800 rounded-lg py-2 px-4 flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        Twitter
                      </div>
                      <div className="bg-blue-100 text-blue-800 rounded-lg py-2 px-4 flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                        LinkedIn
                      </div>
                      <div className="bg-blue-100 text-blue-800 rounded-lg py-2 px-4 flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                        Website
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="space-y-6 order-1 md:order-2"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-purple-500/10 text-purple-700 font-medium text-sm">
                  SEAMLESS SHARING
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Share Your Work Effortlessly</h2>
                <p className="text-lg text-gray-600">
                  Effortlessly share your LinkedFolio with a personalized URL and integrate it with your existing online
                  profiles and applications to maximize your professional visibility.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Custom Domain</h3>
                      <p className="text-gray-600">Get a personalized URL that matches your personal brand</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Social Media Integration</h3>
                      <p className="text-gray-600">Share directly to LinkedIn, Twitter, Facebook and more</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Embed Options</h3>
                      <p className="text-gray-600">Embed your portfolio in other websites and applications</p>
                    </div>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/sharing"
                    className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700"
                  >
                    Learn about sharing options
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
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
              MORE POWERFUL FEATURES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-gray-600">
              LinkedFolio is packed with additional features designed to help you create a professional and effective
              online presence.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={featureCardVariant}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mb-4">
                <Edit className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rich Content Editor</h3>
              <p className="text-gray-600">
                Our intuitive editor allows you to easily add, edit, and format your portfolio content with text,
                images, videos, and more.
              </p>
            </motion.div>

            <motion.div
              variants={featureCardVariant}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Portfolio Analytics</h3>
              <p className="text-gray-600">
                Gain insights into who's viewing your portfolio, which sections are getting attention, and track your
                reach over time.
              </p>
            </motion.div>

            <motion.div
              variants={featureCardVariant}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Project Showcase</h3>
              <p className="text-gray-600">
                Highlight your best work with dedicated project sections that include images, descriptions, links, and
                technologies used.
              </p>
            </motion.div>

            <motion.div
              variants={featureCardVariant}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center mb-4">
                <Key className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Privacy Controls</h3>
              <p className="text-gray-600">
                Control who can view your portfolio with customizable privacy settings, password protection, and
                selective content visibility.
              </p>
            </motion.div>

            <motion.div
              variants={featureCardVariant}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mobile Responsiveness</h3>
              <p className="text-gray-600">
                Your portfolio will look and function flawlessly on any device, ensuring a professional presentation
                whether viewed on desktop, tablet, or mobile.
              </p>
            </motion.div>

            <motion.div
              variants={featureCardVariant}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Skills & Endorsements</h3>
              <p className="text-gray-600">
                Showcase your skills and collect endorsements from colleagues and clients to build credibility and
                demonstrate your expertise.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Professional Presence?</h2>
            <p className="text-xl mb-8 opacity-90">
              Take the next step in your career journey and create a portfolio that truly showcases your talent and
              potential.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg inline-flex items-center"
                >
                  Start Your Free LinkedFolio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/pricing"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-all inline-flex items-center"
                >
                  Explore Pricing & Plans
                </Link>
              </motion.div>
            </div>
            <p className="mt-4 text-sm opacity-80">No credit card required. Free forever plan available.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}

<Footer/>      
    </div>
  )
}

export default FeaturesPage
