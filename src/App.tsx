
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import HomePage from "./pages/public/HomePage";
import FeaturesPage from "./pages/public/FeaturesPage";
import PricingPage from "./pages/public/PricingPage";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import NotFound from "./pages/NotFound";

// Protected Pages
import DashboardPage from "./pages/dashboard/DashboardPage";
import TemplateSelection from "./pages/dashboard/TemplateSelection";
import ProfileEditor from "./pages/dashboard/ProfileEditor";
import PortfolioPreview from "./pages/dashboard/PortfolioPreview";
import PortfolioSettings from "./pages/dashboard/PortfolioSettings";
import ResumeGenerator from "./pages/dashboard/ResumeGenerator"; // Added Resume Generator

// Payment Pages
import PaymentRequest from "./pages/payment/PaymentRequest";
import PaymentStatus from "./pages/payment/PaymentStatus";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminUsers from "./pages/admin/AdminUsers";

// Portfolio Pages
import PortfolioPage from "./pages/portfolio"; // Public portfolio route
import PortfolioPreviewPage from "./pages/portfolio/preview"; // Preview route for any template

// Context
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import ScrollToTop from "./components/utils/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/templates" element={<TemplateSelection />} />
              <Route path="/profile" element={<ProfileEditor />} />
              <Route path="/preview" element={<PortfolioPreview />} />
              <Route path="/settings" element={<PortfolioSettings />} />
              <Route path="/resume" element={<ResumeGenerator />} /> {/* Added Resume Generator route */}
              <Route path="/payment/request" element={<PaymentRequest />} />
              <Route path="/payment/status" element={<PaymentStatus />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
              <Route path="/admin/users" element={<AdminUsers />} />
            </Route>
            
            {/* Portfolio Preview Route (can view any template) */}
            <Route path="/preview/portfolio/:username/:userId" element={<PortfolioPreviewPage />} />
            
            {/* Public Portfolio Route (can only view allowed templates) */}
            <Route path="/portfolio/:username/:userId" element={<PortfolioPage />} />
            
            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
