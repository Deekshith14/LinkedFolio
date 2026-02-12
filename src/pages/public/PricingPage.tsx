// import React from 'react';
// import { Link } from 'react-router-dom';
// import PublicNavbar from '@/components/layout/PublicNavbar';
// import Footer from '@/components/layout/Footer';
// import { Check, X } from 'lucide-react';

// const PricingPage: React.FC = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <PublicNavbar />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-white to-indigo-50">
//         <div className="container-custom section-padding">
//           <div className="text-center max-w-3xl mx-auto">
//             <h1 className="heading-xl mb-6">
//               Choose the Perfect Plan for Your <span className="text-indigo-600">LinkedFolio</span>
//             </h1>
//             <p className="text-lead mb-12">
//               We offer flexible pricing options to suit your needs. Start building your portfolio for free and upgrade as you grow.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Pricing Cards Section */}
//       {/* Pricing Cards Section */}
//       <section className="section-padding bg-white">
//         <div className="container-custom">
//           <div className="grid md:grid-cols-3 gap-8">
//             {/* Free Plan */}
//             <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-4">Free</h3>
//                 <div className="mb-6">
//                   <span className="text-4xl font-bold">₹0</span>
//                   <span className="text-gray-500">/forever</span>
//                 </div>
//                 <p className="text-gray-600 mb-8">
//                   Perfect for getting started with your basic portfolio needs.
//                 </p>
//                 <Link
//                   to="/signup"
//                   className="btn-primary w-full block text-center py-3 rounded-md hover:bg-indigo-600 transition-colors duration-300"
//                 >
//                   Get Started
//                 </Link>
//                 <div className="mt-6 border-t border-gray-200 py-4">
//                   <ul className="space-y-3">
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Access to free templates</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Basic portfolio customization</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Standard support</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Basic analytics</span>
//                     </li>
//                     <li className="flex items-center">
//                       <X className="h-5 w-5 text-gray-400 mr-2" />
//                       <span className="text-gray-600">Premium templates</span>
//                     </li>
//                     <li className="flex items-center">
//                       <X className="h-5 w-5 text-gray-400 mr-2" />
//                       <span className="text-gray-600">Custom domain</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Pro Plan */}
//             <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform md:scale-105">
//               <div className="p-6">
//                 <div className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full inline-block mb-4">
//                   Most Popular
//                 </div>
//                 <h3 className="text-2xl font-semibold mb-4">Pro</h3>
//                 <div className="mb-6">
//                   <span className="text-5xl font-bold">₹49</span>
//                   <span className="text-gray-500">/month</span>
//                   <p className="text-sm text-green-600 font-medium mt-1">
//                     Billed monthly
//                   </p>
//                 </div>
//                 <p className="text-gray-700 mb-8">
//                   For professionals who need more customization and features.
//                 </p>
//                 <Link
//                   to="/signup"
//                   className="btn-primary w-full block text-center py-3 rounded-md hover:bg-indigo-600 transition-colors duration-300"
//                 >
//                   Upgrade to Pro
//                 </Link>
//                 <div className="mt-6 border-t border-gray-200 py-4">
//                   <ul className="space-y-3">
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Access to all pro templates</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Advanced portfolio customization</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Priority support</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Advanced analytics</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Custom domain support</span>
//                     </li>
//                     <li className="flex items-center">
//                       <X className="h-5 w-5 text-gray-400 mr-2" />
//                       <span className="text-gray-600">Team collaboration</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Enterprise Plan */}
//             <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
//                 <div className="mb-6">
//                   <span className="text-4xl font-bold">₹99</span>
//                   <span className="text-gray-500">/month</span>
//                   <p className="text-sm text-green-600 font-medium mt-1">
//                     Billed monthly
//                   </p>
//                 </div>
//                 <p className="text-gray-600 mb-8">
//                   The complete solution for teams and power users.
//                 </p>
//                 <Link
//                   to="/signup"
//                   className="btn-primary w-full block text-center py-3 rounded-md hover:bg-indigo-600 transition-colors duration-300"
//                 >
//                   Go Enterprise
//                 </Link>
//                 <div className="mt-6 border-t border-gray-200 py-4">
//                   <ul className="space-y-3">
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Access to all templates</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Unlimited customization</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>24/7 priority support</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Advanced analytics</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Custom domain support</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>Team collaboration</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-2" />
//                       <span>API access</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
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
//               Find answers to common questions about LinkedFolio pricing and plans.
//             </p>
//           </div>

