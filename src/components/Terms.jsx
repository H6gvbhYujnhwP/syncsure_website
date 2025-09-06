import syncSureLogo from '../assets/Syncsure_Logo_1.png';

const Terms = () => {
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
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: September 5, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          
          <h2>Agreement to Terms</h2>
          <p>
            By accessing and using SyncSure's OneDrive monitoring service ("Service"), you agree to be 
            bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, 
            you may not access the Service.
          </p>

          <h2>Description of Service</h2>
          <p>
            SyncSure provides OneDrive monitoring and alerting services for managed service providers 
            (MSPs) and businesses. Our Service monitors OneDrive sync health, detects issues, and 
            provides alerts and reporting capabilities.
          </p>

          <h2>Account Registration and Security</h2>
          
          <h3>Account Creation</h3>
          <ul>
            <li>You must provide accurate and complete information when creating an account</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You must notify us immediately of any unauthorized use of your account</li>
            <li>You must be at least 18 years old to create an account</li>
          </ul>

          <h3>Account Responsibilities</h3>
          <ul>
            <li>You are responsible for all activities that occur under your account</li>
            <li>You must keep your contact information current</li>
            <li>You may not share your account with others</li>
            <li>You may not create multiple accounts to circumvent service limitations</li>
          </ul>

          <h2>Acceptable Use Policy</h2>
          
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Transmit malicious code or attempt to gain unauthorized access</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Use the Service for any unlawful or prohibited purpose</li>
            <li>Reverse engineer, decompile, or attempt to extract source code</li>
            <li>Resell or redistribute the Service without authorization</li>
          </ul>

          <h2>Subscription and Billing</h2>
          
          <h3>Subscription Plans</h3>
          <ul>
            <li>Service is provided on a subscription basis with monthly or annual billing</li>
            <li>Subscription fees are charged in advance</li>
            <li>All fees are non-refundable except as required by law</li>
            <li>We reserve the right to change pricing with 30 days notice</li>
          </ul>

          <h3>Payment Terms</h3>
          <ul>
            <li>Payment is due immediately upon subscription or renewal</li>
            <li>Failure to pay may result in service suspension or termination</li>
            <li>You are responsible for all taxes associated with your subscription</li>
            <li>Disputed charges must be reported within 60 days</li>
          </ul>

          <h3>Free Trial</h3>
          <ul>
            <li>Free trials are limited to one per customer</li>
            <li>Trial accounts may have limited features or usage</li>
            <li>Trials automatically convert to paid subscriptions unless cancelled</li>
          </ul>

          <h2>Data and Privacy</h2>
          
          <h3>Your Data</h3>
          <ul>
            <li>You retain ownership of all data you provide to the Service</li>
            <li>You grant us permission to process your data to provide the Service</li>
            <li>We do not access the content of your OneDrive files</li>
            <li>You are responsible for the accuracy and legality of your data</li>
          </ul>

          <h3>Data Security</h3>
          <ul>
            <li>We implement industry-standard security measures</li>
            <li>We encrypt data in transit and at rest</li>
            <li>We maintain SOC 2 Type II compliance</li>
            <li>You are responsible for securing your own systems and credentials</li>
          </ul>

          <h2>Service Availability and Support</h2>
          
          <h3>Service Level</h3>
          <ul>
            <li>We strive to maintain 99.9% uptime for our Service</li>
            <li>Scheduled maintenance will be announced in advance when possible</li>
            <li>We provide support during business hours via email and chat</li>
            <li>Enterprise customers receive priority support</li>
          </ul>

          <h3>Service Modifications</h3>
          <ul>
            <li>We may modify or discontinue features with reasonable notice</li>
            <li>We may update the Service to improve functionality or security</li>
            <li>Material changes will be communicated to customers</li>
          </ul>

          <h2>Intellectual Property</h2>
          
          <h3>Our Rights</h3>
          <ul>
            <li>SyncSure and all related trademarks are our property</li>
            <li>The Service and underlying technology are protected by intellectual property laws</li>
            <li>You may not use our trademarks without written permission</li>
          </ul>

          <h3>Your Rights</h3>
          <ul>
            <li>You retain rights to your data and content</li>
            <li>You grant us a license to use your data solely to provide the Service</li>
            <li>You may not claim ownership of our intellectual property</li>
          </ul>

          <h2>Limitation of Liability</h2>
          
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <p className="font-semibold mb-2">Important Legal Notice:</p>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SYNCSURE SHALL NOT BE LIABLE FOR ANY 
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING 
              BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, EVEN IF WE HAVE BEEN ADVISED 
              OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
          </div>

          <p className="mt-4">
            Our total liability for any claims arising from or related to the Service shall not 
            exceed the amount you paid for the Service in the 12 months preceding the claim.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless SyncSure from any claims, damages, or expenses 
            arising from your use of the Service, violation of these Terms, or infringement of any 
            third-party rights.
          </p>

          <h2>Termination</h2>
          
          <h3>Termination by You</h3>
          <ul>
            <li>You may cancel your subscription at any time</li>
            <li>Cancellation takes effect at the end of your current billing period</li>
            <li>You remain responsible for charges incurred before cancellation</li>
          </ul>

          <h3>Termination by Us</h3>
          <ul>
            <li>We may suspend or terminate accounts for violation of these Terms</li>
            <li>We may terminate the Service with 30 days notice</li>
            <li>We may immediately terminate for non-payment or illegal activity</li>
          </ul>

          <h2>Governing Law and Disputes</h2>
          <p>
            These Terms are governed by the laws of [Jurisdiction]. Any disputes will be resolved 
            through binding arbitration in accordance with the rules of the American Arbitration Association.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Material changes will be communicated via 
            email or through the Service. Continued use of the Service after changes constitutes 
            acceptance of the new Terms.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have questions about these Terms, please contact us:
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mt-6">
            <p><strong>SyncSure Legal Team</strong></p>
            <p>Email: legal@syncsure.cloud</p>
            <p>Address: [Company Address]</p>
            <p>Phone: [Phone Number]</p>
          </div>

          <h2>Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable, the remaining provisions 
            will remain in full force and effect.
          </p>

          <h2>Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between 
            you and SyncSure regarding the Service.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Terms;

