
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { supabase } from '@/lib/supabase';

const PaymentStatus = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestId = searchParams.get('id');

  const { data: paymentRequest, isLoading } = useQuery({
    queryKey: ['paymentRequest', requestId],
    queryFn: async () => {
      if (!requestId || !user) return null;
      
      const { data, error } = await supabase
        .from('payment_requests')
        .select('*')
        .eq('id', requestId)
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching payment request:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!requestId && !!user,
  });

  useEffect(() => {
    if (!requestId) {
      navigate('/dashboard');
    }
  }, [requestId, navigate]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
            <CheckCircle2 className="h-4 w-4" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Pending
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Payment Status">
        <div className="flex justify-center items-center min-h-[50vh]">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  if (!paymentRequest) {
    return (
      <DashboardLayout pageTitle="Payment Status">
        <Card>
          <CardHeader>
            <CardTitle>Payment Request Not Found</CardTitle>
            <CardDescription>We couldn't find the payment request you're looking for.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Payment Status">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Payment Request Status</CardTitle>
              <CardDescription>
                Your payment request for {paymentRequest.plan_type.toUpperCase()} plan
              </CardDescription>
            </div>
            {getStatusBadge(paymentRequest.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Payment Details</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-2 gap-y-2">
                  <span className="text-sm font-medium">Plan:</span>
                  <span className="text-sm">{paymentRequest.plan_type.toUpperCase()}</span>
                  
                  <span className="text-sm font-medium">Amount:</span>
                  <span className="text-sm">₹{paymentRequest.amount}</span>
                  
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm">{new Date(paymentRequest.created_at).toLocaleDateString()}</span>
                  
                  <span className="text-sm font-medium">UPI Reference:</span>
                  <span className="text-sm font-mono">{paymentRequest.upi_reference_id}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Status Information</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm">
                  {paymentRequest.status === 'pending' && (
                    "Your payment is under review. We'll update you once it's verified. This usually takes 1-2 business days."
                  )}
                  {paymentRequest.status === 'approved' && (
                    "Your payment has been approved! Your account has been upgraded to the paid plan. Enjoy the premium features!"
                  )}
                  {paymentRequest.status === 'rejected' && (
                    "Unfortunately, your payment could not be verified. Please check your UPI reference ID and try again."
                  )}
                </p>
                
                {paymentRequest.verification_notes && (
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm font-medium">Admin notes:</p>
                    <p className="text-sm">{paymentRequest.verification_notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="sm:flex-1"
            >
              Return to Dashboard
            </Button>
            
            {paymentRequest.status === 'rejected' && (
              <Button 
                onClick={() => navigate('/payment/request')}
                className="sm:flex-1"
              >
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default PaymentStatus;