//           <div className="max-w-3xl mx-auto space-y-6">
//             <div className="card-default p-6 rounded-lg">
//               <h3 className="heading-sm mb-2">How do I upgrade or downgrade my plan?</h3>
//               <p className="text-gray-700">
//                 You can easily upgrade or downgrade your subscription at any time within your account settings. Upgrades take effect immediately, while downgrades are applied at the end of your current billing cycle.
//               </p>
//             </div>

//             <div className="card-default p-6 rounded-lg">
//               <h3 className="heading-sm mb-2">What payment methods are supported?</h3>
//               <p className="text-gray-700">
//                 We currently accept UPI payments for users in India. All transactions are securely processed.
//               </p>
//             </div>

//             <div className="card-default p-6 rounded-lg">
//               <h3 className="heading-sm mb-2">Is there a student discount available?</h3>
//               <p className="text-gray-700">
//                 Yes! We offer a 50% discount on the Pro plan for verified students. Contact our support team with your student ID for details.
//               </p>
//             </div>

//             <div className="card-default p-6 rounded-lg">
//               <h3 className="heading-sm mb-2">What happens to my portfolio if I cancel?</h3>
//               <p className="text-gray-700">
//                 If you cancel your paid subscription, your portfolio will revert to the Free plan. You'll lose access to premium features, but your data will remain.
//               </p>
//             </div>

//             <div className="card-default p-6 rounded-lg">
//               <h3 className="heading-sm mb-2">Do you offer refunds?</h3>
//               <p className="text-gray-700">
//                 We provide a 14-day money-back guarantee. If you're not satisfied, contact us within 14 days for a full refund.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="section-padding bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
//         <div className="container-custom text-center">
//           <h2 className="heading-lg mb-6">
//             Get Started with <span className="text-white font-bold">LinkedFolio</span> Today!
//           </h2>
//           <p className="text-lead mb-8 max-w-3xl mx-auto">
//             Build your professional portfolio with LinkedFolio and take your career to the next level.
//           </p>
//           <Link
//             to="/signup"
//             className="bg-white text-indigo-600 hover:bg-indigo-100 font-semibold py-3 px-8 rounded-md transition-colors duration-300 inline-block"
//           >
//             Create Your Free Portfolio
//           </Link>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default PricingPage;








"use client"
import Footer from "@/components/layout/Footer"
import PublicNavbar from "@/components/layout/PublicNavbar"
import { motion } from "framer-motion"
import { Check, X, ArrowRight, Shield, Zap, Globe, Users, HelpCircle, CreditCard, Sparkles } from 'lucide-react'
import { Link } from "react-router-dom"

