import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  User, 
  Key, 
  Monitor,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { Button } from './ui/button';
import syncSureLogo from '../assets/Syncsure_Logo_1.png';

const DashboardLoginAuth = () => {
  const [authStatus, setAuthStatus] = useState('checking');
  const [userInfo, setUserInfo] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    setAuthStatus('checking');
    
    try {
      // Check for stored token
      const token = localStorage.getItem('syncsure_token');
      const userStr = localStorage.getItem('syncsure_user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserInfo(user);
          setTokenInfo({
            exists: true,
            length: token.length,
            preview: token.substring(0, 20) + '...'
          });
          setAuthStatus('authenticated');
        } catch (parseError) {
          console.error('Error parsing user data:', parseError);
          setAuthStatus('error');
        }
      } else {
        setAuthStatus('not_authenticated');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthStatus('error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('syncsure_token');
    localStorage.removeItem('syncsure_user');
    setUserInfo(null);
    setTokenInfo(null);
    setAuthStatus('not_authenticated');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const testApiConnection = async () => {
    try {
      const token = localStorage.getItem('syncsure_token');
      if (!token) {
        alert('No token found. Please login first.');
        return;
      }

      const response = await fetch('https://syncsure-backend.onrender.com/api/auth/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('✅ API Connection Successful!\n' + JSON.stringify(data, null, 2));
      } else {
        alert('❌ API Connection Failed:\n' + JSON.stringify(data, null, 2));
      }
    } catch (error) {
      alert('💥 Network Error:\n' + error.message);
    }
  };

  const getStatusIcon = () => {
    switch (authStatus) {
      case 'checking':
        return <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />;
      case 'authenticated':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'not_authenticated':
        return <XCircle className="h-8 w-8 text-red-500" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-yellow-500" />;
      default:
        return <AlertCircle className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusMessage = () => {
    switch (authStatus) {
      case 'checking':
        return 'Checking authentication status...';
      case 'authenticated':
        return 'User is authenticated and ready to access dashboard';
      case 'not_authenticated':
        return 'User is not authenticated - login required';
      case 'error':
        return 'Error checking authentication status';
      default:
        return 'Unknown authentication status';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src={syncSureLogo} 
                alt="SyncSure" 
                className="h-8 w-8 mr-3"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">SyncSure</h1>
                <p className="text-sm text-gray-500">Dashboard-Login-Auth Test Page</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={checkAuthStatus}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center mb-4">
            {getStatusIcon()}
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Authentication Status</h2>
              <p className="text-gray-600">{getStatusMessage()}</p>
            </div>
          </div>

          {/* Status Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Key className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium text-gray-900">Token Status</span>
              </div>
              <p className="text-sm text-gray-600">
                {tokenInfo ? (
                  <>
                    <span className="text-green-600">✓ Present</span><br />
                    Length: {tokenInfo.length}<br />
                    Preview: {tokenInfo.preview}
                  </>
                ) : (
                  <span className="text-red-600">✗ Missing</span>
                )}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium text-gray-900">User Data</span>
              </div>
              <p className="text-sm text-gray-600">
                {userInfo ? (
                  <>
                    <span className="text-green-600">✓ Available</span><br />
                    Email: {userInfo.email}<br />
                    Company: {userInfo.companyName}
                  </>
                ) : (
                  <span className="text-red-600">✗ Not available</span>
                )}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Monitor className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium text-gray-900">Route Status</span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="text-green-600">✓ Route accessible</span><br />
                Current: /dashboard-login-auth<br />
                Component: DashboardLoginAuth
              </p>
            </div>
          </div>
        </div>

        {/* User Information Card */}
        {userInfo && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(userInfo, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={goToLogin}
              className="w-full"
              variant="outline"
            >
              Go to Login
            </Button>

            <Button
              onClick={goToDashboard}
              className="w-full"
              disabled={authStatus !== 'authenticated'}
            >
              Go to Dashboard
            </Button>

            <Button
              onClick={testApiConnection}
              className="w-full"
              variant="outline"
              disabled={authStatus !== 'authenticated'}
            >
              Test API Connection
            </Button>

            <Button
              onClick={handleLogout}
              className="w-full"
              variant="destructive"
              disabled={authStatus !== 'authenticated'}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Debug Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Debug Information</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Local Storage Contents:</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-700">
                  {JSON.stringify({
                    syncsure_token: localStorage.getItem('syncsure_token') ? 'Present' : 'Missing',
                    syncsure_user: localStorage.getItem('syncsure_user') ? 'Present' : 'Missing',
                    token_length: localStorage.getItem('syncsure_token')?.length || 0
                  }, null, 2)}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Current URL:</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <code className="text-sm text-gray-700">{window.location.href}</code>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Environment:</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-700">
                  {JSON.stringify({
                    NODE_ENV: process.env.NODE_ENV,
                    VITE_API_BASE: import.meta.env.VITE_API_BASE,
                    timestamp: new Date().toISOString()
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoginAuth;

