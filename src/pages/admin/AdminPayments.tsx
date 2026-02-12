
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const AdminPayments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [verificationNotes, setVerificationNotes] = useState('');

  const { data: paymentRequests, isLoading } = useQuery({
    queryKey: ['adminPaymentRequests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_requests')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            username
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching payment requests:', error);
        return [];
      }

      return data || [];
    }
  });

  const updateRequestMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: 'approved' | 'rejected' }) => {
      // Update payment request status
      const { error: requestError } = await supabase
        .from('payment_requests')
        .update({
          status,
          verified_by: user?.id,
          verification_notes: verificationNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (requestError) throw requestError;

      // If approved, update profile to premium
      if (status === 'approved') {
        const request = paymentRequests?.find(r => r.id === id);

        if (request) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({

              plan_type: selectedRequest["plan_type"],
              updated_at: new Date().toISOString()
            })
            .eq('id', request.user_id);

          if (profileError) throw profileError;
        }
      }

      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPaymentRequests'] });
      toast({
        title: 'Payment request updated',
        description: 'The payment request has been successfully updated.',
      });
      setSelectedRequest(null);
      setVerificationNotes('');
    },
    onError: (error) => {
      console.error('Error updating payment request:', error);
      toast({
        title: 'Error',
        description: 'There was an error updating the payment request.',
        variant: 'destructive',
      });
    }
  });

  const approveRequest = () => {
    if (!selectedRequest) return;
    updateRequestMutation.mutate({ id: selectedRequest.id, status: 'approved' });
  };

  const rejectRequest = () => {
    if (!selectedRequest) return;
    updateRequestMutation.mutate({ id: selectedRequest.id, status: 'rejected' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="flex items-center bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="flex items-center"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout pageTitle="Payment Requests">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Payment Requests</CardTitle>
            <CardDescription>
              Review and verify UPI payment requests from users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">
                  Pending
                  {paymentRequests && (
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                      {paymentRequests.filter(r => r.status === 'pending').length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              {['pending', 'approved', 'rejected'].map((status) => (
                <TabsContent key={status} value={status} className="mt-4">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <LoadingSpinner />
                    </div>
                  ) : paymentRequests && paymentRequests.filter(r => r.status === status).length > 0 ? (
                    <div className="space-y-4">
                      {paymentRequests
                        .filter(r => r.status === status)
                        .map((request) => (
                          <div key={request.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{request.profiles?.full_name || 'Unknown User'}</h3>
                                <p className="text-sm text-gray-500">
                                  {request.profiles?.email || 'No email'}
                                </p>
                                <div className="mt-2">
                                  <p className="text-sm font-medium">
                                    {request.plan_type.toUpperCase()} Plan • ₹{request.amount}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    UPI Reference: <span className="font-mono">{request.upi_reference_id}</span>
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Requested: {new Date(request.created_at).toLocaleString()}
                                  </p>
                                </div>
                                {request.verification_notes && (
                                  <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                                    <span className="font-medium">Notes:</span> {request.verification_notes}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                {getStatusBadge(request.status)}

                                <Sheet>
                                  <SheetTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setSelectedRequest(request)}
                                    >
                                      Review
                                    </Button>
                                  </SheetTrigger>
                                  <SheetContent>
                                    <SheetHeader>
                                      <SheetTitle>Review Payment Request</SheetTitle>
                                      <SheetDescription>
                                        Verify the UPI payment details and update the request status
                                      </SheetDescription>
                                    </SheetHeader>

                                    {selectedRequest && (
                                      <div className="py-4 space-y-4">
                                        <div className="space-y-1">
                                          <h3 className="font-medium">User Details</h3>
                                          <p className="text-sm">
                                            Name: {selectedRequest.profiles?.full_name || 'Unknown'}
                                          </p>
                                          <p className="text-sm">
                                            Email: {selectedRequest.profiles?.email || 'No email'}
                                          </p>
                                          <p className="text-sm">
                                            Username: {selectedRequest.profiles?.username || 'No username'}
                                          </p>
                                        </div>

                                        <div className="space-y-1">
                                          <h3 className="font-medium">Payment Details</h3>
                                          <p className="text-sm">
                                            Plan: {selectedRequest.plan_type.toUpperCase()}
                                          </p>
                                          <p className="text-sm">
                                            Amount: ₹{selectedRequest.amount}
                                          </p>
                                          <p className="text-sm">
                                            UPI Reference: <span className="font-mono">{selectedRequest.upi_reference_id}</span>
                                          </p>
                                          <p className="text-sm">
                                            Requested: {new Date(selectedRequest.created_at).toLocaleString()}
                                          </p>
                                        </div>

                                        <div className="space-y-1 pt-4">
                                          <Label htmlFor="notes">Verification Notes</Label>
                                          <Textarea
                                            id="notes"
                                            placeholder="Add notes about the verification (optional)"
                                            value={verificationNotes}
                                            onChange={(e) => setVerificationNotes(e.target.value)}
                                          />
                                        </div>

                                        <div className="flex items-center justify-center space-x-2 pt-4">
                                          <a
                                            href="https://www.bhimupi.org.in/check-status"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-sm text-blue-600 hover:underline"
                                          >
                                            Verify on UPI Portal <ExternalLink className="ml-1 h-3 w-3" />
                                          </a>
                                        </div>
                                      </div>
                                    )}

                                    <SheetFooter className="pt-4">
                                      <div className="flex flex-col w-full gap-2 sm:flex-row">
                                        <Button
                                          variant="destructive"
                                          disabled={selectedRequest?.status !== 'pending' || updateRequestMutation.isPending}
                                          onClick={rejectRequest}
                                          className="sm:flex-1"
                                        >
                                          Reject
                                        </Button>
                                        <Button
                                          variant="default"
                                          disabled={selectedRequest?.status !== 'pending' || updateRequestMutation.isPending}
                                          onClick={approveRequest}
                                          className="sm:flex-1"
                                        >
                                          Approve
                                        </Button>
                                        <SheetClose asChild>
                                          <Button variant="outline" className="sm:flex-1">
                                            Cancel
                                          </Button>
                                        </SheetClose>
                                      </div>
                                    </SheetFooter>
                                  </SheetContent>
                                </Sheet>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border rounded-lg">
                      <p className="text-gray-500">No {status} payment requests found.</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminPayments;
