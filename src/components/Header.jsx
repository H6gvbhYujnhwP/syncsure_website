import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import syncSureLogo from '../assets/Syncsure_Logo_1.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', type: 'route' },
    { name: 'Features', href: '/features', type: 'route' },
    { name: 'Pricing', href: '#pricing', type: 'anchor' },
    { name: 'Help', href: '#help', type: 'anchor' },
    { name: 'Login', href: '#login', type: 'anchor' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={syncSureLogo} 
              alt="SyncSure" 
              className="h-8 w-8 mr-3"
            />
            <span className="text-xl font-semibold text-gray-900">
              SyncSure <span className="text-blue-600 font-normal">cloud</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.slice(0, -2).map((item) => (
              item.type === 'route' ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="nav-link text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  {item.name}
                </a>
              )
            ))}
            <a
              href="#help"
              className="nav-link text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Help
            </a>
            <a
              href="#login"
              className="nav-link text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Login
            </a>
            <Button className="syncsure-bg-blue hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              Start Free Trial
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                item.type === 'route' ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}
              <Button className="syncsure-bg-blue hover:bg-blue-700 text-white px-6 py-2 rounded-lg mx-3 mt-4">
                Start Free Trial
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