const PricingPage = () => {
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

  const pricingCardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
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
              FLEXIBLE PRICING
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Choose the Perfect Plan for Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LinkedFolio
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              We offer flexible pricing options to suit your needs. Start building your portfolio for free and upgrade as
              you grow.
            </p>
          </motion.div>

          {/* Pricing Toggle */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex justify-center items-center mt-12 mb-8"
          >
            <div className="bg-white rounded-full shadow-md p-1 flex">
              <button className="py-2 px-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium">
                Monthly
              </button>
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {/* Free Plan */}
            <motion.div
              variants={pricingCardVariant}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-4">Free</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">₹0</span>
                  <span className="text-gray-500">/forever</span>
                </div>
                <p className="text-gray-600 mb-8">Perfect for getting started with your basic portfolio needs.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/signup"
                    className="block text-center py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
                  >
                    Get Started
                  </Link>
                </motion.div>
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Access to free templates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Basic portfolio customization</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Standard support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-gray-400 mr-3 shrink-0 mt-0.5" />
                      <span className="text-gray-500">Premium templates</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-gray-400 mr-3 shrink-0 mt-0.5" />
                      <span className="text-gray-500">Custom domain</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              variants={pricingCardVariant}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 relative md:scale-105 z-10"
            >
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-medium">
                Most Popular
              </div>
              <div className="p-8 pt-12">
                <h3 className="text-2xl font-semibold mb-4">Pro</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">₹49</span>
                  <span className="text-gray-500">/month</span>
                  <p className="text-sm text-green-600 font-medium mt-1">Billed monthly</p>
                </div>
                <p className="text-gray-700 mb-8">For professionals who need more customization and features.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/signup"
                    className="block text-center py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-colors shadow-md"
                  >
                    Upgrade to Pro
                  </Link>
                </motion.div>
                <div className="mt-8 border-t border-blue-100 pt-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Access to all pro templates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Advanced portfolio customization</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Custom domain support</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-gray-400 mr-3 shrink-0 mt-0.5" />
                      <span className="text-gray-500">Team collaboration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              variants={pricingCardVariant}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">₹99</span>
                  <span className="text-gray-500">/month</span>
                  <p className="text-sm text-green-600 font-medium mt-1">Billed monthly</p>
                </div>
                <p className="text-gray-600 mb-8">The complete solution for teams and power users.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/signup"
                    className="block text-center py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-900 text-white font-medium transition-colors"
                  >
                    Go Enterprise
                  </Link>
                </motion.div>
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Access to all templates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Unlimited customization</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>24/7 priority support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Custom domain support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>Team collaboration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span>API access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison */}
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
              FEATURE COMPARISON
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare Plan Features</h2>
            <p className="text-lg text-gray-600">
              Find the perfect plan for your needs with our detailed feature comparison.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-md">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-left text-gray-600 font-medium">Feature</th>
                  <th className="py-4 px-6 text-center text-gray-600 font-medium">Free</th>
                  <th className="py-4 px-6 text-center bg-blue-50 text-blue-700 font-medium">Pro</th>
                  <th className="py-4 px-6 text-center text-gray-600 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-800">Portfolio Templates</td>
                  <td className="py-4 px-6 text-center">5 Templates</td>
                  <td className="py-4 px-6 text-center bg-blue-50">25+ Templates</td>
                  <td className="py-4 px-6 text-center">All Templates</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-800">Custom Domain</td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-blue-50">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-800">ATS Optimization</td>
                  <td className="py-4 px-6 text-center">Basic</td>
                  <td className="py-4 px-6 text-center bg-blue-50">Advanced</td>
                  <td className="py-4 px-6 text-center">Advanced</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-800">Analytics</td>
                  <td className="py-4 px-6 text-center">Basic</td>
                  <td className="py-4 px-6 text-center bg-blue-50">Advanced</td>
                  <td className="py-4 px-6 text-center">Advanced + Custom</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-800">Support</td>
                  <td className="py-4 px-6 text-center">Email</td>
                  <td className="py-4 px-6 text-center bg-blue-50">Priority Email</td>
                  <td className="py-4 px-6 text-center">24/7 Phone & Email</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-800">Team Members</td>
                  <td className="py-4 px-6 text-center">1 User</td>
                  <td className="py-4 px-6 text-center bg-blue-50">1 User</td>
                  <td className="py-4 px-6 text-center">Up to 10 Users</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              QUESTIONS & ANSWERS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about LinkedFolio pricing and plans.
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
                    <HelpCircle className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">How do I upgrade or downgrade my plan?</h3>
                  <p className="text-gray-600">
                    You can easily upgrade or downgrade your subscription at any time within your account settings.
                    Upgrades take effect immediately, while downgrades are applied at the end of your current billing
                    cycle.
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
                    <CreditCard className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">What payment methods are supported?</h3>
                  <p className="text-gray-600">
                    We currently accept UPI payments for users in India. All transactions are securely processed through
                    our payment gateway.
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
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Is there a student discount available?</h3>
                  <p className="text-gray-600">
                    Yes! We offer a 50% discount on the Pro plan for verified students. Contact our support team with
                    your student ID for details on how to apply this discount to your account.
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
                    <Globe className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">What happens to my portfolio if I cancel?</h3>
                  <p className="text-gray-600">
                    If you cancel your paid subscription, your portfolio will revert to the Free plan. You'll lose access
                    to premium features, but your data will remain intact and accessible.
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
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Do you offer refunds?</h3>
                  <p className="text-gray-600">
                    We provide a 14-day money-back guarantee. If you're not satisfied with your subscription, contact us
                    within 14 days of your purchase for a full refund, no questions asked.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Started with <span className="text-white font-bold">LinkedFolio</span> Today!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Build your professional portfolio with LinkedFolio and take your career to the next level.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg inline-flex items-center"
                >
                  Create Your Free Portfolio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-all inline-flex items-center"
                >
                  Contact Sales
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

export default PricingPage





