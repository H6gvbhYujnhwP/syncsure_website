import syncSureLogo from '../assets/Syncsure_Logo_1.png';

const Privacy = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src={syncSureLogo} 
              alt="SyncSure" 
              className="h-16 w-16"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: September 5, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          
          <h2>Introduction</h2>
          <p>
            SyncSure ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you use our 
            OneDrive monitoring service and website.
          </p>

          <h2>Information We Collect</h2>
          
          <h3>Account Information</h3>
          <p>When you create an account, we collect:</p>
          <ul>
            <li>Name and email address</li>
            <li>Company information</li>
            <li>Billing and payment information</li>
            <li>Contact preferences</li>
          </ul>

          <h3>OneDrive Monitoring Data</h3>
          <p>Our monitoring service collects:</p>
          <ul>
            <li>OneDrive sync status and health metrics</li>
            <li>Device information (computer names, operating system)</li>
            <li>User account identifiers (email addresses)</li>
            <li>Sync error logs and diagnostic information</li>
            <li>Storage usage statistics</li>
          </ul>

          <h3>Usage Information</h3>
          <p>We automatically collect:</p>
          <ul>
            <li>Log data (IP addresses, browser type, access times)</li>
            <li>Service usage patterns and feature utilization</li>
            <li>Performance and error data</li>
          </ul>

          <h2>How We Use Your Information</h2>
          
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide and maintain our monitoring services</li>
            <li>Send alerts and notifications about OneDrive issues</li>
            <li>Generate reports and analytics</li>
            <li>Improve our service quality and features</li>
            <li>Process payments and manage subscriptions</li>
            <li>Provide customer support</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Data Security and Protection</h2>
          
          <h3>Security Measures</h3>
          <p>We implement industry-standard security measures including:</p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security audits and penetration testing</li>
            <li>Access controls and authentication mechanisms</li>
            <li>SOC 2 Type II compliance</li>
            <li>Regular backup and disaster recovery procedures</li>
          </ul>

          <h3>Important Note About File Content</h3>
          <p className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <strong>SyncSure does not access, read, or store the content of your OneDrive files.</strong> 
            We only monitor sync status, metadata, and health metrics. Your actual documents, 
            photos, and files remain private and are never accessed by our service.
          </p>

          <h2>Data Sharing and Disclosure</h2>
          
          <p>We do not sell, trade, or rent your personal information. We may share information only in these circumstances:</p>
          <ul>
            <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in service delivery</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
            <li><strong>Consent:</strong> With your explicit permission</li>
          </ul>

          <h2>Data Retention</h2>
          
          <p>We retain your information for as long as necessary to:</p>
          <ul>
            <li>Provide our services to you</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes and enforce agreements</li>
          </ul>
          
          <p>
            Monitoring data is typically retained for 90 days for operational purposes and up to 
            2 years for historical reporting and analytics.
          </p>

          <h2>Your Rights and Choices</h2>
          
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your personal information</li>
            <li><strong>Correct:</strong> Update or correct inaccurate information</li>
            <li><strong>Delete:</strong> Request deletion of your personal information</li>
            <li><strong>Portability:</strong> Receive your data in a portable format</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
          </ul>

          <h2>Cookies and Tracking</h2>
          
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Maintain your login session</li>
            <li>Remember your preferences</li>
            <li>Analyze website usage and performance</li>
            <li>Provide personalized experiences</li>
          </ul>
          
          <p>You can control cookie settings through your browser preferences.</p>

          <h2>International Data Transfers</h2>
          
          <p>
            Your information may be transferred to and processed in countries other than your own. 
            We ensure appropriate safeguards are in place to protect your information in accordance 
            with this Privacy Policy and applicable laws.
          </p>

          <h2>Children's Privacy</h2>
          
          <p>
            Our service is not intended for children under 13 years of age. We do not knowingly 
            collect personal information from children under 13.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material 
            changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          
          <p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
          
          <div className="bg-gray-50 p-6 rounded-lg mt-6">
            <p><strong>SyncSure Privacy Team</strong></p>
            <p>Email: privacy@syncsure.cloud</p>
            <p>Address: [Company Address]</p>
            <p>Phone: [Phone Number]</p>
          </div>

          <h2>Compliance and Certifications</h2>
          
          <p>SyncSure is committed to maintaining the highest standards of data protection:</p>
          <ul>
            <li>SOC 2 Type II certified</li>
            <li>GDPR compliant</li>
            <li>CCPA compliant</li>
            <li>ISO 27001 aligned security practices</li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Privacy;

