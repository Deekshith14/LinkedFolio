// import React, { useState } from 'react';
// import PublicNavbar from '@/components/layout/PublicNavbar';
// import Footer from '@/components/layout/Footer';
// import { Mail, MapPin, Phone, Send } from 'lucide-react';
// import { toast } from '@/components/ui/use-toast';

// const ContactPage: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate form submission
//     try {
//       // In a real implementation, you would send this data to your backend
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       toast({
//         title: 'Message Sent Successfully!',
//         description: "We've received your message and will get back to you as soon as possible.",
//       });

//       // Reset form
//       setFormData({
//         name: '',
//         email: '',
//         subject: '',
//         message: '',
//       });
//     } catch (error) {
//       toast({
//         title: 'Error Sending Message',
//         description: 'Oops! Something went wrong. Please try again later.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <PublicNavbar />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-white to-indigo-50">
//         <div className="container-custom section-padding">
//           <div className="text-center max-w-3xl mx-auto">
//             <h1 className="heading-xl mb-6">
//               Connect with <span className="text-indigo-600">LinkedFolio</span>
//             </h1>
//             <p className="text-lead">
//               We're here to answer your questions, address your concerns, and hear your feedback. Let's start a conversation!
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Contact Form & Information Section */}
//       <section className="section-padding bg-white">
//         <div className="container-custom">
//           <div className="grid md:grid-cols-2 gap-12">
//             {/* Contact Information */}
//             <div className="rounded-lg shadow-md p-8">
//               <h2 className="heading-lg mb-6">Get in Touch</h2>
//               <p className="text-gray-700 mb-8">
//                 We're committed to providing excellent support. Please use the following options to reach out to us. We aim to respond within one business day.
//               </p>

//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 mt-1">
//                     <Mail className="h-6 w-6 text-indigo-500" />
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-lg font-semibold">Email Us</h3>
//                     <p className="text-gray-600">linkedfolio2613@gmail.com</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 mt-1">
//                     <Phone className="h-6 w-6 text-indigo-500" />
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-lg font-semibold">Call Us</h3>
//                     <p className="text-gray-600">+91 9392398750</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 mt-1">
//                     <MapPin className="h-6 w-6 text-indigo-500" />
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-lg font-semibold">Our Office</h3>
//                     <p className="text-gray-600">
//                       Hyderabad, Telangana, India
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="rounded-lg shadow-md p-8">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
//                     Your Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     placeholder="Enter your name"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     placeholder="Enter your email"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">
//                     Subject
//                   </label>
//                   <select
//                     id="subject"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   >
//                     <option value="">Select a subject</option>
//                     <option value="General Inquiry">General Inquiry</option>
//                     <option value="Account Support">Account Support</option>
//                     <option value="Technical Issue">Technical Issue</option>
//                     <option value="Feature Suggestion">Feature Suggestion</option>
//                     <option value="Business Partnership">Business Partnership</option>
//                   </select>
//                 </div>

//                 <div className="mb-6">
//                   <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
//                     Your Message
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows={5}
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     placeholder="Type your message here"
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//                 >
//                   {isSubmitting ? (
//                     <span className="inline-block align-middle">
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                       </svg>
//                       Sending...
//                     </span>
//                   ) : (
//                     'Send Message'
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="section-padding bg-gray-50">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
//             <p className="text-lead max-w-3xl mx-auto">
//               Find quick answers to common questions about LinkedFolio and how we can help you.
//             </p>
//           </div>

//           <div className="max-w-3xl mx-auto space-y-6">
//             <div className="card-default p-6 rounded-lg">
//               <h3 className="heading-sm mb-2">How quickly can I expect a response?</h3>
//               <p className="text-gray-700">
//                 We strive to respond to all inquiries within one business day. We appreciate your patience.
//               </p>
//             </div>

//             <div className="card-default p-6 rounded-lg">
//               <h3 className="heading-sm mb-2">Do you offer phone support?</h3>
//               <p className="text-gray-700">
//                 Yes, we offer phone support for our paid plan users. Free users can contact us via email or this form.
//               </p>
//             </div>

//             <div className="card-default p-6 rounded-lg">
//               <h3 className="heading-sm mb-2">I'm experiencing a technical issue. What should I do?</h3>
//               <p className="text-gray-700">
//                 Please provide as much detail as possible about the issue, including your browser, device, and any error messages. Screenshots are very helpful!
//               </p>
//             </div>

//             <div className="card-default p-6 rounded-lg">
//               <h3 className="heading-sm mb-2">Can I suggest a new feature for LinkedFolio?</h3>
//               <p className="text-gray-700">
//                 Absolutely! We welcome your suggestions. Please submit them through this form and select "Feature Suggestion" as the subject.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default ContactPage;



"use client"
import { motion } from "framer-motion"
import type React from "react"

import { Mail, MapPin, Phone, Send, ArrowRight, Clock, HelpCircle, Sparkles, CheckCircle } from "lucide-react"

import { useState } from "react"
import Footer from "@/components/layout/Footer"
import { Link } from "react-router-dom"
import PublicNavbar from "@/components/layout/PublicNavbar"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const formItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const faqVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      // In a real implementation, you would send this data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
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
              GET IN TOUCH
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Connect with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LinkedFolio
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              We're here to answer your questions, address your concerns, and hear your feedback. Let's start a
              conversation!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Information Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 opacity-10 rounded-full transform -translate-x-10 translate-y-10"></div>
              
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We're committed to providing excellent support. Please use the following options to reach out to us. We
                aim to respond within one business day.
              </p>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
                    <p className="text-gray-600 mt-1">linkedfolio2613@gmail.com</p>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
                    <p className="text-gray-600 mt-1">+91 9392398750</p>
                    <p className="text-sm text-gray-500 mt-1">Monday-Friday, 9AM-6PM IST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-800">Our Office</h3>
                    <p className="text-gray-600 mt-1">Hyderabad, Telangana, India</p>
                    <p className="text-sm text-gray-500 mt-1">Tech Hub, Innovation District</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-blue-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="bg-white rounded-2xl shadow-lg p-8 relative"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out! We've received your message and will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
                  <p className="text-gray-600 mb-8">
                    Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <motion.div variants={formItemVariant} className="mb-6">
                      <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter your name"
                      />
                    </motion.div>

                    <motion.div variants={formItemVariant} className="mb-6">
                      <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter your email"
                      />
                    </motion.div>

                    <motion.div variants={formItemVariant} className="mb-6">
                      <label htmlFor="subject" className="block text-gray-700 text-sm font-medium mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Account Support">Account Support</option>
                        <option value="Technical Issue">Technical Issue</option>
                        <option value="Feature Suggestion">Feature Suggestion</option>
                        <option value="Business Partnership">Business Partnership</option>
                      </select>
                    </motion.div>

                    <motion.div variants={formItemVariant} className="mb-6">
                      <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Type your message here"
                      ></textarea>
                    </motion.div>

                    <motion.div variants={formItemVariant}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </button>
                    </motion.div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Questions</h2>
            <p className="text-lg text-gray-600">
              Find quick answers to common questions about LinkedFolio and how we can help you.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-6"
          >
            <motion.div
              variants={faqVariant}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">How quickly can I expect a response?</h3>
                  <p className="text-gray-600">
                    We strive to respond to all inquiries within one business day. For urgent matters, our Pro and
                    Enterprise customers have access to priority support channels.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={faqVariant}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Do you offer phone support?</h3>
                  <p className="text-gray-600">
                    Yes, we offer phone support for our paid plan users. Free users can contact us via email or this
                    form. Our phone support hours are Monday through Friday, 9AM to 6PM IST.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={faqVariant}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">I'm experiencing a technical issue. What should I do?</h3>
                  <p className="text-gray-600">
                    Please provide as much detail as possible about the issue, including your browser, device, and any
                    error messages. Screenshots are very helpful! Our technical team will work to resolve your issue as
                    quickly as possible.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={faqVariant}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Can I suggest a new feature for LinkedFolio?</h3>
                  <p className="text-gray-600">
                    We welcome your suggestions. Please submit them through this form and select "Feature
                    Suggestion" as the subject. We review all feature requests and prioritize them based on user demand
                    and alignment with our product roadmap.
                  </p>
                </div>
              </div>
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
              Join thousands of professionals who are using LinkedFolio to showcase their skills and advance their
              careers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg inline-flex items-center"
                >
                  Create Your Portfolio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/features"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-all inline-flex items-center"
                >
                  Explore Features
                </Link>
              </motion.div>
            </div>
            <p className="mt-4 text-sm opacity-80">No credit card required. Free forever plan available.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;



