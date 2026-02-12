
import React from 'react';
import { Lock, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AccessDeniedPortfolioProps {
  templateTier: string;
  reason?: 'private' | 'unauthorized';
}

const AccessDeniedPortfolio: React.FC<AccessDeniedPortfolioProps> = ({ 
  templateTier = 'free',
  reason = 'private'
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-red-600 p-4 flex justify-center">
          {reason === 'private' ? (
            <Lock className="h-16 w-16 text-white" />
          ) : (
            <ShieldAlert className="h-16 w-16 text-white" />
          )}
        </div>
        
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {reason === 'private' ? 'Private Portfolio' : 'Template Access Restricted'}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {reason === 'private' 
              ? 'This portfolio has been set to private by its owner.'
              : `This portfolio is using a ${templateTier.toUpperCase()} template that requires a subscription.`
            }
          </p>
          
          {reason === 'unauthorized' && (
            <>
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 text-left">
                <h3 className="font-medium text-amber-800 mb-1">Why am I seeing this?</h3>
                <p className="text-sm text-amber-700">
                  The owner of this portfolio is using a premium template ({templateTier}) 
                  but doesn't have an active subscription that allows sharing this template publicly.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Available Options:</h3>
                <ul className="text-sm text-gray-600 space-y-1 text-left list-disc list-inside">
                  <li>Contact the portfolio owner to upgrade their plan</li>
                  <li>Portfolio owner can switch to a free template for public sharing</li>
                  <li>Portfolio owner can activate their premium subscription</li>
                </ul>
              </div>
            </>
          )}
          
          <Link to="/">
            <Button variant="default" className="w-full">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPortfolio;
