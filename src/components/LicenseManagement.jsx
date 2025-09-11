import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, CreditCard, Download, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';

const LicenseManagement = () => {
  const [licenseData, setLicenseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const userEmail = localStorage.getItem('userEmail') || 'admin@thegreenagents.com';
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://syncsure-backend.onrender.com';

  // Pricing tiers configuration
  const PRICING_TIERS = {
    starter: { min: 1, max: 50, price: 1.99, name: 'Starter' },
    business: { min: 51, max: 500, price: 1.49, name: 'Business' },
    enterprise: { min: 501, max: Infinity, price: 0.99, name: 'Enterprise' }
  };

  useEffect(() => {
    fetchLicenseData();
  }, []);

  const fetchLicenseData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/v9/dashboard/license-management?email=${encodeURIComponent(userEmail)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setLicenseData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching license data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseLicense = async (quantity = 1) => {
    try {
      setActionLoading(true);
      
      const response = await fetch(`${backendUrl}/api/v9/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          quantity: quantity,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/license-management`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateQuantity = async (newQuantity) => {
    try {
      setActionLoading(true);
      
      const response = await fetch(`${backendUrl}/api/v9/stripe/update-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          newQuantity: newQuantity
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }

      await fetchLicenseData(); // Refresh data
    } catch (err) {
      console.error('Error updating subscription:', err);
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? It will remain active until the end of your current billing period.')) {
      return;
    }

    try {
      setActionLoading(true);
      
      const response = await fetch(`${backendUrl}/api/v9/stripe/cancel-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          cancelAtPeriodEnd: true
        })
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      await fetchLicenseData(); // Refresh data
    } catch (err) {
      console.error('Error canceling subscription:', err);
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleManagePayment = async () => {
    try {
      setActionLoading(true);
      
      const response = await fetch(`${backendUrl}/api/v9/stripe/create-portal-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          returnUrl: `${window.location.origin}/license-management`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error creating portal session:', err);
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const getTierInfo = (quantity) => {
    if (quantity <= 50) return PRICING_TIERS.starter;
    if (quantity <= 500) return PRICING_TIERS.business;
    return PRICING_TIERS.enterprise;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading license information...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading license data: {error}
          <Button variant="outline" size="sm" onClick={fetchLicenseData} className="ml-2">
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // No subscription case
  if (!licenseData?.hasSubscription) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>License Management</CardTitle>
            <CardDescription>
              Purchase a SyncSure Monitor license to start monitoring your devices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Download className="h-4 w-4" />
              <AlertDescription>
                Purchase a license to receive your custom SyncSure monitor tool with your license key embedded.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 md:grid-cols-3">
              {Object.entries(PRICING_TIERS).map(([key, tier]) => (
                <Card key={key} className="relative">
                  <CardHeader>
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <CardDescription>
                      {tier.min}-{tier.max === Infinity ? '∞' : tier.max} devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">£{tier.price}</div>
                    <div className="text-sm text-muted-foreground">per device/month</div>
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => handlePurchaseLicense(tier.min)}
                      disabled={actionLoading}
                    >
                      {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Has subscription case
  const { subscription, tierInfo, customer, paymentMethods, invoices } = licenseData;
  const currentTier = getTierInfo(subscription.quantity);

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            License Management
            <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
              {subscription.status}
            </Badge>
          </CardTitle>
          <CardDescription>
            Manage your SyncSure Monitor subscription and billing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold">Current Plan</h4>
              <p className="text-2xl font-bold">{currentTier.name}</p>
              <p className="text-sm text-muted-foreground">
                £{currentTier.price} per device/month
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Licensed Devices</h4>
              <p className="text-2xl font-bold">{subscription.quantity}</p>
              <p className="text-sm text-muted-foreground">
                Monthly total: £{(subscription.quantity * currentTier.price).toFixed(2)}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold">Billing Period</h4>
              <p className="text-sm">
                {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Status</h4>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Active subscription</span>
              </div>
              {subscription.cancel_at_period_end && (
                <p className="text-sm text-orange-600">
                  Cancels at period end
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Tier Information */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Tier</CardTitle>
          <CardDescription>
            Your current pricing tier based on licensed device quantity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
              <div>
                <h4 className="font-semibold">{currentTier.name} Plan</h4>
                <p className="text-sm text-muted-foreground">
                  £{currentTier.price} per license
                </p>
              </div>
              <Badge variant="default">{currentTier.name}</Badge>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p><strong>Starter:</strong> 1-50 devices @ £1.99/device</p>
              <p><strong>Business:</strong> 51-500 devices @ £1.49/device</p>
              <p><strong>Enterprise:</strong> 500+ devices @ £0.99/device</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Actions</CardTitle>
          <CardDescription>
            Manage your subscription and billing details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={handleManagePayment}
              disabled={actionLoading}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Manage Payment Methods
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => {
                const newQuantity = prompt('Enter new device quantity:', subscription.quantity);
                if (newQuantity && parseInt(newQuantity) > 0) {
                  handleUpdateQuantity(parseInt(newQuantity));
                }
              }}
              disabled={actionLoading}
            >
              Update Quantity
            </Button>
            
            {!subscription.cancel_at_period_end && (
              <Button 
                variant="destructive" 
                onClick={handleCancelSubscription}
                disabled={actionLoading}
              >
                Cancel Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      {paymentMethods && paymentMethods.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {paymentMethods.map((pm) => (
                <div key={pm.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="capitalize">{pm.brand}</span>
                    <span>•••• {pm.last4}</span>
                    <span className="text-sm text-muted-foreground">
                      {pm.exp_month}/{pm.exp_year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Invoices */}
      {invoices && invoices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {invoices.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">
                      £{(invoice.amount_paid / 100).toFixed(2)} {invoice.currency.toUpperCase()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(invoice.created)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                      {invoice.status}
                    </Badge>
                    {invoice.invoice_pdf && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={invoice.invoice_pdf} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LicenseManagement;

