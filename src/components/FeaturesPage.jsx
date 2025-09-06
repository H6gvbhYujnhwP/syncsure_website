import { 
  AlertTriangle, 
  Activity, 
  Shield, 
  Gauge, 
  FileX, 
  Wifi, 
  AlertCircle, 
  TrendingUp, 
  FileText, 
  Settings, 
  Users, 
  BarChart3,
  CheckCircle
} from 'lucide-react';
import { Button } from './ui/button';
import syncSureLogo from '../assets/Syncsure_Logo_1.png';

const FeaturesPage = () => {
  const criticalFeatures = [
    {
      icon: <Activity className="h-5 w-5 text-red-500" />,
      title: 'Process Health Monitoring',
      description: 'Real-time monitoring of OneDrive process status and performance'
    },
    {
      icon: <Shield className="h-5 w-5 text-red-500" />,
      title: 'Authentication Problems',
      description: 'Comprehensive authentication and account monitoring'
    },
    {
      icon: <Gauge className="h-5 w-5 text-red-500" />,
      title: 'Storage Critical Monitoring',
      description: 'Detection of high quota and disk space monitoring'
    },
    {
      icon: <FileX className="h-5 w-5 text-red-500" />,
      title: 'Sync Error Detection',
      description: 'Early detection of sync failures and conflict monitoring'
    },
    {
      icon: <Wifi className="h-5 w-5 text-red-500" />,
      title: 'Connectivity Issues',
      description: 'Network connectivity and service reachability monitoring'
    }
  ];

  const warningFeatures = [
    {
      icon: <TrendingUp className="h-5 w-5 text-yellow-600" />,
      title: 'Performance Monitoring',
      description: 'Proactive performance degradation detection'
    },
    {
      icon: <FileText className="h-5 w-5 text-yellow-600" />,
      title: 'File Conflict Detection',
      description: 'Advanced file conflict and naming issue monitoring'
    }
  ];

  const managementFeatures = [
    {
      icon: <Settings className="h-5 w-5 text-blue-600" />,
      title: 'Automatic Device Management',
      description: 'Intelligent device lifecycle and configuration management'
    },
    {
      icon: <Users className="h-5 w-5 text-blue-600" />,
      title: 'Customer Self-Service Portal',
      description: 'Comprehensive device management portal for customers'
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-blue-600" />,
      title: 'Analytics & Reporting',
      description: 'Comprehensive usage analytics and activity reporting'
    }
  ];

  const healthFeatures = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      title: 'Normal Operation Detection',
      description: 'Comprehensive health verification and system status monitoring'
    }
  ];

  const FeatureSection = ({ title, features, bgColor, borderColor }) => (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-6 mb-6`}>
      <div className="flex items-center mb-4">
        <AlertTriangle className="h-5 w-5 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            {feature.icon}
            <div>
              <h4 className="font-medium text-gray-900">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src={syncSureLogo} 
            alt="SyncSure" 
            className="h-12 w-12 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive OneDrive Monitoring
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advanced monitoring and alerting for every aspect of OneDrive sync health.
            Click on any feature below to see detailed capabilities.
          </p>
        </div>
      </div>

      {/* Features Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Critical Issues Detection */}
        <FeatureSection
          title="Critical Issues Detection"
          features={criticalFeatures}
          bgColor="alert-red"
          borderColor="border-red-200"
        />

        {/* Warning Alerts */}
        <FeatureSection
          title="Warning Alerts"
          features={warningFeatures}
          bgColor="alert-yellow"
          borderColor="border-yellow-200"
        />

        {/* Advanced Device Management */}
        <FeatureSection
          title="Advanced Device Management"
          features={managementFeatures}
          bgColor="alert-blue"
          borderColor="border-blue-200"
        />

        {/* Healthy Status Monitoring */}
        <FeatureSection
          title="Healthy Status Monitoring"
          features={healthFeatures}
          bgColor="alert-green"
          borderColor="border-green-200"
        />

        {/* Call to Action */}
        <div className="text-center mt-12 py-12 bg-white rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Monitor Like a Pro?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your free trial today and experience comprehensive OneDrive monitoring.
          </p>
          <Button 
            size="lg"
            className="syncsure-bg-blue hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg"
          >
            Start 7-Day Free Trial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;

