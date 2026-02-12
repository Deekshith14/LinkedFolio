import React, { ReactNode, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // Import useLocation for active link
import {
    Menu, X, User, Settings, LogOut, Home, Grid, Layout, Eye,
    DollarSign, Shield,
    File
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface DashboardLayoutProps {
    children: ReactNode;
    pageTitle: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, pageTitle }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Get current URL

    const { data: userProfile, isLoading, isError } = useQuery({ // More descriptive name
        queryKey: ['userProfile', user?.id],
        queryFn: async () => {
            if (!user) return null;

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
                return null;
            }

            return data;
        },
        enabled: !!user,
    });

    const isAdmin = userProfile?.is_admin || false;

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    // Helper function to check if a path is active
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar for desktop */}
            <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-gray-200">
                <div className="flex flex-col h-full">
                    <div className="px-6 pt-6 pb-4">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-indigo-600">Linked</span>
                            <span className="text-2xl font-bold text-purple-600">Folio</span>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 mt-6 space-y-1">
                        <Link
                            to="/dashboard"
                            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/dashboard') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                        >
                            <Home className="mr-3 h-5 w-5 text-indigo-500" />
                            Dashboard
                        </Link>
                        <Link
                            to="/templates"
                            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/templates') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                        >
                            <Grid className="mr-3 h-5 w-5 text-indigo-500" />
                            Templates
                        </Link>
                        <Link
                            to="/profile"
                            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/profile') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                        >
                            <User className="mr-3 h-5 w-5 text-indigo-500" />
                            Profile
                        </Link>
                        <Link
                            to="/preview"
                            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/preview') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                        >
                            <Eye className="mr-3 h-5 w-5 text-indigo-500" />
                            Preview
                        </Link>
                        <Link
                            to="/resume"
                            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/settings') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                        >
                            <File className="mr-3 h-5 w-5 text-indigo-500" />
                            Resume Generator
                        </Link>
                        <Link
                            to="/settings"
                            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/settings') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                        >
                            <Settings className="mr-3 h-5 w-5 text-indigo-500" />
                            Settings
                        </Link>
                        <Link
                            to="/payment/request"
                            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/payment/request') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                        >
                            <DollarSign className="mr-3 h-5 w-5 text-indigo-500" />
                            Upgrade Plan
                        </Link>

                        {isAdmin && (
                            <>
                                <div className="pt-4 pb-2">
                                    <div className="flex items-center px-2">
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Admin
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    to="/admin"
                                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/admin') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                                >
                                    <Shield className="mr-3 h-5 w-5 text-indigo-500" />
                                    Admin Dashboard
                                </Link>
                                <Link
                                    to="/admin/payments"
                                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/admin/payments') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                                >
                                    <DollarSign className="mr-3 h-5 w-5 text-indigo-500" />
                                    Payment Requests
                                </Link>
                                <Link
                                    to="/admin/users"
                                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/admin/users') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                                >
                                    <User className="mr-3 h-5 w-5 text-indigo-500" />
                                    Manage Users
                                </Link>
                            </>
                        )}
                    </nav>

                    <div className="px-4 py-4 border-t border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.email}
                                </p>
                                <button
                                    onClick={handleSignOut}
                                    className="text-sm text-gray-500 hover:text-indigo-600 flex items-center mt-1"
                                >
                                    <LogOut className="h-4 w-4 mr-1" />
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                    <div className="fixed inset-y-0 left-0 flex flex-col w-full max-w-xs bg-white">
                        <div className="flex items-center justify-between px-4 pt-5 pb-4">
                            <Link to="/" className="flex items-center">
                                <span className="text-2xl font-bold text-indigo-600">Linked</span>
                                <span className="text-2xl font-bold text-purple-600">Folio</span>
                            </Link>
                            <button
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X className="h-6 w-6 text-gray-900" />
                            </button>
                        </div>

                        <nav className="flex-1 px-4 mt-6 space-y-1">
                            <Link
                                to="/dashboard"
                                className={`flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/dashboard') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Home className="mr-3 h-5 w-5 text-indigo-500" />
                                Dashboard
                            </Link>
                            <Link
                                to="/templates"
                                className={`flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/templates') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Grid className="mr-3 h-5 w-5 text-indigo-500" />
                                Templates
                            </Link>
                            <Link
                                to="/profile"
                                className={`flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/profile') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <User className="mr-3 h-5 w-5 text-indigo-500" />
                                Profile
                            </Link>
                            <Link
                                to="/preview"
                                className={`flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/preview') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Eye className="mr-3 h-5 w-5 text-indigo-500" />
                                Preview
                            </Link>
                            <Link
                                to="/settings"
                                className={`flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/settings') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Settings className="mr-3 h-5 w-5 text-indigo-500" />
                                Settings
                            </Link>
                            <Link
                                to="/payment/request"
                                className={`flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/payment/request') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <DollarSign className="mr-3 h-5 w-5 text-indigo-500" />
                                Upgrade Plan
                            </Link>

                            {isAdmin && (
                                <>
                                    <div className="pt-4 pb-2">
                                        <div className="flex items-center px-2">
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Admin
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        to="/admin"
                                        className={`flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/admin') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <Shield className="mr-3 h-5 w-5 text-indigo-500" />
                                        Admin Dashboard
                                    </Link>
                                    <Link
                                        to="/admin/payments"
                                        className={`flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/admin/payments') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <DollarSign className="mr-3 h-5 w-5 text-indigo-500" />
                                        Payment Requests
                                    </Link>
                                    <Link
                                        to="/admin/users"
                                        className={`flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 text-gray-700 ${isActive('/admin/users') ? 'bg-gray-100 text-indigo-800' : 'text-gray-700'}`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <User className="mr-3 h-5 w-5 text-indigo-500" />
                                        Manage Users
                                    </Link>
                                </>
                            )}
                        </nav>

                        <div className="px-4 py-4 border-t border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user?.email}
                                    </p>
                                    <button
                                        onClick={handleSignOut}
                                        className="text-sm text-gray-500 hover:text-indigo-600 flex items-center mt-1"
                                    >
                                        <LogOut className="h-4 w-4 mr-1" />
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="md:pl-64 flex flex-col flex-1">
                <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 md:px-8">
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <Menu className="h-6 w-6" />
                            </button>
                            <h1 className="text-xl font-semibold text-gray-900 ml-2 md:ml-0">{pageTitle}</h1>
                        </div>

                        {/* User dropdown (mobile only) */}
                        <div className="md:hidden relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center max-w-xs text-sm rounded-full focus:outline-none"
                            >
                                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="px-4 py-2 text-sm text-gray-900 truncate border-b border-gray-100">
                                        {user?.email}
                                    </div>
                                    <Link
                                        to="/settings"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setUserMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="py-6 px-4 sm:px-6 md:px-8">{children}</div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;