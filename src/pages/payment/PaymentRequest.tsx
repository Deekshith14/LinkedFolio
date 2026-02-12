import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Check, Crown, Zap, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type ProfileData = Database['public']['Tables']['profiles']['Row'];
type PaymentRequest = Database['public']['Tables']['payment_requests']['Row'];

const formSchema = z.object({
  plan_type: z.enum(['free', 'pro', 'enterprise'], {
    required_error: 'Please select a plan type',
  }),
  upi_reference_id: z.string()
    .min(12, { message: 'UPI Reference ID must be at least 12 characters' })
    .max(50, { message: 'UPI Reference ID must not exceed 50 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

interface Plan {
  name: 'free' | 'pro' | 'enterprise';
  price: number;
  features: string[];
  recommended?: boolean;
}

const plans: Plan[] = [
  {
    name: 'free',
    price: 0,
    features: [
      'Access to free templates',
      'Basic portfolio customization',
      'Standard support',
      'Basic analytics'
    ]
  },
  {
    name: 'pro',
    price: 49,
    features: [
      'Access to all pro templates',
      'Advanced portfolio customization',
      'Priority support',
      'Advanced analytics',
      'Custom domain support'
    ]
  },
  {
    name: 'enterprise',
    price: 99,
    features: [
      'Access to all templates',
      'Unlimited customization',
      '24/7 priority support',
      'Advanced analytics',
      'Custom domain support',
      'Team collaboration',
      'API access'
    ]
  }
];

const PaymentRequest: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingRequest, setPendingRequest] = useState<PaymentRequest | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan_type: 'pro',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfileData(profileData);

        // Check for pending payment requests
        const { data: paymentData, error: paymentError } = await supabase
          .from('payment_requests')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'pending')
          .order('created_at', { ascending: false })
          .limit(1);

        if (paymentError) throw paymentError;
        if (paymentData.length > 0) {
          setPendingRequest(paymentData[0]);
        }

        // Set recommended plan based on current plan
        const updatedPlans = plans.map(plan => {
          if (profileData.plan_type === 'free' && plan.name === 'pro') {
            return { ...plan, recommended: true };
          } else if (profileData.plan_type === 'pro' && plan.name === 'enterprise') {
            return { ...plan, recommended: true };
          }
          return { ...plan, recommended: false };
        });

        // Set initial selected plan based on current plan
        const currentPlan = updatedPlans.find(p => p.name === profileData.plan_type);
        if (currentPlan) {
          setSelectedPlan(currentPlan);
          form.setValue('plan_type', currentPlan.name);
        }
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
        toast({
          title: "Error fetching your data",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, form]);

  const handlePlanSelect = (plan: Plan) => {
    if (profileData?.plan_type === plan.name) return;

    setSelectedPlan(plan);
    form.setValue('plan_type', plan.name);

    if (plan.name !== 'free') {
      setOpenDialog(true);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to request a plan upgrade.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase.from('payment_requests').insert({
        user_id: user.id,
        upi_reference_id: data.upi_reference_id,
        plan_type: data.plan_type,
        amount: selectedPlan?.price || 0,
        status: 'pending'
      });

      if (error) throw error;

      toast({
        title: 'Payment Request Submitted',
        description: 'Your payment request has been submitted and is awaiting verification.',
      });

      setOpenDialog(false);
      navigate('/payment/status');
    } catch (error: any) {
      console.error('Error submitting payment request:', error);
      toast({
        title: 'Error',
        description: error.message || 'There was an error submitting your payment request.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Payment">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Upgrade Plan">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Choose Your Plan</h1>
          <p className="text-muted-foreground">
            {profileData?.plan_type === 'free'
              ? "Upgrade to unlock more features"
              : profileData?.plan_type === 'pro'
                ? "You're currently on the Pro plan"
                : "You're on the Enterprise plan"}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrentPlan = profileData?.plan_type === plan.name;
            const isLowerPlan =
              (profileData?.plan_type === 'pro' && plan.name === 'free') ||
              (profileData?.plan_type === 'enterprise' && (plan.name === 'free' || plan.name === 'pro'));
            const hasPendingRequest = pendingRequest && pendingRequest.plan_type === plan.name;

            return (
              <Card
                key={plan.name}
                className={`relative flex flex-col h-full ${plan.recommended ? 'border-primary' : ''}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                      Recommended
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="capitalize">{plan.name}</span>
                    {isCurrentPlan && (
                      <span className="text-sm text-green-600">Current Plan</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="text-3xl font-bold">
                    ₹{plan.price}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.recommended ? "default" : "outline"}
                    onClick={() => handlePlanSelect(plan)}
                    disabled={isCurrentPlan || isLowerPlan || !!pendingRequest}
                  >
                    {isCurrentPlan
                      ? "Current Plan"
                      : hasPendingRequest
                        ? "Request Pending"
                        : isLowerPlan
                          ? "Not Available"
                          : plan.name === 'free'
                            ? "Select Free Plan"
                            : "Upgrade Now"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Complete Your Payment</DialogTitle>
              <DialogDescription>
                Follow these steps to upgrade to {selectedPlan?.name} plan
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-lg mb-2">Payment Instructions</h3>
                  <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
                    <li>Open your UPI payment app (Google Pay, PhonePe, Paytm, etc.)</li>
                    <li>Send ₹{selectedPlan?.price} to UPI ID: <span className="font-mono font-medium">rohith36@ybl</span></li>
                    <li>After payment, copy the 12-digit UPI Reference ID from your payment app</li>
                    <li>Paste the Reference ID in the field below</li>
                  </ol>
                </div>

                <FormField
                  control={form.control}
                  name="upi_reference_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPI Reference ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your UPI Reference ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Submit Payment Request
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <div className="text-center text-sm text-muted-foreground">
          <p>For any payment issues, please contact support</p>
          <p className="mt-1">UPI ID for payments: rohith36@ybl</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentRequest;