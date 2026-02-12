
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, LockOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

interface PreviewBannerProps {
  templateTier: string;
  isCurrentUser: boolean;
  userId: string;
}

const PreviewBanner: React.FC<PreviewBannerProps> = ({ templateTier, isCurrentUser, userId }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-amber-500 to-red-500 p-2 flex justify-between items-center">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 mr-2 text-white" />
        <span className="text-white font-medium">
          Preview Only - This {templateTier.toUpperCase()} template requires a {templateTier} plan subscription
        </span>
      </div>
      {isCurrentUser && (
        <Link to="/payment/request">
          <Button variant="secondary" size="sm" className="whitespace-nowrap">
            <LockOpen className="h-4 w-4 mr-1" />
            Upgrade to {templateTier.charAt(0).toUpperCase() + templateTier.slice(1)}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default PreviewBanner;
