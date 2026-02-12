"use client";
import Footer from "@/components/layout/Footer";
import PublicNavbar from "@/components/layout/PublicNavbar";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Heart,
  Code,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Award,
  Globe,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import Founder from "../../../public/lovable-uploads/Founder.jpg";

const AboutPage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const imageScaleVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-white">
      {/* Navigation - Placeholder */}
      <PublicNavbar />

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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 font-medium text-sm mb-4">
              OUR STORY
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LinkedFolio
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              We're dedicated to empowering individuals like you to craft
              compelling online portfolios that truly reflect your unique
              skills, experiences, and aspirations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="space-y-6"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-500/10 text-blue-700 font-medium text-sm">
                OUR JOURNEY
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                The LinkedFolio Story
              </h2>
              <p className="text-lg text-gray-600">
                LinkedFolio emerged from a simple yet powerful realization:
                showcasing your professional journey shouldn't be a technical
                hurdle. In today's dynamic landscape, a strong online presence
                is paramount, and we believe everyone deserves the tools to
                present their narrative effectively.
              </p>
              <p className="text-lg text-gray-600">
                Our founder, Dhikshith, a seasoned Full Stack Developer with a
                keen interest in AI and Cloud Architecture, recognized the gap
                between talent and its effective presentation online. Witnessing
                countless individuals struggle to translate their real-world
                achievements into a captivating digital showcase, the vision for
                LinkedFolio began to take shape.
              </p>
              <p className="text-lg text-gray-600">
                The idea was to create a platform that puts you in control.
                LinkedFolio offers the flexibility to build a portfolio that's
                authentically yours, highlighting the details you want to
                emphasize, without the constraints of standardized professional
                networking sites.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/features"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 mt-4"
                >
                  Explore our features
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
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Creative team collaboration"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium">Our mission</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder's Vision Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-purple-500/10 text-purple-700 font-medium text-sm mb-4">
              LEADERSHIP
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the Founder
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-10"></div>
                  <div className="p-8 relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-white shadow-lg">
                      <img
                        src={Founder}
                        alt="Dhikshith"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center mt-4">
                      Dhikshith
                    </h3>
                    <p className="text-purple-600 font-medium text-center">
                      Full Stack Developer, AI Enthusiast, Cloud Architect
                    </p>
                    <div className="flex justify-center space-x-3 mt-4">
                      <a
                        href={"https://www.linkedin.com/in/deekshithg3/"}
                        target="_blank"
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a
                        href={"#"}
                        target="_blank"
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <a
                        href={"#"}
                        target="_blank"
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-800">
                      A Vision for Professional Empowerment
                    </h4>
                    <p className="text-gray-600">
                      Driven by a deep understanding of both technology and the
                      aspirations of professionals, Dhikshith envisioned
                      LinkedFolio as more than just a portfolio builder. It's a
                      platform crafted with a developer's precision, an AI
                      enthusiast's eye for smart presentation, and a cloud
                      architect's focus on scalability and reliability.
                    </p>
                    <p className="text-gray-600">
                      His goal is to empower you to take control of your
                      narrative and showcase your unique value in a way that
                      resonates with potential employers, clients, and
                      collaborators.
                    </p>
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "I believe that your portfolio should be as dynamic and
                        individual as you are. LinkedFolio is built on the
                        principle of empowering you with creative freedom and a
                        platform that grows with your career."
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-1">
                        <Code className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">
                          Full Stack Development
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-1">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">
                          AI Integration
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-1">
                        <Globe className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">
                          Cloud Architecture
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 font-medium text-sm mb-4">
              OUR PRINCIPLES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Values That Drive Us
            </h2>
            <p className="text-lg text-gray-600">
              These principles guide everything we do at LinkedFolio, from
              product development to customer support.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mb-6">
                <Code className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Empowerment</h3>
              <p className="text-gray-600">
                We put you in control of your portfolio, allowing you to
                showcase exactly what you want, the way you want. Your
                professional story should be told your way.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center mb-6">
                <Lightbulb className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We are constantly exploring new features and technologies to
                help you create even more impactful portfolios that stand out in
                a competitive landscape.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center mb-6">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We strive to make portfolio creation accessible to everyone,
                regardless of their technical expertise or background. Your
                skills should shine, not your coding ability.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 text-white flex items-center justify-center mb-6">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Focus on You</h3>
              <p className="text-gray-600">
                Your success is our priority. We're building LinkedFolio to help
                you achieve your professional goals and advance your career
                through effective self-presentation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
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
              OUR ACHIEVEMENTS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Milestones & Recognition
            </h2>
            <p className="text-lg text-gray-600">
              Our journey has been marked by continuous growth and improvement,
              driven by our commitment to helping professionals showcase their
              best selves.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>

              {/* Timeline items */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="space-y-12"
              >
                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-4 border-blue-500"></div>
                  <div className="ml-auto mr-8 md:mr-auto md:ml-8 md:w-1/2 bg-white rounded-xl p-6 shadow-md">
                    <div className="text-sm font-medium text-blue-600 mb-1">
                      2023
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      LinkedFolio Launch
                    </h3>
                    <p className="text-gray-600">
                      After months of development and testing, we officially
                      launched LinkedFolio with our core portfolio building
                      features.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-4 border-purple-500"></div>
                  <div className="mr-auto ml-8 md:ml-auto md:mr-8 md:w-1/2 bg-white rounded-xl p-6 shadow-md">
                    <div className="text-sm font-medium text-purple-600 mb-1">
                      2023
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      1,000+ Users Milestone
                    </h3>
                    <p className="text-gray-600">
                      We celebrated our first major user milestone, with
                      professionals from various industries creating their
                      portfolios on our platform.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-4 border-blue-500"></div>
                  <div className="ml-auto mr-8 md:mr-auto md:ml-8 md:w-1/2 bg-white rounded-xl p-6 shadow-md">
                    <div className="text-sm font-medium text-blue-600 mb-1">
                      2024
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      ATS Optimization Feature
                    </h3>
                    <p className="text-gray-600">
                      We introduced our innovative ATS optimization tools,
                      helping users create resumes that effectively pass through
                      applicant tracking systems.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-4 border-purple-500"></div>
                  <div className="mr-auto ml-8 md:ml-auto md:mr-8 md:w-1/2 bg-white rounded-xl p-6 shadow-md">
                    <div className="text-sm font-medium text-purple-600 mb-1">
                      2024
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Featured in Tech Innovators
                    </h3>
                    <p className="text-gray-600">
                      LinkedFolio was recognized as one of the top emerging
                      career tech platforms by Tech Innovators magazine.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our Story?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Become part of the LinkedFolio community and start building a
              portfolio that truly represents your professional journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg inline-flex items-center"
                >
                  Create Your Portfolio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-all inline-flex items-center"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
            <p className="mt-4 text-sm opacity-80">
              No credit card required. Free forever plan available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
