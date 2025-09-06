import { Search, Book, MessageCircle, Mail, Phone, FileText } from 'lucide-react';
import { Button } from './ui/button';
import syncSureLogo from '../assets/Syncsure_Logo_1.png';

const Help = () => {
  const helpCategories = [
    {
      title: 'Getting Started',
      icon: Book,
      articles: [
        'Setting up your first OneDrive monitoring',
        'Installing the SyncSure agent',
        'Configuring alerts and notifications',
        'Understanding the dashboard'
      ]
    },
    {
      title: 'Troubleshooting',
      icon: MessageCircle,
      articles: [
        'Common sync issues and solutions',
        'Agent connectivity problems',
        'Authentication and permission errors',
        'Performance optimization tips'
      ]
    },
    {
      title: 'Advanced Features',
      icon: FileText,
      articles: [
        'API integration guide',
        'Custom reporting and analytics',
        'Multi-tenant management',
        'White-label configuration'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How do I install the SyncSure agent?',
      answer: 'Download the agent from your dashboard, run the installer as administrator, and follow the setup wizard. The agent will automatically register with your account.'
    },
    {
      question: 'What happens when a sync issue is detected?',
      answer: 'SyncSure immediately sends alerts via your configured channels (email, SMS, webhook). The issue is logged in your dashboard with detailed diagnostic information.'
    },
    {
      question: 'Can I monitor multiple OneDrive tenants?',
      answer: 'Yes, SyncSure supports multi-tenant monitoring. You can manage multiple customer environments from a single dashboard with our Professional and Enterprise plans.'
    },
    {
      question: 'How often does SyncSure check for issues?',
      answer: 'The agent performs continuous monitoring with real-time detection. Health checks run every 30 seconds, with immediate alerting for critical issues.'
    },
    {
      question: 'Is my data secure with SyncSure?',
      answer: 'Absolutely. SyncSure only monitors sync status and metadata - never your actual files. All data is encrypted in transit and at rest, with SOC 2 compliance.'
    }
  ];

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
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers, get support, and learn how to make the most of SyncSure.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, guides, and FAQs..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Browse by Category
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">
                    {category.title}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a 
                        href="#" 
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" className="w-full mt-6">
                  View All Articles
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Still Need Help?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Email Support */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Email Support
              </h3>
              <p className="text-gray-600 mb-4">
                Get help via email. We typically respond within 4 hours.
              </p>
              <Button className="syncsure-bg-blue hover:bg-blue-700 text-white">
                Send Email
              </Button>
            </div>

            {/* Live Chat */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Live Chat
              </h3>
              <p className="text-gray-600 mb-4">
                Chat with our support team in real-time during business hours.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Start Chat
              </Button>
            </div>

            {/* Phone Support */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Phone className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Phone Support
              </h3>
              <p className="text-gray-600 mb-4">
                Call us directly for urgent issues. Available for Enterprise customers.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Additional Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                API Documentation
              </h3>
              <p className="text-gray-600 mb-4">
                Complete guide to integrating with the SyncSure API.
              </p>
              <Button variant="outline">
                View Docs
              </Button>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Video Tutorials
              </h3>
              <p className="text-gray-600 mb-4">
                Step-by-step video guides for common tasks.
              </p>
              <Button variant="outline">
                Watch Videos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;

