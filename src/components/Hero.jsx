import { Play } from 'lucide-react';
import { Button } from './ui/button';
import syncSureLogo from '../assets/Syncsure_Logo_1.png';

const Hero = () => {
  return (
    <section className="hero-section py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src={syncSureLogo} 
            alt="SyncSure" 
            className="h-16 w-16 mx-auto mb-6"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Monitor OneDrive{' '}
          <span className="syncsure-blue">Like a Pro</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
          Proactive OneDrive monitoring for MSPs and businesses. Get instant alerts for 
          sync issues, storage problems, and connectivity failures before they impact your 
          users.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            className="syncsure-bg-blue hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg"
          >
            Start 7-Day Free Trial
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-lg flex items-center gap-2"
          >
            <Play size={20} />
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

