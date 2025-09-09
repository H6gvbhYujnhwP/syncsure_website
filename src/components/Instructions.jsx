import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Shield, Terminal, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="ml-4 text-2xl font-bold text-gray-900">SyncSure Agent Installation Instructions</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          
          {/* Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Installation Overview</h2>
            <p className="text-gray-600 mb-4">
              The SyncSure Agent monitors OneDrive synchronization across your Windows devices. Follow these steps to deploy it using the PowerShell script.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Administrator Privileges Required</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    The PowerShell script must be run as Administrator to install the SyncSure Agent service.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-step instructions */}
          <div className="space-y-8">
            
            {/* Step 1 */}
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-medium mr-3">1</span>
                Download Required Files
              </h3>
              <p className="text-gray-600 mb-4">
                From your dashboard, download all three files:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Download className="h-4 w-4 text-blue-500 mr-2" />
                  <strong>SyncSureAgent.exe</strong> - Main executable file
                </li>
                <li className="flex items-center">
                  <Shield className="h-4 w-4 text-green-500 mr-2" />
                  <strong>Hash File (.sha256)</strong> - Security verification (optional)
                </li>
                <li className="flex items-center">
                  <Terminal className="h-4 w-4 text-purple-500 mr-2" />
                  <strong>PowerShell Script</strong> - Automated deployment script
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-medium mr-3">2</span>
                Verify File Integrity (Optional but Recommended)
              </h3>
              <p className="text-gray-600 mb-4">
                For security, verify the downloaded executable matches the provided hash:
              </p>
              <div className="bg-gray-100 rounded-md p-4 font-mono text-sm">
                <code>
                  # Open PowerShell as Administrator<br/>
                  Get-FileHash -Path "C:\Path\To\SyncSureAgent.exe" -Algorithm SHA256<br/>
                  # Compare output with the downloaded .sha256 file
                </code>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-500 text-white rounded-full text-sm font-medium mr-3">3</span>
                Run PowerShell Script
              </h3>
              <p className="text-gray-600 mb-4">
                Execute the deployment script with your license key:
              </p>
              <div className="bg-gray-100 rounded-md p-4 font-mono text-sm mb-4">
                <code>
                  # Right-click PowerShell and "Run as Administrator"<br/>
                  Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process<br/>
                  .\deploy-syncsure-agent.ps1 -LicenseKey "YOUR-LICENSE-KEY"
                </code>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Important Notes</h4>
                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                      <li>• Replace "YOUR-LICENSE-KEY" with your actual license key from the dashboard</li>
                      <li>• The script will automatically download and install the agent</li>
                      <li>• Internet connectivity is required during installation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full text-sm font-medium mr-3">4</span>
                Verify Installation
              </h3>
              <p className="text-gray-600 mb-4">
                Confirm the SyncSure Agent is running correctly:
              </p>
              <div className="bg-gray-100 rounded-md p-4 font-mono text-sm mb-4">
                <code>
                  # Check service status<br/>
                  Get-Service -Name "SyncSureAgent"<br/><br/>
                  # View recent logs<br/>
                  Get-Content "C:\ProgramData\SyncSure\logs\agent-*.log" -Tail 10
                </code>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Service should show "Running" status</span>
              </div>
            </div>

          </div>

          {/* Troubleshooting */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Troubleshooting</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">PowerShell Execution Policy Error</h3>
                <p className="text-gray-600 mb-2">If you see "execution of scripts is disabled on this system":</p>
                <div className="bg-gray-100 rounded-md p-3 font-mono text-sm">
                  <code>Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process</code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Service Installation Failed</h3>
                <p className="text-gray-600 mb-2">If the service fails to install:</p>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Ensure PowerShell is running as Administrator</li>
                  <li>• Check Windows Event Log for detailed error messages</li>
                  <li>• Verify .NET 8 runtime is available on the system</li>
                  <li>• Temporarily disable antivirus software during installation</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">License Validation Issues</h3>
                <p className="text-gray-600 mb-2">If license validation fails:</p>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Verify the license key is copied correctly (no extra spaces)</li>
                  <li>• Check internet connectivity for license validation</li>
                  <li>• Ensure firewall allows outbound HTTPS connections</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-start">
                <ExternalLink className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Need Help?</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    If you encounter issues during installation, contact our support team at{' '}
                    <a href="mailto:support@syncsure.cloud" className="underline">support@syncsure.cloud</a>{' '}
                    with the error details and your license key.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Instructions;

