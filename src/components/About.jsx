import { Users, Target, Award, Globe } from 'lucide-react';
import syncSureLogo from '../assets/Syncsure_Logo_1.png';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We exist to eliminate OneDrive sync issues before they impact your users and business operations.'
    },
    {
      icon: Users,
      title: 'Customer-Centric',
      description: 'Every feature we build is designed with MSPs and IT professionals in mind, solving real-world problems.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in monitoring accuracy, reliability, and customer support.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'Continuously advancing OneDrive monitoring technology to stay ahead of emerging challenges.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former Microsoft engineer with 15 years in cloud infrastructure. Built SyncSure after experiencing OneDrive issues firsthand.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      bio: 'Expert in distributed systems and monitoring. Previously led engineering teams at major cloud providers.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'VP of Customer Success',
      bio: 'MSP industry veteran with deep understanding of IT service provider challenges and workflows.',
      image: '/api/placeholder/150/150'
    }
  ];

  const stats = [
    { number: '500+', label: 'MSPs Trust SyncSure' },
    { number: '50K+', label: 'Devices Monitored' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src={syncSureLogo} 
              alt="SyncSure" 
              className="h-16 w-16"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About SyncSure
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're on a mission to make OneDrive monitoring simple, reliable, and proactive. 
            Founded by IT professionals who understand the pain of sync issues, SyncSure helps 
            MSPs and businesses monitor their OneDrive infrastructure like pros.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Story
          </h2>
          
          <div className="prose prose-lg mx-auto text-gray-600">
            <p>
              SyncSure was born out of frustration. As IT professionals managing hundreds of 
              OneDrive deployments, we constantly dealt with sync failures that went unnoticed 
              until users complained. Critical business files weren't syncing, backups were 
              failing, and we had no visibility into the health of our OneDrive infrastructure.
            </p>
            
            <p>
              We tried existing monitoring solutions, but they were either too generic, too 
              expensive, or simply didn't understand the unique challenges of OneDrive monitoring. 
              So we built our own solution - one designed specifically for MSPs and IT professionals 
              who need reliable, proactive OneDrive monitoring.
            </p>
            
            <p>
              Today, SyncSure monitors over 50,000 devices for hundreds of MSPs worldwide, 
              preventing sync issues before they impact users and providing the visibility 
              IT teams need to maintain healthy OneDrive environments.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            SyncSure by the Numbers
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Meet Our Team
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Our Mission
          </h2>
          <blockquote className="text-2xl text-gray-600 italic leading-relaxed">
            "To empower MSPs and IT professionals with the visibility and tools they need 
            to maintain healthy OneDrive environments, preventing issues before they impact 
            users and ensuring business continuity."
          </blockquote>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Learn More?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We'd love to hear from you. Get in touch to learn more about SyncSure 
            or to discuss how we can help with your OneDrive monitoring needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Us
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

