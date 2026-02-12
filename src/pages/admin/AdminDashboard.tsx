
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Users, CreditCard, Check, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      try {
        // Get total users count
        const { count: usersCount, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (usersError) throw usersError;

        // Get payment requests stats
        const { data: paymentData, error: paymentError } = await supabase
          .from('payment_requests')
          .select('status');

        if (paymentError) throw paymentError;

        const pendingPayments = paymentData.filter(p => p.status === 'pending').length;
        const approvedPayments = paymentData.filter(p => p.status === 'approved').length;
        const rejectedPayments = paymentData.filter(p => p.status === 'rejected').length;

        return {
          usersCount: usersCount || 0,
          pendingPayments,
          approvedPayments,
          rejectedPayments,
          totalPayments: paymentData.length
        };
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        return {
          usersCount: 0,
          pendingPayments: 0,
          approvedPayments: 0,
          rejectedPayments: 0,
          totalPayments: 0
        };
      }
    }
  });

  return (
    <DashboardLayout pageTitle="Admin Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : stats?.usersCount}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : stats?.pendingPayments}</div>
              <p className="text-xs text-muted-foreground">Awaiting verification</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved Payments</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : stats?.approvedPayments}</div>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rejected Payments</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : stats?.rejectedPayments}</div>
              <p className="text-xs text-muted-foreground">Invalid payments</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their subscription status</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  View, edit, and manage user accounts and subscription levels
                </p>
              </div>
              <Button asChild>
                <Link to="/admin/users">Manage Users</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Requests</CardTitle>
              <CardDescription>Verify and process payment requests</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Review UPI payments and update subscription statuses
                </p>
              </div>
              <Button asChild>
                <Link to="/admin/payments">Manage Payments</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
