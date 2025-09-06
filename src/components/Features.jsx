import { Zap, BarChart3, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: 'Real-time Alerts',
      description: 'Get instant notifications when sync issues occur across your managed devices'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: 'Advanced Analytics',
      description: 'Detailed insights into sync performance and storage usage patterns'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Multi-tenant',
      description: 'Manage multiple customers and devices from a single dashboard'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Monitor OneDrive
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive monitoring solution designed for MSPs and IT professionals
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card bg-white p-8 rounded-xl text-center hover:shadow-lg"
            >
              <div className="mb-6 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

