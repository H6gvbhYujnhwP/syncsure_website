import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  Shield, 
  Activity, 
  FileText, 
  Search, 
  Plus,
  Download,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  CreditCard,
  LogOut,
  Monitor
} from 'lucide-react';
import { Button } from './ui/button';
import syncSureLogo from '../assets/Syncsure_Logo_1.png';

// Downloads Section Component
const DownloadsSection = ({ userEmail }) => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuilds();
  }, [userEmail]);

  const fetchBuilds = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://syncsure-backend.onrender.com'}/api/builds/customer/${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      
      if (data.success) {
        setBuilds(data.builds);
      }
    } catch (error) {
      console.error('Error fetching builds:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'released':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'building':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'queued':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'released':
        return 'Ready for Download';
      case 'building':
        return 'Building...';
      case 'queued':
        return 'Queued';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Your Downloads</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading downloads...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Your Downloads</h3>
      
      {builds.length === 0 ? (
        <div className="text-center py-8">
          <Download className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No downloads available yet</p>
          <p className="text-sm text-gray-400">Your SyncSure agent will appear here after purchase</p>
        </div>
      ) : (
        <div className="space-y-4">
          {builds.map((build) => (
            <div key={build.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(build.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">
                      SyncSure Agent {build.tag}
                    </h4>
                    <p className="text-sm text-gray-500">
                      License: {build.license_key} • Max Devices: {build.max_devices}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {getStatusText(build.status)}
                    </p>
                  </div>
                </div>
                
                {build.status === 'released' && build.release_url && (
                  <div className="flex space-x-2">
                    <a
                      href={build.release_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download .exe
                    </a>
                    <button
                      onClick={() => {
                        // Generate PowerShell script for bulk deployment
                        const psScript = `# SyncSure Agent Bulk Deployment Script
# License: ${build.license_key}
# Download URL: ${build.release_url}

# Download and install SyncSure Agent
$url = "${build.release_url}"
$output = "$env:TEMP\\SyncSureAgent.exe"
Invoke-WebRequest -Uri $url -OutFile $output
Start-Process -FilePath $output -ArgumentList "/S" -Wait
Write-Host "SyncSure Agent installed successfully with license: ${build.license_key}"`;
                        
                        const blob = new Blob([psScript], { type: 'text/plain' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `syncsure-deploy-${build.tag}.ps1`;
                        a.click();
                        window.URL.revokeObjectURL(url);
                      }}
                      className="inline-flex items-center px-3 py-2 border border-blue-300 shadow-sm text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      PowerShell Script
                    </button>
                  </div>
                )}
              </div>
              
              {build.status === 'building' && (
                <div className="mt-3">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <p className="text-sm text-yellow-800">
                      Your custom SyncSure agent is being built. This usually takes 2-3 minutes.
                      You'll receive an email when it's ready for download.
                    </p>
                  </div>
                </div>
              )}
              
              {build.status === 'queued' && (
                <div className="mt-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <p className="text-sm text-blue-800">
                      Your build request has been queued and will start processing shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Billing Section Component
const BillingSection = ({ userEmail, subscriptionData, onSubscriptionUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handlePurchaseLicense = async () => {
    setLoading(true);
    try {
      // No authentication required for checkout - Stripe handles customer verification
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://syncsure-backend.onrender.com'}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          priceId: 'price_1S3aWcFqWt5tjv3COq6g1ffY', // Your real Stripe price ID
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/dashboard?canceled=true`
        })
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url; // Redirect to Stripe Checkout
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `Server error (${response.status}). Please try again.`;
        
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-50 max-w-md';
        notification.innerHTML = `
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Payment Error</h3>
              <p class="mt-1 text-sm text-red-700">${errorMessage}</p>
            </div>
            <div class="ml-auto pl-3">
              <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-red-400 hover:text-red-600">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(notification);
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 8000);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      
      // Create error notification for network/other errors
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-50 max-w-md';
      notification.innerHTML = `
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Connection Error</h3>
            <p class="mt-1 text-sm text-red-700">${error.message || 'Unable to connect to payment service. Please check your internet connection and try again.'}</p>
          </div>
          <div class="ml-auto pl-3">
            <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-red-400 hover:text-red-600">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(notification);
      
      // Auto-remove after 8 seconds
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 8000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Subscription</h3>
        
        {subscriptionData?.active ? (
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="font-medium text-green-900">Active Subscription</p>
                <p className="text-sm text-green-700">
                  SyncSure Monitor - {subscriptionData.licenseCount <= 50 ? '£1.99' : 
                                     subscriptionData.licenseCount <= 500 ? '£1.49' : '£0.99'}/month
                  ({subscriptionData.licenseCount} {subscriptionData.licenseCount === 1 ? 'license' : 'licenses'})
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-700">Next billing: {subscriptionData.nextBilling}</p>
              <p className="text-sm text-green-700">Licenses: {subscriptionData.licenseCount}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">No Active Subscription</p>
                <p className="text-sm text-gray-600">Purchase a license to start monitoring your devices</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* License Purchase */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Purchase License</h3>
        
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-medium text-blue-900">SyncSure Monitor</h4>
              <p className="text-sm text-blue-700">Professional OneDrive monitoring for MSPs</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-900">Volume Pricing</p>
              <div className="text-sm text-blue-700 space-y-1">
                <p>1-50 devices: <span className="font-semibold">£1.99</span>/month</p>
                <p>51-500 devices: <span className="font-semibold">£1.49</span>/month</p>
                <p>501+ devices: <span className="font-semibold">£0.99</span>/month</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center text-sm text-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Unlimited device monitoring</span>
            </div>
            <div className="flex items-center text-sm text-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Real-time sync status tracking</span>
            </div>
            <div className="flex items-center text-sm text-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Custom agent with embedded license</span>
            </div>
            <div className="flex items-center text-sm text-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>PowerShell deployment scripts</span>
            </div>
            <div className="flex items-center text-sm text-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Dashboard monitoring & alerts</span>
            </div>
          </div>

          <button
            onClick={handlePurchaseLicense}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Purchase License
              </>
            )}
          </button>
        </div>
      </div>

      {/* License Management */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">License Management</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Active Licenses</p>
              <p className="text-sm text-gray-600">Currently purchased and active</p>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {subscriptionData?.licenseCount || 0}
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Devices Monitored</p>
              <p className="text-sm text-gray-600">Devices currently using SyncSure agent</p>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {subscriptionData?.deviceCount || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Billing History</h3>
        
        {subscriptionData?.invoices?.length > 0 ? (
          <div className="space-y-3">
            {subscriptionData.invoices.map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{invoice.description}</p>
                  <p className="text-sm text-gray-600">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">£{invoice.amount}</p>
                  <p className="text-sm text-green-600">{invoice.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No billing history yet</p>
            <p className="text-sm text-gray-400">Your invoices will appear here after purchase</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('syncsure_token');
      const userStr = localStorage.getItem('syncsure_user');
      
      if (token && userStr) {
        try {
          JSON.parse(userStr); // Validate user data
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Invalid user data:', error);
          localStorage.removeItem('syncsure_token');
          localStorage.removeItem('syncsure_user');
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  // Handle URL parameters for payment success/cancellation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');

    if (success === 'true') {
      // Show success message and refresh subscription data
      const successMessage = 'Payment successful! Your license will be available shortly. You will receive an email confirmation and your custom agent will be built automatically.';
      
      // Create a better success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50 max-w-md';
      notification.innerHTML = `
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">Payment Successful!</h3>
            <p class="mt-1 text-sm text-green-700">${successMessage}</p>
          </div>
          <div class="ml-auto pl-3">
            <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-green-400 hover:text-green-600">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(notification);
      
      // Auto-remove after 10 seconds
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 10000);
      
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      // Force refresh subscription data
      fetchSubscriptionData();
    } else if (canceled === 'true') {
      // Show cancellation message with better UX
      const cancelMessage = 'Payment was canceled. No charges were made to your account. You can try again anytime or contact support if you need assistance.';
      
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg z-50 max-w-md';
      notification.innerHTML = `
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-yellow-800">Payment Canceled</h3>
            <p class="mt-1 text-sm text-yellow-700">${cancelMessage}</p>
          </div>
          <div class="ml-auto pl-3">
            <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-yellow-400 hover:text-yellow-600">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(notification);
      
      // Auto-remove after 8 seconds
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 8000);
      
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Fetch subscription data
  const fetchSubscriptionData = async () => {
    try {
      const token = localStorage.getItem('syncsure_token');
      const userStr = localStorage.getItem('syncsure_user');
      
      if (!token || !userStr) return;
      
      const userData = JSON.parse(userStr);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://syncsure-backend.onrender.com'}/api/stripe/subscription?email=${encodeURIComponent(userData.email)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptionData(data);
      }
    } catch (error) {
      console.error('Error fetching subscription data:', error);
    }
  };

  // Auto-refresh subscription data every 30 seconds
  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscriptionData(); // Initial fetch
      
      const interval = setInterval(() => {
        fetchSubscriptionData();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Get user data from localStorage with safe property access
  const getUserData = () => {
    try {
      const userStr = localStorage.getItem('syncsure_user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return {
          companyName: user.companyName || 'SYNC-TEST-123',
          email: user.email || 'test@syncsure.com',
          firstName: user.firstName || 'Test',
          lastName: user.lastName || 'User'
          // Removed purchasedLicenses and activeDevices - these now come from subscriptionData API
        };
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return {
      companyName: 'SYNC-TEST-123',
      email: 'test@syncsure.com',
      firstName: 'Test',
      lastName: 'User'
      // Removed default license values - these now come from subscriptionData API
    };
  };

  const userData = getUserData();

  // Safe function to get user initials
  const getUserInitials = () => {
    const firstName = userData.firstName || 'T';
    const lastName = userData.lastName || 'U';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Dashboard stats - use real subscription data ONLY (removed getLicenseData dependency)
  const stats = {
    activeLicenses: subscriptionData?.licenseCount || 0, // Real license count from Stripe
    purchasedLicenses: subscriptionData?.licenseCount || 0, // Same as active licenses
    activeDevices: subscriptionData?.deviceCount || 0, // Real device count from database
    healthyDevices: subscriptionData?.deviceCount || 0 // For now, assume all active devices are healthy
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'devices', label: 'Devices', icon: Monitor },
    { id: 'licenses', label: 'License Management', icon: Shield },
    { id: 'billing', label: 'Billing & Seats', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Utility function to clear all SyncSure-related cache
  const clearAuthCache = () => {
    // Clear localStorage
    Object.keys(localStorage)
      .filter(k => k.startsWith('syncsure_'))
      .forEach(k => localStorage.removeItem(k));
    
    // Clear sessionStorage  
    Object.keys(sessionStorage)
      .filter(k => k.startsWith('syncsure_'))
      .forEach(k => sessionStorage.removeItem(k));
    
    // Clear specific auth items (legacy naming)
    localStorage.removeItem('authToken');
    localStorage.removeItem('syncsure_token');
    localStorage.removeItem('syncsure_user');
    
    // Clear any subscription/license cache
    localStorage.removeItem('subscription');
    localStorage.removeItem('licenseData');
    localStorage.removeItem('licenseCount');
    sessionStorage.removeItem('subscription');
    sessionStorage.removeItem('licenseData');
  };

  const handleLogout = () => {
    // Clear ALL authentication and cached data
    clearAuthCache();
    
    // Navigate to login page
    navigate('/login');
  };

  const handleAddDevice = () => {
    // Placeholder function - will be implemented later
    alert('Add Device functionality will be implemented in the next phase');
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center">
            <img 
              src={syncSureLogo} 
              alt="SyncSure" 
              className="h-8 w-8 mr-3"
            />
            <div>
              <div className="text-lg font-semibold text-gray-900">SyncSure</div>
              <div className="text-sm text-gray-500">Monitoring Platform</div>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable if needed */}
        <nav className="flex-1 mt-6 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Profile - Always at bottom */}
        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">
                {getUserInitials()}
              </span>
            </div>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-gray-900">{userData.companyName}</div>
              <div className="text-xs text-gray-500">{userData.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-gray-600"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header - Fixed at top */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600">Monitor your OneDrive health across all devices</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-sm text-gray-500">
                <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                System Healthy
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Dashboard Content */}
          {activeSection === 'dashboard' && (
            <div className="p-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.activeLicenses}</div>
                    <div className="text-sm text-gray-500">Active Licenses</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.activeDevices} of {stats.purchasedLicenses}
                    </div>
                    <div className="text-sm text-gray-500">Used Licenses</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.activeDevices}</div>
                    <div className="text-sm text-gray-500">Active Devices</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.healthyDevices}</div>
                    <div className="text-sm text-gray-500">Healthy Devices</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Downloads Section */}
            <DownloadsSection userEmail={userData.email} />

            {/* Device Health Chart and Recent Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Device Health Over Time</h3>
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white">
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No heartbeat data available</p>
                    <p className="text-sm text-gray-400">Device data will appear here</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Events</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No recent events</p>
                    <p className="text-sm text-gray-400">Device events will appear here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Devices Table */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Devices for {userData.companyName}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Device</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Last Seen</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Event</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500">
                          No devices yet
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Active Devices Section */}
            <div className="bg-white rounded-lg shadow-sm border mt-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Active Devices</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search devices..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm bg-white"
                      />
                    </div>
                    <Button
                      onClick={handleAddDevice}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Device
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  <Monitor className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No devices found</h4>
                  <p className="text-gray-500 mb-4">Install the SyncSure agent to start monitoring</p>
                  <p className="text-sm text-gray-400">Device events will appear here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Billing & Seats Section */}
        {activeSection === 'billing' && (
          <div className="p-6">
            <BillingSection 
              userEmail={userData.email} 
              subscriptionData={subscriptionData}
              onSubscriptionUpdate={setSubscriptionData}
            />
          </div>
        )}

        {/* Other sections placeholder */}
        {activeSection !== 'dashboard' && activeSection !== 'billing' && (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {sidebarItems.find(item => item.id === activeSection)?.label}
              </h3>
              <p className="text-gray-500">This section will be implemented in the next phase</p>
              <p className="text-sm text-gray-400 mt-2">All functionality will be added as placeholders are connected</p>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

